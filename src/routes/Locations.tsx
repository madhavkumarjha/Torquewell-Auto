import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import { WORKSHOP_BRANCHES, BranchDetail } from '@/data/branches';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function Locations() {
  const { locale } = usePrefsStore();
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-central');

  const selectedBranch: BranchDetail =
    WORKSHOP_BRANCHES.find((b) => b.id === selectedBranchId) || WORKSHOP_BRANCHES[0];

  return (
    <div className="space-y-10 py-6" role="region" aria-label="Workshop Locations Directory">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              3 REGIONAL HUBS · 19 ACTIVE BAYS
            </span>
            <span className="text-xs font-mono text-muted-foreground">ISO Calibrated Standards</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {locale === 'hi' ? 'कार्यशाला शाखाएं' : 'Workshop Locations'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
            {locale === 'hi'
              ? 'तीन अत्याधुनिक केंद्र। प्रत्येक शाखा में समान कड़े अंशांकन मानक, पारदर्शी मूल्य और प्रमाणित तकनीशियन।'
              : 'Three specialized precision facilities across the region. Identical calibrated torque standards, digital proof reporting, and transparent pricing at every site.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/book">
            <Button variant="primary" size="sm" id="book-visit-btn">
              📅 {locale === 'hi' ? 'कार्यशाला बुक करें' : 'Book Bay Visit'}
            </Button>
          </Link>
          <Link to="/crew">
            <Button variant="outline" size="sm">
              👥 {locale === 'hi' ? 'टीम से मिलें' : 'Meet The Crew'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Regional SVG Map & Branch Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Graphic */}
        <div className="lg:col-span-2 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-2 border-b border-neutral-800">
            <span className="font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              REGIONAL WORKSHOP NETWORK · 3 ACTIVE SITES
            </span>
            <span className="text-[11px] text-neutral-500">Click a pin on the map to inspect branch</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/9] bg-neutral-950/70 rounded-xl border border-neutral-800/80 overflow-hidden">
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full select-none"
              role="img"
              aria-label="Regional Map of Torquewell Locations"
            >
              {/* Background styling & grid lines */}
              <defs>
                <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="450" fill="url(#map-grid)" />

              {/* Simplified stylized highway / river lines */}
              <path
                d="M 50 220 Q 250 200 400 240 T 750 210"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
              />
              <path
                d="M 380 30 Q 420 180 410 320 T 450 420"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />

              {/* Highway Route Numbers */}
              <text x="70" y="210" className="text-[10px] font-mono fill-neutral-600">A406</text>
              <text x="420" y="50" className="text-[10px] font-mono fill-neutral-600">A10</text>
              <text x="680" y="200" className="text-[10px] font-mono fill-neutral-600">M11</text>

              {/* Branch Markers */}
              {WORKSHOP_BRANCHES.map((b) => {
                const isSelected = b.id === selectedBranch.id;
                const px = (b.coordinates.x / 100) * 800;
                const py = (b.coordinates.y / 100) * 450;

                return (
                  <g
                    key={b.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedBranchId(b.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={b.name}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedBranchId(b.id);
                      }
                    }}
                  >
                    {/* Glowing pulse if selected */}
                    {isSelected && (
                      <circle
                        cx={px}
                        cy={py}
                        r={24}
                        className="fill-primary/20 stroke-primary/50 stroke-1 animate-ping"
                      />
                    )}

                    {/* Pin Circle */}
                    <circle
                      cx={px}
                      cy={py}
                      r={14}
                      className={`transition-all duration-200 ${
                        isSelected
                          ? 'fill-primary stroke-white stroke-2 shadow-lg scale-110'
                          : 'fill-neutral-800 stroke-neutral-500 stroke-2 hover:fill-neutral-700'
                      }`}
                    />

                    {/* Icon inside pin */}
                    <text
                      x={px}
                      y={py + 4}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white pointer-events-none"
                    >
                      {b.id === 'branch-south' ? '⚡' : '🔧'}
                    </text>

                    {/* Label Tag */}
                    <g transform={`translate(${px}, ${py + 26})`}>
                      <rect
                        x="-70"
                        y="0"
                        width="140"
                        height="24"
                        rx="12"
                        className={`transition-colors ${
                          isSelected ? 'fill-primary' : 'fill-neutral-900 stroke-neutral-700 stroke-1'
                        }`}
                      />
                      <text
                        x="0"
                        y="16"
                        textAnchor="middle"
                        className={`font-mono text-[10px] font-bold pointer-events-none ${
                          isSelected ? 'fill-primary-foreground' : 'fill-neutral-300'
                        }`}
                      >
                        {b.city} · {b.baysCount} Bays
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Branch selector tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
            {WORKSHOP_BRANCHES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedBranch.id === b.id
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-bold truncate">{b.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{b.baysCount} Bays · {b.postcode}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Branch Inspection Card */}
        <Card className="p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10">
                BRANCH PROFILE
              </span>
              <Badge variant="neutral">
                {selectedBranch.baysCount} Active Bays
              </Badge>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">{selectedBranch.name}</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {selectedBranch.tagline[locale]}
              </p>
            </div>

            {/* Address & Hours */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1">
                <div className="font-semibold text-foreground">📍 Address:</div>
                <div className="text-muted-foreground">
                  {selectedBranch.address}, {selectedBranch.city}, {selectedBranch.postcode}
                </div>
                <div className="pt-1.5 flex items-center gap-2">
                  <a
                    href={`tel:${selectedBranch.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-bold text-primary hover:underline text-xs"
                  >
                    📞 {selectedBranch.phone}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1">
                <div className="font-semibold text-foreground">⏱ Operating Hours:</div>
                <div className="text-muted-foreground">{selectedBranch.hours}</div>
              </div>
            </div>

            {/* EV Charging Readiness */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1 text-xs">
              <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                ⚡ EV Charging Readiness:
              </div>
              <div className="text-foreground leading-relaxed">
                {selectedBranch.evChargingDetails[locale]}
              </div>
            </div>

            {/* Accessibility Specifications */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {locale === 'hi' ? 'सुलभता एवं सुविधाएं' : 'Accessibility & Facilities'}
              </div>
              <ul className="space-y-1 text-xs">
                {selectedBranch.accessibility.map((acc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{acc[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="pt-4 border-t border-border/40 flex items-center gap-2">
            <Link to="/book" className="flex-1">
              <Button variant="primary" size="sm" className="w-full text-xs">
                {locale === 'hi' ? 'यहाँ बुक करें' : 'Book at This Branch'}
              </Button>
            </Link>
            <Link to="/crew">
              <Button variant="outline" size="sm" className="text-xs">
                {locale === 'hi' ? 'स्टाफ' : 'Staff'}
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* 3 Branch Detailed Overview Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {locale === 'hi' ? 'शाखाओं का तुलनात्मक विवरण' : 'All Workshop Facilities'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKSHOP_BRANCHES.map((b) => (
            <Card key={b.id} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" className="text-[10px] font-mono">
                    {b.baysCount} BAYS
                  </Badge>
                  {b.evCharging && (
                    <Badge variant="ok" className="text-[10px]">
                      ⚡ EV Ready
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-lg text-foreground">{b.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {b.tagline[locale]}
                </p>

                <div className="text-xs space-y-1 text-muted-foreground pt-2 border-t border-border/40">
                  <div><strong>Address:</strong> {b.address}, {b.postcode}</div>
                  <div><strong>Phone:</strong> {b.phone}</div>
                  <div><strong>Manager:</strong> {b.managerName}</div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-semibold text-foreground">Services Available:</div>
                  <div className="flex flex-wrap gap-1">
                    {b.services.slice(0, 4).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40">
                <Link to="/book">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    {locale === 'hi' ? 'अपॉइंटमेंट चुनें' : 'Schedule Visit'} &rarr;
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
