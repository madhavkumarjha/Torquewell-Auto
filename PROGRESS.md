# Torquewell Auto — Build Progress

## Current Phase
Phase 1 — Foundation & Help-First (Completed)

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

---

## Next Phase
**Phase 2 — Brand & Home Hero**
Scope from File 08:
- Generate complete logo & favicon asset bundle (`logo-primary.svg`, `favicon.svg`, webmanifest, apple touch icons).
- Implement Home hero section with primary H1 value proposition and 4 quick-route cards (Can I still drive it?, Stuck? Help now, See the proof, Book a check).
- Implement "Click-through" page transitions with torque tick-scale sweep and subtle settled notch.
- Build initial page loader with rotating lug-nut ring and tactile click flash.
- Implement torque-dial cursor follower (with automatic touch and reduced-motion fallback) and vertical click-mark scroll progress ruler.

---

## Decisions & Assumptions
- **Persistent Pills:** "Help now" and "Book" pills remain sticky and fixed in the header and mobile launcher on every route, guaranteeing ≤ 1-click access from anywhere on the site.
- **Calm Mode:** Integrated directly into `prefs.ts` and `GlobalControls`; when activated, it immediately disables motion, increases text scaling, and simplifies visuals for stressed users.
- **Emergency Helpline Styling:** Styled with distinct `--critical` red palette, bold typography, and direct `tel:` linking for immediate single-tap calling.

---

## Open Questions / [VERIFY] Items
- Client to confirm if a specific local breakdown dispatch partner integration or telephone number is preferred for production.

---

## Known Issues
- None. Build, lint, typecheck, and test suites are 100% green.
