import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import { STORY_CHAPTERS } from '@/data/drive-story';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const DriveInStory: React.FC = () => {
  const { locale, calmMode, motion } = usePrefsStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explodedView, setExplodedView] = useState(true);

  const chapter = STORY_CHAPTERS[currentIdx];
  const isReducedMotion = calmMode || motion === 'off';

  // Autoplay timer (pauses when reduced motion is on)
  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % STORY_CHAPTERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, isReducedMotion]);

  const handleNext = () => {
    setCurrentIdx((prev) => Math.min(prev + 1, STORY_CHAPTERS.length - 1));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
  };

  // If Calm Mode or Reduced Motion, render full static ordered list per File 05 §8 & File 04 §1
  if (isReducedMotion) {
    return (
      <section
        id="drive-story"
        aria-label="Drive-In to Drive-Out Story (Accessible Static List)"
        className="space-y-8"
      >
        <div className="max-w-3xl space-y-3">
          <Badge variant="accent">FEATURE 01 · COMPLETE JOURNEY</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[var(--text)]">
            {locale === 'en' ? 'Drive-In to Drive-Out: The 9 Stages' : 'ड्राइव-इन से ड्राइव-आउट: ९ चरण'}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {locale === 'en'
              ? 'Follow a vehicle through an entire workshop visit. Transparent checkpoints and verifiable evidence at every stage.'
              : 'वर्कशॉप यात्रा के सभी चरणों को देखें। प्रत्येक मोड़ पर पारदर्शी जांच और डिजिटल प्रमाण।'}
          </p>
        </div>

        {/* Static Accessible List */}
        <div className="space-y-4">
          {STORY_CHAPTERS.map((ch) => (
            <Card
              key={ch.n}
              className="p-6 bg-[var(--surface)] border border-[var(--line)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                  STAGE 0{ch.n} · {ch.who[locale]}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">{ch.stage}</span>
              </div>

              <h3 className="text-xl font-bold font-display text-[var(--text)]">{ch.title[locale]}</h3>
              <p className="text-sm text-[var(--text-muted)]">{ch.desc[locale]}</p>

              <div className="pt-2 flex flex-wrap gap-2">
                {ch.evidence.map((ev, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--surface-2)] text-[var(--accent)] font-semibold border border-[var(--line)]/50"
                  >
                    EVIDENCE: {ev}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="pt-4 flex justify-between items-center">
          <Link
            to="/proof"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs uppercase tracking-wider"
          >
            <span>{locale === 'en' ? 'See Sample Proof Report' : 'सैंपल प्रूफ रिपोर्ट देखें'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="drive-story"
      aria-label="Drive-In to Drive-Out Story"
      className="space-y-10 py-6"
    >
      {/* Section Header & Skip Story Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            {locale === 'en' ? 'FEATURE 01 · SCROLL-TOLD STORY' : 'फीचर ०१ · स्क्रॉल यात्रा कहानी'}
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[var(--text)]">
            {locale === 'en' ? 'Drive-In to Drive-Out' : 'ड्राइव-इन से ड्राइव-आउट'}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {locale === 'en'
              ? 'Watch what actually happens behind the bay doors. As your vehicle advances through each stage, see who touches the car and what evidence is recorded.'
              : 'देखें कि वर्कशॉप के अंदर वास्तव में क्या होता है। प्रत्येक चरण में जांच और सबूत तैयार होते हैं।'}
          </p>
        </div>

        {/* Skip to Proof Report Shortcut */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/proof"
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors underline underline-offset-4 cursor-pointer"
          >
            {locale === 'en' ? 'Skip to Proof Report →' : 'प्रूफ रिपोर्ट पर जाएं →'}
          </Link>
        </div>
      </div>

      {/* 9-STAGE CLICK-RULER PROGRESS STEPPER */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/70 pb-4 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {STORY_CHAPTERS.map((ch, idx) => {
            const isCurrent = idx === currentIdx;
            const isPast = idx < currentIdx;
            return (
              <button
                key={ch.n}
                onClick={() => setCurrentIdx(idx)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                    : isPast
                    ? 'bg-[var(--surface-2)] text-[var(--accent)] font-semibold'
                    : 'bg-[var(--surface-2)]/40 text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                title={`Stage ${ch.n}: ${ch.title.en}`}
              >
                <span>0{ch.n}</span>
                <span className="hidden md:inline font-sans font-semibold">
                  {ch.stage.replace('-', ' ')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Autoplay & Explode Toggles */}
        <div className="flex items-center gap-2 flex-shrink-0 pl-2">
          <button
            onClick={() => setExplodedView(!explodedView)}
            className={`p-2 rounded-full border text-xs transition-colors cursor-pointer ${
              explodedView
                ? 'bg-[var(--surface-2)] border-[var(--accent)] text-[var(--accent)]'
                : 'border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
            title="Toggle exploded layers view"
            aria-label="Toggle exploded view"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            title={isPlaying ? 'Pause auto-advance' : 'Play auto-advance'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MAIN STORY INTERACTIVE CANVAS + STAGE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: LAYERED EXPLODED CAR CANVAS (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
            {/* Ambient Radial Spotlight */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,_var(--accent)_0%,_transparent_70%)] opacity-10 pointer-events-none"
            />

            {/* Stage Stamp Watermark */}
            <div className="absolute top-4 left-6 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] select-none">
              CALIBRATED STAGE · 0{chapter.n}/09
            </div>

            {/* Interactive SVG Car Layer Stack */}
            <div className="relative w-full max-w-[620px] aspect-[2/1] select-none">
              {/* Layer 1: Underbody Chassis */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('chassis')
                    ? 'translate-y-4 filter drop-shadow(0 4px 12px rgba(61,183,168,0.3))'
                    : 'translate-y-0 opacity-80'
                }`}
              >
                <img
                  src="/img/car/layers/chassis.svg"
                  alt="Vehicle chassis frame layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 2: Exhaust System */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('exhaust')
                    ? 'translate-y-7 opacity-100'
                    : 'translate-y-0 opacity-60'
                }`}
              >
                <img
                  src="/img/car/layers/exhaust.svg"
                  alt="Exhaust system layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 3: Suspension Arms */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('suspension')
                    ? '-translate-y-3 opacity-100'
                    : 'translate-y-0 opacity-70'
                }`}
              >
                <img
                  src="/img/car/layers/suspension.svg"
                  alt="Suspension coil struts layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 4: Brakes & Rotors */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('brakes')
                    ? 'scale-105 filter drop-shadow(0 0 10px rgba(255,93,93,0.5))'
                    : 'scale-100 opacity-90'
                }`}
              >
                <img
                  src="/img/car/layers/brakes.svg"
                  alt="Brake disc rotors and calipers layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 5: Wheels Assembly */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('wheels')
                    ? 'translate-x-2'
                    : 'translate-x-0'
                }`}
              >
                <img
                  src="/img/car/layers/wheels.svg"
                  alt="Wheel rim and tire assembly layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 6: Engine & Powertrain */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('engine')
                    ? '-translate-y-6 filter drop-shadow(0 0 12px rgba(198,232,75,0.4))'
                    : 'translate-y-0 opacity-80'
                }`}
              >
                <img
                  src="/img/car/layers/engine.svg"
                  alt="Engine cylinder block layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 7: Electrics & Harness */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.activeLayers.includes('electrics')
                    ? '-translate-y-8 opacity-100'
                    : 'translate-y-0 opacity-60'
                }`}
              >
                <img
                  src="/img/car/layers/electrics.svg"
                  alt="12V and high-voltage wiring layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Layer 8: Outer Body & Hood Lift */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-click)] ${
                  explodedView && chapter.n >= 3 && chapter.n <= 7
                    ? '-translate-y-9 opacity-85'
                    : 'translate-y-0 opacity-95'
                }`}
              >
                <img
                  src="/img/car/layers/body.svg"
                  alt="Vehicle outer body panels layer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Dynamic Callout Pin Pulsing on Vehicle */}
              <div
                className="absolute transition-all duration-500 z-20 pointer-events-none"
                style={{
                  left: `${chapter.callout.xPercent}%`,
                  top: `${chapter.callout.yPercent}%`,
                }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent)]/30 absolute inset-0 animate-ping" />
                  <span className="relative w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] flex items-center justify-center shadow-lg" />
                </div>
              </div>
            </div>

            {/* Active Callout Micro-Card in Corner */}
            <div className="absolute bottom-4 left-6 right-6 sm:right-auto sm:max-w-xs p-3 rounded-2xl bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--line)] shadow-lg text-xs space-y-1 animate-in fade-in duration-300">
              <div className="flex items-center gap-1.5 font-bold text-[var(--accent)] font-mono text-[11px] uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{chapter.callout.label[locale]}</span>
              </div>
              <p className="text-[11px] text-[var(--text)] leading-snug">
                {chapter.callout.detail[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: STAGE DETAIL CARD & EVIDENCE CHIPS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-8 bg-[var(--surface)] border border-[var(--line)] shadow-xl space-y-6">
            {/* Header: Stage and Who */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                STAGE 0{chapter.n} OF 09
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text)] text-xs font-semibold border border-[var(--line)]/60">
                {chapter.who[locale]}
              </span>
            </div>

            {/* Stage Title & Description */}
            <div className="space-y-2.5">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text)] leading-tight">
                {chapter.title[locale]}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {chapter.desc[locale]}
              </p>
            </div>

            {/* Verifiable Checks Performed */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                {locale === 'en' ? 'Checks Performed' : 'किए जाने वाले परीक्षण'}
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--text)]">
                {chapter.checks.map((chk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>{chk[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verifiable Evidence Created */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--teal)] font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>{locale === 'en' ? 'Verifiable Evidence Created' : 'निर्मित डिजिटल प्रमाण'}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {chapter.evidence.map((ev, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold bg-[var(--surface-2)] text-[var(--text)] border border-[var(--line)] shadow-xs"
                  >
                    {ev}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Stepper Controls */}
            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`inline-flex items-center gap-1 text-xs font-mono uppercase transition-colors cursor-pointer ${
                  currentIdx === 0
                    ? 'text-[var(--text-muted)] opacity-40 cursor-not-allowed'
                    : 'text-[var(--text)] hover:text-[var(--accent)]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{locale === 'en' ? 'Prev' : 'पिछला'}</span>
              </button>

              <span className="text-xs font-mono text-[var(--text-muted)]">
                {currentIdx + 1} / {STORY_CHAPTERS.length}
              </span>

              {currentIdx < STORY_CHAPTERS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[var(--surface-2)] text-[var(--text)] hover:text-[var(--accent)] text-xs font-mono uppercase transition-colors cursor-pointer"
                >
                  <span>{locale === 'en' ? 'Next Stage' : 'अगला चरण'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/proof"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-bold uppercase transition-all shadow-md hover:brightness-110"
                >
                  <span>{locale === 'en' ? 'See Proof Report' : 'प्रूफ रिपोर्ट देखें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
