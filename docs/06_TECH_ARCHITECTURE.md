# 06 · TECH ARCHITECTURE — Torquewell Auto

## 1. Stack & Versions
> Pin exact versions at install time (latest stable). Minimum majors below. **[VERIFY at install]**.
| Layer | Choice | Min major |
|---|---|---|
| Build | Vite | 6 |
| UI | React + TypeScript (strict) | React 19, TS 5.6 |
| Routing | React Router (data router) | 7 |
| Styling | Tailwind CSS + CSS variables (tokens from File 02) | 4 |
| Components | shadcn/ui (Radix) | latest |
| Motion | `motion` (Framer Motion), GSAP + ScrollTrigger, Lenis | 12 / 3.12 / 1.x |
| 3D (optional, lazy) | three + @react-three/fiber + drei | r170+/9 |
| Charts/gauges | custom SVG (preferred) or visx | latest |
| State | Zustand | 5 |
| i18n | i18next + react-i18next | 24+ |
| Units | `lib/units.ts` (km/mi, mm/in, bar/psi, L/gal, °C/°F) + unit tests | — |
| Search | Fuse.js | 7 |
| Command palette | cmdk | 1 |
| Forms | react-hook-form + zod | 7 / 3 |
| PDF (lazy) | @react-pdf/renderer (fallback jsPDF) | latest |
| ICS | `ics` (client-side) | latest |
| Testing | Vitest + Testing Library, Playwright (+ axe-core) | latest |
| Quality | ESLint (typescript-eslint, jsx-a11y), Prettier, Husky, lint-staged | latest |
| PWA | vite-plugin-pwa (offline Help page + Guide) | latest |
| Hosting | Static (Vercel/Netlify/Cloudflare Pages) | — |

## 2. Folder Structure
```
/
├─ public/            fonts/, img/, og/, favicons/, manifest
├─ docs/              01…08 spec files, WALKTHROUGH_SCRIPT.md
├─ src/
│  ├─ config/         site.ts, nav.ts, seo.ts, flags.ts
│  ├─ i18n/           index.ts, en/*.json, hi/*.json, ar-stub/*.json
│  ├─ data/           services.ts, packages.ts, guide-rules.ts, lights.ts, symptoms.ts, journey.ts,
│  │                  proof-report.ts, pricing.ts, milestones.ts, people.ts, bays.ts, branches.ts,
│  │                  articles/*.mdx, portal.ts, glossary.ts, faq.ts, jobs.ts
│  ├─ types.ts        shared contracts (§3)
│  ├─ routes/         one file per page (lazy)
│  ├─ layouts/        RootLayout, PortalLayout
│  ├─ components/     ui/ (shadcn), shell/, motion/, charts/, features/<feature>/
│  ├─ hooks/          useMotionPref, useLocale, useTheme, useUnits, useDeviceTier, useCommandPalette
│  ├─ lib/            utils.ts, units.ts, seo.ts, pdf/, ics.ts, analytics-stub.ts, a11y.ts
│  ├─ store/          prefs.ts, guide.ts, booking.ts, board.ts, portal.ts, pricing.ts
│  ├─ styles/         tokens.css, globals.css, print.css
│  └─ main.tsx, App.tsx
├─ tests/             unit/, e2e/, a11y/
├─ assets/manifest.json
├─ PROGRESS.md · SOURCES.md · README.md
└─ vite.config.ts · tailwind.config.ts · tsconfig.json · playwright.config.ts
```

## 3. TypeScript Type Contracts (`src/types.ts`)
```ts
export type Locale = 'en' | 'hi';
export type UnitSystem = 'metric' | 'imperial';
export type I18n = { en: string; hi: string };
export type Urgency = 'now' | 'soon' | 'watch' | 'ok';
export type Powertrain = 'petrol' | 'diesel' | 'hybrid' | 'ev';

export interface SiteConfig { brandName: string; tagline: I18n; leadPersonId: string;
  branches: { id: string; name: string; region: string }[]; phone: string; roadsidePhone: string;
  locales: Locale[]; defaultUnits: UnitSystem; currency: string; labourRate: number; indexable: boolean; }

export interface Service { slug: string; name: I18n; summary: I18n; icon: string; image: string; covers: I18n[]; signs: I18n[];
  checks: I18n[]; timeRangeMin: [number, number]; priceBand: [number, number]; partsOptions: string[]; askUs: I18n[]; related: string[]; }

export interface Package { id: string; name: I18n; included: I18n[]; notIncluded: I18n[]; timeRangeMin: [number, number];
  priceBand: [number, number]; assumptions: I18n[]; appliesTo: Powertrain[]; }

export interface GuideState { redFlags: string[]; powertrain: Powertrain; ageBand: string; mileageKm: number; symptoms: string[];
  lights: string[]; triggers: string[]; duration: '<1d'|'1-7d'|'>1w'; recent: string[]; locale: Locale; }
export interface GuideRule { id: string; when: (s: GuideState) => boolean; level: GuideResult['level']; priority: number; areas: string[]; }
export interface GuideResult { level: 'stop'|'careful'|'week'|'routine'|'info'; areas: I18n[]; note: I18n[]; ask: I18n[]; bring: string[]; disclaimerId: string; }

export interface JourneyStage { id: string; title: I18n; ownerRole: string; youReceive: I18n[]; youDecide?: I18n; durationRange: { minMin: number; maxMin: number }; }
export interface RepairJob { id: string; stage: string; updatedAt: string; note?: I18n; waitingOnCustomer?: boolean; }

export interface Finding { id: string; system: string; title: I18n; urgency: Urgency;
  measured?: { value: number; min: number; unit: 'mm'|'bar'|'V'|'%' }; photos: string[]; why: I18n; ifWait: I18n; options: I18n[] };
export interface PriceLine { findingId: string; labourHours: [number, number];
  parts: Record<'oe'|'oeq'|'aftermarket'|'reman', [number, number]>; consumables: [number, number]; disposal: [number, number];
  warrantyMonths: Record<string, number>; currency: string; }

export interface Milestone { id: string; title: I18n; basis: 'distance'|'time'|'condition'; everyKm?: number; everyMonths?: number;
  appliesTo: Powertrain[]; costBand: [number, number]; canWait: I18n; why: I18n; }

export interface Bay { id: string; name: I18n; polygon: number[][]; equipment: I18n[]; leadIds: string[]; headcount: number; }
export interface Person { id: string; name: string; role: I18n; kind: 'founder'|'manager'|'master'|'tech'|'ev-tech'|'apprentice'|'advisor'|'parts';
  branch: string; bay?: string; reportsTo?: string; languages: string[]; trainingPlaceholders: string[]; bio: I18n; portrait: string; }
export interface Branch { id: string; name: string; hours: string; services: string[]; evCharging: boolean; accessibility: I18n[]; }

export interface Article { slug: string; tags: string[]; title: I18n; layers: { s30: I18n; m3: I18n; deep: I18n };
  diagram?: string; glossary: string[]; askMechanic: I18n[]; sources: string[]; reviewedOn: string; }

export interface LogEntry { id: string; date: string; mileageKm: number; title: I18n; findings: string[]; invoiceId?: string; evidence: string[]; }
export interface FleetVehicle { id: string; label: string; nextDue: string; status: 'ok'|'due'|'in-shop'; downtimeDays: number; }
export interface AssetEntry { id: string; path: string; prompt?: string; size: string; status: 'generated'|'fallback'|'pending'; alt: I18n; }
```

## 4. Routing & Transition Mechanics
- Data router with **lazy route modules**; prefetch on hover/focus/idle.
- `/:locale/*` prefix; `/` redirects to detected locale.
- Transition wrapper (`AnimatePresence` + click-through overlay) waits ≤ 700ms for module readiness.
- On route change: scroll top/hash, set `document.title`, focus `main h1`, announce via live region.
- `/help`, `/privacy`, `/terms`, `/contact`, `/book` bundled in main chunk (minimal deps).

## 5. Rendering & Loading Strategy
- SPA + **prerendering** of static routes for SEO/LCP **[VERIFY tool at scaffold]**.
- Critical CSS inlined; fonts preloaded (Familjen Grotesk subset, Public Sans 400/600).
- Images: AVIF + WebP + JPEG fallback, `srcset` 480/768/1200/1920, LQIP, lazy below fold.
- Heavy libs (GSAP, three, react-pdf) dynamically imported per feature.
- Service worker: precache shell + `/help` + Guide; stale-while-revalidate for rest.

## 6. Theming, Units & i18n Mechanics
- CSS variables on `:root[data-theme]`; "Auto" follows `prefers-color-scheme`.
- Global unit system: all numbers pass through `formatDistance()`, `formatLength()`, `formatPressure()`, `formatVolume()`, `formatTemp()`, `formatMoney()`; tests assert round-trips and precision (mm 1 dp for pads/tread; in 2 dp).
- i18n namespaces per page; CI fails on missing keys (`check:i18n`).
- Logical CSS properties everywhere; `dir` from locale config; Devanagari fonts only for `hi`.

## 7. State Management
| Store | Contents | Persistence |
|---|---|---|
| `prefs` | locale, theme, motion, textSize, units, consent | `localStorage` only after consent |
| `guide` | `GuideState`, step, result | `sessionStorage` |
| `pricing` | selected findings, parts tier | `sessionStorage` |
| `booking` | mock booking draft | in-memory |
| `board` | simulated jobs | in-memory |
| `portal` | session flag | `sessionStorage` |
Server state: none (static imports).

## 8. Security & Privacy Posture
- No third-party scripts/trackers; strict **CSP** (script-src 'self'; connect-src 'self'; img-src 'self' data:); `Referrer-Policy: no-referrer`; `Permissions-Policy` denies camera/mic/geolocation.
- Forms validate client-side (zod); no network calls; data notice displayed. Plate/VIN inputs accept formatted plates and never trigger lookups.
- Analytics stub (`track()` no-op) for white-label swap.
- `npm audit` in CI; lockfile committed; Dependabot/Renovate stub.
- Build-time `check:denylist` scans all strings/assets manifest for real vehicle-manufacturer names/logos, accreditation bodies' marks, and review-platform names (`scripts/denylist.txt`); fails on hits (plain-text "most makes" wording is the allowed pattern).

## 9. Scripts, README, White-Label Readiness
**npm scripts:** `dev`, `build`, `preview`, `typecheck`, `lint`, `format`, `test`, `test:e2e`, `test:a11y`, `lhci`, `check:i18n`, `check:denylist`, `assets:manifest`, `prerender`.
**README must include:** project overview · quick start · scripts · folder map · rebrand guide · adding a service/article/milestone · i18n workflow · units system · asset generation workflow · performance budgets · accessibility checklist · compliance disclaimer (File 01 §5) · font/library licences.
**White-label:** rebranding needs only `config/site.ts`, `tokens.css`, `/public/img`, logos, and i18n JSON; no brand strings hard-coded (lint + denylist tests).
