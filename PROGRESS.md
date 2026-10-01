# Torquewell Auto — Build Progress

## Current Phase
Phase 0 — SETUP ONLY (Completed)

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

---

## Next Phase
**Phase 1 — Foundation & Help-First**
Scope from File 08:
- Implement core design-system components and UI building blocks.
- Build sticky Header with persistent "Stuck? Help now" and "Book" pills, and comprehensive Footer.
- Implement first-visit Consent Gate and Theme / Language / Units / Calm controls.
- Build the dedicated `/help` (Stuck? Help now) page with rapid loading and offline readiness.
- Ensure safety disclaimer line is present everywhere, and Help is reachable within 1 click on every route.

---

## Decisions & Assumptions
- **Removal of "demo" across project:** Per explicit user directive, all traces of "demo" were purged from the 8 specification files and project setup. Customer persona is defined as Sam Carter (`TW68 AKZ`), demo banners are disabled, and all disclaimers reflect a production garage experience.
- **Tailwind v4 with `@tailwindcss/vite`:** Configured modern Tailwind v4 `@theme` mappings referencing CSS variables in `tokens.css`.
- **Testing:** Vitest with jsdom and `@testing-library/react` verifies units conversion/formatting roundtrips and smoke test rendering.

---

## Open Questions / [VERIFY] Items
- Client to supply production phone numbers (defaults currently set to `+44 800 876 5432` / `+44 800 876 5433`).
- Specific regional trade body certifications to be linked once client confirms accreditation registration IDs.

---

## Known Issues
- None. All quality gates (typecheck, lint, build, test, dev server) pass cleanly with zero warnings or errors.
