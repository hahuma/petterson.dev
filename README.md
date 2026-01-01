# petterson.dev

Personal portfolio and blog platform built with Next.js and Payload CMS.

## Repository Structure

```
petterson.dev/
├── apps/
│   ├── portfolio/        # Main portfolio website
│   │   ├── src/
│   │   │   ├── app/      # Next.js App Router pages
│   │   │   ├── components/
│   │   │   │   ├── ui/       # Reusable primitives
│   │   │   │   ├── home/     # Homepage sections
│   │   │   │   ├── blog/     # Blog components
│   │   │   │   └── layout/   # Nav, Footer
│   │   │   ├── hooks/    # React hooks
│   │   │   ├── lib/      # Utilities
│   │   │   └── data/     # Static data
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── blog/             # Payload CMS (headless)
│       ├── src/
│       │   ├── app/          # Payload admin routes
│       │   ├── collections/  # Content types
│       │   └── globals/      # Site settings
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml    # All services
├── Caddyfile             # Reverse proxy
└── .github/workflows/    # CI/CD
```

## Tech Stack

| App | Stack |
|-----|-------|
| Portfolio | Next.js 15, React 19, Tailwind CSS |
| Blog CMS | Payload CMS 3, Next.js, PostgreSQL |
| Proxy | Caddy (auto SSL) |
| Database | PostgreSQL 16 |

## Development

### Prerequisites

- Node.js 22+
- pnpm (for portfolio) / npm (for blog)
- Docker & Docker Compose

### Portfolio

```bash
cd apps/portfolio
pnpm install
pnpm dev
```

Runs on http://localhost:3000

### Blog (Payload CMS)

```bash
# Start PostgreSQL
docker compose up db -d

# Run Payload
cd apps/blog
npm install
npm run dev
```

Runs on http://localhost:3001

Admin panel: http://localhost:3001/admin

### Environment Variables

Create `.env` in the root directory:

```env
# Database
DATABASE_URI=postgresql://blog:blog@db:5432/blog
POSTGRES_USER=blog
POSTGRES_PASSWORD=blog
POSTGRES_DB=blog

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

## Deployment

### Architecture

```
                    ┌─────────────────┐
                    │     Caddy       │
                    │  :80 / :443     │
                    └────────┬────────┘
                             │
         ┌───────────────────┴───────────────────┐
         │                                       │
         ▼                                       ▼
┌─────────────────┐                   ┌─────────────────┐
│    portfolio    │                   │      blog       │
│  petterson.dev  │                   │ blog.petterson  │
│     :3000       │                   │     :3000       │
└─────────────────┘                   └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │   PostgreSQL    │
                                      │     :5432       │
                                      └─────────────────┘
```

### Deploy to VPS

Deployment is automated via GitHub Actions on push to `main`.

**Manual deployment:**

```bash
ssh user@your-vps
cd ~/petterson.dev
git pull origin main
docker compose up -d --build
docker image prune -f
```

### First-time VPS Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:hahuma/petterson.dev.git ~/petterson.dev
   cd ~/petterson.dev
   ```

2. Create `.env` file with production values

3. Start all services:
   ```bash
   docker compose up -d --build
   ```

4. Configure DNS:
   - `petterson.dev` → VPS IP
   - `blog.petterson.dev` → VPS IP

Caddy automatically provisions SSL certificates.

### GitHub Actions Secrets

Configure these secrets in the repository settings:

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | VPS IP address or hostname |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key |
| `VPS_PORT` | SSH port (usually 22) |

## Docker Services

| Service | Container | Ports | Description |
|---------|-----------|-------|-------------|
| `caddy` | caddy-proxy | 80, 443 | Reverse proxy with auto SSL |
| `portfolio` | petterson-portfolio | 3000 (internal) | Portfolio website |
| `blog` | petterson-blog | 3000 (internal) | Payload CMS |
| `db` | petterson-db | 5432 (internal) | PostgreSQL database |

### Useful Commands

```bash
# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f portfolio

# Restart a service
docker compose restart blog

# Rebuild and restart
docker compose up -d --build blog

# Access database
docker compose exec db psql -U blog -d blog

# Stop all services
docker compose down

# Stop and remove volumes (deletes data)
docker compose down -v
```

## License

MIT
