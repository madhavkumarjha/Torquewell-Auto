import { usePrefsStore } from './prefs';
export * from './prefs';

export function useStore() {
  const prefs = usePrefsStore();
  return {
    ...prefs,
    language: prefs.locale,
    setLanguage: prefs.setLocale,
  };
}
