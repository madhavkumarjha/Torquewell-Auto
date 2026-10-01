import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 select-none group ${className}`} aria-label="Torquewell Auto Home">
      {/* Precision 5-point Lug-Nut / Torque Mark */}
      <svg
        viewBox="0 0 36 36"
        className="w-8 h-8 text-[var(--accent)] group-hover:rotate-12 transition-transform duration-300 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="2.5" />
        {/* 5-bolt lug-nut dots */}
        <circle cx="18" cy="8" r="2.2" fill="currentColor" />
        <circle cx="27.5" cy="14.8" r="2.2" fill="currentColor" />
        <circle cx="23.8" cy="26.2" r="2.2" fill="currentColor" />
        <circle cx="12.2" cy="26.2" r="2.2" fill="currentColor" />
        <circle cx="8.5" cy="14.8" r="2.2" fill="currentColor" />
        {/* Center Torque Dial Click Needle */}
        <path d="M18 18L23 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3.5" fill="var(--bg)" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="flex flex-col">
        <span className="font-display font-bold text-xl tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-none">
          Torquewell <span className="text-[var(--accent)]">Auto</span>
        </span>
        {showTagline && (
          <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] mt-1">
            Proof, not promises
          </span>
        )}
      </div>
    </Link>
  );
};
