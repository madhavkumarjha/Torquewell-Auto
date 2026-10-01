import React, { useEffect, useState, useRef } from 'react';
import { usePrefsStore } from '@/store/prefs';

export const TorqueCursor: React.FC = () => {
  const { calmMode, motion } = usePrefsStore();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only active on fine pointers (desktop mouse) and when not reduced-motion/calm
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
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Detect if hovering clickable element
      const target = e.target as HTMLElement | null;
      const clickable = !!target?.closest('a, button, [role="button"], input, select');
      setIsHovering(clickable);
    };

    // Lightweight smooth spring lerp loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.25);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.25);
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      animFrameId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [calmMode, motion]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {/* Looking Cursor: Featherweight Focal Ring */}
      <div
        className={`relative rounded-full flex items-center justify-center transition-all duration-150 ease-out ${
          isHovering
            ? 'w-9 h-9 border border-[var(--accent)]/90 bg-[var(--accent)]/10 scale-110 shadow-[0_0_12px_var(--accent)]'
            : 'w-5 h-5 border border-[var(--accent)]/70 bg-transparent scale-100'
        }`}
      >
        {/* Center precision focal dot */}
        <div
          className={`rounded-full bg-[var(--accent)] transition-all duration-150 ${
            isHovering ? 'w-1.5 h-1.5 scale-75' : 'w-1 h-1'
          }`}
        />
      </div>
    </div>
  );
};
