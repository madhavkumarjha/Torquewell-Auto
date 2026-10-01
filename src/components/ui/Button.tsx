import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'critical' | 'outline' | 'pill-accent' | 'pill-critical';
  size?: 'sm' | 'md' | 'lg';
  isNotched?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isNotched = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer';

    const variants = {
      primary:
        'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 shadow-sm font-semibold',
      secondary:
        'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--line)] border border-[var(--line)]',
      ghost:
        'hover:bg-[var(--surface-2)] text-[var(--text)] hover:text-[var(--accent)]',
      critical:
        'bg-[var(--critical)] text-white hover:brightness-110 font-semibold shadow-sm',
      outline:
        'border border-[var(--line)] bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)]',
      'pill-accent':
        'bg-[var(--accent)] text-[var(--accent-ink)] rounded-full font-bold shadow-md hover:brightness-105',
      'pill-critical':
        'bg-[var(--critical)] text-white rounded-full font-bold shadow-md hover:brightness-105',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
      md: 'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
      lg: 'h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md)]',
    };

    const notchedStyle = isNotched ? 'rounded-none [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]' : '';

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            variant.startsWith('pill') ? 'rounded-full' : '',
            notchedStyle,
            className
          )
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
