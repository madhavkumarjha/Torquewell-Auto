# 02 · BRAND & DESIGN SYSTEM — Torquewell Auto

## 1. Central Metaphor: **The Click** — "Proof, not promises."
A torque wrench clicks at exactly the right tightness: a small, audible proof that the job is right. The brand treats every recommendation and every repair as something that ends in a *verifiable click*.

**Recurring motifs (use all, with discipline):**
| # | Motif | Where it appears |
|---|---|---|
| 1 | **Click marks** (tiny tick notches like a torque dial) | Dividers, sliders, scroll progress, stepper |
| 2 | **Torque dial** (semicircular scale with needle) | Loader, gauges, urgency indicators, estimator |
| 3 | **Lug-nut pattern** (5-point circular bolt pattern) | Logo mark, loaders, avatar frames, bullet markers |
| 4 | **Tread lines** (subtle directional tyre-tread pattern) | Backgrounds of hero/footer, card edges (very low opacity) |
| 5 | **Inspection stamps** (mono-type checked stamps e.g., `CHECKED · 04/12`) | Proof Report items, badges |
| 6 | **Traffic-light triad** (Now / Soon / Watch) | Findings, Mileage Map, journeys |

## 2. Colour Tokens
### 2.1 Dark theme ("Bay Night" — default)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#121417` | Page background |
| `--surface` | `#1B1E23` | Cards |
| `--surface-2` | `#252930` | Raised/hover |
| `--text` | `#F0EFEA` | Body (≥ 14:1) |
| `--text-muted` | `#A9AFB8` | Secondary (≥ 7:1) |
| `--line` | `#30353E` | Borders |
| `--accent` | `#C6E84B` | Torque lime — primary CTA/accent |
| `--accent-ink` | `#1A2202` | Text on accent (≥ 11:1) |
| `--teal` | `#3DB7A8` | Coolant teal — secondary, "OK/Watch" positive |
| `--amber` | `#F2A93B` | Caution — "Soon" |
| `--steel` | `#98A2AE` | Neutral data |
| `--critical` | `#FF5D5D` | **"Now / unsafe" findings and safety alerts only** |

### 2.2 Light theme ("Shop Paper")
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F3F1EC` | Background |
| `--surface` | `#FCFBF8` | Cards |
| `--surface-2` | `#E8E5DC` | Raised/hover |
| `--text` | `#17191D` | Body (≥ 15:1) |
| `--text-muted` | `#555C67` | Secondary (≥ 7:1) |
| `--line` | `#D6D2C6` | Borders |
| `--accent` | `#5A7410` | Deep lime-olive (AA on light) |
| `--accent-ink` | `#F8FCE8` | On accent |
| `--teal` | `#1E7D72` | Secondary |
| `--amber` | `#A8620A` | Caution |
| `--steel` | `#5C6672` | Neutral |
| `--critical` | `#C12727` | Critical/safety only |

### 2.3 Contrast & usage rules
- Body ≥ 4.5:1 (target 7:1); large text/UI ≥ 3:1; axe + manual checks.
- `--critical` only for "Now/unsafe" findings, safety alerts, and form errors — never decorative.
- Urgency is never colour-only: pair with icon, label ("Now / Soon / Watch"), and pattern (solid / striped / dotted).
- **No chrome-and-flames look, no red-black-checkered-flag palette.**
- Gradients: subtle `accent → transparent` glows max 18% opacity.

## 3. Typography (self-hosted WOFF2, `font-display: swap`, subset)
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | **Familjen Grotesk** (fallback: Bricolage Grotesque) | 400–700 | Friendly, slightly condensed feel |
| Text | **Public Sans** | 400, 500, 600 | UI/body, very legible |
| Mono | **DM Mono** | 400, 500 | Plates, VINs, measurements, stamps |
| Hindi (Devanagari) | **Noto Sans Devanagari** | 400–700 | Line-height +0.1 |
| RTL-ready (future) | **Noto Kufi Arabic** | 400–700 | Loaded only if `ar` enabled |

| Style | Size (fluid) | Line-height | Tracking |
|---|---|---|---|
| Display XL | 56–116px | 1.0 | -0.025em |
| H1 | 40–68px | 1.05 | -0.02em |
| H2 | 30–46px | 1.12 | -0.012em |
| H3 | 22–30px | 1.25 | 0 |
| Body L | 18–20px | 1.6 | 0 |
| Body | 16–17px | 1.65 | 0 |
| Caption | 13–14px | 1.5 | 0.01em |
| Mono label | 12–13px uppercase | 1.4 | 0.08em |
Rules: max line 68ch; tabular numerals for prices/measurements; root text-size 100/115/130%.

## 4. Layout, Spacing, Radius, Elevation
- **Grid:** 12-col (max 1360px, 24px gutter); workshop-board asymmetry (large numerals, offset columns).
- **Spacing (px):** 4, 8, 12, 16, 24, 32, 48, 72, 112, 168.
- **Radius:** `sm 6`, `md 12`, `lg 20`, `pill 999`; "tool-tag" card corner = one notched corner.
- **Elevation:** hairline borders + `0 12px 36px -16px rgba(0,0,0,.55)` (dark) / `rgba(30,28,15,.22)` (light).
- **Focus ring:** 3px accent outline + 2px offset.

## 5. Component Inventory
Header (Help-now + Book pills) · Mega-menu · Footer · Consent gate · Command palette (⌘K) · Units/Language/Theme/Calm controls · Buttons (primary/secondary/ghost/critical, magnetic) · Chips/filters · Cards (service, package, article, crew, branch) · Urgency badge (Now/Soon/Watch) · Torque-dial gauge · Data table · Range/price band · Stepper (Guide, Booking) · Tabs · Accordion · Tooltip glossary · Toast · Skeletons · Drawer/Modal · Timeline (Bay Board) · Bay-map canvas · Exploded-view component · Photo-evidence carousel · Portal shell · PDF templates (Symptom Sheet, Proof Report, Estimate Breakdown, Service Roadmap) · Breadcrumbs · Plate/VIN input (fictional only).

## 6. Iconography
Custom 1.5px stroke, rounded caps, 24px grid; 70 icons (systems, tools, warning lights (generic, non-trademarked redraws), services, journey stops). SVG sprite with `currentColor`; decorative icons `aria-hidden`. Warning-light icons are original redraws with text labels — never OEM-specific artwork.

## 7. Imagery Direction
**Look:** Honest, tactile, workshop-real: warm task lighting against cool graphite bays, hands and tools in focus, clean floors, natural diverse people at work, macro details (bolt threads, brake discs, tread depth). Feels *clean, organised, transparent* — not greasy-cliché.

**Master image-prompt template**
```
[SUBJECT & ACTION], [SETTING: modern independent garage bay], warm task lighting with cool graphite shadows,
cinematic documentary photography, 35mm or macro, shallow depth of field, fine grain,
natural diverse people (no recognisable real individuals), calm competent mood, safe practices (PPE, vehicle on lift with stands),
no text, no logos, no vehicle-manufacturer badges, no watermarks, no chrome-and-flames, no thumbs-up stock pose, no red-black racing look,
composition: [rule-of-thirds / negative space for text], aspect ratio [ratio]
```
**Forbidden imagery:** manufacturer logos/badges/grilles identifiable as a specific brand's trademark · glossy supercars · smoke/burnout · unsafe practices (car on jack only, no PPE, open flames near fuel) · staged thumbs-up stock · identifiable real people · real customers' vehicles/plates · text baked into images.

**Required image set (full sizes in File 08)**
| Group | Count | Aspect | Examples |
|---|---|---|---|
| Hero/cinematic | 6 | 16:9 | Lift-mounted car under task lights; macro of torque wrench dial; tyre tread depth check |
| Services | 12 | 4:5 | One per service (brake disc macro, alignment rig, diagnostic laptop…) |
| Materials/parts macros | 8 | 1:1 | Brake pads, filters, spark plugs, battery, belt, rotor, coolant, EV connector (generic) |
| People portraits (fictional AI) | 30 | 4:5 | Technicians, advisors, parts staff, apprentices |
| Branches/facilities | 8 | 3:2 | Reception, waiting lounge, bays, tyre bay, EV charging bay, parts room |
| Journey stops | 8 | 3:2 | Check-in, inspection, photo evidence, approval, repair, QC road test, handover |
| Know Your Car illustrations | 20 | 3:2 & 1:1 | Exploded-view vector illustrations |
| OG/social | 5 | 1200×630 | Branded cards |
**Procedural fallbacks:** SVG exploded line-drawings + tread-line pattern + duotone; never an empty box.

## 8. Logo Concept & Deliverables
**Concept:** A five-point lug-nut ring in which one segment is a "click notch" (a small gap with a tick), suggesting the moment a wrench clicks. Wordmark "Torquewell" in Familjen Grotesk 600; "AUTO" in Public Sans caps, tracking 0.24em.
**Deliverables:** `logo-primary.svg`, `logo-mark.svg`, `logo-mono-light.svg`, `logo-mono-dark.svg`, `logo-stacked.svg`, animated `logo-click.svg` (ring rotates then notch ticks), clear-space/min-size rules (mark ≥ 20px, wordmark ≥ 104px).
**Favicon set:** `favicon.ico`, `favicon.svg` (adaptive), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `site.webmanifest`, `safari-pinned-tab.svg`.

## 9. Voice & Tone
- **Principles:** Plain words · Say what it is, why it matters, what it costs · Never scare, never sell · Respect the customer's intelligence.
- **Do:** "Your front pads are at 2.5 mm. That's a 'Soon' — safe today, but plan it within a month." **Don't:** "Dangerous! Fix now or risk your life!"
- **Sample H1:** *"See what's wrong before you pay to fix it."*
- **CTAs:** "Can I still drive it?" · "See the proof" · "Understand the price" · "Book a check".
- Reading level target: grade 7–8 (Flesch ≥ 60).
