#!/usr/bin/env bash
# ============================================================================
# CMS File / Upload Backup
# ============================================================================
# Usage: ./backup-files.sh [backup_dir]
# ============================================================================
set -euo pipefail

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
BACKUP_FILE="${BACKUP_DIR}/asahome-files-${TIMESTAMP}.tar.gz"

# Source directory — adjust to your Directus uploads path
UPLOAD_DIR="${DIRECTUS_UPLOADS_DIR:-./directus/uploads}"

mkdir -p "${BACKUP_DIR}"

if [ ! -d "${UPLOAD_DIR}" ]; then
  echo "Error: Upload directory not found: ${UPLOAD_DIR}"
  exit 1
fi

echo "[$(date)] Starting file backup to ${BACKUP_FILE}..."

tar -czf "${BACKUP_FILE}" -C "$(dirname "${UPLOAD_DIR}")" "$(basename "${UPLOAD_DIR}")"

echo "[$(date)] File backup complete: ${BACKUP_FILE}"

# Retain last 4 weekly backups
find "${BACKUP_DIR}" -name "asahome-files-*.tar.gz" -type f | sort -r | tail -n +5 | xargs -r rm -v

echo "[$(date)] Cleanup complete."
