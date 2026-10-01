import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';

export const InitialLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const { calmMode, motion } = usePrefsStore();

  useEffect(() => {
    // Never show on emergency /help route, or if calm mode/reduced motion, or if already visited in this session
    if (
      location.pathname === '/help' ||
      calmMode ||
      motion === 'off' ||
      sessionStorage.getItem('tw_initial_loaded')
    ) {
      setLoading(false);
      return;
    }

    // 500ms rotation, then 90ms click flash, then dismiss at 750ms
    const clickTimer = setTimeout(() => {
      setClicked(true);
    }, 450);

    const finishTimer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('tw_initial_loaded', 'true');
    }, 750);

    return () => {
      clearTimeout(clickTimer);
      clearTimeout(finishTimer);
    };
  }, [location.pathname, calmMode, motion]);

  if (!loading) return null;

  return (
    <div
      role="status"
      aria-label="Calibrating torque systems"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-300"
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Rotating 5-point lug-nut bolt ring */}
        <div
          className={`w-16 h-16 transition-transform duration-500 ease-out ${
            clicked ? 'rotate-[72deg]' : 'rotate-0'
          }`}
        >
          <svg viewBox="0 0 48 48" className="w-full h-full text-[var(--accent)]" fill="none">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
            <circle cx="24" cy="9" r="3" fill="currentColor" />
            <circle cx="38" cy="19" r="3" fill="currentColor" />
            <circle cx="33" cy="35" r="3" fill="currentColor" />
            <circle cx="15" cy="35" r="3" fill="currentColor" />
            <circle cx="10" cy="19" r="3" fill="currentColor" />
            {/* Torque needle */}
            <path
              d="M24 24L32 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="5" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Tactile Click Notch Flash */}
        <div
          className={`h-1.5 w-12 rounded-full transition-all duration-100 ${
            clicked
              ? 'bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] scale-110'
              : 'bg-[var(--line)] scale-100'
          }`}
        />

        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          {clicked ? 'CLICK · VERIFIED' : 'TORQUEWELL'}
        </span>
      </div>
    </div>
  );
};
