# 04 · SIGNATURE FEATURES — Torquewell Auto

> Each feature: **Idea · Customer benefit · UX flow · Data shape · Edge cases · Build notes · Compliance guardrails**.
> All tools carry: **"Indicative only · Not a diagnosis or quotation · A technician inspection and written estimate come first."**

---
## Feature 1 — Drive-In to Drive-Out (scroll-told story)
**Idea:** Follow one fictional car (a compact hatchback, generic, no brand) through a full visit. As you scroll, the hood lifts and the car "explodes" into layers (wheels, brakes, suspension, engine bay, electrics); each stage shows who touches the car, what is checked, and what evidence is created.
**Customer benefit:** Demystifies what happens behind the bay doors; builds trust without claims.
**UX flow:**
1. Pinned scene (desktop) / stacked cards (mobile), 9 chapters: Arrival & check-in → Walk-around → Lift & inspect → Photo evidence → Report & approval → Parts → Repair → Quality check & road test → Handover.
2. Each chapter: stage number (mono), 30-word description, callout on the car, "Evidence created" chip (e.g., `PHOTO-12`, `MEASURE: pads 2.5 mm`).
3. Click-mark ruler advances; "Skip story" + static ordered list fallback.
4. End CTA: "See a sample Proof Report" → `/proof`.
**Data shape:**
```json
{ "chapters": [{ "n": 3, "title": { "en": "Lift & inspect", "hi": "..." }, "who": "Technician",
  "checks": ["Brake pad thickness", "Tyre tread depth"], "evidence": ["PHOTO-07", "MEASURE-pads"],
  "callout": { "part": "front brake", "x": 0.42, "y": 0.66 } }] }
```
**Edge cases:** Reduced-motion → static list; low-end → no pinning; unit toggle affects measurements.
**Build notes:** GSAP ScrollTrigger; layered SVG car (generic silhouette); parallax ≤ 12px.
**Compliance:** Generic car, no brand shapes/badges; fictional process.

---
## Feature 2 — Symptom & Warning-Light Guide ("Can I still drive it?")
**Idea:** A calm 6–8 step guide: pick a warning light (original redraws with names) and/or a symptom (noise, smell, vibration, pulling, leak, starting trouble) → returns **safety level** (Stop now / Drive carefully to us / Book this week / Routine / Info) and a downloadable **Symptom Sheet** (what to tell the mechanic, what to note, questions to ask).
**Customer benefit:** Immediate safety clarity and better conversations with any mechanic; reduces fear of being "blinded with science".
**UX flow:**
1. Safety line + Help-now shortcut pinned.
2. **Red-flag check first:** brakes soft/failing, steering loss, red oil-pressure/temperature warnings, smoke/burning/fuel smell, fluid pooling fast, EV/hybrid high-voltage warning with smoke/burning smell → immediate **Stop now** result (tow guidance).
3. Vehicle type (petrol/diesel/hybrid/EV; year band; mileage band — no plate needed).
4. Symptom/warning-light picker (visual grid + search); when it happens (cold start, braking, turning, speed, A/C on…); how long; changed recently (service, fuel, tyre, weather).
5. Result: safety level + **areas a technician may inspect** (not a diagnosis) + what to note + what to bring + Book (prefilled, mock).
6. Actions: **Download Symptom Sheet PDF**, Copy, Print, Book, Clear session.
**Data shape:**
```ts
type GuideState = { redFlags: string[]; powertrain: 'petrol'|'diesel'|'hybrid'|'ev'; ageBand: string; mileageKm: number;
  symptoms: string[]; lights: string[]; triggers: string[]; duration: '<1d'|'1-7d'|'>1w'; recent: string[]; locale: 'en'|'hi' };
type GuideResult = { level: 'stop'|'careful'|'week'|'routine'|'info'; areas: I18n[]; note: I18n[]; ask: I18n[]; bring: string[]; disclaimerId: string };
```
Transparent **rule table** in `data/guide-rules.ts` with "How this works" drawer.
**Edge cases:** Any red flag = Stop now; flashing check-engine + shaking → "reduce load, book same day"; unknown light → "photograph it and call us"; conflicting inputs → choose the safer level and show why.
**Build notes:** Zustand + sessionStorage; @react-pdf/renderer (lazy) with EN/HI fonts; ARIA live regions.
**Compliance:** **No fault diagnosis, no repair instructions, no cost promises.** Warning-light icons are original redraws with labels. Persistent: "This website cannot diagnose faults."

---
## Feature 3 — The Bay Board (repair journey + live status)
**Idea:** (a) An interactive journey — Check-in → Inspection → Report → Approval → Parts → Repair → Quality check → Handover — with owner role, what you'll receive, and typical time ranges. (b) A **live status board** (like an interactive repair tracker) showing jobs by anonymised token (`JOB T-482`) moving through stages.
**Customer benefit:** "Where is my car and what's next?" answered without phoning.
**UX flow:** Choose job type (Service / Brakes / Diagnostics / EV check) → timeline with stage drawers (who, evidence, decision needed from you, time range) → "Track a job" (chip list) → progress ring + step description + estimated-range → optional notification-preview mock (SMS/email templates shown, not sent).
**Data shape:**
```ts
type JourneyStage = { id: string; title: I18n; ownerRole: string; youReceive: I18n[]; youDecide?: I18n; durationRange: { minMin: number; maxMin: number } };
type RepairJob = { id: string; stage: string; updatedAt: string; note?: I18n; waitingOnCustomer?: boolean };
```
**Edge cases:** "Waiting on your approval" highlighted; delayed parts show reason and new range; ranges labelled "varies".
**Build notes:** Framer Motion layout; interval simulator; aria-live polite; TV layout `/journey/board`.
**Compliance:** Tokens only; no plates/names on board; states real implementation needs consent.

---
## Feature 4 — Proof Report + Fair-Price Breakdown (transparency)
**Idea (a) Proof Report:** A sample digital vehicle inspection: 30+ checkpoints with **photos, measurements, and urgency** (Now / Soon / Watch / OK). Each finding has "Why it matters", "What happens if you wait", "Options", and **Show me the part** (photo/diagram of the worn component with measured vs minimum value).
**Idea (b) Fair-Price Breakdown:** For any finding, show price logic: **labour = hours × labour rate**, parts in tiers (OE / OE-equivalent / aftermarket / reman) with warranty differences, consumables, waste disposal, tax; **min–max ranges**, "what could change this", and "what can safely wait".
**Customer benefit:** Kills the overcharge/upsell fear; the customer chooses with information.
**UX flow (a):** Report summary donut (counts by urgency) → filter by system → finding cards with photo carousel and gauge (e.g., pad 2.5 mm vs 3.0 mm minimum) → toggle "Explain simply" → "Download Proof Report PDF".
**UX flow (b):** Choose finding(s) → choose parts tier → see stacked bar & itemised table → toggle "Only what's needed now" (removes Soon/Watch) → download **Estimate Breakdown PDF** with "questions to ask any garage".
**Data shape:**
```ts
type Finding = { id: string; system: string; title: I18n; urgency: 'now'|'soon'|'watch'|'ok';
  measured?: { value: number; min: number; unit: 'mm'|'bar'|'V'|'%' }; photos: string[]; why: I18n; ifWait: I18n; options: I18n[] };
type PriceLine = { findingId: string; labourHours: [number, number]; parts: Record<'oe'|'oeq'|'aftermarket'|'reman', [number, number]>;
  consumables: [number, number]; disposal: [number, number]; warrantyMonths: Record<string, number>; currency: string };
```
**Edge cases:** Out-of-range values flagged with icon + text + pattern; "unknown until strip-down" lines show as ranges with reason; unit toggle recalculates.
**Build notes:** SVG gauges/donut; custom bars; PDF export.
**Compliance:** All figures indicative and transparent; no competitor comparisons; "Estimate requires written authorisation" repeated in PDF; no "lowest price" language.

---
## Feature 5 — The Bay Crew (team hierarchy showcase)
**Idea:** A top-down bay map where each bay (Service, Brakes/Tyres, Diagnostics, EV bay, Alignment, Parts room, Reception) is a hotspot revealing its team: Founder → Workshop managers → Master technicians → Technicians → Apprentices, plus Service advisors and Parts.
**Customer benefit:** You know who works on your car and who to talk to; accountability is visible.
**UX flow:** Overview map → hover/focus bay lights up → panel with purpose, equipment classes, team (roles, languages, training placeholders), "You'll speak to…" → toggle "Org chart view" (accessible tree) → filter by branch or language.
**Data shape:**
```ts
type Bay = { id: string; name: I18n; polygon: number[][]; equipment: I18n[]; leadIds: string[]; headcount: number };
type Person = { id: string; name: string; role: I18n; kind: 'founder'|'manager'|'master'|'tech'|'ev-tech'|'apprentice'|'advisor'|'parts';
  branch: string; bay?: string; reportsTo?: string; languages: string[]; trainingPlaceholders: string[]; bio: I18n; portrait: string };
```
**Edge cases:** Mobile → bay accordion + mini-map; missing portrait → initials in lug-nut ring; EV technician cards show "High-voltage training: placeholder — client to state real qualification".
**Build notes:** SVG bay plan with focusable hotspots; `role="tree"` for org view.
**Compliance:** No real qualifications/logos; no "best technician" claims.

---
## Feature 6 — Garage Portal (customer dashboard)
**Idea:** A full customer portal showcase for client **Sam Carter** (fictional vehicle and plate `TW68 AKZ`): vehicle logbook (service history timeline), upcoming reminders, pending approvals, invoices, warranty status, saved Proof Reports; plus a **fleet view** for a local business client.
**Customer benefit:** One place for a car's history and decisions — useful to keep and to show at resale.
**UX flow:** Landing → "View sample portal" → Dashboard (next service, pending approval, warranty) → Logbook (timeline with evidence attachments) → Approvals (approve/decline items with price and urgency; mock) → Invoices (itemised, downloadable mock PDF) → Reminders (mileage/date based) → Fleet tab (vehicles table with status, next due, downtime this quarter) → Messages (canned threads).
**Data shape:**
```ts
type LogEntry = { id: string; date: string; mileageKm: number; title: I18n; findings: string[]; invoiceId?: string; evidence: string[] };
type FleetVehicle = { id: string; label: string; nextDue: string; status: 'ok'|'due'|'in-shop'; downtimeDays: number };
```
**Edge cases:** Declined "Now" items require an acknowledgement text (mock) explaining risk; no colour-only status.
**Build notes:** Route-level code-split; mock data in TS; no auth.
**Compliance:** Fictional plate/VIN format only.

---
## Feature 7 — Know Your Car (three-layer explainers + exploded views)
**Idea:** Explainers at three depths — **30-second**, **3-minute**, **Deep** — with interactive **exploded-view diagrams** (brakes, suspension, cooling, EV battery basics, tyres) and "What to ask your mechanic" checklists.
**Customer benefit:** Turns confusing jargon into confidence; makes any garage conversation better.
**UX flow:** Hub with tags (Brakes, Tyres, Engine, EV, Costs, Safety) → article with depth switch (persists) → exploded-view (hover parts → plain-language labels) → "Questions to ask" printable checklist → related services.
**Data shape:**
```ts
type Article = { slug: string; tags: string[]; title: I18n; layers: { s30: I18n; m3: I18n; deep: I18n };
  diagram?: string; glossary: string[]; askMechanic: I18n[]; sources: string[]; reviewedOn: string };
```
**Edge cases:** Diagram has list fallback; missing HI blocks publishing.
**Build notes:** SVG exploded views with layered `<g>`; MDX; Fuse search; JSON-LD.
**Compliance:** Educational only; no DIY repair steps for safety-critical systems; every claim in `SOURCES.md`.

---
## Feature 8 — The Mileage Map (age/mileage service roadmap)
**Idea:** A road-shaped timeline from now to +100,000 km (or miles) showing generic service milestones for the customer's car band, each with **urgency logic** (Due / Soon / Watch), indicative cost band, and a **"What can wait"** panel explaining what is time-based vs distance-based vs condition-based.
**Customer benefit:** Plan ahead, avoid both neglect and unnecessary servicing.
**UX flow:** Inputs (powertrain, age band, current mileage, annual distance, driving style: city/highway/towing) → map draws with milestones (oil & filter, brake fluid, coolant, cabin filter, spark plugs/glow, belts/chain check, tyres, A/C, battery check, EV coolant/battery health) → click milestone → drawer (why, interval basis, price band, "ask us to show you the evidence") → **Download Service Roadmap PDF** / add to calendar (.ics).
**Data shape:**
```ts
type Milestone = { id: string; title: I18n; basis: 'distance'|'time'|'condition'; everyKm?: number; everyMonths?: number;
  appliesTo: ('petrol'|'diesel'|'hybrid'|'ev')[]; costBand: [number, number]; canWait: I18n; why: I18n };
```
**Edge cases:** Unknown powertrain → generic; unit toggle converts distance; intervals always labelled "check your vehicle handbook — it overrides generic intervals".
**Build notes:** SVG road path with `getPointAtLength`; ICS generator; PDF.
**Compliance:** Generic intervals from public guidance; no brand-specific claims; "Follow your manufacturer's schedule".

---
## Supporting Delights
| Delight | Detail |
|---|---|
| Command palette (⌘K) | Search pages, services, articles; actions (Help now, Book, Guide, toggle units/theme/language). |
| Units toggle | km/mi, mm/in, bar/psi, L/gal, currency display applied globally. |
| Language toggle | EN/HI instant. |
| Theme toggle | Light/Dark/Auto. |
| Calm Mode | Reduced motion, larger text, simplified visuals. |
| Tyre-tread coin check | Interactive visual guide for checking tread depth (education). |
| Print styles | Clean print for Symptom Sheet, Roadmap, Checklists. |
| Easter egg | Long-press the logo → ring "clicks" with a subtle vibration pattern (where supported) and confetti of tick-marks. |
| Offline Help page | `/help` cached via service worker. |
