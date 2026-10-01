# 05 · MOTION & ANIMATION SPEC — Torquewell Auto

## 1. Motion Principles (metaphor-driven)
1. **Everything ends in a click.** Motion accelerates smoothly, then *settles with a crisp stop* (damped, ≤ 2% overshoot) — like a torque wrench reaching its setting.
2. **Mechanical honesty.** Rotations, gauges, and sliders behave like real instruments (dial needles, ratchet ticks); no floaty, decorative drift.
3. **Motion explains.** Exploded views, gauges, and timelines show *how things fit and where they stand*; otherwise remove.
4. **Never block the help path.** Help-now and Book pills, nav, and forms are never delayed by animation.
5. **Respect the user.** Reduced-motion and Calm Mode are first-class, complete experiences.

## 2. Toolkit
| Tool | Use |
|---|---|
| Framer Motion (`motion`) | Component enter/exit, layout, hover, shared-element |
| GSAP + ScrollTrigger | Pinned story (Drive-In to Drive-Out), Mileage Map scrubbing |
| Lenis | Smooth scroll (desktop only; off for reduced-motion/Calm) |
| CSS (`@property`, `clip-path`, scroll-timeline) | Ticks, dials, reveals |
| SVG (stroke-dashoffset, `getPointAtLength`) | Exploded views, road path, gauges |
| React Three Fiber (optional, lazy) | One hero wheel/brake-disc rotation (Tier A only) |
| Canvas 2D | Not used except ambient tread-line drift (very light, optional) |

## 3. Easing & Duration Tokens
| Token | Value | Use |
|---|---|---|
| `ease-click` | `cubic-bezier(0.2, 0.9, 0.2, 1)` | Default: quick start, crisp stop |
| `ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Large reveals |
| `ease-ratchet` | `steps(6, end)` | Dial/tick animations (stepped) |
| `ease-linear-guide` | `linear` | Scrubbed scroll, road drawing |
| `ease-out-soft` | `cubic-bezier(0.33, 1, 0.68, 1)` | Exits |
| `ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | Page transitions |
| `dur-instant` | 80ms | Press/focus |
| `dur-fast` | 160ms | Hover/toggle |
| `dur-base` | 300ms | Cards/drawers |
| `dur-slow` | 560ms | Section reveals |
| `dur-cine` | 900–1300ms | Hero/exploded transitions (desktop) |
Stagger: 50ms lists, 80ms grids. Max 12 simultaneously animated elements per viewport.

## 4. Global Choreography
| Moment | Spec |
|---|---|
| **Loader** | ≤ 800ms: lug-nut ring rotates 72° and its notch ticks (single "click" visual: brief lime flash 90ms); removed at first paint + fonts ready; not shown on repeat visits (session) or on `/help`. |
| **Page transitions** | "Click-through": tick-scale (lime) sweeps across (350ms), content translates 12px + fades (300ms); focus moves to `h1`; reduced-motion → 100ms fade. |
| **Scroll progress** | Left-edge ruler with click marks; current section notch enlarged; hover shows section name. |
| **Cursor** | Small torque-dial follower (lerp 0.2); needle deflects with movement speed (subtle); off on touch/reduced-motion. |
| **Image reveals** | Mask wipe following a tick direction, 600ms; blur-up LQIP. |
| **Text reveals** | Headlines by line (20px rise, 450ms, stagger 60ms); Devanagari animates whole words. |
| **Magnetic buttons** | Max 6px pull, spring (stiffness 260, damping 26); off on touch. |
| **Card hovers** | Notched-corner highlight draws, 2px lift, image scale 1.02, 280ms. |
| **Pills (Help now/Book)** | Static; hover fills with subtle progress tick; **no pulsing or flashing**. |
| **Numbers/gauges** | Needle/count animate ≤ 600ms with `ease-click`; final value announced once via `aria-live`. |

## 5. Page-by-Page Signature Moments
| Page | Signature moment | Tech | Mobile tier |
|---|---|---|---|
| Home | Hood lifts, car explodes into layered callouts on scroll | GSAP + SVG | Static exploded image + fade callouts |
| About | Timeline drawn along click-ruler | ScrollTrigger scrub | Simple reveal |
| Services | Cards reveal urgency icons; hover shows "what we check" ticks | FM + CSS | Tap |
| Guide | Step cards slide with tick sweep; result dial needle swings to level and clicks | FM + SVG | Same, no swing overshoot |
| Book | Stepper ticks fill progressively; confirmation ring "clicks" once | CSS | Same |
| Help now | **No decorative motion**; only focus/press feedback | — | Same |
| Bay Board | Job tokens advance with ratchet steps; progress ring segments fill | FM + SVG | Static ring |
| Proof Report | Donut segments draw; gauges swing to measured value vs minimum marker | SVG + FM | Same |
| Fair-Price | Stacked bars grow to ranges; toggle "needed now" collapses bars smoothly | FM | Same |
| Menu/Packages | Included/excluded items tick in sequentially (40ms stagger) | CSS | No stagger |
| Mileage Map | Road path draws as you scroll; milestones "click" into place at their km | GSAP + SVG | Vertical timeline, reveal only |
| EV & Hybrid | Battery-pack exploded view rotates 15° on scroll | SVG (R3F optional) | Static |
| Fleet | Table rows stagger; downtime bars fill | FM | Same |
| Bay Crew | Bay lights up; camera zooms with ≤ 12px parallax layers | FM + SVG | Accordion + mini-map |
| Know Your Car | Exploded parts separate along axes on hover/focus/scroll | SVG + FM | Tap to separate |
| Portal | Card stagger; timeline draws | FM | Same |
| Careers/Contact | Gentle reveals; field focus glow | CSS | Same |

## 6. Performance Guardrails & Budgets
| Metric | Target (mobile mid-tier, 4G) | Hard fail |
|---|---|---|
| LCP | ≤ 2.0s (Help ≤ 1.2s) | > 2.5s |
| CLS | ≤ 0.02 | > 0.05 |
| INP | ≤ 150ms | > 200ms |
| TBT | ≤ 150ms | > 300ms |
| Initial JS/route (gz) | ≤ 170KB | > 220KB |
| Heavy chunks (GSAP/3D/PDF) | lazy, ≤ 250KB gz each | > 320KB |
| Fonts above the fold | ≤ 4 files, ≤ 140KB | > 200KB |
| Hero image | ≤ 180KB (AVIF/WebP), `fetchpriority=high` | > 260KB |
Rules: animate `transform`/`opacity` (and `clip-path`/`stroke-dashoffset` sparingly); avoid layout thrash; `will-change` only during animation; IntersectionObserver activation; pause off-screen animations; DPR cap 2; CI Lighthouse with 4× CPU slowdown.

## 7. Mobile Tier
- **Tier A:** full choreography (no cursor effects).
- **Tier B** (`deviceMemory ≤ 4` or `hardwareConcurrency ≤ 4`): no Lenis/R3F, pinned scenes → reveal sequences, durations ×0.7.
- **Tier C** (`Save-Data`): static imagery, no 3D/video, gauges render at final value without swing.

## 8. Reduced-Motion & Manual Toggles
- Honour `prefers-reduced-motion`; **Motion: Full / Reduced / Off** in consent gate and header settings (local).
- **Reduced:** fades ≤ 150ms; no parallax, pinning, auto-advance, needle swings, or line drawing (final states shown instantly).
- **Off/Calm:** zero transitions except focus; static imagery; Drive-In story becomes ordered list; gauges static with numeric values visible.
- No flashing > 3/s (WCAG 2.3.1); the "click" flash on load is a single 90ms low-contrast lime pulse and is disabled under reduced-motion; no autoplay audio (no click sounds).

## 9. Accessibility of Animated Canvases/SVG
- Each SVG/canvas has `role="img"` + `aria-label`, or `aria-hidden` with adjacent equivalent text.
- Gauges/charts provide numeric text and data-table alternatives; exploded views provide a parts list.
- Pinned stories provide skip links; DOM order equals reading order.
- Pause/Play for auto-advancing elements (Bay Board simulator) — WCAG 2.2.2.
- Focus management on route change; `aria-live="polite"` for status updates; test with keyboard-only, VoiceOver/TalkBack, NVDA; Playwright + axe per page.
