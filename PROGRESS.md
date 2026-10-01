# Torquewell Auto — Build Progress

## Current Phase
Phase 2 — Brand & Home Hero (Completed)

---

## Completed Phases
- **Phase 0 — SETUP ONLY** (`6e1cac9`)
  - Scaffolded Vite 6 + React 19 + TypeScript strict project.
  - Installed all core dependencies (React Router 7, Tailwind CSS v4, Radix UI, Framer Motion, GSAP, Lenis, Zustand, i18next, Zod, react-hook-form, cmdk, fuse.js, Vitest, Testing Library).
  - Configured design tokens (`tokens.css`, `globals.css`, `print.css`) for both Dark ("Bay Night") and Light ("Shop Paper") themes.
  - Self-hosted font imports configured for Familjen Grotesk, Public Sans, DM Mono, and Noto Sans Devanagari.
  - Created `src/types.ts` type contracts and `src/config/site.ts`.
  - Implemented `src/lib/units.ts` (with 100% passing Vitest test suite).
  - Created i18n skeleton with English and Hindi dictionary namespaces and `check:i18n` verification script.
  - Implemented client router with all 27 routes lazy-loaded under a minimal `RootLayout` shell with semantic landmarks.
  - Implemented compliance scripts (`check:denylist.js` with denylist definitions).
  - Created stubs: `README.md`, `SOURCES.md`, `assets/manifest.json`, `.env.example`, `.gitignore`.
  - Verified: install ✔, typecheck ✔, lint ✔, build ✔, dev server boots ✔, tests run ✔.

- **Phase 1 — Foundation & Help-First** (`25c8ba9`)
  - Built core UI design-system primitives: `Button` (with pill/notched variants), `Badge` (urgency states: Now, Soon, Watch, OK), `Card` (surface elevation, notched tool-tag corner), `Logo` (torque click & 5-point bolt pattern).
  - Implemented global `Header` with persistent, prominent "Help now" and "Book" pills reachable in 1 click across every route.
  - Implemented `GlobalControls` (independent Units toggle KM/MI, Language toggle EN/HI, Theme toggle Dark/Light, and Calm Mode toggle).
  - Implemented `ConsentGate` modal capturing language, units, motion, and local storage consent without external trackers.
  - Built `FloatingLauncher` on mobile viewports providing instant roadside calling and symptom guide triage.
  - Implemented comprehensive `Footer` with site map, workshop branch addresses, operating hours, legal policy summaries, and mandatory safety line.
  - Built dedicated, ultra-fast `Help` page (`/help`) with 1-click dialling, 4-step stop safely checklist, do-not-attempt warnings, operator call guide, recovery transport explainers, EV-specific safety rules, and workshop branch listings.
  - Added test suite: `tests/help.test.tsx` and updated `tests/smoke.test.tsx` (all 8 tests passing).
  - Quality gates: typecheck ✔, lint ✔, build ✔, denylist ✔, i18n ✔.

- **Phase 2 — Brand & Home Hero** (`Pending commit`)
  - Generated complete brand deliverables bundle: `logo-primary.svg`, `logo-mark.svg`, `logo-mono-dark.svg`, `logo-mono-light.svg`, `logo-stacked.svg`, animated `logo-click.svg` (72° ratchet rotation with click flash), `favicon.svg` (adaptive), `favicon.ico`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `safari-pinned-tab.svg`, and updated `site.webmanifest`.
  - Authored hero cinematic workshop vector asset (`hero-01.svg`) with hydraulic lift platform, task lighting blooms, calibrated torque dial readout (140 N·m · CLICK VERIFIED), and live bay calibration tag.
  - Built Home Hero section with primary H1 value proposition ("The garage that shows the evidence before a spanner is turned."), 4 quick-action triage route tiles, trust markers strip, and Click Guarantee value architecture.
  - Implemented motion choreography: `InitialLoader` (lug-nut ring rotation + click flash, auto-dismissed on repeat/help visits), `PageTransition` (tick-scale sweep + content settle), `TorqueCursor` (fine-pointer torque dial follower with needle deflection), and `ScrollProgress` (left-edge calibrated click-mark ruler + mobile top strip).
  - Registered all brand and hero assets in `assets/manifest.json`.
  - Added unit test suite `tests/home.test.tsx` and updated `tests/smoke.test.tsx` (9 tests passing).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

---

## Next Phase
**Phase 3 — Symptom & Warning-Light Guide (highest utility)**
Scope from File 08:
- Implement comprehensive rule table and red-flag decision logic ("Can I still drive it?").
- Create original redraw warning-light vector icons (16 lights on 48px grid, non-OEM artwork).
- Multi-step interactive guided triage flow producing instant urgency ratings (Now / Soon / Watch).
- Symptom Sheet downloadable/printable PDF generation (EN & HI) for driver to present to any mechanic.
- Safety rule tests validating that critical hazards (brakes, steering, red lights, high-voltage) always trigger roadside stop warnings.

---

## Decisions & Assumptions
- **Procedural Cinematic Hero:** Conforming to File 08 Section 1 fallback guidelines, the cinematic hero utilizes layered SVG with tread-pattern tiles, task-light radial blooms, and calibrated torque dials to ensure 100% crispness across all DPRs with sub-millisecond load times.
- **Motion Safety:** InitialLoader is suppressed during Calm Mode, Reduced Motion, repeat session visits, and on the emergency `/help` route to guarantee instantaneous access.
- **Scroll Ruler:** Positioned along the left viewport edge with tick marks matching the torque-wrench dial motif, dynamically responding to scroll progress and disabled in Calm Mode.

---

## Open Questions / [VERIFY] Items
- Confirm if client has preferred regional emergency recovery partners for specific telephone hotlines in production deployment.

---

## Known Issues
- None. Build, lint, typecheck, tests, denylist, and i18n are 100% green.
