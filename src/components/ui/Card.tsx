import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  notched?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  notched = false,
  hoverable = false,
  children,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-md)] p-6 transition-all',
          hoverable &&
            'hover:bg-[var(--surface-2)] hover:border-[var(--accent)]/50 hover:shadow-lg transition-transform duration-200',
          notched &&
            '[clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)] rounded-none',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
