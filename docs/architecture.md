# Club Manager — Architecture Diagrams

> Auto-generated on **2026-03-21** by `scripts/update-architecture.mjs`.
> Do not edit manually — run `node scripts/update-architecture.mjs`, or just commit (the pre-commit hook handles it).

Five diagrams — C4 Levels 2 and 3 for structure, plus operational views for routes and data.

---

## 1. C4 Container Diagram

Deployable units, shared libraries, and user personas. _(C4 Level 2)_

```mermaid
C4Container

    Person(member, "Member", "Logged-in club member")
    Person(visitor, "Visitor", "Public site visitor")

    System_Boundary(cm, "Club Manager") {
        Container(api, "@club-manager/api", "NestJS 10, TypeORM", "REST API · JWT auth · OpenAPI · :3001")
        Container(site, "@club-manager/site", "Next.js 15", "Public marketing site · :3002")
        Container(web, "@club-manager/web", "React 19, Vite", "Members dashboard SPA · :3000")
        Container(design_system, "@club-manager/design-system", "React, tsup", "Shared UI component library")
        Container(sdk, "@club-manager/sdk", "openapi-fetch", "Auto-generated API client library")
    }

    ContainerDb(db, "PostgreSQL", "Database", "users · clubs · memberships")

    Rel(site, design_system, "Uses")
    Rel(web, design_system, "Uses")
    Rel(web, sdk, "Uses")
    Rel(api, db, "Reads/Writes", "TypeORM/SQL")
    Rel_Back(sdk, api, "Generated from", "openapi.json")
    Rel(member, web, "Uses", "HTTPS")
    Rel(visitor, site, "Browses", "HTTPS")
```

**Key rule:** `sdk` is auto-generated from `api/openapi.json` — never edit `packages/sdk/src/schema.ts` by hand.
Regenerate with: `pnpm generate:sdk`

---

## 2. C4 Component Diagram — API

Internal NestJS modules and their dependencies. _(C4 Level 3)_

```mermaid
C4Component

    Container_Boundary(api, "api — NestJS REST API") {
        Component(AppModule, "AppModule", "NestJS", "Root module · global JWT guard")
        Component(AuthModule, "AuthModule", "NestJS, Passport, JWT", "Authentication & token management")
        Component(ClubsModule, "ClubsModule", "NestJS, TypeORM", "Club CRUD operations")
        Component(MembersModule, "MembersModule", "NestJS, TypeORM", "Club membership management")
        Component(UsersModule, "UsersModule", "NestJS, TypeORM", "User account management")
    }

    ContainerDb(db, "PostgreSQL", "Database", "users · clubs · memberships")

    Rel(AppModule, AuthModule, "imports")
    Rel(AppModule, ClubsModule, "imports")
    Rel(AppModule, MembersModule, "imports")
    Rel(AppModule, UsersModule, "imports")
    Rel(AuthModule, UsersModule, "imports")
    Rel(MembersModule, ClubsModule, "imports")
    Rel(ClubsModule, db, "reads/writes")
    Rel(MembersModule, db, "reads/writes")
    Rel(UsersModule, db, "reads/writes")
```

_Sourced from `apps/api/src/*.module.ts` files._

---

## 3. API Route Map

All REST endpoints. 🔒 = requires `Authorization: Bearer <token>`.

```mermaid
graph LR
    subgraph Public
        N1["GET /api/health"]
        N2["POST /api/auth/register"]
        N3["POST /api/auth/login"]
        N4["POST /api/auth/refresh"]
        N5["GET /api/clubs"]
        N7["GET /api/clubs/{id}"]
    end
    subgraph clubs["Clubs 🔒"]
        N6["POST /api/clubs"]
        N8["PATCH /api/clubs/{id}"]
        N9["DELETE /api/clubs/{id}"]
    end
    subgraph members["Members 🔒"]
        N10["GET /api/clubs/{clubId}/members"]
        N11["POST /api/clubs/{clubId}/members/join"]
        N12["DELETE /api/clubs/{clubId}/members/leave"]
    end
```

_12 endpoint(s) sourced from `apps/api/openapi.json`. Run `pnpm generate:sdk` after changing endpoints._

Controllers live in `apps/api/src/{auth,clubs,members}/`.
Swagger UI at `http://localhost:3001/api/docs` during development.

---

## 4. Entity-Relationship Diagram

Database models managed by TypeORM. _(C4 Level 4 / Code)_

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

## 5. Request Data-Flow

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
