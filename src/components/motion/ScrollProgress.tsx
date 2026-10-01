import React, { useEffect, useState } from 'react';
import { usePrefsStore } from '@/store/prefs';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { calmMode, motion } = usePrefsStore();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }
      const current = window.scrollY / totalScroll;
      setProgress(Math.min(Math.max(current, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (calmMode || motion === 'off') return null;

  return (
    <>
      {/* Mobile Top Progress Strip */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--line)] z-50 md:hidden"
      >
        <div
          className="h-full bg-[var(--accent)] transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Desktop Left-Edge Click-Mark Ruler */}
      <div
        aria-hidden="true"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5 py-4 px-1 rounded-full bg-[var(--surface)]/70 backdrop-blur-xs border border-[var(--line)]/50 select-none shadow-sm"
        title={`Scroll Depth: ${Math.round(progress * 100)}%`}
      >
        <span className="font-mono text-[9px] text-[var(--accent)] font-bold">
          {Math.round(progress * 100)}%
        </span>
        {/* Click mark notches */}
        {Array.from({ length: 10 }).map((_, i) => {
          const notchThreshold = i / 9;
          const isActive = progress >= notchThreshold;
          return (
            <div
              key={i}
              className={`transition-all duration-150 rounded-full ${
                isActive
                  ? 'w-3 h-0.5 bg-[var(--accent)] shadow-[0_0_4px_var(--accent)]'
                  : 'w-1.5 h-0.5 bg-[var(--line)]'
              }`}
            />
          );
        })}
      </div>
    </>
  );
};
