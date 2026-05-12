#!/usr/bin/env bash
set -euo pipefail

max_history_blob_bytes="${MAX_HISTORY_BLOB_BYTES:-15728640}"
warning_history_blob_bytes="${WARNING_HISTORY_BLOB_BYTES:-12582912}"
badge_path="${BADGE_PATH:-tmp/master-payload-size.json}"

history_blob_bytes="$(
  git rev-list --objects HEAD |
    cut -d' ' -f1 |
    sort -u |
    git cat-file --batch-check='%(objecttype) %(objectsize)' |
    awk '$1 == "blob" { sum += $2 } END { print sum + 0 }'
)"

history_mib="$(awk -v bytes="$history_blob_bytes" 'BEGIN { printf "%.1f MiB", bytes / 1048576 }')"

if [ "$history_blob_bytes" -gt "$max_history_blob_bytes" ]; then
  color="red"
elif [ "$history_blob_bytes" -gt "$warning_history_blob_bytes" ]; then
  color="yellow"
else
  color="brightgreen"
fi

mkdir -p "$(dirname "$badge_path")"
cat > "$badge_path" <<EOF
{
  "schemaVersion": 1,
  "label": "master payload",
  "message": "$history_mib",
  "color": "$color"
}
EOF
