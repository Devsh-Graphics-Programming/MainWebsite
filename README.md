<p align="center">
  <a href="https://github.com/Devsh-Graphics-Programming/MainWebsite/actions/workflows/docker-publish.yml">
    <img src="https://github.com/Devsh-Graphics-Programming/MainWebsite/actions/workflows/docker-publish.yml/badge.svg?branch=master" alt="Build Status" />
  </a>
  <a href="https://github.com/Devsh-Graphics-Programming/MainWebsite">
    <img src="https://img.shields.io/endpoint?cacheSeconds=300&url=https%3A%2F%2Fraw.githubusercontent.com%2FDevsh-Graphics-Programming%2FMainWebsite%2Fsize-badge-data%2Fmaster-payload-size.json%3Fv%3Dmaster" alt="Master payload size" />
  </a>
  <a href="https://discord.gg/krsBcABm7u">
    <img src="https://img.shields.io/discord/308323056592486420?label=discord&logo=discord&logoColor=white&color=7289DA" alt="Join our Discord" />
  </a>
</p>

This repo is a Next.js app used to generate a static site. The final production image contains only static assets served by Caddy on a read-only filesystem (no Node/npm runtime in the shipped image).

## Development (local only)
- Install deps: `npm install`
- Run dev server: `npm run dev` then open http://localhost:3000
> ⚠️ These steps are for local development. The production image serves static files and does not include Node or npm.

## Build (production image)
- `docker build -t www-website .`
- The runtime serves static files. Use a read-only filesystem (e.g., `docker run --read-only --tmpfs /tmp --tmpfs /config --tmpfs /data -p 3000:3000 www-website`).
> ⚠️ The final container serves the generated `out` directory. Keep it read-only. Run Node/npm scripts in the build stage or locally.

## Repository size budget
- CI fails if the tracked tree exceeds `10 MiB`, `public/` exceeds `8 MiB`, any tracked blob exceeds `1 MiB`, or HEAD Git blob payloads exceed `15 MiB`.
- Run `scripts/check-size-budget.sh` locally before adding new media. The README badge is informational and is updated outside the size gate.

## Runtime filesystem layout
- The image is read-only, but Caddy still needs tiny writable slots for TLS cache/autosave/lock files.
- Align tmpfs mounts with `docker-compose.yml`: `/tmp:size=32m`, `/config:size=16m`, `/data:size=16m`.
- These small tmpfs allocations keep RAM usage predictable while allowing the static server to update its metadata safely.

## Deployment notes
- Published image: `ghcr.io/devsh-graphics-programming/www-website` (tags: `latest`, `master`, `sha-*`).
- Blog content is proxied separately. The main image does not include Node/npm or the blog runtime.
- Security
- Enable GitHub's push protection/secret scanning (see https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) so that any accidental secret leaks are flagged before a push finishes.

## Generated PDFs

Run `npm run generate:pdfs` to rebuild `public/pricing.pdf` and `public/partner.pdf`.
This also runs with `npm run dev` and `npm run build`. Both PDFs stay out of Git.
Edit prices in `app/data/pricing-rates.json` and partner text in `app/data/partner-content.json`.
Both generators share the fonts, colors and footer in `scripts/lib/pdf-brand.mjs`.
