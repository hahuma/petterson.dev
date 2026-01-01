# petterson.dev

Personal portfolio and blog platform.

## Structure

```
petterson.dev/
├── apps/
│   ├── portfolio/        # Next.js portfolio website
│   │   └── src/
│   │       ├── app/          # Pages
│   │       ├── components/   # UI components
│   │       ├── hooks/        # React hooks
│   │       └── lib/          # Utilities
│   │
│   └── blog/             # Payload CMS
│       └── src/
│           ├── collections/  # Content types
│           └── globals/      # Site settings
│
├── docker-compose.yml        # Production
├── docker-compose.dev.yml    # Development
└── Caddyfile                 # Reverse proxy
```

## Tech Stack

- **Portfolio**: Next.js 15, React 19, Tailwind CSS
- **Blog**: Payload CMS 3, PostgreSQL
- **Proxy**: Caddy (auto SSL)

## Development

### Setup

```bash
cp .env.example .env
```

### Run

```bash
docker compose -f docker-compose.dev.yml up --build
```

| Service | URL |
|---------|-----|
| Portfolio | http://localhost:3000 |
| Blog Admin | http://localhost:3001/admin |

Hot reload is enabled - changes to `src/` are reflected immediately.

### Stop

```bash
docker compose -f docker-compose.dev.yml down
```

## Production

### Deploy

```bash
docker compose up -d --build
```

### Services

| Service | Container | Description |
|---------|-----------|-------------|
| Caddy | caddy-proxy | Reverse proxy, SSL |
| Portfolio | petterson-portfolio | Main website |
| Blog | petterson-blog | Payload CMS |
| Database | petterson-db | PostgreSQL |

### Commands

```bash
# Logs
docker compose logs -f

# Rebuild
docker compose up -d --build

# Stop
docker compose down
```

## Environment

```env
DATABASE_URI=postgresql://blog:blog@db:5432/blog
POSTGRES_USER=blog
POSTGRES_PASSWORD=blog
POSTGRES_DB=blog
PAYLOAD_SECRET=your-secret-key
```

Generate secret: `openssl rand -base64 32`
