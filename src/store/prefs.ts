import { create } from 'zustand';
import { Locale, UnitSystem } from '@/types';
import i18n from '@/i18n';

interface PrefsState {
  locale: Locale;
  theme: 'dark' | 'light';
  units: UnitSystem;
  motion: 'full' | 'reduced' | 'off';
  hasConsented: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setUnits: (units: UnitSystem) => void;
  setMotion: (motion: 'full' | 'reduced' | 'off') => void;
  setConsent: (consented: boolean) => void;
}

export const usePrefsStore = create<PrefsState>((set) => ({
  locale: 'en',
  theme: 'dark',
  units: 'metric',
  motion: 'full',
  hasConsented: false,
  setLocale: (locale) => {
    i18n.changeLanguage(locale);
    document.documentElement.setAttribute('lang', locale);
    set({ locale });
  },
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  setUnits: (units) => set({ units }),
  setMotion: (motion) => set({ motion }),
  setConsent: (hasConsented) => set({ hasConsented }),
}));
