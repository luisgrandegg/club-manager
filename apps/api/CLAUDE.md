# API — NestJS

## Stack

- **NestJS 10** with Express adapter
- **@nestjs/swagger** for OpenAPI 3.0 spec generation
- **class-validator + class-transformer** for DTO validation
- **TypeScript strict mode**

## OpenAPI / Swagger

Every endpoint **must** have full Swagger decorators:

```typescript
@ApiOperation({ summary: 'Brief description' })
@ApiResponse({ status: 200, type: ResponseDto })
@ApiResponse({ status: 404, description: 'Not found' })
```

DTOs **must** use `@ApiProperty()` on every field — this drives the auto-generated SDK.

After adding or modifying any endpoint, regenerate the spec:
```bash
pnpm --filter @club-manager/api build:openapi
# then regenerate the SDK:
pnpm --filter @club-manager/sdk generate
```

The `openapi.json` at the root of this workspace **is committed** to source control.

## Conventions

- **Module per resource** — one folder per domain entity (e.g., `clubs/`, `members/`).
- **File naming**: `<name>.controller.ts`, `<name>.service.ts`, `<name>.module.ts`.
- **DTOs in `dto/`**: `create-<name>.dto.ts`, `update-<name>.dto.ts`.
- **Entities in `entities/`**: represent the domain model (not ORM-specific).
- All routes are prefixed with `/api` (set in `main.ts`).
- Use `@nestjs/common` HTTP exceptions (`NotFoundException`, `BadRequestException`, etc.).
- **No business logic in controllers** — controllers delegate to services.

## Validation

Enable global `ValidationPipe` with `whitelist: true, forbidNonWhitelisted: true`.

## Authentication (future)

Use `@UseGuards(JwtAuthGuard)` on protected routes. Do not mix auth concerns into services.

## Testing

- Unit tests: `*.spec.ts` alongside the source file.
- E2e tests: `test/` directory.
- Run: `pnpm --filter @club-manager/api test`
