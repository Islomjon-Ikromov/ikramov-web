# ikramov.uz

Production web app for ikramov.uz — built on Next.js (App Router) + Tailwind + Neon Postgres, deployed on Vercel.

> **Repo**: https://github.com/Islomjon-Ikromov/ikramov-web
> **Live URL**: _to be added after Vercel project link_

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Database**: Neon Postgres (serverless) via Drizzle ORM
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **CI**: GitHub Actions (lint, format check, type check, build)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL from Neon dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

```bash
npm run db:generate   # generate migration SQL from schema changes
npm run db:migrate    # apply migrations to Neon Postgres
npm run db:studio     # open Drizzle Studio (local GUI)
```

Schema lives in `src/db/schema.ts`. Migrations go in `src/db/migrations/`.

## Environment variables

| Variable       | Description                            |
| -------------- | -------------------------------------- |
| `DATABASE_URL` | Neon Postgres connection string (full) |

Set `DATABASE_URL` in Vercel → Project Settings → Environment Variables for production and preview branches.
