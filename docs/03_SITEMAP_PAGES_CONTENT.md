# 03 · SITEMAP, PAGES & CONTENT — Torquewell Auto

## 1. Global Elements
| Element | Spec |
|---|---|
| **Header** | Logo · nav (Services ▾, Prices, Mileage Map, EV & Hybrid, Fleet, Know Your Car, Crew) · **"Stuck? Help now" pill** (critical colour, → `/help`) · **Book pill** (→ `/book`) · ⌘K · units · language · theme · Calm. Hides on scroll-down, returns on scroll-up; both pills persist. |
| **Mega-menu** | Services ▾: services grid with mini urgency icons + "Can I still drive it?" (Guide) link. |
| **Footer** | Sitemap · branches · safety line · policy summaries · legal links · accessibility statement · language & units. |
| **Consent gate** | First visit: language, units, motion, storage consent. |
| **Cursor** | Small torque-dial cursor on fine-pointer devices; disabled on touch/reduced-motion. |
| **Page transitions** | "Click-through": a thin lime tick-scale sweeps and settles with a single subtle "click" visual notch (350–500ms). No sound. Reduced-motion → instant fade. |
| **Floating launcher** | Bottom-right: Help now · Can I still drive it? · Book · Call. |
| **Scroll progress** | Vertical click-mark ruler on left edge (desktop) / top bar (mobile). |

## 2. Pages (purpose · ordered sections · signature moment · content rules)

### 2.1 Home `/`
- **Purpose:** Calm a worried visitor and route to the right tool in 30 seconds.
- **Sections:** (1) Hero H1 + 4 tiles (Can I still drive it? · Stuck? Help now · See the proof · Book a check) (2) Drive-In to Drive-Out story (3) Proof Report teaser (4) Fair-Price teaser (5) Mileage Map teaser (6) Bay Crew preview (7) Know Your Car featured (8) EV & Fleet strip (9) Closing: "Proof, not promises." + book CTA.
- **Signature moment:** Car under task lights; scroll lifts the hood and explodes into layers with callouts.
- **Rules:** Transparent figures; no superlatives; no reviews.

### 2.2 About `/about`
Founder note (Tomas Hale, fictional) · "Proof before repair" principles · timeline · facilities · ethics (no upselling policy summary) · training & standards (placeholders).

### 2.3 Services `/services`, `/services/:slug`
- List (14): Logbook/interim & full service · Brakes · Tyres & alignment · Suspension & steering · Engine diagnostics · Clutch & transmission · Air-conditioning · Battery & electrics · Exhaust (emissions-compliant) · Cooling system · Hybrid & EV service · Pre-purchase inspection · Inspection-prep (roadworthiness) · Fleet maintenance.
- Detail: what it covers · signs you may need it (educational) · what we check · typical time range (indicative) · price band (indicative, with assumptions) · parts options · what to ask us · related Know Your Car articles · Book shortcut.
- Rules: no diagnosis language; no "cheapest"; no emissions-defeat services.

### 2.4 Symptom & Warning-Light Guide `/guide`
Feature 2 (File 04). Intro + safety line · guided flow · result · Symptom Sheet PDF · privacy note.

### 2.5 Book `/book`
4-step stepper: Vehicle (plate/make/year; mileage) → Need (service, symptom, or "not sure → Guide") → Branch, date & drop-off/waiting/courtesy options (available slots) → Contact & consent → Confirmation (reference + .ics + "what to bring" list). Data notice at every step.

### 2.6 Stuck? Help now `/help`
Sections: giant call block (direct helpline) · "Stop safely" checklist (hazards on, safe place, exit vehicle on the safe side, warning triangle where lawful) · "Do not attempt" list (no roadside brake/steering/high-voltage work) · what to tell the operator (location, vehicle, symptoms) · tow/recovery process explainer · nearest branch · EV-specific notes (charging failures, warnings) · disclaimer. Must load < 1.2s LCP; no decorative motion.

### 2.7 The Bay Board `/journey`
Feature 3. Repair journey + live status board.

### 2.8 Proof Report `/proof`
Feature 4a. Sample digital inspection with photos, measurements, urgency, "show me the part" toggle, PDF export.

### 2.9 Fair-Price Breakdown `/prices`
Feature 4b. Estimator + how-pricing-works explainer (labour rate × time, parts tiers, consumables, waste disposal, tax), what-affects-price list, authorisation process.

### 2.10 Service Menu `/menu`
Fixed-scope service packages (Essential, Full, Brake Care, Tyre & Alignment, A/C Refresh, EV Health Check, Pre-Purchase Inspection) — described by **what's included/not included**; price shown as clear range with assumptions; compare 2–3 packages; **no discounts/"save X%"**.

### 2.11 Mileage Map `/mileage-map`
Feature 8. Age/mileage-based roadmap.

### 2.12 EV & Hybrid `/ev`
What we service (generic), safety practices (high-voltage isolation, trained-technician placeholder), battery health check explainer, charging-related checks, tyres & brakes on EVs, myths/facts (sourced), limits ("what we don't do"), Book EV check.

### 2.13 Fleet & Business `/fleet`
Uptime-focused maintenance, scheduling windows, reporting dashboard preview (Portal fleet view), invoicing options, driver-reported-defect flow, contact form.

### 2.14 The Bay Crew `/crew`
Feature 5. Bay map with hierarchy and profiles.

### 2.15 Locations `/locations`
3 workshop branches: illustrative map, opening hours, services per branch, accessibility info, EV charging availability, directions.

### 2.16 Know Your Car `/know`, `/know/:slug`
Feature 7. Hub + articles.

### 2.17 Garage Portal `/portal`
Feature 6. Customer portal preview for client Sam Carter.

### 2.18 Warranty, Parts & Policies `/policies`
Written estimate & authorisation · parts tiers explained (OE, OE-equivalent, aftermarket, remanufactured) · warranty summary · returned-parts policy · complaints route · environmental handling · independent-servicing note **[VERIFY per country]**.

### 2.19 Careers & Apprenticeships `/careers`
Culture · roles (technician, EV technician, service advisor, parts) · apprenticeship pathway · training culture · online application.

### 2.20 Contact `/contact`
Cards (bookings, roadside, fleet, careers, feedback/complaints) · routed form · branches · accessibility options.

### 2.21 Legal & Utility
`/privacy`, `/terms`, `/accessibility`, `/sitemap`, `/404` ("Wrong turn. Let's get you back on the road." + search + Help-now link).

## 3. SEO / Meta / JSON-LD per Page
| Page | JSON-LD types |
|---|---|
| Home | `AutoRepair`, `WebSite` (SearchAction), `Organization` |
| Services | `Service` (+ `ItemList`) |
| Locations | `AutoRepair` per branch with `openingHoursSpecification` |
| Prices/Menu | `Service` (PriceSpecification with `priceCurrency` + range) |
| Know Your Car | `Article`, `FAQPage`, `HowTo` where applicable |
| Help now | `WebPage` + `ContactPoint` (roadside) |
| Careers | `JobPosting` (`validThrough` set) |
| Contact | `ContactPage`, `ContactPoint` |
- **Meta:** title ≤ 60 chars, description ≤ 155 chars, canonical, hreflang en/hi, OG/Twitter; indexable (`indexable=true`).

## 4. Language Parity Rules
1. Every route, label, error, alt text, meta tag, PDF exists in **EN and HI**.
2. HI copy written natively; technical terms shown Hindi (English) on first use; warning-light names shown in both.
3. Layout tested with +25% text expansion; Devanagari line-height tuning.
4. Locale-aware numbers/dates/currency; **unit toggle independent of language**.
5. RTL readiness via logical CSS properties; stub `ar` locale test.
6. URL scheme `/en/...`, `/hi/...`; default by browser language, override stored locally.
