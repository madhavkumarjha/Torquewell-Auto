import React from 'react';
import { Locale, Urgency } from '@/types';

interface MeasurementGaugeProps {
  measured: {
    value: number;
    min: number;
    nominal?: number;
    unit: 'mm' | 'bar' | 'V' | '%' | '°C';
    label: { en: string; hi: string };
  };
  urgency: Urgency;
  locale: Locale;
}

export const MeasurementGauge: React.FC<MeasurementGaugeProps> = ({
  measured,
  urgency,
  locale
}) => {
  const { value, min, nominal, unit, label } = measured;

  // Determine max scale for bar
  const maxScale = nominal ? nominal * 1.05 : Math.max(value, min) * 1.4;
  const minScale = unit === '°C' ? 100 : 0;
  const range = maxScale - minScale;

  const valuePct = Math.min(100, Math.max(0, ((value - minScale) / range) * 100));
  const minPct = Math.min(100, Math.max(0, ((min - minScale) / range) * 100));

  const isBelowMin = value < min;
  const delta = (value - min).toFixed(1);

  // Urgency styling
  const colorMap: Record<Urgency, { bar: string; text: string; bg: string }> = {
    now: { bar: '#ef4444', text: 'text-red-500', bg: 'bg-red-500/10' },
    soon: { bar: '#f59e0b', text: 'text-amber-500', bg: 'bg-amber-500/10' },
    watch: { bar: '#38bdf8', text: 'text-sky-400', bg: 'bg-sky-500/10' },
    ok: { bar: '#10b981', text: 'text-emerald-500', bg: 'bg-emerald-500/10' }
  };

  const style = colorMap[urgency];

  return (
    <div className="w-full bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl p-4">
      {/* Header with numbers */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {label[locale]}:
          </span>
          <span className={`font-mono font-bold text-lg ${style.text}`}>
            {value} {unit}
          </span>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {locale === 'hi' ? 'सीमा:' : 'Safe Limit:'}{' '}
            <strong className="text-[var(--text)]">
              {min} {unit}
            </strong>
          </span>
        </div>
      </div>

      {/* SVG Linear Caliper Gauge */}
      <div className="relative w-full h-7 select-none">
        {/* Track */}
        <div className="absolute inset-y-1 inset-x-0 bg-[var(--surface)] rounded-md border border-[var(--border)] overflow-hidden">
          {/* Active fill */}
          <div
            className="h-full transition-all duration-500 rounded-l-md"
            style={{
              width: `${valuePct}%`,
              backgroundColor: style.bar
            }}
          />
        </div>

        {/* Minimum Threshold Red/Amber Marker Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--text)] z-10 pointer-events-none"
          style={{ left: `${minPct}%` }}
        >
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[var(--text)] rotate-45 transform" />
        </div>
      </div>

      {/* Micro-scale Footer Legend */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1.5">
        <span>
          {minScale} {unit}
        </span>
        <span className="text-center font-semibold text-[var(--text)]">
          {isBelowMin ? (
            <span className="text-red-500">
              {locale === 'hi'
                ? `⚠️ सीमा से ${Math.abs(Number(delta))} ${unit} कम (तुरंत बदलें)`
                : `⚠️ ${Math.abs(Number(delta))} ${unit} below safety threshold`}
            </span>
          ) : (
            <span className="text-emerald-500">
              {locale === 'hi'
                ? `✓ सीमा से +${delta} ${unit} सुरक्षित मार्जिन`
                : `✓ +${delta} ${unit} safety margin remaining`}
            </span>
          )}
        </span>
        <span>
          {nominal ? `${nominal} ${unit} (New)` : `${maxScale.toFixed(0)} ${unit}`}
        </span>
      </div>
    </div>
  );
};
