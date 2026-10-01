import React from 'react';
import { Urgency, Locale } from '@/types';

interface DonutSummaryProps {
  counts: { now: number; soon: number; watch: number; ok: number; total: number };
  activeUrgency: Urgency | 'all';
  onSelectUrgency: (urgency: Urgency | 'all') => void;
  locale: Locale;
}

export const DonutSummary: React.FC<DonutSummaryProps> = ({
  counts,
  activeUrgency,
  onSelectUrgency,
  locale
}) => {
  const { now, soon, watch, ok, total } = counts;

  // Calculate arc angles
  const radius = 64;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

  const nowPct = total > 0 ? now / total : 0;
  const soonPct = total > 0 ? soon / total : 0;
  const watchPct = total > 0 ? watch / total : 0;
  const okPct = total > 0 ? ok / total : 0;

  const nowDash = nowPct * circumference;
  const soonDash = soonPct * circumference;
  const watchDash = watchPct * circumference;
  const okDash = okPct * circumference;

  const nowOffset = 0;
  const soonOffset = -nowDash;
  const watchOffset = -(nowDash + soonDash);
  const okOffset = -(nowDash + soonDash + watchDash);

  const urgencyLabels: Record<Urgency, { en: string; hi: string; color: string; bg: string }> = {
    now: { en: 'Needed Now', hi: 'तत्काल आवश्यक', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
    soon: { en: 'Soon (30 Days)', hi: 'शीघ्र (30 दिन)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    watch: { en: 'Watch / Monitor', hi: 'निगरानी रखें', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
    ok: { en: 'Passed / Good', hi: 'पास / सुरक्षित', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* SVG Donut Visual */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg
            width="170"
            height="170"
            viewBox="0 0 170 170"
            className="transform -rotate-90"
            role="img"
            aria-label={`Inspection results breakdown: ${now} needed now, ${soon} soon, ${watch} watch, ${ok} passed.`}
          >
            {/* Background ring */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              fill="transparent"
              stroke="var(--border)"
              strokeWidth={strokeWidth}
            />
            {/* OK Segment */}
            {ok > 0 && (
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={`${okDash} ${circumference}`}
                strokeDashoffset={okOffset}
                className="transition-all duration-500 cursor-pointer hover:opacity-80"
                onClick={() => onSelectUrgency('ok')}
              />
            )}
            {/* Watch Segment */}
            {watch > 0 && (
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke="#38bdf8"
                strokeWidth={strokeWidth}
                strokeDasharray={`${watchDash} ${circumference}`}
                strokeDashoffset={watchOffset}
                className="transition-all duration-500 cursor-pointer hover:opacity-80"
                onClick={() => onSelectUrgency('watch')}
              />
            )}
            {/* Soon Segment */}
            {soon > 0 && (
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth={strokeWidth}
                strokeDasharray={`${soonDash} ${circumference}`}
                strokeDashoffset={soonOffset}
                className="transition-all duration-500 cursor-pointer hover:opacity-80"
                onClick={() => onSelectUrgency('soon')}
              />
            )}
            {/* Now Segment */}
            {now > 0 && (
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeDasharray={`${nowDash} ${circumference}`}
                strokeDashoffset={nowOffset}
                className="transition-all duration-500 cursor-pointer hover:opacity-80"
                onClick={() => onSelectUrgency('now')}
              />
            )}
          </svg>

          {/* Centered Stat Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
            <span className="font-mono text-3xl font-bold tracking-tight text-[var(--text)]">
              {total}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              {locale === 'hi' ? 'बिंदु जाँचे' : 'Checks Total'}
            </span>
          </div>
        </div>

        {/* Interactive Urgency Filter Cards */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {/* NOW button */}
          <button
            type="button"
            onClick={() => onSelectUrgency(activeUrgency === 'now' ? 'all' : 'now')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeUrgency === 'now'
                ? 'border-red-500 ring-2 ring-red-500/20 bg-red-500/10'
                : 'border-[var(--border)] hover:border-red-500/50 bg-[var(--surface-muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="font-mono font-bold text-lg text-red-500">{now}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text)]">
              {urgencyLabels.now[locale]}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {locale === 'hi' ? 'सड़क सुरक्षा जोखिम' : 'Safety limit reached'}
            </div>
          </button>

          {/* SOON button */}
          <button
            type="button"
            onClick={() => onSelectUrgency(activeUrgency === 'soon' ? 'all' : 'soon')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeUrgency === 'soon'
                ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/10'
                : 'border-[var(--border)] hover:border-amber-500/50 bg-[var(--surface-muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-mono font-bold text-lg text-amber-500">{soon}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text)]">
              {urgencyLabels.soon[locale]}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {locale === 'hi' ? '30 दिनों में ध्यान दें' : 'Plan within 30 days'}
            </div>
          </button>

          {/* WATCH button */}
          <button
            type="button"
            onClick={() => onSelectUrgency(activeUrgency === 'watch' ? 'all' : 'watch')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeUrgency === 'watch'
                ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-500/10'
                : 'border-[var(--border)] hover:border-sky-500/50 bg-[var(--surface-muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="font-mono font-bold text-lg text-sky-400">{watch}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text)]">
              {urgencyLabels.watch[locale]}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {locale === 'hi' ? 'अगली सर्विस तक सुरक्षित' : 'Safe until next visit'}
            </div>
          </button>

          {/* OK button */}
          <button
            type="button"
            onClick={() => onSelectUrgency(activeUrgency === 'ok' ? 'all' : 'ok')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeUrgency === 'ok'
                ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/10'
                : 'border-[var(--border)] hover:border-emerald-500/50 bg-[var(--surface-muted)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono font-bold text-lg text-emerald-500">{ok}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text)]">
              {urgencyLabels.ok[locale]}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {locale === 'hi' ? 'फैक्ट्री सीमा के अंदर' : 'Within factory spec'}
            </div>
          </button>
        </div>
      </div>

      {/* Reset filter pill if active */}
      {activeUrgency !== 'all' && (
        <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">
            {locale === 'hi'
              ? `केवल "${urgencyLabels[activeUrgency].hi}" परिणाम दिखाए जा रहे हैं`
              : `Filtering by "${urgencyLabels[activeUrgency].en}"`}
          </span>
          <button
            type="button"
            onClick={() => onSelectUrgency('all')}
            className="text-[var(--accent)] hover:underline font-semibold"
          >
            {locale === 'hi' ? 'सभी 32 बिंदु दिखाएं' : 'Show all checkpoints'}
          </button>
        </div>
      )}
    </div>
  );
};
