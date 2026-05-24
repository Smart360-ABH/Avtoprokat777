# Автопрокат 777

Сайт премиального автопроката в Абхазии с каталогом автомобилей, фильтрацией, формой заявки, блоком филиалов, отзывами и FAQ.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/autopro777 run dev` — run the frontend (port 19846)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter, React Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — DB schema: cars, bookings, reviews, branches
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/autopro777/src/` — Frontend React app
- `artifacts/autopro777/src/components/` — All page sections/components
- `artifacts/autopro777/src/assets/` — Car images (AI-generated)

## Architecture decisions

- Contract-first OpenAPI spec drives both frontend hooks (Orval → React Query) and backend Zod validation
- Frontend is a single-page app with smooth scroll sections (no routing needed)
- Car images are stored as local assets (AI-generated); imageUrl in DB can override per-car
- Booking form submits via the API; no third-party form service needed
- Yandex Maps embedded via iframe (no API key required for basic embed)

## Product

- **Hero** — full-screen Caucasus coastline image, tagline, CTA and phone button
- **Advantages** — 6 advantage cards with icons
- **Popular Cars** — filtered subset (popular=true) from DB
- **Car Catalog** — full catalog with category filter tabs; each card opens a detail modal and booking modal
- **Branches** — 3 cards (Новый Афон, Гагра, Гудаута) with map links + Yandex Maps iframe
- **Rental Terms** — icon + text conditions block on dark background
- **Reviews** — paginated slider with star ratings, loaded from DB
- **Booking Form** — full form (name, phone, car, dates, city, comment, driver toggle) → POST /api/bookings
- **FAQ** — accordion with 8 common questions
- **Footer** — contact info, WhatsApp/Telegram buttons, branch list, navigation

## User preferences

- Language: Russian
- Brand: Автопрокат 777
- Phone: +7 (940) 993-84-97
- Branches: Новый Афон (ул. Харазия), Гагра (ул. Адыгаа), Гудаута (ул. Маргания, 3)

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- Car images resolve by name matching in `CarCard.tsx` — add new entries to `carImages` map when adding new cars
- WhatsApp/Telegram links in `Footer.tsx` use placeholder usernames — update before going live
- Legal info in footer (ИП name, ИНН) needs to be filled in before publishing

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Car data lives in `cars` table — edit via SQL or add an admin UI
- Reviews are in `reviews` table — edit via SQL
