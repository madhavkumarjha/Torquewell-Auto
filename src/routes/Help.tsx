import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import {
  PhoneCall,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  CheckCircle,
  XCircle,
  Zap,
  Truck,
  ArrowRight,
  LifeBuoy,
} from 'lucide-react';

export default function Help() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header / Priority Hero */}
      <div className="space-y-4 text-center sm:text-left border-b border-[var(--line)] pb-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Badge variant="now">Roadside Priority</Badge>
          <span className="text-xs font-mono uppercase text-[var(--text-muted)]">
            Emergency & Breakdown Guidance
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[var(--text)]">
          Stuck or feeling unsafe? <span className="text-[var(--critical)]">Help now.</span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl">
          Follow these immediate steps to stay safe. If you need recovery, our emergency helpline is
          ready to dispatch a recovery team or guide you to the nearest bay.
        </p>
      </div>

      {/* GIANT CALL BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <Card className="bg-[var(--critical)] text-white p-8 flex flex-col justify-between shadow-xl border-none">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full">
                <PhoneCall className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold opacity-90 block">
                  Direct Roadside Assistance
                </span>
                <span className="text-sm opacity-90">24/7 Breakdown Dispatch</span>
              </div>
            </div>
            <a
              href={`tel:${siteConfig.roadsidePhone}`}
              className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight block hover:underline"
              aria-label={`Call emergency line at ${siteConfig.roadsidePhone}`}
            >
              {siteConfig.roadsidePhone}
            </a>
            <p className="text-xs leading-relaxed opacity-95">
              Tap above to dial directly. Keep your hazards on and remain in a safe location behind
              road barriers if on a highway.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between text-xs">
            <span>Average response: under 45 mins</span>
            <span className="font-semibold underline">No network charge check</span>
          </div>
        </Card>

        {/* Regular Workshop Bookings / Non-critical queries */}
        <Card className="p-8 flex flex-col justify-between bg-[var(--surface-2)]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--accent)]/15 rounded-full text-[var(--accent)]">
                <LifeBuoy className="w-8 h-8" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-muted)] font-semibold block">
                  Workshop Advisory
                </span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  Can still drive safely?
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-[var(--text)]">
              {siteConfig.phone}
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              If warning lights are steady amber and vehicle controls respond normally, run our
              interactive triage guide to see if you can drive to the workshop.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--line)]">
            <Link
              to="/guide"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline"
            >
              <span>Run "Can I still drive it?" Symptom Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </div>

      {/* STOP SAFELY CHECKLIST */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-[var(--amber)]" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-display text-[var(--text)]">
            1. Stop Safely Checklist
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-[var(--teal)] mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-[var(--text)]">1. Move off the carriageway</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Pull completely onto the hard shoulder, verge, or emergency refuge area. Turn your
                wheels pointed away from moving traffic.
              </p>
            </div>
          </Card>

          <Card className="p-5 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-[var(--teal)] mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-[var(--text)]">2. Hazard lights immediately</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Turn on your hazard warning lights. In poor visibility or fog, switch on your sidelights.
              </p>
            </div>
          </Card>

          <Card className="p-5 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-[var(--teal)] mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-[var(--text)]">3. Exit on the safe (passenger) side</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Never exit onto the live traffic side. Get all passengers out through the nearside
                doors, put on high-visibility vests if available.
              </p>
            </div>
          </Card>

          <Card className="p-5 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-[var(--teal)] mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-[var(--text)]">4. Stand behind the safety barrier</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Stand well back on the embankment or behind the crash barrier, upstream from your
                vehicle. Never sit inside a broken-down car on a highway.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* DO NOT ATTEMPT */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-[var(--critical)]" aria-hidden="true" />
          <h2 className="text-2xl font-bold font-display text-[var(--text)]">
            2. Do NOT Attempt at Roadside
          </h2>
        </div>

        <Card className="p-6 bg-[var(--surface-2)] border-l-4 border-[var(--critical)] space-y-3">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text)]">
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[var(--critical)] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Brake or steering work:</strong> Never dismantle callipers or crawl beneath on roadside.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[var(--critical)] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Hot cooling caps:</strong> Never open a pressurized coolant bottle when engine is hot.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[var(--critical)] mt-0.5 flex-shrink-0" />
              <span>
                <strong>High-voltage cables (EV/Hybrid):</strong> Never touch orange cables or open battery covers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-[var(--critical)] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Traffic-side wheel changes:</strong> Call for a safety vehicle if flat tyre faces highway traffic.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* WHAT TO TELL THE OPERATOR & TOW EXPLAINER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-display text-[var(--text)]">
            3. What to Tell the Operator
          </h2>
          <Card className="p-6 space-y-3 text-xs">
            <p className="text-[var(--text-muted)]">
              When our recovery coordinator answers, please provide:
            </p>
            <ol className="list-decimal pl-4 space-y-2 text-[var(--text)] leading-relaxed">
              <li>
                <strong>Your precise location:</strong> Motorway junction number, marker post number,
                street name, or <em>what3words</em> address.
              </li>
              <li>
                <strong>Vehicle Registration:</strong> Format (e.g. TW68 AKZ), make, model, and fuel type.
              </li>
              <li>
                <strong>Physical Situation:</strong> Any danger, smoke, fuel smell, passengers with
                mobility needs, or children.
              </li>
              <li>
                <strong>Symptoms noticed:</strong> Loss of propulsion, locked wheel, flat tyre, or warning symbols.
              </li>
            </ol>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold font-display text-[var(--text)]">
            4. Recovery & Transport Process
          </h2>
          <Card className="p-6 space-y-3 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-[var(--teal)] font-semibold">
              <Truck className="w-4 h-4" />
              <span>Flatbed Transport</span>
            </div>
            <p className="text-[var(--text-muted)]">
              All vehicles (especially AWD and EV powertrains) are safely recovered via hydraulic
              tilt-and-slide flatbeds to eliminate drivetrain wear.
            </p>
            <p className="text-[var(--text-muted)]">
              Your car is delivered directly into an inspection bay at your chosen Torquewell branch.
              You will receive an instant digital check-in SMS and proof report link.
            </p>
          </Card>
        </div>
      </div>

      {/* EV & HYBRID SPECIAL NOTES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
          <h2 className="text-xl font-bold font-display text-[var(--text)]">
            EV & Hybrid Specific Safety
          </h2>
        </div>
        <Card className="p-6 bg-[var(--surface-2)] space-y-2 text-xs leading-relaxed text-[var(--text)]">
          <p>
            • <strong>Towing rule:</strong> EVs must <em>never</em> be towed with wheels rolling on the
            ground; kinetic regeneration back-EMF can destroy inverter electronics or cause electrical fires. Flatbed recovery only.
          </p>
          <p>
            • <strong>Charging port stuck:</strong> Do not pry with metallic tools. Check inside the boot/trunk lining for the manual mechanical emergency release cord.
          </p>
          <p>
            • <strong>Thermal/Hissing:</strong> If high-voltage warning light appears with unusual hissing, heat, or smoke, immediately retreat at least 50 metres upwind.
          </p>
        </Card>
      </div>

      {/* NEAREST WORKSHOP BRANCHES */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-[var(--text)]">
          Torquewell Workshop Branches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {siteConfig.branches.map((b) => (
            <Card key={b.id} className="p-5 space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <MapPin className="w-4 h-4" />
                <h3 className="font-bold text-sm text-[var(--text)]">{b.name}</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{b.region}</p>
              <p className="text-xs font-mono text-[var(--text)]">Mon–Sat 08:00–18:00</p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--line)]">
                  EV Ready • Alignment Rig
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* MANDATORY DISCLAIMER */}
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] text-center text-xs text-[var(--text-muted)] space-y-1">
        <p className="font-semibold text-[var(--text)]">
          Safety Notice & Medical/Emergency Disclaimer
        </p>
        <p>
          If your vehicle feels unsafe, stop in a safe place and call emergency services. This
          website cannot diagnose faults remotely. All recovery dispatch is operated under national
          road transport safety guidelines.
        </p>
      </div>
    </div>
  );
}
