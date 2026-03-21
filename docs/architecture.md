# Club Manager — Architecture Diagrams

> Auto-generated on **2026-03-21** by `scripts/update-architecture.mjs`.
> Do not edit manually — run `node scripts/update-architecture.mjs`, or just commit (the pre-commit hook handles it).

---

## 1. Workspace Dependency Graph

Who depends on whom across the monorepo.

```mermaid
graph LR
    subgraph apps
        api["@club-manager/api\nNestJS REST API · :3001"]
        site["@club-manager/site\nNext.js · :3002"]
        web["@club-manager/web\nReact SPA · :3000"]
    end

    subgraph packages
        design-system["@club-manager/design-system\nUI components"]
        sdk["@club-manager/sdk\nAuto-generated API client"]
    end

    site --> design-system
    web --> design-system
    web --> sdk
    api -. "openapi.json\n(pnpm generate:sdk)" .-> sdk
```

**Key rule:** `sdk` is auto-generated from `api/openapi.json` — never edit `packages/sdk/src/schema.ts` by hand.
Regenerate with: `pnpm generate:sdk`

---

## 2. API Route Map

All REST endpoints. 🔒 = requires `Authorization: Bearer <token>`.

```mermaid
graph LR
    subgraph Public
        N1["GET /api/health"]
    end
    subgraph clubs["Clubs 🔒"]
        N2["GET /api/clubs"]
        N3["POST /api/clubs"]
        N4["GET /api/clubs/{id}"]
        N5["PATCH /api/clubs/{id}"]
        N6["DELETE /api/clubs/{id}"]
    end
```

_6 endpoint(s) sourced from `apps/api/openapi.json`. Run `pnpm generate:sdk` after changing endpoints._

Controllers live in `apps/api/src/{auth,clubs,members}/`.
Swagger UI at `http://localhost:3001/api/docs` during development.

---

## 3. Entity-Relationship Diagram

Database models managed by TypeORM.

```mermaid
erDiagram
    Club {
        number id PK
        string name
        string description
        string city
        number ownerId
        datetime createdAt
    }

    Membership {
        number id PK
        number userId
        number clubId
        datetime joinedAt
    }

    User {
        number id PK
        string email UK
        string passwordHash
        string refreshToken
        datetime createdAt
    }

    User ||--o{ Club : " "
    User ||--o{ Membership : " "
    Club ||--o{ Membership : " "
```

_Sourced from `apps/api/src/**/entities/*.ts`._

---

## 4. Request Data-Flow

End-to-end journey of a protected API call.

```mermaid
sequenceDiagram
    participant Browser
    participant Web as web (React)
    participant SDK as sdk (openapi-fetch)
    participant API as api (NestJS)
    participant DB as PostgreSQL

    Browser->>Web: User navigates to a page
    Web->>SDK: apiClient.GET('/api/clubs')
    SDK->>API: GET /api/clubs\nAuthorization: Bearer <token>
    API->>API: JwtAuthGuard validates token
    API->>DB: TypeORM query
    DB-->>API: rows
    API-->>SDK: 200 JSON response
    SDK-->>Web: { data, error }
    Web-->>Browser: Render result
```

_This diagram is static — update it if the transport layer changes (new auth scheme, BFF, etc.)._
