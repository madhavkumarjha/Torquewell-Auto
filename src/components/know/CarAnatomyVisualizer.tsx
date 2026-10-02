import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrefs } from '@/store/prefs';
import { ANATOMY_HOTSPOTS } from '@/data/know-anatomy';
import type { Powertrain } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function CarAnatomyVisualizer() {
  const { locale: language, calmMode } = usePrefs();
  const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain>('petrol');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeHotspotId, setActiveHotspotId] = useState<string>('front-brakes');

  const filteredHotspots = ANATOMY_HOTSPOTS.filter(spot => {
    const matchesPowertrain = spot.appliesTo.includes(selectedPowertrain);
    const matchesCategory = activeCategory === 'all' || spot.category === activeCategory;
    return matchesPowertrain && matchesCategory;
  });

  const activeHotspot = ANATOMY_HOTSPOTS.find(spot => spot.id === activeHotspotId) || filteredHotspots[0] || ANATOMY_HOTSPOTS[0];

  const categories = [
    { id: 'all', label: { en: 'All Systems', hi: 'सभी सिस्टम' } },
    { id: 'brakes', label: { en: 'Brakes', hi: 'ब्रेक' } },
    { id: 'powertrain', label: { en: 'Powertrain & Motor', hi: 'पावरट्रेन और मोटर' } },
    { id: 'suspension', label: { en: 'Suspension & Steering', hi: 'सस्पेंशन व स्टीयरिंग' } },
    { id: 'cooling', label: { en: 'Cooling Circuit', hi: 'कूलिंग सर्किट' } },
    { id: 'tyres', label: { en: 'Tyres & Geometry', hi: 'टायर और ज्योमेट्री' } },
    { id: 'electrics', label: { en: '12V Electrics', hi: '12V इलेक्ट्रिक्स' } }
  ];

  return (
    <div className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'इंटरएक्टिव कार एनाटॉमी' : 'Interactive Car Anatomy Explorer'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'अपनी कार के अंदरूनी हिस्सों को समझें' : 'Explore Your Vehicle Subsystems'}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
            {language === 'hi'
              ? 'पावरट्रेन चुनें और किसी भी घटक पर क्लिक करके उसके कार्य, घिसाव सीमा और संभावित समस्याओं को समझें।'
              : 'Switch powertrains and select any component pin to inspect wear thresholds, failure warning signs, and engineering details.'}
          </p>
        </div>

        {/* Powertrain Switcher */}
        <div className="flex items-center gap-1.5 bg-[var(--surface-elevated)] p-1.5 rounded-xl border border-[var(--border-subtle)] self-start lg:self-auto">
          <button
            type="button"
            onClick={() => { setSelectedPowertrain('petrol'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedPowertrain === 'petrol'
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {language === 'hi' ? 'पेट्रोल / डीजल (ICE)' : 'Petrol / Diesel'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedPowertrain('hybrid'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedPowertrain === 'hybrid'
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {language === 'hi' ? 'हाइब्रिड (HEV)' : 'Hybrid'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedPowertrain('ev'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedPowertrain === 'ev'
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {language === 'hi' ? 'इलेक्ट्रिक (EV)' : 'Electric (EV)'}
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-[var(--surface-elevated)] border-2 border-[var(--accent)] text-[var(--text)] font-semibold shadow-sm'
                : 'bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {language === 'hi' ? cat.label.hi : cat.label.en}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: SVG Blueprint Canvas with Hotspots */}
        <div className="lg:col-span-7 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[360px]">
          {/* Blueprint Grid Lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Powertrain Badge overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
              {selectedPowertrain.toUpperCase()} CHASSIS ARCHITECTURE
            </span>
          </div>

          {/* SVG Car Blueprint Frame */}
          <div className="relative w-full aspect-[2/1] my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 960 480"
              className="w-full h-full drop-shadow-sm select-none"
              aria-hidden="true"
            >
              {/* Chassis Base Outline */}
              <path
                d="M 140 320 C 140 320, 160 220, 220 200 C 280 180, 360 140, 460 140 C 580 140, 720 180, 780 220 C 820 250, 840 320, 840 320 L 800 320 C 790 280, 750 250, 700 250 C 650 250, 610 280, 600 320 L 360 320 C 350 280, 310 250, 260 250 C 210 250, 170 280, 160 320 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-[var(--border-subtle)] opacity-40"
              />

              {/* Wheels */}
              <circle cx="230" cy="320" r="55" fill="none" stroke="currentColor" strokeWidth="6" className="text-[var(--border-subtle)] opacity-60" />
              <circle cx="230" cy="320" r="30" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--accent)] opacity-40" />
              <circle cx="730" cy="320" r="55" fill="none" stroke="currentColor" strokeWidth="6" className="text-[var(--border-subtle)] opacity-60" />
              <circle cx="730" cy="320" r="30" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--accent)] opacity-40" />

              {/* Powertrain Subsystem visual cues */}
              {selectedPowertrain === 'ev' && (
                <rect
                  x="360"
                  y="280"
                  width="280"
                  height="45"
                  rx="6"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="opacity-70 animate-pulse"
                />
              )}
              {selectedPowertrain === 'hybrid' && (
                <>
                  <rect x="250" y="210" width="70" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-muted)] opacity-50" />
                  <rect x="420" y="285" width="180" height="35" rx="4" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" className="opacity-70" />
                </>
              )}
              {selectedPowertrain === 'petrol' && (
                <>
                  <rect x="230" y="195" width="110" height="75" rx="6" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--text-muted)] opacity-60" />
                  <path d="M 340 260 L 520 300 L 760 300 L 850 300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-[var(--border-subtle)] opacity-40" />
                </>
              )}
            </svg>

            {/* Interactive Hotspot Pins */}
            {filteredHotspots.map(spot => {
              const isActive = spot.id === activeHotspot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspotId(spot.id)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={`${language === 'hi' ? spot.name.hi : spot.name.en} hotspot`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all ${
                    isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                      isActive
                        ? 'bg-[var(--accent)] border-white text-[var(--accent-contrast)] ring-4 ring-[var(--accent)]/30'
                        : 'bg-[var(--surface-elevated)] border-[var(--accent)] text-[var(--accent)]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
            <span>{language === 'hi' ? 'घटकों पर क्लिक करें' : 'Click pins to inspect components'}</span>
            <span>{filteredHotspots.length} {language === 'hi' ? 'सक्रिय घटक' : 'Subsystems visible'}</span>
          </div>
        </div>

        {/* Right: Component Deep Inspection Card */}
        <div className="lg:col-span-5 bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/30 rounded-xl p-6 space-y-6 shadow-md">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="neutral" className="uppercase font-mono text-[10px]">
                {activeHotspot.category}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                ID: #{activeHotspot.id}
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif">
              {language === 'hi' ? activeHotspot.name.hi : activeHotspot.name.en}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {language === 'hi' ? activeHotspot.functionSummary.hi : activeHotspot.functionSummary.en}
            </p>
          </div>

          {/* Wear Metric Gauge if applicable */}
          {activeHotspot.wearMetric && (
            <div className="bg-[var(--surface-sunken)] p-4 rounded-xl border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[var(--text)]">
                  {language === 'hi' ? activeHotspot.wearMetric.label.hi : activeHotspot.wearMetric.label.en}
                </span>
                <span className="font-mono text-[var(--accent)] font-semibold">
                  {activeHotspot.wearMetric.nominal} {activeHotspot.wearMetric.unit}
                </span>
              </div>
              <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden flex">
                <div className="bg-[var(--accent)] h-full w-3/4" />
                <div className="bg-amber-500 h-full w-1/6" />
                <div className="bg-red-500 h-full w-1/12" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>{language === 'hi' ? 'फैक्ट्री नया:' : 'Factory spec:'} {activeHotspot.wearMetric.nominal} {activeHotspot.wearMetric.unit}</span>
                <span className="text-red-400 font-semibold">{language === 'hi' ? 'न्यूनतम सीमा:' : 'Replace at:'} {activeHotspot.wearMetric.threshold} {activeHotspot.wearMetric.unit}</span>
              </div>
            </div>
          )}

          {/* Common Warning Signs */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              {language === 'hi' ? 'खराबी के सामान्य संकेत:' : 'Common Wear & Failure Signs:'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[var(--text)]">
              {activeHotspot.failureSigns.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{language === 'hi' ? sign.hi : sign.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Maintenance Interval */}
          <div className="p-3 bg-[var(--surface-sunken)] rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
            <strong className="text-[var(--text)] block mb-0.5">
              {language === 'hi' ? 'अनुशंसित सर्विस अंतराल:' : 'Recommended Service Interval:'}
            </strong>
            {language === 'hi' ? activeHotspot.maintenanceInterval.hi : activeHotspot.maintenanceInterval.en}
          </div>

          {/* Deep-dive Link Button */}
          <div className="pt-2">
            <Link to={`/know/${activeHotspot.relatedArticleSlug}`} className="w-full block">
              <Button variant="primary" className="w-full justify-between group">
                <span>{language === 'hi' ? 'पूरा तकनीकी लेख पढ़ें' : 'Read Full Engineering Guide'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Accessible Screen-Reader Fallback List */}
      {calmMode && (
        <div className="mt-6 p-4 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl text-sm">
          <h4 className="font-semibold mb-2">{language === 'hi' ? 'सभी घटक सूची (सरल दृश्य):' : 'Complete Components List (Calm Mode):'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHotspots.map(h => (
              <div key={h.id} className="p-3 bg-[var(--surface-sunken)] rounded-lg">
                <p className="font-bold text-xs">{language === 'hi' ? h.name.hi : h.name.en}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{language === 'hi' ? h.functionSummary.hi : h.functionSummary.en}</p>
                <Link to={`/know/${h.relatedArticleSlug}`} className="text-xs text-[var(--accent)] hover:underline mt-2 inline-block">
                  {language === 'hi' ? 'लेख देखें →' : 'View Article →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
