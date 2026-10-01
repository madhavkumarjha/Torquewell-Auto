import React from 'react';
import { usePrefsStore } from '@/store/prefs';
import { Sun, Moon, Sparkles, Languages, Gauge } from 'lucide-react';

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

  return (
    <div className={`flex items-center gap-1.5 text-xs text-[var(--text-muted)] ${className}`}>
      {/* Units Toggle */}
      <button
        onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
        className="px-2 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors flex items-center gap-1 font-mono cursor-pointer"
        title="Toggle measurement units (km/mi, mm/in)"
        aria-label={`Current units: ${units}. Click to switch.`}
      >
        <Gauge className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="uppercase">{units === 'metric' ? 'KM/MM' : 'MI/IN'}</span>
      </button>

      {/* Language Toggle */}
      <button
        onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
        className="px-2 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors flex items-center gap-1 font-medium cursor-pointer"
        title="Change language (English / हिन्दी)"
        aria-label={`Current language: ${locale === 'en' ? 'English' : 'Hindi'}. Click to toggle.`}
      >
        <Languages className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{locale === 'en' ? 'हिन्दी' : 'EN'}</span>
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors cursor-pointer"
        title={`Switch to ${theme === 'dark' ? 'Light (Shop Paper)' : 'Dark (Bay Night)'} theme`}
        aria-label="Toggle dark/light theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[var(--steel)]" aria-hidden="true" />
        )}
      </button>

      {/* Calm Mode Toggle */}
      <button
        onClick={() => setCalmMode(!calmMode)}
        className={`px-2 py-1 rounded-[var(--radius-sm)] border transition-colors flex items-center gap-1 cursor-pointer ${
          calmMode
            ? 'bg-[var(--teal)]/20 border-[var(--teal)] text-[var(--teal)] font-semibold'
            : 'border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
        }`}
        title="Calm Mode: Simplified visuals, larger text, reduced motion"
        aria-pressed={calmMode}
        aria-label="Toggle calm mode"
      >
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Calm</span>
      </button>
    </div>
  );
};
