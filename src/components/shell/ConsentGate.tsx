import React, { useState, useEffect } from 'react';
import { usePrefsStore } from '@/store/prefs';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Sliders, Check } from 'lucide-react';
import { Locale, UnitSystem } from '@/types';

export const ConsentGate: React.FC = () => {
  const {
    hasConsented,
    setConsent,
    locale,
    setLocale,
    units,
    setUnits,
    motion,
    setMotion,
  } = usePrefsStore();

  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  useEffect(() => {
    // Only show if user has not yet consented
    if (!hasConsented) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  if (!visible || hasConsented) return null;

  const handleAcceptDefault = () => {
    setConsent(true);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] shadow-2xl p-6 transition-all animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mt-0.5 flex-shrink-0">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-2 flex-1">
          <h2 id="consent-title" className="text-base font-bold text-[var(--text)] tracking-tight">
            Your Workshop Preferences
          </h2>
          <p id="consent-desc" className="text-xs text-[var(--text-muted)] leading-relaxed">
            We store only your local browser settings (language, measurement units, and motion
            preferences). We never use third-party tracking cookies or sell personal data.
          </p>
        </div>
      </div>

      {customizing && (
        <div className="mt-4 pt-4 border-t border-[var(--line)] space-y-3 text-xs">
          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--text)]">Language</span>
            <div className="flex gap-1.5">
              {(['en', 'hi'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2 py-1 rounded text-xs border font-medium ${
                    locale === l
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
                      : 'border-[var(--line)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {l === 'en' ? 'English' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>

          {/* Units Selection */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--text)]">Units</span>
            <div className="flex gap-1.5">
              {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnits(u)}
                  className={`px-2 py-1 rounded text-xs border font-mono ${
                    units === u
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
                      : 'border-[var(--line)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {u === 'metric' ? 'KM / MM' : 'MI / IN'}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Preference */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--text)]">Motion</span>
            <div className="flex gap-1.5">
              {(['full', 'reduced', 'off'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMotion(m)}
                  className={`px-2 py-1 rounded text-xs border capitalize font-medium ${
                    motion === m
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
                      : 'border-[var(--line)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setCustomizing(!customizing)}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] flex items-center gap-1 font-medium underline underline-offset-4 cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{customizing ? 'Hide options' : 'Customize'}</span>
        </button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleAcceptDefault}
          className="gap-1.5 px-4 font-semibold"
        >
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Save & Continue</span>
        </Button>
      </div>
    </div>
  );
};
