# Kurated — Project Technical Analysis

**Analysis date:** July 21, 2026  
**Project version:** 0.1.0  
**Analyst scope:** Full repository read-only audit (no code modifications)

---

## Executive Summary

**Kurated** is a greenfield web application scaffolded with `create-next-app` on **Next.js 16** with the **App Router**. The codebase contains a single static home page, default layout, and minimal global styles. No product features, backend, database, authentication, or reusable component library exist yet.

The `docs/` directory contains seven placeholder markdown files (`MASTER.md`, `PRODUCT.md`, `ROADMAP.md`, `HOME.md`, `ADMIN.md`, `AI.md`, `DATABASE.md`) that are currently empty. These filenames strongly suggest intended domains — curated content/product experience, admin tooling, AI integration, and data persistence — but no specifications have been written.

**Build status:** `npm run lint` and `npm run build` both succeed. The production build produces one static route (`/`) and the default `/_not-found` page.

**Maturity level:** Pre-MVP / planning stage (≈0% feature implementation).

---

## 1. Current Project Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              Next.js 16 App Router (Turbopack)           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  src/app/layout.tsx   — Root layout + metadata      │ │
│  │  src/app/page.tsx     — Static home page (/)        │ │
│  │  src/app/globals.css  — Tailwind + CSS variables    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Architectural Characteristics

| Aspect | Current State |
|--------|---------------|
| **Rendering model** | Static Site Generation (SSG) for `/` |
| **Router** | App Router (`src/app/`) |
| **Bundler** | Turbopack (Next.js 16 default for dev and build) |
| **Data layer** | None |
| **API layer** | None (`src/app/api/` does not exist) |
| **Middleware / Proxy** | None |
| **State management** | None |
| **Authentication** | None |
| **Component architecture** | No `components/` directory; all UI inline in `page.tsx` |
| **Server Components** | Default — `layout.tsx` and `page.tsx` are Server Components |
| **Client Components** | None (`"use client"` not used anywhere) |

### Request Flow (Current)

1. User requests `/`
2. Next.js serves pre-rendered static HTML from the build output
3. `layout.tsx` wraps content with Geist fonts, global CSS, and `<html lang="en">`
4. `page.tsx` renders the default create-next-app welcome screen

### Path Aliases

TypeScript path mapping is configured:

```json
"@/*": ["./src/*"]
```

This alias is defined but unused — no imports reference `@/` yet.

### Agent / AI Guidance Files

- `AGENTS.md` — Warns that Next.js 16 has breaking changes vs. prior versions; directs agents to read `node_modules/next/dist/docs/`
- `CLAUDE.md` — References `@AGENTS.md`

These indicate the project is intended to be developed with AI-assisted tooling and targets Next.js 16-specific conventions.

---

## 2. Folder Structure

### Current Tree (excluding `node_modules/` and `.next/`)

```
kurated/
├── docs/                          # Planning documentation (all files empty)
│   ├── ADMIN.md
│   ├── AI.md
│   ├── DATABASE.md
│   ├── HOME.md
│   ├── MASTER.md
│   ├── PRODUCT.md
│   └── ROADMAP.md
├── public/                        # Static assets (default Next.js SVGs)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                       # App Router entry point
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts                 # Empty config object
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md                      # Default create-next-app README
└── tsconfig.json
```

### File Count Summary

| Category | Count |
|----------|-------|
| TypeScript/TSX source files | 2 (`layout.tsx`, `page.tsx`) |
| CSS files | 1 (`globals.css`) |
| Documentation files | 7 (all empty) + default README |
| Config files | 5 |
| Public assets | 5 SVGs + favicon |
| Test files | 0 |
| API routes | 0 |
| Reusable components | 0 |

### Notable Absences

No directories exist for: `components/`, `lib/`, `hooks/`, `types/`, `utils/`, `services/`, `stores/`, `tests/`, `e2e/`, `.github/`, `middleware.ts`, or environment configuration (`.env.example`).

---

## 3. Technologies Used

### Core Stack

| Technology | Version | Role |
|------------|---------|------|
| **Next.js** | 16.2.10 | Full-stack React framework, App Router, SSG/SSR |
| **React** | 19.2.4 | UI library |
| **React DOM** | 19.2.4 | DOM rendering |
| **TypeScript** | 5.9.3 | Static typing |
| **Tailwind CSS** | 4.3.3 | Utility-first styling (v4 with `@import "tailwindcss"`) |
| **@tailwindcss/postcss** | ^4 | PostCSS integration for Tailwind v4 |
| **ESLint** | 9.39.5 | Linting |
| **eslint-config-next** | 16.2.10 | Next.js + Core Web Vitals rules |

### Built-In Next.js Features in Use

- **App Router** — File-based routing under `src/app/`
- **next/font/google** — Geist Sans and Geist Mono font optimization
- **next/image** — Optimized image component on home page
- **Metadata API** — Static metadata export in `layout.tsx`
- **Turbopack** — Default bundler for dev and production builds

### Next.js 16 Considerations

Per `AGENTS.md` and the bundled upgrade guide, Next.js 16 introduces breaking changes from prior versions:

- Turbopack is the default bundler
- ESLint is invoked via CLI (`eslint`) rather than `next lint`
- New caching directives (`use cache`, Cache Components)
- Potential migration from `middleware` to `proxy` convention
- Stabilized APIs formerly prefixed with `unstable_`

The project is already on v16 but has not adopted any v16-specific advanced features (Cache Components, Server Actions, etc.).

### Runtime Requirements

- **Node.js** — Compatible with Next.js 16 (Node 20+ recommended based on `@types/node` ^20)
- **Package manager** — npm (lockfile present); yarn/pnpm/bun also supported per README

---

## 4. Existing Dependencies

### Production Dependencies

```json
{
  "next": "16.2.10",
  "react": "19.2.4",
  "react-dom": "19.2.4"
}
```

Only the React/Next.js core trio. No UI libraries, data-fetching libraries, ORMs, auth providers, or utility packages.

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.10",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

### npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Development server |
| `build` | `next build` | Production build |
| `start` | `next start` | Production server |
| `lint` | `eslint` | Static analysis |

### Missing Script Conventions

No scripts for: `test`, `test:watch`, `test:e2e`, `typecheck`, `format`, `prepare`, `analyze`, or `db:*`.

---

## 5. Design System Status

### Current State: **Minimal Scaffold — Not a Design System**

The project has only the default create-next-app styling foundation.

### Typography

- **Primary:** Geist Sans (`--font-geist-sans`) loaded via `next/font/google`
- **Monospace:** Geist Mono (`--font-geist-mono`)
- **Fallback in body:** `Arial, Helvetica, sans-serif` (overrides Geist in `globals.css` — inconsistent)

### Color Tokens

Defined in `globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

Tailwind v4 `@theme inline` maps these to `--color-background` and `--color-foreground`. Dark mode uses `prefers-color-scheme: dark` media query (system preference only — no manual toggle).

### Tailwind Usage

- Tailwind v4 with CSS-first configuration (no `tailwind.config.js`)
- Utility classes used directly in JSX (`bg-zinc-50`, `text-3xl`, `rounded-full`, etc.)
- No design tokens beyond background/foreground
- No spacing scale customization, no semantic color palette (primary, secondary, accent, etc.)

### Component Patterns

- Inline styles via Tailwind utility classes
- No shared Button, Input, Card, Modal, or layout components
- No icon system (raw SVG assets in `/public` only)
- No animation or motion library

### Design System Gaps

| Element | Status |
|---------|--------|
| Brand identity / logo | Missing (Next.js placeholder) |
| Color palette | 2 tokens only |
| Typography scale | Ad hoc Tailwind classes |
| Spacing system | Default Tailwind |
| Component library | None |
| Storybook / component docs | None |
| Figma / design tokens file | None |
| Dark mode strategy | System-only, no toggle |
| Responsive breakpoints | Default Tailwind, minimal usage |
| Accessibility-focused components | None |

**Recommendation:** Establish a formal design system before building features (see Section 14).

---

## 6. Missing Infrastructure

### Version Control & Collaboration

| Item | Status |
|------|--------|
| Git repository | **Not initialized** |
| `.git/` | Absent |
| Branch strategy | N/A |
| Commit hooks (Husky) | None |
| Conventional commits / commitlint | None |

### Environment & Configuration

| Item | Status |
|------|--------|
| `.env.example` | Missing |
| Environment validation (e.g., Zod + `@t3-oss/env-nextjs`) | Missing |
| Secrets management strategy | Undefined |

### CI/CD

| Item | Status |
|------|--------|
| GitHub Actions / CI pipeline | None |
| Automated lint on PR | None |
| Automated build on PR | None |
| Preview deployments | None (Vercel-ready but not configured) |
| Dependabot / Renovate | None |

### Testing

| Item | Status |
|------|--------|
| Unit tests (Vitest/Jest) | None |
| Component tests (Testing Library) | None |
| E2E tests (Playwright/Cypress) | None |
| Test coverage reporting | None |
| Visual regression (Chromatic/Percy) | None |

### Code Quality

| Item | Status |
|------|--------|
| Prettier / formatting | None |
| Import sorting | None |
| Type-check script | None (relies on `next build`) |
| Bundle analyzer | None |

### Backend & Data

| Item | Status |
|------|--------|
| Database | None |
| ORM (Prisma/Drizzle) | None |
| Migrations | None |
| API routes / Route Handlers | None |
| Server Actions | None |
| Caching layer (Redis) | None |
| File/blob storage | None |

### Authentication & Authorization

| Item | Status |
|------|--------|
| Auth provider (NextAuth/Auth.js, Clerk, etc.) | None |
| Session management | None |
| Role-based access control | None |
| Protected routes | None |

### Observability

| Item | Status |
|------|--------|
| Error tracking (Sentry) | None |
| Analytics (Vercel Analytics, Plausible) | None |
| Logging infrastructure | None |
| Performance monitoring (Web Vitals reporting) | None |
| Uptime monitoring | None |

### Documentation

| Item | Status |
|------|--------|
| Product specs | Empty placeholders |
| API documentation | None |
| Architecture Decision Records (ADRs) | None |
| Contributing guide | None |
| Changelog | None |

### DevOps

| Item | Status |
|------|--------|
| Docker / containerization | None |
| Infrastructure as Code | None |
| Staging environment | None |
| Database seeding scripts | None |

---

## 7. Missing Folders

Based on standard Next.js App Router conventions and the implied scope from empty doc filenames, the following directories should be created:

### Essential (Phase 1)

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Primitive design system components
│   └── layout/          # Header, Footer, Sidebar, etc.
├── lib/                 # Shared utilities, config, constants
├── types/               # Shared TypeScript types/interfaces
└── app/
    ├── (marketing)/     # Public-facing route group
    ├── (admin)/         # Admin route group (per ADMIN.md intent)
    └── api/             # Route Handlers
```

### Recommended (Phase 2+)

```
src/
├── hooks/               # Custom React hooks
├── services/            # Business logic / external API clients
├── stores/              # Client state (if needed)
├── actions/             # Server Actions
└── styles/              # Additional global/module styles

tests/
├── unit/
├── integration/
└── e2e/

.github/
└── workflows/           # CI/CD pipelines

scripts/                 # Build, seed, migration helpers

prisma/ or drizzle/      # Database schema (per DATABASE.md intent)
```

### Configuration Files to Add

```
.env.example
.env.local               # (gitignored)
.prettierrc
vitest.config.ts         # or jest.config.ts
playwright.config.ts
components.json          # if using shadcn/ui
```

---

## 8. Missing Reusable Components

No component library exists. The following components are typically needed for a curated content/product platform (inferred from project name and doc structure):

### Layout & Navigation

- `Header` / `Navbar`
- `Footer`
- `Sidebar` (admin)
- `MobileMenu` / `Sheet`
- `Breadcrumbs`
- `PageContainer` / `Section`

### UI Primitives (Design System Foundation)

- `Button` (primary, secondary, ghost, destructive variants)
- `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`
- `Label`, `Form`, `FormField` (with validation)
- `Card`
- `Badge`, `Tag`
- `Avatar`
- `Dialog` / `Modal`
- `DropdownMenu`
- `Toast` / `Sonner` notifications
- `Skeleton` loading states
- `Spinner` / `Loader`
- `Tabs`
- `Table` (admin data views)
- `Pagination`

### Content & Product (per PRODUCT.md / HOME.md intent)

- `ProductCard`
- `ProductGrid`
- `CollectionCard`
- `HeroSection`
- `FeatureSection`
- `CTASection`
- `ImageGallery`
- `RichText` / `MarkdownRenderer`
- `SearchBar` + `SearchResults`
- `FilterBar` / `SortControls`
- `EmptyState`
- `ErrorBoundary` / `ErrorFallback`

### Admin (per ADMIN.md intent)

- `DataTable` with sorting/filtering
- `AdminLayout`
- `ConfirmDialog`
- `FileUploader`
- `StatusBadge`
- `AuditLogEntry`

### AI (per AI.md intent)

- `ChatInterface`
- `PromptInput`
- `AIResponse` / streaming text display
- `SuggestionChips`

### Shared Utilities

- `SEO` / metadata helpers
- `ThemeToggle` (if moving beyond system dark mode)
- `SkipLink` (accessibility)
- `VisuallyHidden`

---

## 9. Performance Recommendations

### Current Performance Profile

The app is a single static page with minimal assets. Build output shows static prerendering with fast compile times (~4.3s). Performance is acceptable for the scaffold but will degrade without proactive optimization as features are added.

### Immediate Recommendations

1. **Fix font inconsistency** — Remove `font-family: Arial, Helvetica, sans-serif` from `body` in `globals.css` so Geist Sans is actually applied via `--font-sans`.

2. **Replace placeholder metadata** — Update `title` and `description` in `layout.tsx` from "Create Next App" defaults to real Kurated branding for better LCP-related perceived performance and SEO.

3. **Add `loading.tsx` and `error.tsx`** — Per-route loading and error boundaries improve perceived performance and resilience.

4. **Configure image domains early** — When adding external images (product photos, CDN), configure `images.remotePatterns` in `next.config.ts` upfront.

### Medium-Term Recommendations

5. **Adopt Next.js 16 Cache Components** — Use `use cache` directive and Cache Components for data-heavy pages to reduce server compute and improve TTFB.

6. **Implement route-level code splitting** — Keep `"use client"` boundaries minimal; lazy-load heavy client components with `next/dynamic`.

7. **Font subsetting** — Currently loading Latin subset only (good). Add additional subsets only if internationalization requires them.

8. **Bundle analysis** — Add `@next/bundle-analyzer` and monitor bundle size as dependencies grow.

9. **Static generation strategy** — Pre-render product/collection pages at build time or with ISR (`revalidate`) for curated content that changes infrequently.

10. **Edge runtime for API routes** — Consider Edge for geo-located or latency-sensitive endpoints.

### Monitoring

11. **Web Vitals reporting** — Implement `useReportWebVitals` or Vercel Analytics to track LCP, INP, CLS in production.

12. **Set performance budgets** — Define max JS bundle size and Core Web Vitals thresholds in CI.

---

## 10. Accessibility Recommendations

### Current State Assessment

The scaffold has basic accessibility foundations but several gaps:

**Present:**
- `<html lang="en">` set correctly
- `alt` attributes on `Image` components
- Semantic `<main>` element
- `rel="noopener noreferrer"` on external links with `target="_blank"`
- `antialiased` font rendering

**Missing or problematic:**

1. **Skip navigation link** — No skip-to-content link for keyboard users.

2. **Heading hierarchy** — Single `h1` exists but no landmark regions (`nav`, `footer`) since there is no site chrome.

3. **Focus management** — No visible focus styles beyond browser defaults; interactive elements use `<a>` styled as buttons without consistent focus rings.

4. **Color contrast** — `text-zinc-600` on white and dark mode zinc variants should be verified against WCAG 2.1 AA (4.5:1 for normal text).

5. **Reduced motion** — No `prefers-reduced-motion` handling for any future animations.

6. **ARIA patterns** — No ARIA usage; will be critical for modals, dropdowns, tabs, and admin tables.

7. **Form accessibility** — No forms exist yet; when added, ensure label associations, error announcements (`aria-describedby`, `aria-invalid`), and live regions.

8. **Keyboard navigation** — Admin data tables and filter controls will need full keyboard support.

### Recommended Actions

| Priority | Action |
|----------|--------|
| P0 | Add ESLint plugin `eslint-plugin-jsx-a11y` |
| P0 | Establish focus-visible styles in design system |
| P1 | Add skip link component to root layout |
| P1 | Use semantic HTML landmarks in layout (header, nav, main, footer) |
| P1 | Test with axe-core in CI (via Playwright or Vitest) |
| P2 | Document accessibility standards in contributing guide |
| P2 | Manual screen reader testing checklist (NVDA, VoiceOver) |
| P2 | Support `prefers-reduced-motion` globally |

---

## 11. SEO Recommendations

### Current State

Metadata is the create-next-app default:

```typescript
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

No sitemap, robots.txt, structured data, or Open Graph tags exist.

### Recommendations

#### Immediate (P0)

1. **Replace default metadata** with Kurated-specific title template, description, and keywords.

2. **Add Open Graph and Twitter Card metadata** via the Metadata API:

   ```typescript
   openGraph: { title, description, url, siteName, images, locale, type }
   twitter: { card: 'summary_large_image', title, description, images }
   ```

3. **Create `app/sitemap.ts`** — Dynamic sitemap generation for products, collections, and static pages.

4. **Create `app/robots.ts`** — Control crawler access; disallow `/admin/` routes.

5. **Add canonical URLs** — Use `metadata.alternates.canonical` per page.

#### Medium-Term (P1)

6. **Structured data (JSON-LD)** — Implement Schema.org markup:
   - `WebSite` with `SearchAction` for site search
   - `Product` / `ItemList` for curated product pages
   - `BreadcrumbList` for navigation
   - `Organization` for brand entity

7. **Dynamic metadata** — Use `generateMetadata()` for product/collection pages with unique titles and descriptions.

8. **Image SEO** — Descriptive alt text, meaningful filenames, WebP/AVIF via `next/image`.

9. **URL structure** — Plan clean, hierarchical URLs (e.g., `/collections/[slug]`, `/products/[slug]`).

10. **Internationalization (if needed)** — `hreflang` tags and locale-based routing.

#### Long-Term (P2)

11. **Performance as SEO signal** — Maintain Core Web Vitals in "Good" range.

12. **Content strategy** — Blog or editorial content for organic discovery if applicable.

13. **RSS/Atom feed** — For curated content updates.

---

## 12. Security Recommendations

### Current State

Minimal attack surface (static page, no user input, no auth). However, the project lacks foundational security infrastructure needed before handling user data.

### Critical (Before Launch)

1. **Initialize Git and never commit secrets** — `.gitignore` already excludes `.env*` (good). Add `.env.example` with documented variables.

2. **Environment variable validation** — Validate all env vars at startup with a schema (Zod).

3. **HTTPS enforcement** — Ensure production deployment enforces TLS (Vercel default).

4. **Security headers** — Configure in `next.config.ts`:

   ```typescript
   headers: [
     { key: 'X-Frame-Options', value: 'DENY' },
     { key: 'X-Content-Type-Options', value: 'nosniff' },
     { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
     { key: 'Permissions-Policy', value: '...' },
     { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
   ]
   ```

5. **Content Security Policy (CSP)** — Define CSP as features are added (especially AI integrations and third-party scripts).

### Authentication & Authorization (When Implemented)

6. **Use established auth library** — Auth.js/NextAuth, Clerk, or similar; do not roll custom auth.

7. **CSRF protection** — Server Actions have built-in protection; ensure API routes validate origin.

8. **Rate limiting** — Protect auth endpoints, AI endpoints, and search from abuse (Upstash Ratelimit, etc.).

9. **RBAC for admin** — Separate admin routes with middleware/proxy checks; never rely on client-side hiding alone.

### Data & Input (When Implemented)

10. **Input validation** — Validate all user input server-side (Zod schemas shared between client and server).

11. **SQL injection prevention** — Use parameterized queries via ORM (Prisma/Drizzle).

12. **XSS prevention** — Sanitize rich text/HTML content (DOMPurify); React escapes by default but CMS content may not.

13. **File upload security** — Validate MIME types, size limits, scan uploads; store in object storage not local filesystem.

### AI-Specific (per AI.md intent)

14. **Prompt injection mitigation** — Sanitize user inputs to AI; scope system prompts; log and monitor.

15. **API key protection** — AI provider keys server-side only; never expose in client bundles.

16. **Output filtering** — Validate AI responses before rendering or storing.

### Dependency & Supply Chain

17. **Automated dependency updates** — Dependabot or Renovate.

18. **npm audit in CI** — Fail builds on critical vulnerabilities.

19. **Lockfile integrity** — Commit `package-lock.json`; use `npm ci` in CI.

### Compliance (If Applicable)

20. **Privacy policy & cookie consent** — Required if using analytics or storing PII.

21. **GDPR/CCPA** — Data export/deletion endpoints if storing user data.

---

## 13. Scalable Architecture Recommendations

As Kurated grows from scaffold to production platform, adopt these architectural patterns:

### Application Layering

```
┌──────────────────────────────────────────────┐
│  Presentation (components/, app/*/page.tsx)  │
├──────────────────────────────────────────────┤
│  Application (actions/, hooks/, services/)   │
├──────────────────────────────────────────────┤
│  Domain (types/, lib/validators/, rules/)    │
├──────────────────────────────────────────────┤
│  Infrastructure (lib/db/, lib/auth/, lib/ai/)│
└──────────────────────────────────────────────┘
```

- Keep business logic out of React components
- Server Actions for mutations; Route Handlers for webhooks/external APIs
- Shared Zod schemas for validation at boundaries

### Routing Strategy

Use Next.js route groups to separate concerns:

```
src/app/
├── (marketing)/          # Public site — SSG/ISR
│   ├── page.tsx          # Home
│   ├── collections/
│   └── products/
├── (admin)/              # Protected admin — SSR
│   └── admin/
│       ├── products/
│       └── settings/
├── (auth)/               # Login/signup flows
│   ├── login/
│   └── signup/
└── api/                  # Webhooks, external integrations
    ├── webhooks/
    └── ai/
```

### Data Architecture

1. **PostgreSQL** as primary database (recommended for relational curated content)
2. **ORM** — Drizzle (lightweight, SQL-first) or Prisma (mature ecosystem)
3. **Caching** — Redis/Upstash for session, rate limiting, and hot data
4. **Search** — Dedicated search (Algolia, Meilisearch, or Postgres full-text) as catalog grows
5. **Media** — Object storage (S3, Cloudflare R2, Vercel Blob) with CDN

### Caching Strategy (Next.js 16)

- Static pages: SSG with ISR revalidation for product/collection updates
- Dynamic admin: SSR with no cache
- API responses: `use cache` with tag-based revalidation
- Client: React Query or SWR only where client-side fetching is necessary

### Multi-Tenancy / Admin Isolation

If admin manages curated content:

- Separate admin layout with auth guard (middleware/proxy)
- Audit log table for all admin mutations
- Soft deletes with `deletedAt` for recoverability

### AI Integration Architecture (per AI.md intent)

```
User → Server Action → AI Service (lib/ai/) → Provider API
                              ↓
                         Rate Limiter
                              ↓
                         Response Cache (optional)
                              ↓
                         Audit Log
```

- Never call AI providers from client components
- Stream responses via Server Actions or Route Handlers
- Abstract provider behind interface for vendor flexibility (OpenAI, Anthropic, etc.)

### Deployment Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Vercel    │────▶│  PostgreSQL  │     │   Redis     │
│  (Next.js)  │     │  (Neon/Supa) │     │  (Upstash)  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐                          ┌─────────────┐
│  CDN/Blob   │                          │  AI APIs    │
│  (images)   │                          │  (server)   │
└─────────────┘                          └─────────────┘
```

### Observability at Scale

- Structured logging (pino) with request correlation IDs
- Error boundaries at route and component level
- Feature flags for gradual rollouts (Vercel Flags, LaunchDarkly)

### Testing Pyramid

```
        E2E (Playwright) — critical user flows
       /                  \
  Integration — API routes, Server Actions
 /                              \
Unit (Vitest) — lib/, validators, utils
```

---

## 14. Prioritized Roadmap

Roadmap phases are ordered by dependency — each phase unlocks the next. Timelines assume a small team; adjust based on capacity.

---

### Phase 0: Foundation (Week 1–2) — **CRITICAL**

**Goal:** Establish development infrastructure before writing features.

| # | Task | Priority |
|---|------|----------|
| 0.1 | Initialize Git repository | P0 |
| 0.2 | Populate `docs/MASTER.md` with project vision and architecture decisions | P0 |
| 0.3 | Write product requirements in `docs/PRODUCT.md` | P0 |
| 0.4 | Define database schema in `docs/DATABASE.md` | P0 |
| 0.5 | Create `.env.example` with documented variables | P0 |
| 0.6 | Add Prettier + format script | P1 |
| 0.7 | Add Vitest + Testing Library | P1 |
| 0.8 | Set up GitHub Actions CI (lint, typecheck, test, build) | P1 |
| 0.9 | Replace default README with project-specific documentation | P1 |
| 0.10 | Fix font inconsistency in `globals.css` | P2 |

**Exit criteria:** Git repo with CI green on every push; product and data specs documented.

---

### Phase 1: Design System & Layout Shell (Week 2–4)

**Goal:** Build reusable UI foundation and site chrome.

| # | Task | Priority |
|---|------|----------|
| 1.1 | Choose and install component library base (recommend: shadcn/ui + Tailwind v4) | P0 |
| 1.2 | Define design tokens (colors, spacing, typography scale) in `globals.css` | P0 |
| 1.3 | Create `src/components/ui/` primitives (Button, Input, Card, etc.) | P0 |
| 1.4 | Build layout components (Header, Footer, PageContainer) | P0 |
| 1.5 | Implement root layout with landmarks and skip link | P1 |
| 1.6 | Add theme toggle (light/dark/system) | P1 |
| 1.7 | Replace placeholder home page with Kurated-branded landing stub | P1 |
| 1.8 | Update metadata, OG tags, favicon | P1 |
| 1.9 | Add `loading.tsx`, `error.tsx`, `not-found.tsx` | P2 |

**Exit criteria:** Consistent visual language; navigable site shell; accessible layout.

---

### Phase 2: Data Layer & Backend (Week 4–6)

**Goal:** Persistent storage and API foundation.

| # | Task | Priority |
|---|------|----------|
| 2.1 | Provision PostgreSQL (Neon, Supabase, or local Docker) | P0 |
| 2.2 | Install and configure ORM (Drizzle or Prisma) | P0 |
| 2.3 | Implement core schema (products, collections, categories, media) per DATABASE.md | P0 |
| 2.4 | Create seed script with sample data | P1 |
| 2.5 | Build Route Handlers or Server Actions for CRUD | P1 |
| 2.6 | Add environment validation (Zod) | P1 |
| 2.7 | Set up object storage for images | P2 |

**Exit criteria:** Database running with migrations; seed data; basic CRUD operations working.

---

### Phase 3: Public Experience (Week 6–9)

**Goal:** Customer-facing curated content browsing (per HOME.md, PRODUCT.md).

| # | Task | Priority |
|---|------|----------|
| 3.1 | Home page with hero, featured collections, CTA | P0 |
| 3.2 | Collection listing and detail pages | P0 |
| 3.3 | Product listing and detail pages | P0 |
| 3.4 | ProductCard, CollectionCard, ProductGrid components | P0 |
| 3.5 | Search functionality | P1 |
| 3.6 | Filter and sort controls | P1 |
| 3.7 | SEO: sitemap.ts, robots.ts, JSON-LD structured data | P1 |
| 3.8 | ISR caching strategy for product/collection pages | P1 |
| 3.9 | Image gallery component | P2 |
| 3.10 | Empty and error states | P2 |

**Exit criteria:** Users can browse and discover curated products/collections.

---

### Phase 4: Authentication & Admin (Week 9–12)

**Goal:** Secure admin panel for content management (per ADMIN.md).

| # | Task | Priority |
|---|------|----------|
| 4.1 | Install auth provider (Auth.js recommended) | P0 |
| 4.2 | Create login/logout flows | P0 |
| 4.3 | Protect admin routes with middleware/proxy | P0 |
| 4.4 | Admin layout with sidebar navigation | P0 |
| 4.5 | Product CRUD admin interface | P0 |
| 4.6 | Collection CRUD admin interface | P0 |
| 4.7 | Image upload and media management | P1 |
| 4.8 | DataTable with sorting, filtering, pagination | P1 |
| 4.9 | Role-based access control (admin, editor) | P1 |
| 4.10 | Audit log for admin actions | P2 |

**Exit criteria:** Authenticated admins can manage all curated content.

---

### Phase 5: AI Integration (Week 12–14)

**Goal:** AI-powered features (per AI.md).

| # | Task | Priority |
|---|------|----------|
| 5.1 | Define AI use cases in `docs/AI.md` (recommendations, descriptions, search) | P0 |
| 5.2 | Create `lib/ai/` abstraction layer with provider interface | P0 |
| 5.3 | Implement server-side AI endpoints (never client-side keys) | P0 |
| 5.4 | Rate limiting on AI endpoints | P0 |
| 5.5 | AI-assisted product description generation (admin) | P1 |
| 5.6 | AI-powered search or recommendations (public) | P1 |
| 5.7 | Streaming response UI components | P2 |
| 5.8 | AI audit logging | P2 |

**Exit criteria:** At least one AI feature live in admin and one in public experience.

---

### Phase 6: Production Hardening (Week 14–16)

**Goal:** Security, performance, and reliability for launch.

| # | Task | Priority |
|---|------|----------|
| 6.1 | Security headers and CSP in next.config.ts | P0 |
| 6.2 | E2E test suite (Playwright) for critical flows | P0 |
| 6.3 | Error tracking (Sentry) | P0 |
| 6.4 | Analytics (Vercel Analytics or Plausible) | P1 |
| 6.5 | Web Vitals monitoring | P1 |
| 6.6 | Performance audit and optimization | P1 |
| 6.7 | Accessibility audit (axe + manual) | P1 |
| 6.8 | Load testing for API endpoints | P2 |
| 6.9 | Staging environment | P2 |
| 6.10 | Production deployment runbook | P2 |

**Exit criteria:** Production deployment with monitoring, tests, and security baseline.

---

### Phase 7: Post-Launch Iteration (Ongoing)

| # | Task | Priority |
|---|------|----------|
| 7.1 | User feedback collection | P1 |
| 7.2 | A/B testing infrastructure | P2 |
| 7.3 | Internationalization (if needed) | P2 |
| 7.4 | Advanced search (Algolia/Meilisearch) | P2 |
| 7.5 | Email notifications / newsletters | P2 |
| 7.6 | Public API for partners | P3 |

---

## Appendix A: Verification Results

Commands run during analysis:

| Command | Result |
|---------|--------|
| `npm run lint` | Passed (no errors) |
| `npm run build` | Passed — 1 static route (`/`), Turbopack build in ~4.3s |
| `git status` | Not a git repository |

## Appendix B: Key Source File References

| File | Lines | Purpose |
|------|-------|---------|
| `src/app/layout.tsx` | 34 | Root layout, fonts, metadata |
| `src/app/page.tsx` | 66 | Default home page (create-next-app template) |
| `src/app/globals.css` | 27 | Tailwind import, CSS variables, dark mode |
| `next.config.ts` | 7 | Empty Next.js configuration |
| `tsconfig.json` | 35 | Strict TypeScript with `@/*` path alias |
| `package.json` | 27 | Dependencies and scripts |

## Appendix C: Inferred Project Intent

Based on project name (**Kurated**) and empty documentation filenames:

| Doc File | Likely Purpose |
|----------|----------------|
| `MASTER.md` | Master project document — vision, glossary, conventions |
| `PRODUCT.md` | Product requirements — features, user stories, acceptance criteria |
| `ROADMAP.md` | Timeline and milestone planning |
| `HOME.md` | Home/landing page specification |
| `ADMIN.md` | Admin panel requirements |
| `AI.md` | AI feature specifications and integration plan |
| `DATABASE.md` | Data model, schema, and migration strategy |

**Note:** All files are currently empty. Phase 0 of the roadmap should prioritize filling these documents before implementation begins.

---

*This document was generated from a read-only analysis of the repository. No source code was modified.*
