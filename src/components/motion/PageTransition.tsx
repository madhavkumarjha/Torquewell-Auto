import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { motion, calmMode } = usePrefsStore();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (calmMode || motion === 'off') {
      try { window.scrollTo(0, 0); } catch {}
      return;
    }

    setTransitioning(true);
    try { window.scrollTo(0, 0); } catch {}

    const timer = setTimeout(() => {
      setTransitioning(false);
      // Accessibility: move focus to main heading
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.tabIndex = -1;
        h1.focus({ preventScroll: true });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [location.pathname, calmMode, motion]);

  return (
    <div className="relative w-full">
      {/* Click-through sweep bar with tick markings */}
      {transitioning && !calmMode && motion !== 'off' && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-50 animate-pulse shadow-[0_0_10px_var(--accent)] transition-all duration-300"
        />
      )}

      {/* Content wrapper */}
      <div
        className={`transition-all duration-300 ease-[var(--ease-click)] ${
          transitioning ? 'opacity-90 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
