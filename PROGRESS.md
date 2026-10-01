# Torquewell Auto — Build Progress
## Current Phase
Phase 8 — Bay Crew, Locations & Careers (Completed)

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

- **Phase 4 — Drive-In to Drive-Out + Home Story** (`f3fd642`)
  - Generic car silhouette vector assets created: base blueprint coordinate frame (`public/img/car/base.svg`) and 8 discrete exploded SVG layers in `public/img/car/layers/` (`chassis.svg`, `wheels.svg`, `brakes.svg`, `suspension.svg`, `engine.svg`, `electrics.svg`, `exhaust.svg`, `body.svg`) aligned to a 960x480 canvas.
  - Authored 9-stage journey dataset in `src/data/drive-story.ts` with checks, milestones, technician actions, and evidence tokens in both English and Hindi.
  - Built interactive `DriveInStory.tsx` component with stage-driven exploded car layer isolation, animated callout markers, step progress tracker, and interactive layer toggle pills.
  - Full first-class accessibility: static ordered-list fallback rendered seamlessly when Calm Mode or reduced-motion is enabled, with all verification tokens and checks preserved.
  - Connected complete Home story flow in `src/routes/Home.tsx` featuring the interactive Drive-In story, Proof Report teaser, Fair-Price model preview, Mileage Map preview, Bay Crew spotlight, EV/Fleet capabilities, and final booking CTA.
  - Registered all 9 car diagram vector assets in `assets/manifest.json`.
  - Added unit test suite `tests/story.test.tsx` and updated `tests/setup.ts` and `tests/smoke.test.tsx` (all 16 tests passing across 6 suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

- **Phase 5 — Proof Report + Fair-Price Breakdown** (`9894468`)
  - Created 8 high-fidelity vector inspection diagrams in `public/img/proof/`: worn brake pad (2.5 mm), new brake pad (12.0 mm), worn brake disc rotor (20.4 mm with lip), new precision ground disc (24.0 mm), worn tyre tread (3.1 mm), new tyre tread (8.0 mm), digital battery conductance tester (12.4V / 78% SOH), and digital hydraulic brake fluid boiling tester (158°C).
  - Authored realistic inspection reports in `src/data/proof-reports.ts` covering 3 vehicles: `TW68 AKZ` (Compact Hatchback), `TQ21 NXR` (Tourer Estate), and `TW24 HYB` (EcoPulse Hybrid) with micrometer measurements, urgency ratings, and bilingual EN/HI findings.
  - Built interactive `DonutSummary.tsx` SVG chart with center stats, click-to-filter urgency slices, and accessible screen-reader tables.
  - Built `MeasurementGauge.tsx` illustrating measured values against safe discard limits and nominal specs with delta badges.
  - Built `PhotoCompareModal.tsx` for side-by-side comparison between the customer's worn component and factory benchmark new parts.
  - Built `FindingCard.tsx` with "Explain Simply" plain-language toggle, "Show me the part" visual evidence trigger, and deep-link to the Fair-Price calculator.
  - Built `ProofReportPdfModal.tsx` for clean A4 printing, PDF saving, and clipboard summary copy.
  - Built transparent `FairPriceEstimator.tsx` in `src/components/prices/` featuring 3 parts tiers (TorqueSpec OE, OE-Equivalent, Quality Aftermarket) with warranty terms, "Only what's needed now" toggle that excludes Soon/Watch items in real time, stacked cost distribution visual (Labour, Parts, Consumables, VAT), line-item calculation table, "What could change this" transparency cards, "What can safely wait" advice, and "5 Questions to Ask Any Garage" consumer protection checklist.
  - Implemented full routes in `src/routes/Proof.tsx` and `src/routes/Prices.tsx`.
  - Registered all 8 proof diagram vector assets in `assets/manifest.json`.
  - Added unit test suites `tests/proof.test.tsx` and `tests/prices.test.tsx` (all 26 tests passing across 8 suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

- **Phase 6 — Services, Service Menu & Booking** (`915fa2e`)
  - Created complete 14 workshop services catalog in `src/data/services.ts` covering Logbook Service, Brakes, Tyres, Suspension, Diagnostics, Clutch, A/C, Battery, Exhaust, Cooling, Hybrid/EV, Pre-Purchase, Inspection Prep, and Fleet, with technical checks, educational signs, and indicative time/price bands.
  - Authored fixed-scope Service Menu packages in `src/data/packages.ts` (Essential Interim, Comprehensive Full, Signature Major) with honest "What is Included" vs "What is NOT Included" transparency and side-by-side comparison criteria matrix.
  - Implemented standard iCalendar `.ics` generator in `src/lib/ics.ts` with local appointment download.
  - Built interactive Services listing page (`src/routes/Services.tsx`) with category filtering (Routine, Safety, Powertrain, Specialty) and keyword/symptom search.
  - Built ServiceDetail deep-dive page (`src/routes/ServiceDetail.tsx`) with breadcrumbs, coverage checklists, symptom indicators, technician lift checks, questions to ask us, and 1-click booking triggers.
  - Built fixed-scope Service Menu page (`src/routes/Menu.tsx`) with 3 package tiers, honest exclusion lists, and interactive comparison matrix table.
  - Built 4-step interactive Booking Stepper Wizard (`src/routes/Book.tsx`) with vehicle details, service bay pre-selection, branch/date/slot picker, written authorization consent, verified confirmation pass, and calendar `.ics` download.
  - Added unit test suites `tests/services.test.tsx`, `tests/menu.test.tsx`, and `tests/book.test.tsx` (all 32 tests passing across 11 suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔, check:i18n ✔.

- **Phase 7 — Bay Board + Mileage Map** (`0456a65`)
  - Authored `src/data/bay-board.ts` with 4 active bay repair jobs (`TW68 AKZ`, `TQ21 NXR`, `TW24 HYB`, `TW72 FLT`), technician calibration IDs, live telemetry lines, and 9 journey stage profiles with SMS/Email notification previews.
  - Authored `src/data/mileage-map.ts` with 18 comprehensive engineering milestones spanning 0 to 160,000 km across Petrol, Diesel, Hybrid, and EV powertrains, including time/distance/condition basis flags, cost bands, consequences of neglect, and "What can safely wait" advice.
  - Built interactive Bay Board page (`src/routes/Journey.tsx`) featuring 4 active bay cards, progress percentages, elapsed vs total estimated duration, live telemetry logs, "Simulate Bay Progress" step button with real-time toast alerts, customer approval simulator, and high-contrast full-screen TV / Kiosk display mode.
  - Built 9-Stage Standard Repair Journey interactive accordion drawers on `/journey` with technician owner roles, received deliverables, and customer decision requirements.
  - Built interactive Mileage Map page (`src/routes/MileageMap.tsx`) with asphalt highway SVG road canvas, dynamic vehicle location indicator, interactive milestone node pins, odometer range slider with quick presets, powertrain switch, and metric/imperial distance unit toggling.
  - Built `RoadmapPdfModal.tsx` for printable Service Roadmap export and calendar event `.ics` download for any milestone.
  - Built "The Science of What Can Safely Wait" 3-card educational breakdown (Time-Based, Distance-Based, Condition-Based).
  - Added unit test suites `tests/journey.test.tsx` and `tests/mileagemap.test.tsx` (all 39 tests passing across 13 suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔.

- **Phase 8 — Bay Crew, Locations & Careers**
  - Created `src/data/crew.ts` defining 7 workshop zones and 10 technician personnel spanning Founder, Master Techs, EV Specialists, Apprentices, and Service Advisors, complete with spoken languages and compliance training placeholders.
  - Created `src/data/branches.ts` documenting 3 regional workshop facilities (Central, North, South EV) with bay counts, operating hours, equipment inventories, DC fast charging specs, and accessibility details.
  - Created `src/data/careers.ts` detailing 4 culture pillars (Zero upsell commissions, calibrated tool allowance, 100% funded EV sponsorship, 4-day work week), 4-year apprentice progression roadmap, and 4 transparent vacancies with salary bands (£22k–£58k).
  - Built interactive The Bay Crew page (`src/routes/Crew.tsx`) with blueprint workshop SVG floor plan, accessible `role="tree"` technical hierarchy with keyboard navigation, team search filter, and crew member profile drawer.
  - Built interactive Workshop Locations page (`src/routes/Locations.tsx`) with regional SVG map, interactive branch pin markers, equipment inspection, and accessibility accommodations.
  - Built interactive Careers & Apprenticeships page (`src/routes/Careers.tsx`) with 4-year apprentice roadmap year stepper, issued tooling specs, vacancy details, and online application modal with confirmation reference.
  - Added automated unit test suites `tests/crew.test.tsx`, `tests/locations.test.tsx`, and `tests/careers.test.tsx` (all 48 tests passing across 16 test suites).
  - Quality gates: typecheck ✔, lint ✔, test ✔, build ✔, check:denylist ✔.

---

## Next Phase
**Phase 9 — Garage Portal (Feature 06)**
Scope from File 08:
- Portal Shell (`/portal`): client Sam Carter (`TW68 AKZ`) dashboard, vehicle logbook timeline with evidence attachments, pending approvals (1-click mock authorisation), downloadable invoices, maintenance reminders, and business Fleet management tab.

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
