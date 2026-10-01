# Torquewell Auto — Build Progress

## Current Phase
Phase 3 — Symptom & Warning-Light Guide (Completed)

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

- **Phase 2 — Brand & Home Hero** (`6784a3d`, `656d3e4`)
  - Generated complete brand deliverables bundle: `logo-primary.svg`, `logo-mark.svg`, `logo-mono-dark.svg`, `logo-mono-light.svg`, `logo-stacked.svg`, animated `logo-click.svg` (72° ratchet rotation with click flash), `favicon.svg` (adaptive), `favicon.ico`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `safari-pinned-tab.svg`, and updated `site.webmanifest`.
  - Authored hero cinematic workshop vector asset (`hero-01.svg`) with hydraulic lift platform, task lighting blooms, calibrated torque dial readout (140 N·m · CLICK VERIFIED), and live bay calibration tag.
  - Built Home Hero section with primary H1 value proposition ("The garage that shows the evidence before a spanner is turned."), 4 quick-action triage route tiles, trust markers strip, and Click Guarantee value architecture.
  - Implemented motion choreography: `InitialLoader` (lug-nut ring rotation + click flash, auto-dismissed on repeat/help visits), `PageTransition` (tick-scale sweep + content settle), `TorqueCursor` (fine-pointer torque dial follower with needle deflection), and `ScrollProgress` (left-edge calibrated click-mark ruler + mobile top strip).
  - Redesigned Navbar under the **Antigravity Design Philosophy**: eliminated the "Navbar River", implemented a detached floating pill container (`backdrop-blur-xl`), 90% priority waypoints, consolidated Globe (Language/Units) and Settings (Theme/Calm) dropdowns, live interactive `⌘K` Command Search palette with instant filtering, singular primary CTA (`Book`), and featherweight "Looking Cursor" (`656d3e4`).
  - Registered all brand and hero assets in `assets/manifest.json`.
  - Added unit test suite `tests/home.test.tsx` and updated `tests/smoke.test.tsx` (9 tests passing).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

- **Phase 3 — Symptom & Warning-Light Guide** (`95155ee`)
  - Authored 16 original redraw warning-light vector icons on a 48px grid (non-OEM, non-trademarked): oil pressure, engine temp, brake system, battery charging, power steering, airbag SRS, check engine, ABS, tyre pressure TPMS, traction ESP, diesel glow plug, DPF exhaust, coolant level, transmission gearbox, EV high voltage, and service due.
  - Built transparent, deterministic safety decision engine in `src/data/guide-rules.ts`: red-flag hazard check (soft brakes, steering loss, oil light, steam, fuel odour, EV thermal), multi-factor triage logic, and strict-safety priority resolution.
  - Implemented interactive 5-step wizard in `src/routes/Guide.tsx` ("Can I still drive it?") with real-time symbol search filter, vehicle powertrain context, trigger selector, urgency badge, calibrated areas for technician inspection, and "What to tell your mechanic".
  - Created printable/downloadable `SymptomSheet.tsx` modal supporting both English and Hindi, complete with 1-click clipboard summary and A4 print/PDF output.
  - Added "How this decision logic works" transparency drawer explaining the deterministic rules.
  - Registered all 16 warning light icons in `assets/manifest.json`.
  - Created automated test suite `tests/guide.test.tsx` (13 tests green across 5 test suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

---

## Next Phase
**Phase 4 — Drive-In to Drive-Out + Home story**
Scope from File 08:
- Generic car silhouette SVG layers (8 layers: chassis, wheels, brakes, suspension, engine, electrics, exhaust, body).
- GSAP ScrollTrigger pinned scene + story milestones (9 stages) with callouts and evidence chips.
- Static fallback & mobile tier (ordered list with callouts for reduced-motion and mobile).
- Integration into Home story flow.

---

## Decisions & Assumptions
- **Red-Flag Absolute Safety:** Any critical red flag (hydraulic brake loss, steering lock, oil pressure, high-voltage) immediately locks the safety level to `STOP` without allowing secondary comfort choices to downgrade the severity.
- **Persistent Disclaimer:** The mandatory safety disclaimer (*"Indicative only · Not a diagnosis or quotation · An in-person technician inspection and written estimate come first"*) is fixed across every step of the Guide and embedded within the Symptom Sheet.
- **Zero Network Calls:** The entire triage rule engine runs 100% locally in-browser for instantaneous offline availability during roadside emergencies.

---

## Open Questions / [VERIFY] Items
- Client to confirm if a specific local breakdown dispatch partner integration or telephone number is preferred for production.

---

## Known Issues
- None. Build, lint, typecheck, tests, denylist, and i18n are 100% green.
