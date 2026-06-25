#!/usr/bin/env bash
# ============================================================================
# PostgreSQL Database Backup
# ============================================================================
# Usage: ./backup-db.sh [backup_dir]
#
# Requires: pg_dump (postgresql-client)
# Env vars: PGHOST, PGUSER, PGDATABASE, PGPASSWORD (or .pgpass)
# ============================================================================
set -euo pipefail

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
BACKUP_FILE="${BACKUP_DIR}/asahome-${TIMESTAMP}.dump"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting database backup to ${BACKUP_FILE}..."

pg_dump \
  --format=custom \
  --compress=9 \
  --file="${BACKUP_FILE}" \
  "${PGDATABASE:-asahome}"

echo "[$(date)] Backup complete: ${BACKUP_FILE}"

# Retain last 7 daily backups
find "${BACKUP_DIR}" -name "asahome-*.dump" -type f | sort -r | tail -n +8 | xargs -r rm -v

echo "[$(date)] Cleanup complete. $(ls "${BACKUP_DIR}" | wc -l) backups retained."
