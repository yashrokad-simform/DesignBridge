import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export type BadgeVariant = 'filled' | 'bordered' | 'tertiary';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'critical'
  | 'gray'
  | 'cyan'
  | 'indigo'
  | 'purple'
  | 'fuchsia'
  | 'rose'
  | 'teal';

const badgeVariants = cva(
  [
    'inline-flex items-center box-border whitespace-nowrap flex-shrink-0',
    'rounded-full px-2 gap-1.5',
    'text-xs font-medium leading-4',
    'font-inter',
  ],
  {
    variants: {
      variant: {
        filled:   'py-1',
        bordered: 'py-0.75',
        tertiary: 'py-1',
      },
      color: {
        primary:   '',
        secondary: '',
        success:   '',
        warning:   '',
        critical:  '',
        gray:      '',
        cyan:      '',
        indigo:    '',
        purple:    '',
        fuchsia:   '',
        rose:      '',
        teal:      '',
      },
    },
    compoundVariants: [
      // ── Filled ──────────────────────────────────────────────────────────────
      { variant: 'filled', color: 'primary',   className: 'bg-bg-brand text-text-white' },
      { variant: 'filled', color: 'secondary', className: 'bg-bg-brand-secondary text-text-white' },
      { variant: 'filled', color: 'success',   className: 'bg-bg-success text-text-white' },
      { variant: 'filled', color: 'warning',   className: 'bg-bg-warning text-text-white' },
      { variant: 'filled', color: 'critical',  className: 'bg-bg-critical text-text-white' },
      { variant: 'filled', color: 'gray',      className: 'bg-bg-gray-dark text-text-white' },
      { variant: 'filled', color: 'cyan',      className: 'bg-cyan-dark text-text-white' },
      { variant: 'filled', color: 'indigo',    className: 'bg-indigo-dark text-text-white' },
      { variant: 'filled', color: 'purple',    className: 'bg-purple-dark text-text-white' },
      { variant: 'filled', color: 'fuchsia',   className: 'bg-fuchsia-dark text-text-white' },
      { variant: 'filled', color: 'rose',      className: 'bg-rose-dark text-text-white' },
      { variant: 'filled', color: 'teal',      className: 'bg-teal-dark text-text-white' },
      // ── Bordered ────────────────────────────────────────────────────────────
      { variant: 'bordered', color: 'primary',   className: 'bg-bg-brand-light border border-border-brand text-text-brand' },
      { variant: 'bordered', color: 'secondary', className: 'bg-bg-brand-secondary-light border border-border-brand-secondary text-text-brand-secondary' },
      { variant: 'bordered', color: 'success',   className: 'bg-bg-success-light border border-border-success text-text-success' },
      { variant: 'bordered', color: 'warning',   className: 'bg-bg-warning-light border border-border-warning text-text-warning' },
      { variant: 'bordered', color: 'critical',  className: 'bg-bg-critical-light border border-border-critical text-text-critical' },
      { variant: 'bordered', color: 'gray',      className: 'bg-bg-secondary border border-border-gray-dark text-text-secondary' },
      { variant: 'bordered', color: 'cyan',      className: 'bg-cyan-light border border-cyan-dark text-cyan-dark' },
      { variant: 'bordered', color: 'indigo',    className: 'bg-indigo-light border border-indigo-dark text-indigo-dark' },
      { variant: 'bordered', color: 'purple',    className: 'bg-purple-light border border-purple-dark text-purple-dark' },
      { variant: 'bordered', color: 'fuchsia',   className: 'bg-fuchsia-light border border-fuchsia-dark text-fuchsia-dark' },
      { variant: 'bordered', color: 'rose',      className: 'bg-rose-light border border-rose-dark text-rose-dark' },
      { variant: 'bordered', color: 'teal',      className: 'bg-teal-light border border-teal-dark text-teal-dark' },
      // ── Tertiary ────────────────────────────────────────────────────────────
      { variant: 'tertiary', color: 'primary',   className: 'bg-bg-brand-light text-text-brand' },
      { variant: 'tertiary', color: 'secondary', className: 'bg-bg-brand-secondary-light text-text-brand-secondary' },
      { variant: 'tertiary', color: 'success',   className: 'bg-bg-success-light text-text-success' },
      { variant: 'tertiary', color: 'warning',   className: 'bg-bg-warning-light text-text-warning' },
      { variant: 'tertiary', color: 'critical',  className: 'bg-bg-critical-light text-text-critical' },
      { variant: 'tertiary', color: 'gray',      className: 'bg-bg-secondary text-text-secondary' },
      { variant: 'tertiary', color: 'cyan',      className: 'bg-cyan-light text-cyan-dark' },
      { variant: 'tertiary', color: 'indigo',    className: 'bg-indigo-light text-indigo-dark' },
      { variant: 'tertiary', color: 'purple',    className: 'bg-purple-light text-purple-dark' },
      { variant: 'tertiary', color: 'fuchsia',   className: 'bg-fuchsia-light text-fuchsia-dark' },
      { variant: 'tertiary', color: 'rose',      className: 'bg-rose-light text-rose-dark' },
      { variant: 'tertiary', color: 'teal',      className: 'bg-teal-light text-teal-dark' },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
    },
  },
);

export { badgeVariants };

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
  showPrefix?: boolean;
  showSuffix?: boolean;
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  label,
  variant = 'filled',
  color = 'primary',
  showPrefix = false,
  showSuffix = false,
  onRemove,
  className,
  style,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, color }), className)} style={style}>
      {showPrefix && (
        <span
          aria-hidden="true"
          className="block w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current"
        />
      )}
      <span className="whitespace-nowrap">{label}</span>
      {showSuffix &&
        (onRemove ? (
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={onRemove}
            className="inline-flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 focus-visible:rounded-full"
          >
            <CloseIcon />
          </button>
        ) : (
          <span aria-hidden="true" className="inline-flex items-center w-3 h-3 flex-shrink-0">
            <CloseIcon />
          </span>
        ))}
    </span>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M9 3L3 9M3 3l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}