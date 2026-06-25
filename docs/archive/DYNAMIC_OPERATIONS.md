# Operations

## Deployment

1. Set up environment variables (copy `.env.example` to `.env`)
2. `docker compose -f infrastructure/compose/docker-compose.prod.yml up -d`
3. Verify health: `curl http://localhost/health/live`

## Backup

See `infrastructure/backup/README.md` for the backup runbook.

## Recovery

1. Restore database: `bash infrastructure/scripts/restore-db.sh <backup.dump>`
2. Restore files: extract the latest file backup to the Directus uploads directory
3. Start services
4. Verify the site loads and CMS is accessible

## Monitoring

Each service exposes:
- `GET /health/live` — liveness (process running)
- `GET /health/ready` — readiness (can accept requests)

## Infrastructure Checklist

- [ ] ICP 备案 (required before public launch in mainland China)
- [ ] TLS certificates configured in Nginx
- [ ] Database backups scheduled (cron or systemd timer)
- [ ] Recovery drill completed
- [ ] Admin subdomain IP-restricted (recommended)
