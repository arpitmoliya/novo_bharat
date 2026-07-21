# NovoBharat Admin Panel

Admin panel for managing the NovoBharat chemical catalog.

- **Frontend** — `frontend/admin/` — Next.js 16 + React 19 + Tailwind v4 (TailAdmin template), served under `/admin`
- **Backend** — `backend/` — NestJS REST API + TypeORM
- **Database** — MySQL 8
- **Infra** — Docker Compose (`docker-compose.yml` at the repo root)

Repository layout:

```
novobharat/
  frontend/
    admin/        # this admin panel (Next.js, basePath /admin)
    # web/        # future public site (when the static HTML is converted to Next.js)
  backend/        # shared NestJS API
  docker-compose.yml, .env
  index.html, …   # current static company website
```

The public static company website at the repository root is **not** part of this
stack and is left untouched.

## What you can manage (v1)

- **Products** — name, category, CAS number, GMP status, regulatory status, packing, description, image URL, active flag
- **Categories** — therapeutic categories (name, slug, description)
- **Brochures** — title, PDF file URL, description, active flag (downloadable catalogues/brochures)
- **Auth** — JWT login, seeded admin user

## Quick start (Docker)

Docker Compose lives at the **repository root** (`../docker-compose.yml`) so it can
orchestrate the shared API, the admin panel, and the public website (added later)
together. Run it from the root:

```bash
# from the repo root
cp .env.example .env        # edit secrets/credentials
docker compose up --build
```

- Admin panel: http://localhost:3000/admin
- Login: http://localhost:3000/admin/login
- API: http://localhost:3003/api
- API docs (Swagger): http://localhost:3003/api/docs

> The panel is served under `/admin` (Next.js `basePath`). The root `/` is intentionally
> unused (404) and reserved for the future public site.

Compose services: `db` (MySQL), `backend` (shared NestJS API), `admin` (this panel).
A commented `web` slot is reserved for the future public Next.js site.

On first boot the backend seeds the admin user plus the categories and products that
were previously hard-coded in `products.html`.

Log in with the seeded credentials (defaults `admin@novobharat.com` / `changeme123`,
override via `.env`).

## Local development (without Docker)

You need a running MySQL instance and Node.js 20+.

### Backend

```bash
cd backend
cp .env.example .env        # point DB_* at your MySQL
npm install
npm run seed                # create admin user + seed data
npm run start:dev           # http://localhost:3003/api
```

### Frontend

```bash
cd frontend/admin
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:3003/api
npm install
npm run dev                 # http://localhost:3000/admin
```

## API overview

| Method | Path                  | Auth | Description                |
|--------|-----------------------|------|----------------------------|
| POST   | `/api/auth/login`     | —    | Email + password → JWT     |
| GET    | `/api/auth/me`        | JWT  | Current user               |
| GET    | `/api/categories`     | —    | List categories            |
| POST   | `/api/categories`     | JWT  | Create category            |
| PATCH  | `/api/categories/:id` | JWT  | Update category            |
| DELETE | `/api/categories/:id` | JWT  | Delete category            |
| GET    | `/api/products`       | —    | List products (search/paginate) |
| POST   | `/api/products`       | JWT  | Create product             |
| PATCH  | `/api/products/:id`   | JWT  | Update product             |
| DELETE | `/api/products/:id`   | JWT  | Delete product             |
| GET    | `/api/brochures`      | —    | List brochures             |
| POST   | `/api/brochures`      | JWT  | Create brochure            |
| PATCH  | `/api/brochures/:id`  | JWT  | Update brochure            |
| DELETE | `/api/brochures/:id`  | JWT  | Delete brochure            |
| GET    | `/api/users`          | JWT  | List admin users           |
| POST   | `/api/users`          | JWT  | Create admin user          |

## Notes

- TypeORM runs with `synchronize: true` for convenience (schema auto-created from
  entities). Switch to migrations before production.
- Read endpoints for products/categories are public so the static website can consume
  them later; all writes require a valid JWT.
- Product images use a URL field for now — file upload/storage is a future addition.
