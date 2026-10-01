# 01 · PROJECT BRIEF — Torquewell Auto (Auto Repair Website)

> **Priority rule: File 01 wins on any conflict with files 02–08.**
> This is a **frontend-first website** for an independent multi-bay auto repair network. Clean, realistic presentation with no real brand trademark violations or unverified personal data.

## 1. Vision & Reaction Target
**Vision:** A garage website that removes the single biggest fear in car repair — *"Am I being overcharged, or told to fix things I don't need?"* — by showing the work, the evidence, and the price logic *before* a spanner is turned.

**Reaction target (garage owner says):** *"I have never seen a garage website like this — this is exactly why customers would trust us."*

**Visitor arc:** Worried → Oriented → Informed → Trusting → Books.

## 2. Config-Driven Placeholders (`src/config/site.ts`)
| Key | Value | Notes |
|---|---|---|
| `brandName` | Torquewell Auto | Fictional; trademark check **[VERIFY]** |
| `tagline` | Proof, not promises. | EN + HI |
| `leadPerson` | Tomas Hale, Founder & Master Technician | Realistic persona |
| `branches` | 3 workshop branches (config) | Configurable addresses |
| `phone` / `roadsidePhone` | `+44 800 876 5432` / `+44 800 876 5433` | Configurable contact numbers |
| `locales` | `en`, `hi` (RTL-ready for `ar`) | |
| `units` | metric default; imperial toggle (km/mi, mm/in, L/gal) | Global |
| `currency` / `labourRate` | Configurable standard workshop rate | Used by estimator |
| `announcementBanner` | false | Disabled |
| `accreditations` | placeholders only | See §5 |

## 3. Positioning
- **Category:** Independent multi-bay garage — servicing, brakes, tyres & alignment, diagnostics, suspension, A/C, electrics, hybrid & EV service, pre-purchase inspections, small-fleet maintenance. ~35 staff, 3 branches.
- **Promise:** *Proof before repair.* Every recommendation comes with evidence, urgency level, and price logic in plain language.
- **Tone:** Straight-talking, friendly, never condescending, never salesy.
- **Differentiator:** Trust tools customers can *use* (Symptom Guide, Proof Report, Fair-Price Breakdown, Mileage Map) rather than "trust us" slogans.

## 4. Audiences (what each needs in 30 seconds)
| Audience | Need in 30 seconds | Entry point |
|---|---|---|
| Worried driver (warning light/noise) | "Can I still drive it? What do I say to the mechanic?" | Symptom Guide, Help-now pill |
| Broken-down driver | Immediate roadside/tow guidance and nearest branch | Breakdown page |
| Routine owner | What service is due, what can wait, what it costs | Mileage Map, Packages |
| Price-sceptical customer | How pricing works, options for parts | Fair-Price Breakdown |
| EV/hybrid owner | Do you service EVs safely? What's covered? | EV & Hybrid page |
| Fleet/business manager | Uptime, reporting, invoicing, contact | Fleet page, Portal |
| Used-car buyer | Pre-purchase inspection contents | Services, Proof Report sample |
| Apprentice/technician candidate | Training, culture | Careers, Bay Crew |
| Accessibility-dependent user | Fully usable site | Global controls |

## 5. HARD COMPLIANCE RULES (design rules, not suggestions)
> All items **[VERIFY with client's legal/compliance counsel]** per market. The website behaves as if the strictest rule applies everywhere.

**5.1 What the site MAY show:** factual service descriptions, indicative price ranges with stated assumptions, inspection methods, process explanations, policy summaries (warranty, parts, authorisation), educational content, placeholder accreditation cards clearly marked fictional.

**5.2 What the site must NEVER show**
| Forbidden | Reason |
|---|---|
| Real accreditation/trade-body marks or logos (e.g., technician-certification, motor-industry, vehicle-manufacturer approval badges) or real membership numbers | Fake-accreditation/misleading-claim risk. Uses "Accreditation placeholder — client to display real body & number". |
| Vehicle-manufacturer logos or claims of "authorised/approved" status | Trademark and misrepresentation risk (make names allowed only in plain text to state compatibility, e.g., "we service most makes") |
| Fabricated customer reviews, star ratings, or testimonials | Fake-review rules/consumer law (e.g., FTC fake-review rule, UK/EU unfair-practices law). Real reviews only via a verified platform in production. |
| "Cheapest/lowest price/guaranteed savings/100% safe" claims | Unsubstantiated superlatives |
| "Free" checks without stating scope and conditions | Misleading-offer risk |
| Emissions-system tampering services (DPF/EGR/catalyst "delete", defeat devices, ECU "remaps" that bypass emissions) | Illegal in many jurisdictions; never mentioned as a service |
| DIY instructions for safety-critical systems (brakes, airbags, steering, high-voltage EV components) | Safety/liability risk |
| Diagnosing a fault or promising a specific repair from symptoms online | Only an in-person inspection can diagnose |
| Binding prices without a written estimate | Written estimate + customer authorisation rules in many jurisdictions |
| Any claim attributed to a real organisation | Fake-endorsement risk |

**5.3 Mandatory disclaimers (exact placement)**
1. **Safety line** (footer, Guide, Breakdown, Symptom results): "If your vehicle feels unsafe, stop in a safe place and call roadside/emergency services. This website cannot diagnose faults."
2. **Not-an-estimate label** on every estimator/planner: "Indicative only · Not a quotation · A written estimate is provided and your approval is required before work."
3. **Data notice** on every form: "Your privacy is protected · We never share your contact or vehicle information."
4. **Parts & warranty note** where prices appear: "Warranty terms depend on the parts and work chosen — see policy summary."

**5.4 Consent gate (first visit):** language, units, motion preference, storage consent (local preferences only). Default = no non-essential storage; no third-party trackers.

**5.5 Data posture (design as if GDPR + CCPA + India DPDP Act apply):** VIN/registration plates treated as personal data — uses realistic format plates/VINs for simulation; no real lookup; forms validate locally; sessionStorage only for tool state; "Clear my session" button.

**5.6 Consumer-rights statements (policy summaries, generic):** written estimate before work; authorisation before extra work; return of replaced parts on request; right to choose parts tier; independent-garage servicing does not by itself void a new-vehicle warranty **[VERIFY per country]**; complaints route; environmental handling of waste oil, coolant, refrigerants and tyres via licensed handlers.

## 6. Success Criteria
- A worried visitor gets a clear "can I drive it?" answer and a downloadable Symptom Sheet in ≤ 2 minutes.
- ≥ 6 features rated "never seen on a garage site" in review.
- Lighthouse (mobile, mid-tier): Perf ≥ 90, A11y ≥ 98, BP ≥ 95, SEO ≥ 95.
- "Stuck? Help now" and "Book" reachable in **1 click from every page** (Playwright test).
- Full EN/HI parity; unit toggle updates every measurement/price display site-wide.
- Zero lorem/TBD, zero real names/marks/reviews.

## 7. Sitemap Summary (detail in File 03)
Home · About · Services (+ detail) · Symptom & Warning-Light Guide · Book · Stuck? Help now (Breakdown) · The Bay Board (Repair Journey) · Proof Report (sample) · Fair-Price Breakdown · Service Menu (packages) · Mileage Map · EV & Hybrid · Fleet & Business · The Bay Crew · Locations · Know Your Car (+ article) · Garage Portal · Warranty, Parts & Policies · Careers & Apprenticeships · Contact · Legal (Privacy, Terms, Accessibility) · 404.

## 8. Non-Goals
No backend/DB/auth/payments/real SMS; no real VIN/plate lookup; no real scheduling; no fault diagnosis; no e-commerce parts shop; no CMS in v1; no third-party embeds/trackers.

## 9. Guiding Principles
1. **Proof before repair.** 2. **Urgency stated honestly** (Now / Soon / Watch). 3. **Price logic visible** (labour × time + parts tier). 4. **Customer stays in control** (approvals, options, returned parts). 5. **One metaphor, used with discipline** (the Click, File 02).
