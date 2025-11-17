This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication

Google sign-in is available for users. Configure these environment variables before running the app locally or deploying:

```
GOOGLE_CLIENT_ID=<your Google OAuth client ID>
GOOGLE_CLIENT_SECRET=<your Google OAuth client secret>
AUTH_SECRET=<random string for signing session cookies>
# Optional: set when the public URL is not http://localhost:3000
AUTH_BASE_URL=https://your-domain.example
```

After the variables are set and Google OAuth redirect URIs include `AUTH_BASE_URL/api/auth/callback`, users can sign in with Google from the landing page header. A POST to `/api/auth/logout` clears the session cookie.

## Supabase (user store)

Supabase is used to persist authenticated users while keeping Google as the identity provider. Configure these server-side variables (Vercel sets them when the Supabase integration is enabled):

```
SUPABASE_URL=<project API URL>
SUPABASE_SERVICE_ROLE_KEY=<service role key used only on the server>
```

Expected table schema in Supabase Postgres (schema name `user`):

```
id text primary key
role text not null
name text null
email text null
picture text null
```

Ensure row-level security policies allow the service role to insert/update rows (the service role bypasses RLS by default). The login callback upserts a row keyed by `id` using the Google profile data and `DEFAULT_SIGN_UP_ROLE`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
