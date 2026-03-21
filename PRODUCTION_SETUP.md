# Production Setup — Club Manager (Free Tier)

## Overview

| App | Platform | URL pattern |
|---|---|---|
| `apps/api` (NestJS) | [Render](https://render.com) free tier | `https://club-manager-api.onrender.com` |
| `apps/web` (React SPA) | [Cloudflare Pages](https://pages.cloudflare.com) free tier | `https://club-manager-web.pages.dev` |
| `apps/site` (Next.js) | [Vercel](https://vercel.com) Hobby free tier | `https://club-manager-site.vercel.app` |
| PostgreSQL | [Neon](https://neon.tech) free tier | serverless Postgres |

> **Free tier trade-offs to be aware of:**
> - Render spins down the API after **15 min of inactivity** (~30 s cold start on first request)
> - Neon also suspends the DB after inactivity — compound cold start on the first request
> - Render free tier: **750 hrs/month** (one service = 720 hrs, just fits)

---

## Prerequisites

- GitHub repository connected to all three platforms
- Node ≥ 20 installed locally (for generating secrets)
- `pnpm` ≥ 9 installed locally

---

## Step 1 — Database (Neon)

1. Sign up at <https://neon.tech> and create a new project named `club-manager`.
2. Neon creates a default `neondb` database. Copy the **connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Save it — you'll need it in Step 2.

**Initialize the schema (first deploy only):**

On the very first deployment, temporarily allow TypeORM to sync the schema by setting `NODE_ENV=development` on Render, letting the API start once, then switching back to `NODE_ENV=production`. From that point on the schema is managed manually.

---

## Step 2 — API (Render)

### Option A — Deploy via Blueprint (recommended, mostly automated)

A `render.yaml` file is already committed to this repo. It defines the API service.

1. Go to <https://dashboard.render.com> → **New → Blueprint**.
2. Connect your GitHub repo — Render will detect `render.yaml` automatically.
3. Set the following **manual secrets** when prompted (these are not in the YAML for security):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | Connection string from Step 1 |
   | `CORS_ORIGIN` | Comma-separated frontend URLs (fill in after Steps 3 & 4, e.g. `https://club-manager-web.pages.dev,https://club-manager-site.vercel.app`) |

   `JWT_SECRET` and `JWT_REFRESH_SECRET` are **auto-generated** by the blueprint — no action needed.

4. Click **Apply** — Render will build and deploy the API.

### Option B — Manual setup

1. **New → Web Service** → connect your GitHub repo.
2. Configure:
   - **Runtime**: Node
   - **Region**: Oregon (or Frankfurt for EU)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank — monorepo root)*
   - **Build Command**:
     ```
     npm install -g pnpm@9 && pnpm install --frozen-lockfile && pnpm --filter '@club-manager/api...' build
     ```
   - **Start Command**:
     ```
     node apps/api/dist/main
     ```
   - **Plan**: Free
3. Under **Environment**, add:

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | *(from Step 1)* |
   | `JWT_SECRET` | *(generate below)* |
   | `JWT_REFRESH_SECRET` | *(generate below)* |
   | `CORS_ORIGIN` | *(frontend URLs — fill in after Steps 3 & 4)* |

   **Generate secrets locally:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Run twice — one value for `JWT_SECRET`, one for `JWT_REFRESH_SECRET`.

4. Click **Create Web Service**.

### First-deploy schema initialization

1. Temporarily change `NODE_ENV` to `development` in the Render env vars → **Save** (triggers redeploy).
2. Wait for the API to start — TypeORM will auto-create all tables.
3. Change `NODE_ENV` back to `production` → **Save**.

From this point, schema changes must be applied manually via TypeORM migrations.

---

## Step 3 — Members Dashboard (Cloudflare Pages)

1. Go to <https://dash.cloudflare.com> → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select your GitHub repo.
3. Configure the build:

   | Setting | Value |
   |---|---|
   | **Framework preset** | None |
   | **Build command** | `npm install -g pnpm@9 && pnpm install --frozen-lockfile && pnpm --filter '@club-manager/web...' build` |
   | **Build output directory** | `apps/web/dist` |
   | **Root directory** | *(leave blank)* |

4. Under **Environment variables** → **Production**, add:

   | Key | Value |
   |---|---|
   | `NODE_VERSION` | `20` |
   | `VITE_API_URL` | Your Render API URL, e.g. `https://club-manager-api.onrender.com` |

5. Click **Save and Deploy**.

> The `apps/web/public/_redirects` file is already committed and handles SPA client-side routing (all paths serve `index.html`).

---

## Step 4 — Public Site (Vercel)

A `apps/site/vercel.json` is already committed with the correct monorepo build config.

1. Go to <https://vercel.com> → **Add New → Project** → import your GitHub repo.
2. Set **Root Directory** to `apps/site`.
3. Vercel detects Next.js automatically. The `vercel.json` overrides install/build commands to handle the monorepo.
4. No additional environment variables needed for a basic deployment. If the site calls the API directly from server components, add:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | Your Render API URL |

5. Click **Deploy**.

---

## Step 5 — Wire Up CORS

Once Steps 3 and 4 are done, you have your frontend URLs. Go back to Render:

1. **Environment → Edit** `CORS_ORIGIN`.
2. Set it to a comma-separated list:
   ```
   https://club-manager-web.pages.dev,https://club-manager-site.vercel.app
   ```
   Replace with your actual URLs (including any custom domains).
3. **Save** — Render redeploys automatically.

---

## Step 6 — Smoke Test

```bash
# Health check
curl https://club-manager-api.onrender.com/api/health

# Swagger docs (should return HTML)
curl -I https://club-manager-api.onrender.com/api/docs
```

Then open the web and site URLs in your browser and verify the flows end-to-end.

---

## Custom Domains (optional)

| Platform | Where |
|---|---|
| Render | Service → **Settings → Custom Domains** |
| Cloudflare Pages | Project → **Custom Domains** (automatic SSL via Cloudflare) |
| Vercel | Project → **Settings → Domains** |

---

## Ongoing Operations

### Deploying changes
All three platforms auto-deploy on push to `main`. No manual action needed.

### Viewing logs
- **Render**: Dashboard → Service → **Logs**
- **Cloudflare Pages**: Project → **Deployments → Functions** (runtime logs)
- **Vercel**: Project → **Deployments → Functions**

### Database access
```bash
# Connect via psql using the Neon connection string
psql "postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Or use the **Neon SQL Editor** in the dashboard for quick queries.

### Schema changes (after initial setup)
TypeORM `synchronize` is **off** in production. For schema changes:
1. Write a TypeORM migration in `apps/api/src/migrations/`.
2. Run it against the Neon DB locally first to verify.
3. Deploy the migration with the next release — add a startup script or run manually via the Render shell.
