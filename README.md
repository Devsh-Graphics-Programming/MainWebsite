This repo is a Next.js app used to generate a static site. The final production image contains only static assets served by Caddy on a read-only filesystem (no Node/npm runtime in the shipped image).

## Development (local only)
- Install deps: `npm install`
- Run dev server: `npm run dev` then open http://localhost:3000

## Build (production image)
- `docker build -t www-website .`
- Runtime is static files only; mount/serve with RO filesystem (e.g., `docker run --read-only --tmpfs /tmp --tmpfs /config --tmpfs /data -p 3000:3000 www-website`).

## Deployment notes
- Published image: `ghcr.io/devsh-graphics-programming/www-website` (tags: `latest`, `master`, `sha-*`).
- Blog content is proxied separately; the main image does not include Node/npm or blog runtime.
