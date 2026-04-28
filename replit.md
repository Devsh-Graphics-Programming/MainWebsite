# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Project: DevSH Graphics Programming Website

A company website for DevSH Graphics Programming, a GPU/graphics consulting firm. Ported from Next.js to Vite + React (wouter routing).

### Pages / Routes

- `/` — Home: brief company intro + Vulkanised YouTube video gallery
- `/about` — About Us: company description, photo gallery, contact email
- `/nabla` — Nabla: animated showcase of the Nabla open-source framework
- `/services` — Services: past client projects with images and videos

### Key Components

- `src/components/Navbar.tsx` — Sticky nav with mobile dropdown (wouter + framer-motion)
- `src/components/Footer.tsx` + `GP_Links.tsx` — Footer with graphics-programming.org webring
- `src/components/VulkanisedGallery.tsx` — YouTube embed grid for Vulkanised talks
- `src/components/Slide.tsx` — Animated section for the Nabla page (framer-motion)
- `src/components/TextUtils.tsx` — Chapter, Paragraph, DimmedParagraph helpers
- `src/components/ContactEmail.tsx` — Click-to-reveal email component
- `src/components/OptimizedLoopVideo.tsx` — Lazy-loaded looping video via IntersectionObserver
- `src/data/vulkanised.json` — YouTube IDs for Vulkanised conference talks

### Fonts

Custom FuturaPT font loaded via @font-face in index.html (files in `public/fonts/FuturaPT/`).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + wouter routing + framer-motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/devsh-website run dev` — run frontend locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
