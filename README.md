# Smart Warehouse landing page

Public landing page of the graduation project «المخزن الذكي وأسطول الرافعات الذاتية» /
*Smart Warehouse & Autonomous Forklift Fleet*: a 1:14-scale warehouse where 3 (+1 spare) modified
Huina 1577 Pro forklifts move pallets under a central Fleet Manager + WMS and a live dashboard.

Static React SPA, Arabic first (RTL) with English at `/en`, light/dark following the OS with a toggle.
No backend calls, no analytics, no third-party assets. Full design and content notes:
[`docs/08-landing.md`](https://github.com/Smart-Warhouse/docs/blob/main/08-landing.md).

## Stack

React 19 · Vite 8 · TypeScript (strict) · Tailwind CSS 3.4 · react-router-dom 7 · `@phosphor-icons/react`
· Vitest + Testing Library · nginx (Docker) with a strict CSP.

## Commands

```bash
npm install
npm run dev         # http://localhost:5180 (the dashboard owns 5173)
npm run typecheck   # tsc -b --noEmit
npm run lint        # eslint .
npm run test        # vitest run
npm run build       # tsc -b && vite build -> dist/
npm run preview     # http://localhost:4180 (no CSP; use Docker for that)
```

## Configuration

| Variable | Default | Used for |
|---|---|---|
| `VITE_DASHBOARD_URL` | `http://localhost:5173` | Every "Open dashboard" button. Build-time (Vite); only http(s) accepted. |
| `PORT` (container) | `8080` | nginx listen port. |

Copy `.env.example` to `.env` for local overrides.

## Docker

```bash
docker build -t sw-fleet-landing --build-arg VITE_DASHBOARD_URL=https://dashboard.example.org .
docker run --rm -p 8080:8080 sw-fleet-landing   # http://localhost:8080
```

The image serves `dist/` with nginx and sends the headers in `docker/security-headers.inc.template`:
`default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:;
connect-src 'none'; frame-ancestors 'none'; object-src 'none'; form-action 'none'` plus HSTS, nosniff,
`X-Frame-Options: DENY`, COOP/CORP and a restrictive Permissions-Policy. `vite dev`/`preview` do not
apply the CSP: check CSP-sensitive changes in the container.

## Layout

```
index.html                 Arabic RTL shell, static meta/OG/canonical, two bootstrap scripts (files, not inline)
public/                    lang-bootstrap.js, theme-bootstrap.js, favicon.svg, robots.txt, sitemap.xml, fonts/
src/main.tsx, App.tsx      router: "/" (ar), "/en" (en), "*" (404, noindex)
src/i18n/                  locale.ts, LocaleProvider, copy/{types,ar,en,index}.ts (typed dictionaries)
src/content/               bom.ts (parts cost by group), stack.ts (tool names)
src/components/ui/         Container, Eyebrow, Reveal, ButtonLink, SectionHeader, ThemeToggle, LanguageSwitch, DirIcons
src/components/layout/     SiteHeader, SiteFooter, BrandMark
src/components/illustrations/  ForkliftIllustration (side view: sensors / mount points), FleetMap (top-down lane graph)
src/sections/              Hero, ProblemIdea, HowItWorks, Hardware, Software, Ai, Safety, Fleet, Specs, Plan, Bom, TechStack, Faq, FinalCta
src/hooks/                 useReveal, usePageMeta, useScrollToHash
src/lib/                   site.ts (SITE_ORIGIN, dashboard URL), theme.ts (shared theme store)
docker/                    nginx.conf.template, security-headers.inc.template
```

## Rules of the codebase

- **Every visible string** lives in `src/i18n/copy/ar.ts` and `en.ts`; both are typed `SiteCopy`, so a
  missing key fails the build, and counted lists are tuples. `copy.test.ts` also checks list lengths.
- **Honesty**: the project is in progress. Numbers are design targets, never results. `copy.test.ts`
  fails on "proven", "tested results", testimonials, partners, customers, awards (both languages).
- **Arabic bounds are words, not ≤/≥** (bidi mirroring flips them beside Latin units): "100 ms كحد أقصى",
  "45 دقيقة على الأقل". Test-enforced.
- **Semantic tokens only** (`bg-surface`, `text-ink-2`, `bg-accent text-accent-on`, `bg-lift text-lift-on`…),
  defined once in `src/index.css` for `:root` and `.dark`. No raw hex in components, no `dark:` colour
  variants, no opacity modifiers on tokens (Tailwind emits nothing for them).
- **Logical properties only** (`ms/me/ps/pe/start/end`). Diagrams, maps and ID runs are pinned LTR.
- **Motion** is `Reveal` only, once, 12 px / 600 ms, skipped for reduced motion; the hero `h1` is never animated.
- **Icons** are Phosphor `*Icon` imports; directional ones mirror in RTL (`DirIcons.tsx`).
- **Routes** are literal `<Route path>` in `App.tsx` and appear in `public/sitemap.xml` (test-enforced).

## Open TODOs

- Team member names, supervisor, university and department: `footer.team` in both copy files (the footer
  shows a "will be added" line until then; no placeholder people).
- Real public domain: `SITE_ORIGIN` in `src/lib/site.ts`, `index.html`, `public/robots.txt`,
  `public/sitemap.xml` (currently `https://sw-fleet.example`; `seo.test.ts` keeps them in sync).
- Real photos of the forklift and the scale warehouse (the page uses drawn SVG illustrations only).
- A 1200×630 raster share image (`og:image`) once there is a real photo.
- Replace targets with measured results, row by row, as the acceptance tests (T-01…T-16) are run.
- Confirm the Thmanyah font licence covers web self-hosting for this site.
