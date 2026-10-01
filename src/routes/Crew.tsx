import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import { CREW_MEMBERS, WORKSHOP_BAYS } from '@/data/crew';
import { Person } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function Crew() {
  const { locale } = usePrefsStore();
  const [selectedBayId, setSelectedBayId] = useState<string>('bay-service-01');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'tree' | 'grid'>('map');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedBay = WORKSHOP_BAYS.find((b) => b.id === selectedBayId) || WORKSHOP_BAYS[0];
  const bayCrew = CREW_MEMBERS.filter((p) => p.bay === selectedBay.id || selectedBay.leadIds.includes(p.id));

  // Filtered crew for grid / search
  const filteredCrew = CREW_MEMBERS.filter((person) => {
    if (branchFilter !== 'all' && person.branch !== branchFilter) return false;
    if (roleFilter !== 'all') {
      if (roleFilter === 'master' && person.kind !== 'master' && person.kind !== 'founder') return false;
      if (roleFilter === 'tech' && person.kind !== 'tech') return false;
      if (roleFilter === 'ev-tech' && person.kind !== 'ev-tech') return false;
      if (roleFilter === 'apprentice' && person.kind !== 'apprentice') return false;
      if (roleFilter === 'advisor' && person.kind !== 'advisor' && person.kind !== 'parts') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = person.name.toLowerCase().includes(q);
      const matchRole = person.role[locale].toLowerCase().includes(q);
      const matchLang = person.languages.some((l) => l.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchLang) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 py-6" role="region" aria-label="The Bay Crew Directory">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              FEATURE 05 · VISIBLE ACCOUNTABILITY
            </span>
            <span className="text-xs font-mono text-muted-foreground">Master Techs & Apprentices</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {locale === 'hi' ? 'द बे क्रू' : 'The Bay Crew'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
            {locale === 'hi'
              ? 'जानें कि आपकी कार पर कौन काम करता है। हमारे कार्यशाला बे का शीर्ष नक्शा, टीम पदानुक्रम और तकनीशियन प्रोफाइल।'
              : 'Know exactly who works on your car. Top-down workshop bay plan, verifiable accountability, and personal technician metrology.'}
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-0.5 rounded-lg border border-border bg-muted/40 text-xs font-medium">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'map' ? 'bg-primary text-primary-foreground shadow-sm font-bold' : 'text-muted-foreground'
              }`}
              id="view-mode-map-btn"
            >
              🗺️ {locale === 'hi' ? 'बे फ्लोर मैप' : 'Bay Map'}
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'tree' ? 'bg-primary text-primary-foreground shadow-sm font-bold' : 'text-muted-foreground'
              }`}
              id="view-mode-tree-btn"
            >
              🌳 {locale === 'hi' ? 'ऑर्ग चार्ट (Tree)' : 'Org Hierarchy'}
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground shadow-sm font-bold' : 'text-muted-foreground'
              }`}
              id="view-mode-grid-btn"
            >
              👥 {locale === 'hi' ? 'टीम रोस्टर' : 'Team Roster'}
            </button>
          </div>

          <Link to="/careers">
            <Button variant="outline" size="sm" className="text-xs">
              🎓 {locale === 'hi' ? 'करियर व अप्रेंटिसशिप' : 'Join the Crew'}
            </Button>
          </Link>
        </div>
      </div>

      {/* VIEW 1: Interactive Top-Down Bay Floor Map */}
      {viewMode === 'map' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SVG Interactive Workshop Plan */}
            <div className="lg:col-span-2 rounded-2xl bg-neutral-900 border border-neutral-800 p-4 md:p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-2 border-b border-neutral-800">
                <span className="font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  TORQUEWELL WORKSHOP BLUEPRINT · 7 SPECIALIST ZONES
                </span>
                <span className="text-[11px] text-neutral-500">Click a bay zone to inspect equipment & crew</span>
              </div>

              {/* Blueprint SVG Canvas */}
              <div className="relative w-full aspect-[16/9] bg-neutral-950/80 rounded-xl border border-neutral-800/80 overflow-hidden">
                <svg
                  viewBox="0 0 1180 470"
                  className="w-full h-full select-none"
                  role="img"
                  aria-label="Workshop Floor Plan Blueprint"
                >
                  <defs>
                    <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  {/* Background Grid */}
                  <rect width="1180" height="470" fill="url(#blueprint-grid)" />

                  {/* Draw each bay polygon */}
                  {WORKSHOP_BAYS.map((bay) => {
                    const isSelected = bay.id === selectedBay.id;
                    const x = bay.polygon[0][0];
                    const y = bay.polygon[0][1];
                    const width = bay.polygon[1][0] - x;
                    const height = bay.polygon[2][1] - y;

                    return (
                      <g
                        key={bay.id}
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedBayId(bay.id)}
                        tabIndex={0}
                        role="button"
                        aria-label={bay.name[locale]}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedBayId(bay.id);
                          }
                        }}
                      >
                        {/* Bay Boundary */}
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          rx={10}
                          className={`transition-all duration-200 ${
                            isSelected
                              ? 'fill-amber-500/20 stroke-amber-400 stroke-2 filter drop-shadow(0 0 8px rgba(245,158,11,0.4))'
                              : 'fill-neutral-900/80 stroke-neutral-700/80 hover:stroke-neutral-500 hover:fill-neutral-800/80 stroke-1'
                          }`}
                        />

                        {/* Bay Title & Tag */}
                        <text
                          x={x + 16}
                          y={y + 32}
                          className="font-mono text-xs font-bold fill-neutral-200 uppercase tracking-wider pointer-events-none"
                        >
                          {bay.name[locale]}
                        </text>

                        {/* Headcount pill */}
                        <rect
                          x={x + width - 75}
                          y={y + 16}
                          width={60}
                          height={22}
                          rx={11}
                          className={isSelected ? 'fill-amber-500/40' : 'fill-neutral-800'}
                        />
                        <text
                          x={x + width - 45}
                          y={y + 31}
                          textAnchor="middle"
                          className="font-mono text-[10px] font-semibold fill-neutral-300 pointer-events-none"
                        >
                          👤 {bay.headcount} Crew
                        </text>

                        {/* Calibrated equipment teaser */}
                        <text
                          x={x + 16}
                          y={y + height - 20}
                          className="text-[11px] fill-neutral-400 pointer-events-none italic truncate"
                        >
                          ⚙️ {bay.equipment[0]?.[locale]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bay Spotlight Inspection Card */}
            <Card className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10">
                    ZONE SPOTLIGHT
                  </span>
                  <Badge variant="neutral">
                    {selectedBay.headcount} Dedicated Specialists
                  </Badge>
                </div>

                <h2 className="text-xl font-bold tracking-tight">
                  {selectedBay.name[locale]}
                </h2>

                {/* Equipment Suite */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {locale === 'hi' ? 'अंशांकित उपकरण' : 'Calibrated Tooling & Rigs'}
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {selectedBay.equipment.map((eq, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="text-foreground">{eq[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assigned Crew in this Bay */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {locale === 'hi' ? 'कार्यरत टीम सदस्य' : 'Specialists In This Bay'}
                  </div>
                  <div className="space-y-2">
                    {bayCrew.map((person) => (
                      <div
                        key={person.id}
                        onClick={() => setSelectedPerson(person)}
                        className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/70 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Lug-nut avatar */}
                          <div className="w-8 h-8 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center font-mono text-xs font-bold text-primary">
                            {person.portrait}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">{person.name}</div>
                            <div className="text-[11px] text-muted-foreground">{person.role[locale]}</div>
                          </div>
                        </div>
                        <span className="text-xs text-primary font-medium">View &rarr;</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/40 text-[11px] text-muted-foreground">
                {locale === 'hi'
                  ? 'टॉर्कवेल क्लिक गारंटी: कार्यशाला में सभी पुर्जों को तय विनिर्देशों के अनुसार लॉक किया जाता है।'
                  : 'Calibrated Click Guarantee: All fastener torques verified by assigned bay lead.'}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* VIEW 2: Accessible Org Hierarchy Tree (role="tree") */}
      {viewMode === 'tree' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'टीम पदानुक्रम (ऑर्ग चार्ट)' : 'Workshop Technical Hierarchy'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'hi'
                ? 'संस्थापक से लेकर प्रशिक्षुओं तक जवाबदेही की स्पष्ट श्रृंखला।'
                : 'A clear chain of technical accountability from Founder and Master Technicians down to apprentices.'}
            </p>
          </div>

          {/* Org Tree Structure with role="tree" */}
          <div role="tree" aria-label="Torquewell Technical Hierarchy" className="space-y-4">
            {/* Level 1: Founder */}
            <div role="treeitem" aria-expanded="true" className="space-y-3">
              <div
                onClick={() => setSelectedPerson(CREW_MEMBERS[0])}
                className="p-4 rounded-xl border-2 border-primary/60 bg-primary/10 hover:bg-primary/20 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary text-primary-foreground font-mono font-bold flex items-center justify-center text-sm shadow">
                    DT
                  </div>
                  <div>
                    <div className="font-bold text-base text-foreground">David Torres</div>
                    <div className="text-xs text-primary font-semibold">Founder & Technical Director</div>
                  </div>
                </div>
                <Badge variant="neutral">Level 1 · Executive</Badge>
              </div>

              {/* Level 2: Master Technicians & Department Leads */}
              <div className="pl-6 sm:pl-10 border-l-2 border-primary/30 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase text-muted-foreground">
                  Direct Technical Reports:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CREW_MEMBERS.filter((p) => p.reportsTo === 'person-david').map((lead) => (
                    <div
                      key={lead.id}
                      role="treeitem"
                      onClick={() => setSelectedPerson(lead)}
                      className="p-3.5 rounded-xl border border-border/70 bg-card hover:border-primary/50 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center font-mono text-xs font-bold text-foreground">
                          {lead.portrait}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">{lead.name}</div>
                          <div className="text-xs text-muted-foreground">{lead.role[locale]}</div>
                        </div>
                      </div>
                      <Badge variant="neutral" className="text-[10px] capitalize">
                        {lead.kind}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Level 3: Apprentices & Specialists */}
                <div className="pt-2">
                  <div className="text-xs font-mono font-semibold uppercase text-muted-foreground mb-2">
                    Apprenticeship & Junior Specialist Pathway:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CREW_MEMBERS.filter((p) => p.kind === 'apprentice').map((apprentice) => (
                      <div
                        key={apprentice.id}
                        role="treeitem"
                        onClick={() => setSelectedPerson(apprentice)}
                        className="p-3.5 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {apprentice.portrait}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-foreground">{apprentice.name}</div>
                            <div className="text-xs text-muted-foreground">{apprentice.role[locale]}</div>
                          </div>
                        </div>
                        <Badge variant="ok" className="text-[10px]">
                          Mentored
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* VIEW 3: Full Crew Roster & Filter */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          {/* Controls: Search & Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/60">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'hi' ? 'नाम या भाषा से खोजें...' : 'Search team by name or language...'}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                id="crew-search-input"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground"
                aria-label="Filter by Branch"
              >
                <option value="all">All Branches (3)</option>
                <option value="branch-central">Torquewell Central</option>
                <option value="branch-north">Torquewell North</option>
                <option value="branch-south">Torquewell South (EV)</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground"
                aria-label="Filter by Role"
              >
                <option value="all">All Roles</option>
                <option value="master">Master & Lead Techs</option>
                <option value="ev-tech">EV Specialists</option>
                <option value="tech">Mechanical Technicians</option>
                <option value="apprentice">Apprentices</option>
                <option value="advisor">Service Advisors</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrew.map((person) => (
              <div
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className="p-5 rounded-2xl border border-border/70 bg-card hover:border-primary hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Lug-nut Avatar */}
                    <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center font-mono text-base font-bold text-primary">
                      {person.portrait}
                    </div>
                    <Badge variant="neutral" className="text-[11px] capitalize font-mono">
                      {person.kind}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-foreground">{person.name}</h3>
                    <div className="text-xs text-primary font-medium">{person.role[locale]}</div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {person.bio[locale]}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {person.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground font-medium"
                      >
                        🗣️ {lang}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-primary font-semibold flex items-center justify-between">
                    <span>Inspect Profile &rarr;</span>
                    <span className="font-mono text-muted-foreground text-[10px]">
                      {person.branch.replace('branch-', '').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Person Detail Drawer / Modal */}
      {selectedPerson && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="person-modal-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6"
          >
              {/* Top Banner */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center font-mono text-xl font-bold text-primary">
                    {selectedPerson.portrait}
                  </div>
                  <div>
                    <h3 id="person-modal-name" className="text-2xl font-bold tracking-tight">
                      {selectedPerson.name}
                    </h3>
                    <div className="text-sm font-semibold text-primary">
                      {selectedPerson.role[locale]}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPerson(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {locale === 'hi' ? 'परिचय एवं कार्यशाला अनुभव' : 'Background & Workshop Focus'}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {selectedPerson.bio[locale]}
                </p>
              </div>

              {/* Languages */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {locale === 'hi' ? 'बातचीत की भाषाएं' : 'Spoken Languages'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPerson.languages.map((l, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-muted text-foreground text-xs font-medium"
                    >
                      🗣️ {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credentials / Training Placeholders */}
              <div className="space-y-2 p-4 rounded-xl bg-muted/40 border border-border/60">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {locale === 'hi' ? 'तकनीकी प्रशिक्षण एवं योग्यता' : 'Accredited Training & Qualifications'}
                </div>
                <ul className="space-y-1 text-xs text-foreground">
                  {selectedPerson.trainingPlaceholders.map((tp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{tp}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[10px] text-muted-foreground italic pt-1">
                  *Qualifications documented in accordance with workshop verification standards.
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedPerson(null)}>
                  {locale === 'hi' ? 'बंद करें' : 'Close Profile'}
                </Button>
              </div>
          </div>
        </div>
      )}

      {/* Mandatory Notice */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <strong className="text-foreground">Transparency Guarantee:</strong> Every vehicle repair has a named, accountable lead technician whose calibration certificate is logged to your job dossier.
        </div>
        <div className="flex items-center gap-3">
          <Link to="/journey" className="text-primary hover:underline font-medium">
            Live Bay Board
          </Link>
          <Link to="/locations" className="text-primary hover:underline font-medium">
            Workshop Locations
          </Link>
        </div>
      </div>
    </div>
  );
}
