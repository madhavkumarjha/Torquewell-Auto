# Torquewell Auto

> **Proof, not promises.**  
> A transparency-first digital experience for an independent multi-bay garage network.

---

## 1. Project Overview
Torquewell Auto removes the single biggest fear in car repair — *"Am I being overcharged, or told to fix things I don't need?"* — by showing the work, the evidence, and the price logic *before* a spanner is turned.

### Core Signature Features
1. **Drive-In to Drive-Out:** Interactive scroll-driven repair journey with layer explosion.
2. **Symptom & Warning-Light Guide ("Can I still drive it?"):** Urgent triage & downloadable Symptom Sheet.
3. **The Bay Board:** Real-time repair status tracking.
4. **Proof Report & Fair-Price Breakdown:** Checkpoints with photo evidence, micrometer gauges, and tier pricing.
5. **The Bay Crew:** Bay layout and certified team hierarchy.
6. **Garage Portal:** Customer logbook, upcoming services, and fleet manager views.
7. **Know Your Car:** Multi-depth educational articles with interactive exploded diagrams.
8. **The Mileage Map:** Timeline roadmap of vehicle service milestones.

---

## 2. Quick Start
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm test

# Run strict type checking
npm run typecheck

# Build production bundle
npm run build
```

---

## 3. Scripts
- `npm run dev`: Starts Vite local dev server with HMR.
- `npm run build`: Typechecks and builds production SPA bundle.
- `npm run preview`: Serves production build locally.
- `npm run typecheck`: Runs `tsc --noEmit` in strict mode.
- `npm run lint`: Runs ESLint across source files.
- `npm run test`: Executes Vitest test suite.
- `npm run check:i18n`: Asserts key parity between English and Hindi dictionaries.
- `npm run check:denylist`: Verifies zero prohibited claims or unapproved brand trademarks.
- `npm run assets:manifest`: Generates and validates `assets/manifest.json`.

---

## 4. Folder Map
```
/
├─ public/            # Static assets, fonts, icons, manifest
├─ docs/              # 01…08 engineering specifications
├─ src/
│  ├─ config/         # Site configuration (site.ts, nav.ts, flags.ts)
│  ├─ i18n/           # Internationalization dictionaries (en, hi)
│  ├─ data/           # Domain datasets (services, rules, milestones, crew)
│  ├─ types.ts        # Shared TypeScript contracts
│  ├─ routes/         # Route pages (lazy-loaded)
│  ├─ layouts/        # RootLayout, PortalLayout
│  ├─ components/     # UI design system and feature modules
│  ├─ hooks/          # Custom hooks (theme, locale, motion, units)
│  ├─ lib/            # Utilities (units conversion, formatting, PDF, ICS)
│  ├─ store/          # Zustand state stores (prefs, guide, pricing, booking)
│  ├─ styles/         # Design tokens (tokens.css, globals.css, print.css)
│  └─ main.tsx, App.tsx
├─ tests/             # Unit and integration test suites
└─ assets/manifest.json
```

---

## 5. White-Label & Rebranding Guide
To rebrand for another workshop:
1. Update `src/config/site.ts` with brand name, contact numbers, and branch locations.
2. Adjust CSS tokens in `src/styles/tokens.css` for primary/surface colors.
3. Update brand logo vectors in `public/` and `src/components/ui/Logo.tsx`.
4. Ensure `npm run check:denylist` passes.

---

## 6. Units System
All measurements and financial figures pass through `src/lib/units.ts`:
- Distance: `formatDistance(km, units)` (`km` or `mi`)
- Thickness/Wear: `formatLength(mm, units)` (`mm` at 1 dp or `in` at 2 dp)
- Pressure: `formatPressure(bar, units)` (`bar` or `psi`)
- Currency: `formatMoney(amount, currency)`

---

## 7. Compliance & Regulatory Disclaimers
1. **Safety Line:** "If your vehicle feels unsafe, stop in a safe place and call roadside/emergency services. This website cannot diagnose faults."
2. **Not an Estimate:** All online calculators display: "Indicative only · Not a quotation · A written estimate is provided and your approval is required before work."
3. **No Unsubstantiated Claims:** Strict prohibition on "cheapest", fake reviews, and manufacturer trademark misappropriation.
