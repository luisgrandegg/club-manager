#!/usr/bin/env node
// scripts/update-architecture.mjs
//
// Regenerates docs/architecture.md from actual source files.
// Sources:
//   apps/api/openapi.json           -> API route map
//   apps + packages / package.json  -> workspace dependency graph
//   apps/api/src entities/*.ts      -> ER diagram
//
// Run:  node scripts/update-architecture.mjs
// Hook: runs automatically on pre-commit (via simple-git-hooks)

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function readText(path) {
  return readFileSync(path, 'utf-8');
}

/** Recursively find files matching a regex under dir, skipping node_modules/dist/. */
function findFiles(dir, pattern) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      results.push(...findFiles(full, pattern));
    } else if (entry.isFile() && pattern.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** List immediate sub-directories that contain a package.json. */
function workspaceDirs(group) {
  const base = join(ROOT, group);
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => join(base, e.name))
    .filter(d => existsSync(join(d, 'package.json')));
}

// Static metadata (tech stack + descriptions) for known workspace packages.
// Add a new entry here whenever a new app or package joins the monorepo.
const CONTAINER_META = {
  '@club-manager/api':           { tech: 'NestJS 10, TypeORM',  descr: 'REST API · JWT auth · OpenAPI · :3001' },
  '@club-manager/web':           { tech: 'React 19, Vite',      descr: 'Members dashboard SPA · :3000' },
  '@club-manager/site':          { tech: 'Next.js 15',          descr: 'Public marketing site · :3002' },
  '@club-manager/sdk':           { tech: 'openapi-fetch',       descr: 'Auto-generated API client library' },
  '@club-manager/design-system': { tech: 'React, tsup',         descr: 'Shared UI component library' },
};

const MODULE_META = {
  AppModule:     { tech: 'NestJS',              descr: 'Root module · global JWT guard' },
  AuthModule:    { tech: 'NestJS, Passport, JWT', descr: 'Authentication & token management' },
  ClubsModule:   { tech: 'NestJS, TypeORM',     descr: 'Club CRUD operations' },
  MembersModule: { tech: 'NestJS, TypeORM',     descr: 'Club membership management' },
  UsersModule:   { tech: 'NestJS, TypeORM',     descr: 'User account management' },
};

// ─── 1. C4 Container Diagram ──────────────────────────────────────────────────

function buildC4Container() {
  const allDirs = [...workspaceDirs('apps'), ...workspaceDirs('packages')];

  const containers = allDirs.map(dir => {
    const pkg = readJson(join(dir, 'package.json'));
    const name = pkg.name;
    const alias = name.replace('@club-manager/', '').replace(/-/g, '_');
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
    const internalDeps = Object.keys(allDeps).filter(d => d.startsWith('@club-manager/'));
    const { tech = '', descr = '' } = CONTAINER_META[name] ?? {};
    return { name, alias, internalDeps, tech, descr };
  });

  const byAlias = Object.fromEntries(containers.map(c => [c.name, c.alias]));

  const lines = ['```mermaid', 'C4Container'];
  lines.push('');
  lines.push('    Person(member, "Member", "Logged-in club member")');
  lines.push('    Person(visitor, "Visitor", "Public site visitor")');
  lines.push('');
  lines.push('    System_Boundary(cm, "Club Manager") {');
  for (const { alias, name, tech, descr } of containers) {
    lines.push(`        Container(${alias}, "${name}", "${tech}", "${descr}")`);
  }
  lines.push('    }');
  lines.push('');
  lines.push('    ContainerDb(db, "PostgreSQL", "Database", "users · clubs · memberships")');
  lines.push('');

  // Workspace dependency edges
  for (const { alias, internalDeps } of containers) {
    for (const dep of internalDeps) {
      if (byAlias[dep]) lines.push(`    Rel(${alias}, ${byAlias[dep]}, "Uses")`);
    }
  }

  // api → db (runtime) and api → sdk (generates)
  if (byAlias['@club-manager/api']) {
    lines.push('    Rel(api, db, "Reads/Writes", "TypeORM/SQL")');
  }
  if (byAlias['@club-manager/api'] && byAlias['@club-manager/sdk']) {
    lines.push('    Rel_Back(sdk, api, "Generated from", "openapi.json")');
  }

  // Personas → front-ends
  if (byAlias['@club-manager/web'])  lines.push('    Rel(member, web, "Uses", "HTTPS")');
  if (byAlias['@club-manager/site']) lines.push('    Rel(visitor, site, "Browses", "HTTPS")');

  lines.push('```');
  return lines.join('\n');
}

// ─── 2. C4 Component Diagram (NestJS API) ────────────────────────────────────

function buildC4ApiComponents() {
  const moduleFiles = findFiles(join(ROOT, 'apps/api/src'), /\.module\.ts$/);
  if (moduleFiles.length === 0) return '_No `*.module.ts` files found in `apps/api/src`._';

  const modules = moduleFiles.map(filePath => {
    const src = readText(filePath);
    const classMatch = src.match(/export class (\w+)/);
    if (!classMatch) return null;
    const className = classMatch[1];

    // Collect imported sibling modules via relative import statements
    const internalImports = [...src.matchAll(/import\s*\{([^}]+)\}\s*from\s*'\.+\/[^']+\.module'/g)]
      .flatMap(m => m[1].split(',').map(s => s.trim()))
      .filter(s => s.endsWith('Module'));

    const usesDb = /TypeOrmModule\.forFeature/.test(src);
    const { tech = 'NestJS', descr = className } = MODULE_META[className] ?? {};
    return { className, internalImports, usesDb, tech, descr };
  }).filter(Boolean);

  const moduleNames = new Set(modules.map(m => m.className));

  const lines = ['```mermaid', 'C4Component'];
  lines.push('');
  lines.push('    Container_Boundary(api, "api — NestJS REST API") {');
  for (const { className, tech, descr } of modules) {
    lines.push(`        Component(${className}, "${className}", "${tech}", "${descr}")`);
  }
  lines.push('    }');
  lines.push('');
  lines.push('    ContainerDb(db, "PostgreSQL", "Database", "users · clubs · memberships")');
  lines.push('');

  // Inter-module dependencies
  for (const { className, internalImports } of modules) {
    for (const imp of internalImports) {
      if (moduleNames.has(imp)) lines.push(`    Rel(${className}, ${imp}, "imports")`);
    }
  }

  // Modules with direct DB access
  for (const { className, usesDb } of modules) {
    if (usesDb) lines.push(`    Rel(${className}, db, "reads/writes")`);
  }

  lines.push('```');
  lines.push('');
  lines.push('_Sourced from `apps/api/src/*.module.ts` files._');
  return lines.join('\n');
}

// ─── 3. API Route Map ─────────────────────────────────────────────────────────

function buildApiRouteMap() {
  const openApiPath = join(ROOT, 'apps/api/openapi.json');
  if (!existsSync(openApiPath)) {
    return `_\`apps/api/openapi.json\` not found — run \`pnpm --filter @club-manager/api build:openapi\` first._`;
  }

  const spec = readJson(openApiPath);
  const paths = spec.paths ?? {};

  // Collect routes grouped by auth + tag
  const publicRoutes = [];
  const protectedByTag = {}; // tag → [{ id, label }]
  let counter = 0;

  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
      const protected_ = Array.isArray(op.security) && op.security.length > 0;
      const tag = (op.tags?.[0] ?? 'other').toLowerCase();
      const id = `N${++counter}`;
      const label = `"${method.toUpperCase()} ${path}"`;

      if (!protected_) {
        publicRoutes.push({ id, label });
      } else {
        if (!protectedByTag[tag]) protectedByTag[tag] = [];
        protectedByTag[tag].push({ id, label });
      }
    }
  }

  const totalRoutes = publicRoutes.length + Object.values(protectedByTag).flat().length;
  const lines = ['```mermaid', 'graph LR'];

  if (publicRoutes.length > 0) {
    lines.push('    subgraph Public');
    for (const { id, label } of publicRoutes) {
      lines.push(`        ${id}[${label}]`);
    }
    lines.push('    end');
  }

  for (const [tag, routes] of Object.entries(protectedByTag)) {
    const subgraphLabel = `${tag.charAt(0).toUpperCase() + tag.slice(1)} 🔒`;
    lines.push(`    subgraph ${tag}["${subgraphLabel}"]`);
    for (const { id, label } of routes) {
      lines.push(`        ${id}[${label}]`);
    }
    lines.push('    end');
  }

  lines.push('```');
  lines.push('');
  lines.push(
    `_${totalRoutes} endpoint(s) sourced from \`apps/api/openapi.json\`. Run \`pnpm generate:sdk\` after changing endpoints._`,
  );
  return lines.join('\n');
}

// ─── 4. ER Diagram ────────────────────────────────────────────────────────────

function normalizeTsType(raw) {
  const base = raw.replace(/\s*\|.*/, '').trim(); // strip "| null", "| undefined"
  if (base === 'Date') return 'datetime';
  if (base === 'number') return 'number';
  if (base === 'boolean') return 'boolean';
  return 'string';
}

function parseEntity(filePath) {
  const src = readText(filePath);

  const classMatch = src.match(/export class (\w+)/);
  if (!classMatch) return null;
  const className = classMatch[1];

  const lines = src.split('\n');
  const columns = []; // { name, type, key }
  const relations = []; // { target }
  let decorators = [];

  for (const line of lines) {
    const t = line.trim();

    if (t.startsWith('@')) {
      decorators.push(t);
      continue;
    }

    // Field declaration: "name: Type;" or "name?: Type;"
    const field = t.match(/^(\w+)\??\s*:\s*(.+?);/);
    if (field && decorators.length > 0) {
      const [, name, rawType] = field;
      const type = normalizeTsType(rawType);

      const isPK = decorators.some(d => /^@PrimaryGeneratedColumn/.test(d));
      const isCol = decorators.some(d => /^@(Column|CreateDateColumn)/.test(d));
      const isManyToOne = decorators.some(d => /^@ManyToOne/.test(d));

      if (isPK) {
        columns.push({ name, type, key: 'PK' });
      } else if (isCol) {
        const isUnique = decorators.some(d => d.includes('unique: true'));
        columns.push({ name, type, key: isUnique ? 'UK' : '' });
      } else if (isManyToOne) {
        const dec = decorators.find(d => /^@ManyToOne/.test(d));
        const targetMatch = dec?.match(/@ManyToOne\(\(\)\s*=>\s*(\w+)/);
        if (targetMatch) relations.push({ target: targetMatch[1] });
      }

      decorators = [];
    } else if (!t.startsWith('@')) {
      decorators = [];
    }
  }

  return { className, columns, relations };
}

function buildErDiagram() {
  const entityFiles = findFiles(join(ROOT, 'apps/api/src'), /\.entity\.ts$/);
  if (entityFiles.length === 0) {
    return '_No `*.entity.ts` files found in `apps/api/src`._';
  }

  const entities = entityFiles.map(parseEntity).filter(Boolean);
  const knownEntities = new Set(entities.map(e => e.className));

  const lines = ['```mermaid', 'erDiagram'];

  for (const { className, columns } of entities) {
    lines.push(`    ${className} {`);
    for (const col of columns) {
      const suffix = col.key ? ` ${col.key}` : '';
      lines.push(`        ${col.type} ${col.name}${suffix}`);
    }
    lines.push('    }');
    lines.push('');
  }

  // ManyToOne on A → B means B has many A: B ||--o{ A
  for (const { className, relations } of entities) {
    for (const { target } of relations) {
      if (knownEntities.has(target)) {
        lines.push(`    ${target} ||--o{ ${className} : " "`);
      }
    }
  }

  lines.push('```');
  lines.push('');
  lines.push('_Sourced from `apps/api/src/**/entities/*.ts`._');
  return lines.join('\n');
}

// ─── 5. Static Data-Flow ─────────────────────────────────────────────────────

const DATA_FLOW = `\`\`\`mermaid
sequenceDiagram
    participant Browser
    participant Web as web (React)
    participant SDK as sdk (openapi-fetch)
    participant API as api (NestJS)
    participant DB as PostgreSQL

    Browser->>Web: User navigates to a page
    Web->>SDK: apiClient.GET('/api/clubs')
    SDK->>API: GET /api/clubs\\nAuthorization: Bearer <token>
    API->>API: JwtAuthGuard validates token
    API->>DB: TypeORM query
    DB-->>API: rows
    API-->>SDK: 200 JSON response
    SDK-->>Web: { data, error }
    Web-->>Browser: Render result
\`\`\`

_This diagram is static — update it if the transport layer changes (new auth scheme, BFF, etc.)._`;

// ─── Assemble & Write ─────────────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);

const doc = `# Club Manager — Architecture Diagrams

> Auto-generated on **${today}** by \`scripts/update-architecture.mjs\`.
> Do not edit manually — run \`node scripts/update-architecture.mjs\`, or just commit (the pre-commit hook handles it).

Five diagrams — C4 Levels 2 and 3 for structure, plus operational views for routes and data.

---

## 1. C4 Container Diagram

Deployable units, shared libraries, and user personas. _(C4 Level 2)_

${buildC4Container()}

**Key rule:** \`sdk\` is auto-generated from \`api/openapi.json\` — never edit \`packages/sdk/src/schema.ts\` by hand.
Regenerate with: \`pnpm generate:sdk\`

---

## 2. C4 Component Diagram — API

Internal NestJS modules and their dependencies. _(C4 Level 3)_

${buildC4ApiComponents()}

---

## 3. API Route Map

All REST endpoints. 🔒 = requires \`Authorization: Bearer <token>\`.

${buildApiRouteMap()}

Controllers live in \`apps/api/src/{auth,clubs,members}/\`.
Swagger UI at \`http://localhost:3001/api/docs\` during development.

---

## 4. Entity-Relationship Diagram

Database models managed by TypeORM. _(C4 Level 4 / Code)_

${buildErDiagram()}

---

## 5. Request Data-Flow

End-to-end journey of a protected API call.

${DATA_FLOW}
`;

const outPath = join(ROOT, 'docs/architecture.md');
writeFileSync(outPath, doc, 'utf-8');
console.log(`✓  docs/architecture.md updated (${today})`);
