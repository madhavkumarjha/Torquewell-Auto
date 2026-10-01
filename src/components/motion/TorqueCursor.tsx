import React, { useEffect, useState, useRef } from 'react';
import { usePrefsStore } from '@/store/prefs';

export const TorqueCursor: React.FC = () => {
  const { calmMode, motion } = usePrefsStore();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Safe check for matchMedia on browser/jsdom
    const hasFinePointer =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: fine)').matches
        : false;

    if (!hasFinePointer || calmMode || motion === 'off') {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const targetAngle = Math.min(Math.max(speed * 0.8, -45), 45);

      setPos({ x: e.clientX, y: e.clientY });
      setRotation(targetAngle);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [calmMode, motion]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div className="relative w-7 h-7 rounded-full bg-[var(--surface)]/80 backdrop-blur-xs border border-[var(--accent)]/50 shadow-sm flex items-center justify-center">
        <div className="absolute top-0.5 w-0.5 h-1 bg-[var(--accent)]" />
        <div
          className="w-0.5 h-2.5 bg-[var(--accent)] origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className="absolute w-1 h-1 rounded-full bg-[var(--text)]" />
      </div>
    </div>
  );
};
