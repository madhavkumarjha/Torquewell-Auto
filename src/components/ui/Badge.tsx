import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, Clock, Eye, CheckCircle2 } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'now' | 'soon' | 'watch' | 'ok' | 'neutral' | 'accent';
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  icon = true,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none';

  const variants = {
    now: 'bg-[var(--critical)] text-white font-bold',
    soon: 'bg-[var(--amber)] text-black font-semibold',
    watch: 'bg-[var(--teal)]/20 text-[var(--teal)] border border-[var(--teal)]/30',
    ok: 'bg-[var(--line)] text-[var(--text-muted)]',
    neutral: 'bg-[var(--surface-2)] text-[var(--text)] border border-[var(--line)]',
    accent: 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold',
  };

  const icons = {
    now: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />,
    soon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
    watch: <Eye className="w-3.5 h-3.5" aria-hidden="true" />,
    ok: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
    neutral: null,
    accent: null,
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {icon && icons[variant]}
      {children}
    </span>
  );
};
