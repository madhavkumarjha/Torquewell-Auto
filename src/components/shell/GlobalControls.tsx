import React, { useState, useRef, useEffect } from 'react';
import { usePrefsStore } from '@/store/prefs';
import { Globe, SlidersHorizontal, Sun, Moon, Sparkles, Check } from 'lucide-react';

export const GlobalControls: React.FC<{ className?: string }> = ({ className = '' }) => {
  const {
    theme,
    setTheme,
    locale,
    setLocale,
    units,
    setUnits,
    calmMode,
    setCalmMode,
  } = usePrefsStore();

  const [localeOpen, setLocaleOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const localeRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) {
        setLocaleOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      {/* 1. UNIFIED REGION & LANGUAGE DROPDOWN (Rule 2: Globe) */}
      <div ref={localeRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setLocaleOpen(!localeOpen);
            setSettingsOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            localeOpen
              ? 'bg-[var(--surface-2)] border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--line)]/60 bg-[var(--surface-2)]/50 text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--line)]'
          }`}
          title="Regional & Language preferences"
          aria-expanded={localeOpen}
          aria-label={`Region & Language: ${locale.toUpperCase()} · ${units === 'metric' ? 'KM' : 'MI'}`}
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
            {locale === 'en' ? 'EN' : 'हिं'} · {units === 'metric' ? 'KM' : 'MI'}
          </span>
        </button>

        {localeOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-3 shadow-2xl z-50 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Language Segment */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5 font-semibold">
                Language
              </span>
              <div className="grid grid-cols-2 gap-1 bg-[var(--surface-2)] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    locale === 'en'
                      ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xs font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {locale === 'en' && <Check className="w-3 h-3 text-[var(--accent)]" />}
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('hi')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    locale === 'hi'
                      ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xs font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {locale === 'hi' && <Check className="w-3 h-3 text-[var(--accent)]" />}
                  <span>हिंदी</span>
                </button>
              </div>
            </div>

            {/* Units Segment */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5 font-semibold">
                Distance & Metrics
              </span>
              <div className="grid grid-cols-2 gap-1 bg-[var(--surface-2)] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUnits('metric')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    units === 'metric'
                      ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xs font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {units === 'metric' && <Check className="w-3 h-3 text-[var(--accent)]" />}
                  <span>Metric (km)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUnits('imperial')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    units === 'imperial'
                      ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xs font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {units === 'imperial' && <Check className="w-3 h-3 text-[var(--accent)]" />}
                  <span>Miles (mi)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. UNIFIED SETTINGS / COMFORT DROPDOWN (Rule 2: Theme + Calm) */}
      <div ref={settingsRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setSettingsOpen(!settingsOpen);
            setLocaleOpen(false);
          }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            settingsOpen
              ? 'bg-[var(--surface-2)] border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--line)]/60 bg-[var(--surface-2)]/50 text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--line)]'
          }`}
          title="Comfort & Appearance settings"
          aria-expanded={settingsOpen}
          aria-label="Display & Accessibility preferences"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        {settingsOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-3.5 shadow-2xl z-50 text-xs space-y-3.5 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[var(--text)] block">Appearance</span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {theme === 'dark' ? 'Bay Night (Dark)' : 'Shop Paper (Light)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-[var(--surface-2)] text-[var(--accent)] hover:brightness-110 transition-all cursor-pointer border border-[var(--line)]/50"
                aria-label="Toggle dark/light theme"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>

            {/* Calm Mode Toggle */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[var(--line)]/50">
              <div>
                <span className="font-semibold text-[var(--text)] block">Calm Mode</span>
                <span className="text-[10px] text-[var(--text-muted)]">Reduced motion & stress</span>
              </div>
              <button
                type="button"
                onClick={() => setCalmMode(!calmMode)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  calmMode
                    ? 'bg-[var(--teal)]/20 border-[var(--teal)] text-[var(--teal)] font-bold'
                    : 'bg-[var(--surface-2)] border-[var(--line)]/50 text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                aria-pressed={calmMode}
                aria-label="Toggle Calm Mode"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
