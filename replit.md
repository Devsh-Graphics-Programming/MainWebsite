# DevSH Graphics Programming Website

## Overview

Company website for DevSH Graphics Programming, a GPU/graphics consulting firm.

This is the **original Next.js** project structure (App Router, static export). It was originally imported from Vercel, briefly auto-converted to Vite + React, then restored to its original Next.js form per the user's preference.

## Stack

- **Next.js 15** (App Router) with `output: 'export'` — produces a static site
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3** (PostCSS-based, with `@tailwindcss/typography`)
- **motion** (Framer Motion successor) for animations
- **@next/third-parties** for the YouTube embed component

## Project structure

```
app/                  Next.js App Router root
  layout.tsx          Root layout (fonts, navbar, footer)
  page.tsx            Home page
  about/page.tsx      About Us
  services/page.tsx   Services
  nabla/page.tsx      Nabla framework showcase
  components/         Shared components (Navbar, Footer, gallery, etc.)
  data/               Static JSON data (vulkanised.json)
  fonts/FuturaPT/     Custom font woff2 files
  globals.css         Tailwind + custom CSS
public/               Static assets (images, videos, logos)
next.config.ts        Next.js config (static export, allowedDevOrigins for Replit)
tailwind.config.ts    Tailwind config
postcss.config.mjs    PostCSS config (loads tailwind)
tsconfig.json         TypeScript config
package.json          npm-managed dependencies (NOT pnpm workspace)
```

## Running locally

The "Start application" workflow runs:

```bash
npm run dev    # next dev -p 3000 -H 0.0.0.0
```

The dev server listens on port 3000, which `.replit` maps to external port 80 for Replit's preview pane.

`next.config.ts` includes `allowedDevOrigins` so Next.js accepts requests from Replit's preview proxy domains (`*.replit.dev` etc.).

## Building for production

```bash
npm run build   # produces ./out static site
```

Since `output: 'export'` is set, the build produces a fully static site in `./out` that can be hosted anywhere (Vercel, GitHub Pages, S3, etc.).

## Notes

- **Replit deployment is NOT configured.** The `.replit` file only maps the dev port for preview. Publishing through Replit is intentionally not set up — work here is meant to be pushed back to the user's main repo / Vercel for deployment.
- The `Caddyfile`, `Dockerfile`, `docker-compose.yml`, and `.github/` directory are from the user's original repo and are untouched. They reflect the user's preferred deployment setup outside of Replit.
