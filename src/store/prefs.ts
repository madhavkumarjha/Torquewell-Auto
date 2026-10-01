import { create } from 'zustand';
import { Locale, UnitSystem } from '@/types';
import i18n from '@/i18n';

interface PrefsState {
  locale: Locale;
  theme: 'dark' | 'light';
  units: UnitSystem;
  motion: 'full' | 'reduced' | 'off';
  calmMode: boolean;
  textSize: '100' | '115' | '130';
  hasConsented: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setUnits: (units: UnitSystem) => void;
  setMotion: (motion: 'full' | 'reduced' | 'off') => void;
  setCalmMode: (calm: boolean) => void;
  setTextSize: (size: '100' | '115' | '130') => void;
  setConsent: (consented: boolean) => void;
}

// Check saved preferences if consent was previously given
const getInitialState = () => {
  const consented = typeof window !== 'undefined' && localStorage.getItem('tw_consent') === 'true';
  if (!consented) {
    return {
      locale: 'en' as Locale,
      theme: 'dark' as 'dark' | 'light',
      units: 'metric' as UnitSystem,
      motion: 'full' as 'full' | 'reduced' | 'off',
      calmMode: false,
      textSize: '100' as '100' | '115' | '130',
      hasConsented: false,
    };
  }

  const savedTheme = (localStorage.getItem('tw_theme') as 'dark' | 'light') || 'dark';
  const savedLocale = (localStorage.getItem('tw_locale') as Locale) || 'en';
  const savedUnits = (localStorage.getItem('tw_units') as UnitSystem) || 'metric';
  const savedMotion = (localStorage.getItem('tw_motion') as 'full' | 'reduced' | 'off') || 'full';
  const savedCalm = localStorage.getItem('tw_calm') === 'true';
  const savedTextSize = (localStorage.getItem('tw_text_size') as '100' | '115' | '130') || '100';

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('lang', savedLocale);
    document.documentElement.setAttribute('data-calm', String(savedCalm));
    document.documentElement.style.fontSize = `${savedTextSize}%`;
  }

  return {
    locale: savedLocale,
    theme: savedTheme,
    units: savedUnits,
    motion: savedMotion,
    calmMode: savedCalm,
    textSize: savedTextSize,
    hasConsented: true,
  };
};

export const usePrefsStore = create<PrefsState>((set, get) => {
  const initial = getInitialState();

  return {
    ...initial,
    setLocale: (locale) => {
      i18n.changeLanguage(locale);
      document.documentElement.setAttribute('lang', locale);
      if (get().hasConsented) {
        localStorage.setItem('tw_locale', locale);
      }
      set({ locale });
    },
    setTheme: (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      if (get().hasConsented) {
        localStorage.setItem('tw_theme', theme);
      }
      set({ theme });
    },
    setUnits: (units) => {
      if (get().hasConsented) {
        localStorage.setItem('tw_units', units);
      }
      set({ units });
    },
    setMotion: (motion) => {
      if (get().hasConsented) {
        localStorage.setItem('tw_motion', motion);
      }
      set({ motion });
    },
    setCalmMode: (calmMode) => {
      document.documentElement.setAttribute('data-calm', String(calmMode));
      if (calmMode) {
        set({ motion: 'off', textSize: '115' });
        document.documentElement.style.fontSize = '115%';
      } else {
        set({ motion: 'full', textSize: '100' });
        document.documentElement.style.fontSize = '100%';
      }
      if (get().hasConsented) {
        localStorage.setItem('tw_calm', String(calmMode));
      }
      set({ calmMode });
    },
    setTextSize: (textSize) => {
      document.documentElement.style.fontSize = `${textSize}%`;
      if (get().hasConsented) {
        localStorage.setItem('tw_text_size', textSize);
      }
      set({ textSize });
    },
    setConsent: (hasConsented) => {
      localStorage.setItem('tw_consent', String(hasConsented));
      if (hasConsented) {
        const state = get();
        localStorage.setItem('tw_locale', state.locale);
        localStorage.setItem('tw_theme', state.theme);
        localStorage.setItem('tw_units', state.units);
        localStorage.setItem('tw_motion', state.motion);
        localStorage.setItem('tw_calm', String(state.calmMode));
        localStorage.setItem('tw_text_size', state.textSize);
      }
      set({ hasConsented });
    },
  };
});

export const usePrefs = usePrefsStore;
