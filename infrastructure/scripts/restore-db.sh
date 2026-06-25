#!/usr/bin/env bash
# ============================================================================
# PostgreSQL Database Restore
# ============================================================================
# Usage: ./restore-db.sh <backup_file.dump>
#
# WARNING: This drops and recreates the target database.
# Run against a fresh/test instance before restoring production.
# ============================================================================
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <backup_file.dump>"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "Error: Backup file not found: ${BACKUP_FILE}"
  exit 1
fi

echo "[$(date)] Restoring from ${BACKUP_FILE}..."

pg_restore \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  --dbname="${PGDATABASE:-asahome}" \
  "${BACKUP_FILE}"

echo "[$(date)] Restore complete."
