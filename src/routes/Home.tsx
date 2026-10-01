import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DriveInStory } from '@/components/story/DriveInStory';
import {
  HelpCircle,
  AlertTriangle,
  FileCheck2,
  CalendarCheck2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Camera,
  Wrench,
  Zap,
  Truck,
  Users,
  MapPin,
} from 'lucide-react';

export default function Home() {
  const routeTiles = [
    {
      id: 'guide',
      to: '/guide',
      badge: 'Immediate Safety Triage',
      badgeVariant: 'soon' as const,
      icon: <HelpCircle className="w-6 h-6 text-[var(--amber)]" />,
      title: 'Can I still drive it?',
      desc: 'Got a sudden warning light, squeal, or vibration? Run our 2-minute safety check before driving further.',
      cta: 'Check warning symbol',
      borderHover: 'hover:border-[var(--amber)]',
    },
    {
      id: 'help',
      to: '/help',
      badge: 'Roadside Priority',
      badgeVariant: 'now' as const,
      icon: <AlertTriangle className="w-6 h-6 text-[var(--critical)]" />,
      title: 'Stuck? Help now',
      desc: 'Vehicle broken down or unsafe to steer? One-touch 24/7 recovery dispatch and roadside safety steps.',
      cta: 'Get roadside help',
      borderHover: 'hover:border-[var(--critical)]',
    },
    {
      id: 'proof',
      to: '/proof',
      badge: 'Digital Transparency',
      badgeVariant: 'watch' as const,
      icon: <FileCheck2 className="w-6 h-6 text-[var(--teal)]" />,
      title: 'See the proof',
      desc: 'Explore an actual digital inspection report with micro-photos, wear measurements, and urgency ratings.',
      cta: 'View sample report',
      borderHover: 'hover:border-[var(--teal)]',
    },
    {
      id: 'book',
      to: '/book',
      badge: 'Guaranteed Scope',
      badgeVariant: 'accent' as const,
      icon: <CalendarCheck2 className="w-6 h-6 text-[var(--accent)]" />,
      title: 'Book a check',
      desc: 'Fixed-price services and routine maintenance with zero surprise extras. Pick your bay and slot in minutes.',
      cta: 'Select date & branch',
      borderHover: 'hover:border-[var(--accent)]',
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-24 pb-24">
      {/* Background Decorative Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[var(--accent)]/10 via-[var(--accent)]/3 to-transparent blur-3xl -z-10"
      />

      {/* 1. HERO MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              Proof, not promises
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[var(--text)] leading-[1.08]">
              The garage that shows the{' '}
              <span className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-8">
                evidence
              </span>{' '}
              before a spanner is turned.
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed font-normal">
              No mystery charges. No jargon upsells. Every vehicle receives high-resolution photo proof,
              calibrated micrometer measurements, and clear price logic before you approve any work.
            </p>

            {/* Quick Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all select-none cursor-pointer"
              >
                <span>Book an Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#drive-story"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] text-[var(--text)] font-semibold text-sm hover:bg-[var(--line)] active:scale-95 transition-all select-none cursor-pointer"
              >
                <span>See How We Work</span>
              </a>
            </div>
          </div>

          {/* Hero Cinematic Graphic (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-2 shadow-2xl overflow-hidden group">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_70%)] opacity-10 pointer-events-none"
              />

              <div className="relative rounded-[var(--radius-md)] overflow-hidden aspect-[16/10] bg-[var(--surface-2)] flex items-center justify-center">
                <img
                  src="/img/hero/hero-01.svg"
                  alt="Modern independent garage bay with vehicle on lift, overhead task lighting, and calibrated torque dial readout"
                  fetchPriority="high"
                  className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Verified inspection tag */}
              <div className="p-3 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--line)]/60 bg-[var(--surface)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="font-semibold text-[var(--text)]">BAY 04 · LIVE CALIBRATION</span>
                </div>
                <span>140 N·m · SPEC OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 PRIMARY ACTION TILES (Calm a worried driver in 30 seconds) */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold">
              Where can we direct you right now?
            </h2>
            <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline">
              Instant 1-Click Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {routeTiles.map((tile) => (
              <Link
                key={tile.id}
                to={tile.to}
                className="group block transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[var(--radius-md)]"
              >
                <Card
                  notched
                  className={`h-full flex flex-col justify-between p-6 bg-[var(--surface)] border border-[var(--line)] transition-colors ${tile.borderHover} group-hover:bg-[var(--surface-2)]`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-full bg-[var(--surface-2)] group-hover:scale-110 transition-transform">
                        {tile.icon}
                      </div>
                      <Badge variant={tile.badgeVariant} icon={false}>
                        {tile.badge}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold font-display text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {tile.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    <span>{tile.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* TRUST MARKERS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[var(--line)]">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-[var(--text)] block">Photo Evidence</span>
              <span className="text-[11px] text-[var(--text-muted)]">On every single finding</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-[var(--teal)] flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-[var(--text)] block">Micrometer Gauges</span>
              <span className="text-[11px] text-[var(--text-muted)]">Real mm & pressure values</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--amber)] flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-[var(--text)] block">Written Estimates</span>
              <span className="text-[11px] text-[var(--text-muted)]">Customer approval first</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-[var(--text)] block">Returned Parts</span>
              <span className="text-[11px] text-[var(--text-muted)]">Keep replaced components</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DRIVE-IN TO DRIVE-OUT SIGNATURE STORY (FEATURE 01) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DriveInStory />
      </section>

      {/* 3. PROOF REPORT & FAIR-PRICE TEASERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Proof Report Teaser */}
          <Card className="p-8 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="watch">DIGITAL INSPECTION DEMO</Badge>
              <h3 className="text-2xl font-bold font-display text-[var(--text)]">
                See exactly what's worn before deciding.
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Every vehicle check generates a digital Proof Report with micro-photos, measured wear values vs manufacturer thresholds, and honest urgency tags (Now, Soon, or Watch).
              </p>

              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--line)]/60 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[var(--text-muted)] block">FRONT BRAKE PADS</span>
                  <span className="text-sm font-bold text-[var(--critical)]">2.5 mm (Min: 3.0 mm)</span>
                </div>
                <Badge variant="now">NOW / REPLACE</Badge>
              </div>
            </div>

            <Link
              to="/proof"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] hover:underline uppercase tracking-wider"
            >
              <span>Explore Interactive Proof Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          {/* Fair-Price Breakdown Teaser */}
          <Card className="p-8 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="accent">PRICING LOGIC</Badge>
              <h3 className="text-2xl font-bold font-display text-[var(--text)]">
                Labour rate × actual hours. Zero guessing.
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                We believe you deserve to understand how quotes are calculated. View itemized parts tiers (OE vs OE-equivalent), standardized labour hours, and environmental disposal fees.
              </p>

              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--line)]/60 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[var(--text-muted)] block">WORKSHOP LABOUR</span>
                  <span className="text-sm font-bold text-[var(--text)]">$85.00 / hour fixed</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">Industry standard times</span>
              </div>
            </div>

            <Link
              to="/prices"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] hover:underline uppercase tracking-wider"
            >
              <span>See Fair-Price Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </section>

      {/* 4. MILEAGE MAP & WORKSHOP CREW TEASERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mileage Map Card (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 bg-[var(--surface)] border border-[var(--line)] space-y-6">
              <div className="space-y-3">
                <Badge variant="soon">PREVENTIVE MILESTONES</Badge>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text)]">
                  Know what needs care and what can safely wait.
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Our interactive Mileage Map correlates your vehicle's age and odometer reading to factory service schedules, preventing premature component failures before long road trips.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--line)]/50">
                  <span className="text-xs text-[var(--text-muted)] block">30,000 KM</span>
                  <span className="text-xs font-bold text-[var(--accent)]">Brake Fluid Flush</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--line)]/50">
                  <span className="text-xs text-[var(--text-muted)] block">60,000 KM</span>
                  <span className="text-xs font-bold text-[var(--teal)]">Spark Plugs & Belts</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--line)]/50">
                  <span className="text-xs text-[var(--text-muted)] block">90,000 KM</span>
                  <span className="text-xs font-bold text-[var(--amber)]">Timing & Water Pump</span>
                </div>
              </div>

              <Link
                to="/mileage-map"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] hover:underline uppercase tracking-wider"
              >
                <span>Open Mileage Milestone Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>

          {/* Bay Crew Card (5 cols) */}
          <div className="lg:col-span-5">
            <Card className="p-8 sm:p-10 bg-[var(--surface-2)] border border-[var(--line)] space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--accent)]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[var(--text)]">
                  Meet the technicians working on your car.
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  No hidden backrooms. Inspect our bay layout, technician certifications, and direct service advisor contacts.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>3 Multi-Bay Network Locations</span>
              </div>

              <Link
                to="/crew"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] uppercase tracking-wider transition-colors"
              >
                <span>View Bay Plans & Crew Profiles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. EV & FLEET CAPABILITY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/ev"
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--teal)] transition-all group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-[var(--teal)]/15 text-[var(--teal)] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-base text-[var(--text)] group-hover:text-[var(--teal)] transition-colors block">
                Electric & Hybrid Bay Specialists
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Certified high-voltage isolation, traction battery cell balancing, and regenerative brake servicing.
              </p>
            </div>
          </Link>

          <Link
            to="/fleet"
            className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] transition-all group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors block">
                Commercial Fleet Maintenance
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Guaranteed turnaround slots, priority bay scheduling, and consolidated monthly digital billing.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. CLOSING VALUE GUARANTEE & FINAL BOOKING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-lg)] bg-[var(--surface-2)] border border-[var(--line)] p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <Badge variant="accent">THE CLICK GUARANTEE</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[var(--text)]">
              Proof, not promises. The standard auto repair always owed you.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              When a torque wrench tightens a bolt to the exact manufacturer specification, it produces
              an unmistakable <em>click</em> — audible proof that the job is done right. We apply that same
              click principle to your invoices, inspection reports, and service roadmaps.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[var(--text)]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                Urgency categorized (Now / Soon / Watch)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                Fixed workshop labour rates
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                OE & aftermarket part tier options
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                <span>Book an Inspection Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/help"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--surface)] border border-[var(--critical)]/40 text-[var(--critical)] font-bold text-xs tracking-wider uppercase hover:bg-[var(--critical)]/10 transition-all"
              >
                <span>Stuck on the road? Help now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
