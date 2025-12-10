This repo is a Next.js app used to generate a static site. The final production image contains only static assets served by Caddy on a read-only filesystem (no Node/npm runtime in the shipped image).

## Development (local only)
- Install deps: `npm install`
- Run dev server: `npm run dev` then open http://localhost:3000
> ⚠️ These steps are purely for local development; the production image ships only static assets and never contains a Node/npm runtime.

## Build (production image)
- `docker build -t www-website .`
- Runtime is static files only; mount/serve with RO filesystem (e.g., `docker run --read-only --tmpfs /tmp --tmpfs /config --tmpfs /data -p 3000:3000 www-website`).
> ⚠️ The final container maps only the generated `out` directory and static assets; keep it read-only and do not run any Node/npm scripts there.

## Runtime filesystem layout
- The image is read-only, but Caddy still needs tiny writable slots for TLS cache/autosave/lock files.
- Align tmpfs mounts with `docker-compose.yml`: `/tmp:size=32m`, `/config:size=16m`, `/data:size=16m`.
- These small tmpfs allocations keep RAM usage predictable while allowing the static server to update its metadata safely.

## Deployment notes
- Published image: `ghcr.io/devsh-graphics-programming/www-website` (tags: `latest`, `master`, `sha-*`).
- Blog content is proxied separately; the main image does not include Node/npm or blog runtime.
