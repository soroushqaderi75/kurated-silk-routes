# Kurated — Master Constitution

**Status:** Permanent project governance document  
**Authority:** This document supersedes ad-hoc decisions. When in conflict, MASTER wins.  
**Scope:** All contributors, all phases, all features — forever.

---

## Preamble

Kurated is a curated content and product discovery platform. Every line of code, every design choice, and every architectural decision must serve clarity, trust, performance, and long-term maintainability.

This document defines **what we believe and how we behave**. It does not describe how to build features. Implementation belongs in other documents (`PRODUCT.md`, `DATABASE.md`, `ADMIN.md`, `AI.md`, etc.) and in the codebase itself.

When uncertain, ask: *Does this honor the constitution?*

---

## 1. Project Vision

### Mission

Kurated exists to help people discover thoughtfully selected products and collections — not everything, only what matters.

### What We Are Building

- A **public experience** for browsing curated collections and products
- An **admin experience** for managing curated content with care and accountability
- An **AI-assisted layer** that augments human curation — never replaces editorial judgment
- A ** durable platform** designed to grow without sacrificing quality

### What We Are Not Building

- A generic marketplace or infinite catalog
- A social network or engagement-maximization product
- A prototype that prioritizes speed over standards
- A monolith of one-off solutions with no shared patterns

### North Star Qualities

Every release should move Kurated closer to these qualities:

| Quality | Meaning |
|---------|---------|
| **Curated** | Less but better — editorial intent is visible |
| **Clear** | Users always know where they are and what they can do |
| **Fast** | Performance is a feature, not an afterthought |
| **Trustworthy** | Security, accessibility, and honesty are non-negotiable |
| **Maintainable** | Future contributors can understand and extend the work |

### Long-Term Commitment

We build for years, not sprints. Shortcuts that violate this constitution are technical debt with interest. Refactoring to comply is always preferred over adding non-compliant features.

---

## 2. Design Philosophy

### Editorial Over Algorithmic

Design reflects human curation. Visual hierarchy, spacing, and emphasis guide attention — they do not overwhelm with density or novelty.

### Restraint

Remove before adding. Every element must earn its place. White space is intentional. Decoration without purpose is forbidden.

### Consistency Over Creativity

Creative expression lives within the system — not outside it. One-off styling for a single page or feature is unacceptable unless explicitly approved and scheduled for systemization.

### Tokens Before Values

All visual decisions flow from design tokens (color, typography, spacing, radius, shadow). Raw values in components are forbidden except during token definition itself.

### Light and Dark as Equals

Both themes receive equal design attention. Neither is an afterthought. Contrast and readability must hold in both.

### Content Is Primary

The interface serves the content. Product imagery, titles, and descriptions are never compromised by layout gimmicks.

---

## 3. UI Principles

### Hierarchy

- One primary action per view
- Visual weight follows information importance
- Headings, body text, and captions use defined type roles — never improvised sizes

### Components Over Pages

Pages compose components. Pages do not contain bespoke UI that belongs in the design system.

### States Are Mandatory

Every interactive element defines: default, hover, focus, active, disabled, loading, and error states where applicable.

### Empty and Error States Are First-Class

No feature ships without designed empty, loading, and error states. Placeholder text alone is insufficient.

### Icons and Imagery

- Icons come from a single system — mixed icon libraries are forbidden
- Images use consistent aspect ratios within context (cards, hero, gallery)
- Decorative images are marked appropriately; meaningful images require descriptive alt text

### Admin vs. Public

Admin UI may be denser but must remain consistent with the same design tokens and component library. Admin is not a separate visual product.

---

## 4. UX Principles

### Clarity First

Users must understand what Kurated is, what they can do, and what happens next — without instruction manuals.

### Minimal Cognitive Load

- Progressive disclosure over overwhelming options
- Sensible defaults over configuration
- Familiar patterns over experimental interaction

### Predictability

Navigation, search, filters, and actions behave consistently across the entire product. Surprises erode trust.

### Feedback Always

Every user action receives visible feedback: loading indicators, success confirmation, or clear error messages. Silent failures are forbidden.

### Forgiveness

Destructive actions require confirmation. Reversible operations are preferred. Admin mistakes must be recoverable where feasible.

### Mobile Is Not Secondary

The experience is designed mobile-first in intent — not merely responsive as an adaptation. Touch targets, readability, and navigation must work on small screens without degradation.

### Respect User Preferences

System settings for reduced motion, color scheme, and text size are honored. Kurated adapts to the user — not the reverse.

---

## 5. Code Standards

### Language and Framework

- **TypeScript** is mandatory — no plain JavaScript in source
- **Next.js App Router** is the routing and rendering model
- **React Server Components** are the default; Client Components require justification

### Type Safety

- Strict TypeScript is always enabled
- `any` is forbidden except with documented, reviewed exception
- Shared types live in dedicated type modules — not duplicated inline

### Simplicity

- Prefer the smallest correct solution
- Do not abstract prematurely
- Do not add dependencies without clear, documented need

### Separation of Concerns

| Layer | Responsibility |
|-------|----------------|
| **Presentation** | Rendering and user interaction |
| **Application** | Orchestration, hooks, server actions |
| **Domain** | Business rules, validation schemas, types |
| **Infrastructure** | Database, auth, external APIs, AI providers |

Business logic must not live in React components or route files.

### Quality Gates

No code merges unless it:

- Passes lint
- Passes type check
- Passes tests (when tests exist for the area)
- Passes build
- Complies with this constitution

### Documentation in Code

- Code should be self-explanatory through naming and structure
- Comments explain **why**, not **what**
- Public APIs and non-obvious domain rules require brief documentation

### Dependencies

- New dependencies require justification
- Prefer well-maintained, widely adopted packages
- Pin major framework versions intentionally — do not drift silently

### AI-Assisted Development

Contributors using AI tools must verify output against this constitution and Next.js 16 conventions. Generated code is not exempt from standards.

---

## 6. Folder Structure Rules

### Root Organization

```
docs/           — Project governance and specifications (never application code)
public/         — Static assets served as-is
src/            — All application source code
tests/          — Automated tests (when introduced)
scripts/        — Build, seed, and maintenance scripts (when introduced)
```

### Source Layout

```
src/
├── app/              — Routes, layouts, route-level metadata only
├── components/       — Reusable UI components
│   ├── ui/           — Design system primitives
│   ├── layout/       — Site chrome (header, footer, sidebar)
│   └── [feature]/    — Feature-specific composed components
├── lib/              — Utilities, configuration, infrastructure clients
├── types/            — Shared TypeScript types and interfaces
├── hooks/            — Custom React hooks (client-only)
├── actions/          — Server Actions
└── services/         — Business logic and external integrations
```

### Route Organization

- **Route groups** separate public, admin, and auth concerns — e.g. `(marketing)`, `(admin)`, `(auth)`
- Route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) contain routing concerns only — not business logic
- API Route Handlers live under `src/app/api/`

### Forbidden Patterns

- Business logic in `page.tsx` or `layout.tsx` beyond composition
- Components inside `app/` except colocated route-specific UI that is truly single-use
- Deep nesting beyond three levels without documented reason
- Circular dependencies between modules

### File Placement Rules

| Item | Location |
|------|----------|
| Design system primitive | `src/components/ui/` |
| Layout chrome | `src/components/layout/` |
| Feature component | `src/components/[feature]/` |
| Server Action | `src/actions/` |
| Database client | `src/lib/db/` |
| Auth utilities | `src/lib/auth/` |
| AI integration | `src/lib/ai/` |
| Validation schemas | `src/lib/validators/` |
| Shared constants | `src/lib/constants/` |

---

## 7. Component Rules

### Single Responsibility

Each component does one thing well. If a component exceeds ~150 lines or handles unrelated concerns, split it.

### Composition Over Configuration

Prefer composable children and slots over components with dozens of props.

### Server by Default

- Components are Server Components unless they require browser APIs, event handlers, or client state
- `"use client"` must appear at the top of the file when needed — never implied
- Push Client Components to the leaves of the tree

### Props

- Props are explicitly typed
- Optional props have sensible defaults or are truly optional
- Avoid prop drilling beyond two levels — use composition or context sparingly

### No Inline Feature Logic

Components render UI. They call hooks, actions, or services for logic. Complex conditional business rules do not belong in JSX.

### Reusability Threshold

Before building inline UI, ask:

1. Will this appear elsewhere?
2. Does a primitive already exist?
3. Should this become a shared component after second use?

The second identical implementation triggers extraction to `components/`.

### Accessibility Built In

Components ship with correct semantics, keyboard support, and ARIA only where native HTML is insufficient. Accessibility is not a follow-up task.

### Export Discipline

- One primary component per file
- Named exports preferred over default exports for components
- Index barrel files (`index.ts`) are used sparingly to avoid circular imports

---

## 8. Naming Conventions

### General

- **English only** for code, files, and identifiers
- **Descriptive over terse** — `ProductCard` not `PCard`
- Avoid abbreviations unless universally understood (`id`, `url`, `api`)

### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| React component | PascalCase | `ProductCard.tsx` |
| Hook | camelCase with `use` prefix | `useSearchFilters.ts` |
| Utility / lib | camelCase | `formatPrice.ts` |
| Server Action file | camelCase or kebab-case | `products.ts` |
| Route segment | kebab-case | `product-detail/` |
| Type file | camelCase or PascalCase | `product.types.ts` |
| Constant file | camelCase | `routes.ts` |

### Components

- PascalCase: `CollectionGrid`, `AdminSidebar`
- Suffix by role when helpful: `ProductCard`, `SearchDialog`, `LoginForm`

### Variables and Functions

- camelCase: `fetchCollections`, `isPublished`
- Boolean prefixes: `is`, `has`, `can`, `should` — e.g. `isLoading`, `hasError`
- Event handlers: `handle` prefix — e.g. `handleSubmit`
- Callback props: `on` prefix — e.g. `onSelect`

### Types and Interfaces

- PascalCase: `Product`, `Collection`, `AdminUser`
- Props interfaces: `[ComponentName]Props` — e.g. `ProductCardProps`
- Enums and union types: PascalCase

### Database

- Table names: snake_case, plural — e.g. `products`, `collection_items`
- Column names: snake_case — e.g. `created_at`, `published_at`
- Foreign keys: `[referenced_table_singular]_id` — e.g. `collection_id`

### CSS and Design Tokens

- CSS variables: kebab-case with semantic names — e.g. `--color-primary`, `--spacing-section`
- No utility-class strings as JavaScript constants unless part of a documented variant system

### Routes and URLs

- kebab-case, lowercase, hierarchical
- Plural for collections: `/collections`, `/products`
- Singular dynamic segments: `/products/[slug]`
- Admin namespace: `/admin/...`

---

## 9. State Management Rules

### Hierarchy of Preference

Use the simplest mechanism that satisfies the need:

1. **URL state** — filters, pagination, search queries, selected tabs
2. **Server state** — data fetched on the server and passed as props
3. **Form state** — local to forms via controlled inputs or form libraries
4. **Component state** — `useState` for UI-only ephemeral state
5. **Context** — sparingly, for truly global client concerns (theme, auth session display)
6. **External store** — only when justified by complex client-side coordination

### Server State Is Primary

Data that originates from the database is fetched on the server. Client-side data fetching is the exception, not the default.

### No Duplicate Sources of Truth

The same data must not exist in both server cache and client store without a defined synchronization strategy.

### Client State Scope

Client state must be scoped as narrowly as possible. Global client stores require documented approval.

### Mutations

- Data mutations go through Server Actions or Route Handlers — never direct client-to-database access
- Optimistic updates require rollback handling
- After mutation, revalidate affected data explicitly

### Forbidden

- Storing server data in global client state without need
- Propagating stale state after known mutations
- Client-side-only authorization decisions

---

## 10. API Rules

### Server Actions vs. Route Handlers

| Use Server Actions for | Use Route Handlers for |
|------------------------|------------------------|
| Form submissions | Webhooks from external services |
| Internal mutations | Public REST endpoints for third parties |
| Admin CRUD operations | Streaming or long-lived connections |
| AI requests from UI | Integrations requiring specific HTTP semantics |

### Validation

- All inputs are validated on the server — always
- Validation schemas are shared between client and server where applicable
- Never trust client-side validation alone

### Response Shape

- Consistent, predictable response structures
- Errors return meaningful messages for clients; sensitive details stay in logs
- HTTP status codes reflect actual outcomes

### Authentication and Authorization

- Every protected endpoint verifies identity and permission before processing
- Authorization checks happen on the server — never on the client alone

### Rate Limiting

Public and expensive endpoints (auth, search, AI) must be rate-limited in production.

### Versioning

External-facing APIs are versioned. Internal Server Actions follow the current application version.

### Logging

All API failures are logged with sufficient context for debugging — never log secrets, tokens, or personal data unnecessarily.

### AI Endpoints

- AI provider calls happen server-side only
- User input to AI is sanitized and scoped
- AI responses are validated before storage or display
- AI usage is auditable

---

## 11. Database Philosophy

### Source of Truth

The database is the authoritative source for persistent data. Caches and client state are derivatives.

### Relational by Default

Structured, relational data belongs in a relational database. Document or key-value stores require documented justification.

### Schema as Contract

- The schema is defined explicitly and version-controlled through migrations
- Migrations are forward-only in production — rollbacks use new migrations
- No manual production schema edits outside the migration process

### Naming and Normalization

- Follow naming conventions in Section 8
- Normalize appropriately — avoid duplication, avoid over-normalization that harms clarity
- Use foreign keys and constraints to enforce integrity

### Timestamps

All mutable entities include `created_at` and `updated_at`. Soft deletes use `deleted_at` where recovery is required.

### Identifiers

- Primary keys are opaque and stable — UUIDs or equivalent
- Public-facing URLs use slugs — slugs are not primary keys

### Data Integrity Over Convenience

Constraints, foreign keys, and validation at the database level are preferred over application-only enforcement.

### Auditing

Admin mutations that affect published content or user data must be auditable. Destructive operations require traceability.

### Seeds and Fixtures

Development and test data use seed scripts — never production data in non-production environments.

### Queries

- Parameterized queries only — never string-concatenated SQL
- Queries live in the data access layer — not in components or route files
- N+1 query patterns are unacceptable in production paths

Detailed schema definitions belong in `docs/DATABASE.md`.

---

## 12. Performance Rules

### Budget Mindset

Performance is a requirement, not optimization. Every feature is evaluated for its impact on load time, interactivity, and resource use.

### Core Web Vitals

Production must maintain **Good** ratings for LCP, INP, and CLS. Regressions block release.

### Rendering Strategy

| Content Type | Preferred Strategy |
|--------------|-------------------|
| Static marketing pages | Static generation |
| Curated catalog pages | Static generation with revalidation |
| Admin and authenticated views | Server rendering |
| Personalized or real-time data | Server rendering with targeted caching |

### Client JavaScript

- Minimize Client Component boundaries
- Lazy-load heavy client modules
- No unnecessary third-party scripts

### Images and Media

- All content images go through the platform's optimized image pipeline
- Appropriate sizing, format, and lazy loading are mandatory
- Hero and above-the-fold images are prioritized

### Fonts

- Self-hosted or optimized web fonts only
- Limit font variants and weights to what the design system requires

### Caching

- Cache deliberately with explicit invalidation strategy
- Never cache personalized or authorized responses as public content
- Admin routes are never publicly cached

### Bundle Discipline

New dependencies that significantly increase bundle size require review. Regular bundle analysis is expected as the project grows.

### Monitoring

Production performance is monitored. Regressions are investigated and resolved — not ignored.

---

## 13. Accessibility Rules

### Standard

Kurated targets **WCAG 2.1 Level AA** compliance across all public and admin experiences.

### Non-Negotiables

- Semantic HTML landmarks on every page: header, nav, main, footer where applicable
- One `<h1>` per page with logical heading hierarchy
- All interactive elements are keyboard accessible
- Visible focus indicators on all focusable elements
- Sufficient color contrast in light and dark themes
- All meaningful images have descriptive alt text
- Form fields have associated labels
- Errors are announced to assistive technology

### Keyboard and Focus

- Tab order follows visual order
- Focus is trapped in modals and released on close
- Focus is restored after dialog dismissal
- No keyboard traps outside intentional modal behavior

### Motion

- Respect `prefers-reduced-motion`
- Essential motion only — animation never blocks task completion

### ARIA

- Use native HTML elements first
- ARIA supplements semantics — it does not replace them
- Interactive widgets follow established ARIA patterns

### Testing

Accessibility is tested automatically where possible and manually for critical flows before release. Shipping known accessibility blockers is forbidden.

---

## 14. SEO Rules

### Indexable by Design

Public pages are built for discovery. Admin, auth, and internal routes are excluded from indexing.

### Metadata

- Every public page has unique, descriptive title and meta description
- Open Graph and Twitter Card metadata are required on public pages
- Canonical URLs prevent duplicate content issues

### Structure

- Clean, hierarchical URL structure
- Human-readable slugs
- Breadcrumb navigation on deep pages where appropriate

### Structured Data

Public catalog content uses appropriate Schema.org markup (products, collections, breadcrumbs, organization).

### Content Quality

- Headings reflect content structure — not keyword stuffing
- Image alt text describes content accurately
- Empty or thin pages are not indexed

### Technical SEO

- Sitemap and robots directives are maintained
- Pagination and filter states handle indexing thoughtfully — avoid infinite duplicate URLs
- Performance directly supports SEO — slow pages are a SEO failure

### Internationalization

If multiple locales are supported, hreflang and locale-specific metadata are required.

Detailed page-level SEO specifications belong in feature documents (`HOME.md`, `PRODUCT.md`, etc.).

---

## 15. Animation Rules

### Purpose

Animation communicates state change, direction, or hierarchy — never decorates for its own sake.

### Subtlety

Motion is restrained. Kurated feels calm and confident, not flashy.

### Duration

- Micro-interactions: short (typically under 200ms)
- Transitions: moderate (200–400ms)
- Complex entrance animations: rare and justified

### Performance

- Animate `transform` and `opacity` preferentially
- Layout-thrashing animations are forbidden
- Animations must not cause jank on low-end devices

### Reduced Motion

When `prefers-reduced-motion: reduce` is active, non-essential animation is disabled. Essential feedback may use instant state change instead.

### Loading

Loading states use skeletons or subtle indicators — not distracting spinners covering entire pages unless necessary.

### Consistency

Animation timing and easing come from defined tokens — not ad-hoc values per component.

---

## 16. Responsive Rules

### Mobile First

Design and build from the smallest supported viewport upward.

### Supported Range

Kurated supports viewports from **320px** to large desktop displays. Horizontal scrolling caused by layout failure is unacceptable.

### Breakpoints

Breakpoints come from the design system — not arbitrary per-component values. Components adapt at defined breakpoints only.

### Touch Targets

Interactive elements meet minimum touch target size (44×44 CSS pixels) on touch devices.

### Content Priority

On smaller screens, content priority determines what appears first — not uniform scaling down of desktop layouts.

### Navigation

Mobile navigation is fully usable without hover-dependent interactions. Admin navigation remains accessible on tablet and mobile.

### Images and Media

Images reflow gracefully. Critical content never depends on hover-only image reveals on touch devices.

### Testing

Responsive behavior is verified at minimum, standard, and large breakpoints before release.

---

## 17. Security Rules

### Defense in Depth

Security is layered: infrastructure, application, data, and process.

### Secrets

- Secrets never appear in source code, commits, or client bundles
- Environment variables are validated at startup
- `.env` files are never committed

### Authentication

- Use established authentication solutions — custom auth is forbidden
- Sessions are secure, httpOnly, and time-limited appropriately
- Password and token handling follows provider best practices

### Authorization

- Role-based access control for admin functions
- Every protected route and action verifies permissions server-side
- UI hiding is not security

### Input and Output

- All user input is validated and sanitized server-side
- Rich content is sanitized before storage and render
- Output encoding prevents XSS

### Headers and Transport

- HTTPS in production — always
- Security headers are configured at the application level
- Content Security Policy is defined and maintained as features evolve

### File Uploads

- Validate type, size, and content
- Store in object storage — not local filesystem in production
- Serve uploaded content from isolated domains or paths where appropriate

### Rate Limiting and Abuse

Auth, search, and AI endpoints are protected against abuse. Suspicious activity is logged.

### Dependencies

- Lockfiles are committed
- Critical vulnerabilities block deployment
- Dependencies are kept current through automated monitoring

### Privacy

- Collect only necessary data
- Provide privacy disclosures where required
- Support data export and deletion where applicable by law

### AI Security

- API keys remain server-side
- Prompt injection vectors are mitigated
- AI outputs are treated as untrusted until validated

Detailed security requirements for specific features belong in `docs/ADMIN.md` and `docs/AI.md`.

---

## 18. Git Commit Conventions

### Format

All commits follow **Conventional Commits**:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Use When |
|------|----------|
| `feat` | New feature or user-facing capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change that neither fixes nor adds feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance, deps, config, tooling |
| `ci` | CI/CD changes |
| `build` | Build system or external dependency changes |
| `revert` | Reverts a previous commit |

### Scope

Scope is optional but encouraged. Use feature or area name:

- `feat(products): add collection filter`
- `fix(admin): correct pagination on product list`
- `docs: update MASTER constitution`

### Subject Rules

- Imperative mood: "add" not "added" or "adds"
- Lowercase, no trailing period
- Maximum 72 characters
- Describes **what** and **why** briefly — not implementation detail

### Body

Include body when the change needs context: motivation, trade-offs, breaking changes, migration steps.

### Breaking Changes

Breaking changes are marked in the footer:

```
BREAKING CHANGE: description of what broke and how to migrate
```

Breaking changes require explicit review and documentation update.

### Atomic Commits

One logical change per commit. Do not mix unrelated changes.

### Commit Quality

- Every commit must leave the project in a buildable state
- Work-in-progress commits are squashed before merge to main
- Commit messages are written for future contributors — not just the author

### Branch Naming

```
<type>/<short-description>
```

Examples: `feat/product-search`, `fix/admin-auth-redirect`, `docs/master-constitution`

### Pull Requests

- Reference related issues or docs when applicable
- Describe what changed and why
- Confirm constitution compliance for significant changes

---

## Governance

### Amendment Process

Changes to this constitution require:

1. Written proposal with rationale
2. Review by project maintainers
3. Update to this document with date and summary of change
4. Communication to all active contributors

Casual violation is corrected. Repeated violation is addressed before new work proceeds.

### Relationship to Other Documents

| Document | Role |
|----------|------|
| `MASTER.md` | Permanent rules — this document |
| `PRODUCT.md` | What to build |
| `DATABASE.md` | Data model specification |
| `ADMIN.md` | Admin feature specification |
| `AI.md` | AI feature specification |
| `HOME.md` | Home page specification |
| `ROADMAP.md` | Timeline and priorities |
| `PROJECT_ANALYSIS.md` | Point-in-time technical audit |

When specifications conflict with MASTER, MASTER prevails until formally amended.

### Compliance

Every contributor — human or AI — must read this document before writing code. Pull requests that violate the constitution are rejected regardless of functionality.

---

**Established:** July 21, 2026  
**Version:** 1.0.0

*This is the constitution of Kurated. Build accordingly.*
