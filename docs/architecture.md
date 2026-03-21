# Club Manager — Architecture Diagrams

Four diagrams to orient you in the codebase and trace any feature from UI to database.

---

## 1. Workspace Dependency Graph

Who depends on whom across the monorepo.

```mermaid
graph LR
    subgraph apps
        web["@club-manager/web\nReact SPA · :3000"]
        site["@club-manager/site\nNext.js · :3002"]
        api["@club-manager/api\nNestJS · :3001"]
    end

    subgraph packages
        ds["@club-manager/design-system\nUI components"]
        sdk["@club-manager/sdk\nAuto-generated API client"]
    end

    web --> ds
    web --> sdk
    site --> ds
    api -. "openapi.json\n(build:openapi)" .-> sdk
```

**Key rule:** `sdk` is auto-generated from `api/openapi.json` — never edit `packages/sdk/src/schema.ts` by hand.
Regenerate with: `pnpm generate:sdk`

---

## 2. API Route Map

All REST endpoints. 🔒 = requires `Authorization: Bearer <token>`.

```mermaid
graph LR
    subgraph Public
        R1["POST /api/auth/register"]
        R2["POST /api/auth/login"]
        R3["POST /api/auth/refresh"]
        R4["GET  /api/health"]
    end

    subgraph Clubs["Clubs 🔒"]
        C1["GET    /api/clubs"]
        C2["POST   /api/clubs"]
        C3["GET    /api/clubs/:id"]
        C4["PATCH  /api/clubs/:id\n(owner only)"]
        C5["DELETE /api/clubs/:id\n(owner only)"]
    end

    subgraph Members["Members 🔒"]
        M1["GET    /api/clubs/:clubId/members"]
        M2["POST   /api/clubs/:clubId/members/join"]
        M3["DELETE /api/clubs/:clubId/members/leave"]
    end
```

Controllers live in `apps/api/src/{auth,clubs,members}/`.
Swagger UI available at `http://localhost:3001/api/docs` during development.

---

## 3. Entity-Relationship Diagram

Database models managed by TypeORM (`apps/api/src/**/entities/`).

```mermaid
erDiagram
    User {
        number id PK
        string email UK
        string passwordHash
        string refreshToken
        datetime createdAt
    }

    Club {
        number id PK
        string name
        string description
        string city
        number ownerId FK
        datetime createdAt
    }

    Membership {
        number id PK
        number userId FK
        number clubId FK
        datetime joinedAt
    }

    User ||--o{ Club       : "owns"
    User ||--o{ Membership : "joins via"
    Club ||--o{ Membership : "has"
```

---

## 4. Request Data-Flow

End-to-end journey of a protected API call (e.g. "list clubs").

```mermaid
sequenceDiagram
    participant Browser
    participant Web as web (React)
    participant SDK as sdk (openapi-fetch)
    participant API as api (NestJS)
    participant DB as PostgreSQL

    Browser->>Web: User navigates to clubs list
    Web->>SDK: apiClient.GET('/api/clubs')
    SDK->>API: GET /api/clubs\nAuthorization: Bearer <token>
    API->>API: JwtAuthGuard validates token
    API->>DB: SELECT * FROM club (TypeORM)
    DB-->>API: Club[]
    API-->>SDK: 200 { data: Club[] }
    SDK-->>Web: { data: Club[], error: undefined }
    Web-->>Browser: Render clubs list
```

Auth token is injected globally via `setAuthToken(token)` from `@club-manager/sdk`.
