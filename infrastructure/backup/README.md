# Backup & Restore Runbook

## Backup Schedule

| Resource | Frequency | Retention |
|----------|-----------|-----------|
| PostgreSQL | Daily | 7 days |
| CMS Files | Weekly | 4 weeks |
| Configuration | Git-managed | Permanent |
| Secrets | Manual secure backup | Permanent |

## Database Backup

```bash
# Set environment
export PGHOST=localhost
export PGUSER=asahome
export PGDATABASE=asahome
export PGPASSWORD=your_password

# Run backup
bash infrastructure/scripts/backup-db.sh ./backups
```

## Database Restore

```bash
# Restore latest backup
bash infrastructure/scripts/restore-db.sh ./backups/asahome-YYYYMMDDTHHMMSSZ.dump
```

## File Backup

```bash
export DIRECTUS_UPLOADS_DIR=/path/to/directus/uploads
bash infrastructure/scripts/backup-files.sh ./backups
```

## Recovery Drill (quarterly)

1. Provision a clean test environment
2. Restore latest database backup
3. Restore latest file backup
4. Start services and verify:
   - CMS admin is accessible
   - Blog posts render on the site
   - Media/files display correctly
5. Document any issues

## RPO / RTO

- **RPO**: 24 hours (daily backups)
- **RTO**: 4 hours (restore + verify)

Adjust targets based on actual recovery drill results.
