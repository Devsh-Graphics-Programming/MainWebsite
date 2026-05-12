#!/usr/bin/env bash
set -euo pipefail

max_blob_bytes="${MAX_BLOB_BYTES:-1048576}"
max_tree_bytes="${MAX_TREE_BYTES:-10485760}"
max_public_bytes="${MAX_PUBLIC_BYTES:-8388608}"
max_history_blob_bytes="${MAX_HISTORY_BLOB_BYTES:-15728640}"

fail=0

format_mib() {
  awk -v bytes="$1" 'BEGIN { printf "%.2f MiB", bytes / 1048576 }'
}

sum_tree_bytes() {
  local tree_path="${1:-}"
  if [ -n "$tree_path" ]; then
    git ls-tree -r -l HEAD -- "$tree_path"
  else
    git ls-tree -r -l HEAD
  fi | awk '{ sum += $4 } END { print sum + 0 }'
}

sum_head_blob_bytes() {
  git rev-list --objects HEAD |
    cut -d' ' -f1 |
    sort -u |
    git cat-file --batch-check='%(objecttype) %(objectsize)' |
    awk '$1 == "blob" { sum += $2 } END { print sum + 0 }'
}

check_limit() {
  local label="$1"
  local value="$2"
  local limit="$3"

  echo "$label: $(format_mib "$value") / $(format_mib "$limit")"
  if [ "$value" -gt "$limit" ]; then
    echo "::error::$label exceeds budget: $(format_mib "$value") > $(format_mib "$limit")"
    fail=1
  fi
}

head_tree_bytes="$(sum_tree_bytes)"
public_tree_bytes="$(sum_tree_bytes public)"

check_limit "Tracked HEAD tree size" "$head_tree_bytes" "$max_tree_bytes"
check_limit "Tracked public/ size" "$public_tree_bytes" "$max_public_bytes"

echo "Largest tracked files:"
git ls-tree -r -l HEAD |
  sort -k4,4nr |
  head -20 |
  awk '{ printf "  %8.2f MiB  %s\n", $4 / 1048576, $5 }'

if ! git ls-tree -r -l HEAD |
  awk -v max="$max_blob_bytes" '
    $4 > max {
      printf "::error file=%s::Tracked file exceeds per-blob budget: %.2f MiB\n", $5, $4 / 1048576
      bad = 1
    }
    END { exit bad ? 1 : 0 }
  '; then
  fail=1
fi

base_sha="${BASE_SHA:-}"
zero_sha="0000000000000000000000000000000000000000"
if [ -n "$base_sha" ] && [ "$base_sha" != "$zero_sha" ] && git cat-file -e "${base_sha}^{commit}" 2>/dev/null; then
  range="${base_sha}..HEAD"
else
  range="HEAD"
fi

echo "Checking blobs introduced in range: $range"
if ! git rev-list --objects "$range" |
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
  awk -v max="$max_blob_bytes" '
    $1 == "blob" && $3 > max {
      path = $4
      for (i = 5; i <= NF; i++) path = path " " $i
      printf "::error file=%s::Introduced blob exceeds per-blob budget: %.2f MiB\n", path, $3 / 1048576
      bad = 1
    }
    END { exit bad ? 1 : 0 }
  '; then
  fail=1
fi

history_blob_bytes="$(sum_head_blob_bytes)"
check_limit "HEAD Git blob payload size" "$history_blob_bytes" "$max_history_blob_bytes"

if [ -x scripts/update-size-badge.sh ]; then
  scripts/update-size-badge.sh
  if ! git diff --exit-code -- .github/badges/master-payload-size.json >/dev/null; then
    echo "::error file=.github/badges/master-payload-size.json::Repository size badge is stale. Run scripts/update-size-badge.sh and commit the result."
    fail=1
  fi
fi

exit "$fail"
