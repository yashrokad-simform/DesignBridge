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
      // ── Filled ── solid bg + status-text-white (prefix dot & close icon inherit via currentColor)
      { variant: 'filled', color: 'primary',   className: 'bg-bg-brand text-status-text-white' },
      { variant: 'filled', color: 'secondary', className: 'bg-bg-brand-secondary text-status-text-white' },
      { variant: 'filled', color: 'success',   className: 'bg-bg-success text-status-text-white' },
      { variant: 'filled', color: 'warning',   className: 'bg-bg-warning text-status-text-white' },
      { variant: 'filled', color: 'critical',  className: 'bg-bg-critical text-status-text-white' },
      { variant: 'filled', color: 'gray',      className: 'bg-bg-gray-dark text-status-text-white' },
      { variant: 'filled', color: 'cyan',      className: 'bg-status-cyan-bg text-status-text-white' },
      { variant: 'filled', color: 'indigo',    className: 'bg-status-indigo-bg text-status-text-white' },
      { variant: 'filled', color: 'purple',    className: 'bg-status-purple-bg text-status-text-white' },
      { variant: 'filled', color: 'fuchsia',   className: 'bg-status-fuchsia-bg text-status-text-white' },
      { variant: 'filled', color: 'rose',      className: 'bg-status-rose-bg text-status-text-white' },
      { variant: 'filled', color: 'teal',      className: 'bg-status-teal-bg text-status-text-white' },
      // ── Bordered ── -light bg + text-___ + border-___ (dot & icon inherit text color)
      { variant: 'bordered', color: 'primary',   className: 'bg-bg-brand-light border border-border-brand text-text-brand' },
      { variant: 'bordered', color: 'secondary', className: 'bg-bg-brand-secondary-light border border-border-brand-secondary text-text-brand-secondary' },
      { variant: 'bordered', color: 'success',   className: 'bg-bg-success-light border border-border-success text-text-success' },
      { variant: 'bordered', color: 'warning',   className: 'bg-bg-warning-light border border-border-warning text-text-warning' },
      { variant: 'bordered', color: 'critical',  className: 'bg-bg-critical-light border border-border-critical text-text-critical' },
      { variant: 'bordered', color: 'gray',      className: 'bg-bg-secondary border border-border-gray-dark text-text-primary' },
      { variant: 'bordered', color: 'cyan',      className: 'bg-status-cyan-bg-light border border-status-cyan-border text-status-cyan-text' },
      { variant: 'bordered', color: 'indigo',    className: 'bg-status-indigo-bg-light border border-status-indigo-border text-status-indigo-text' },
      { variant: 'bordered', color: 'purple',    className: 'bg-status-purple-bg-light border border-status-purple-border text-status-purple-text' },
      { variant: 'bordered', color: 'fuchsia',   className: 'bg-status-fuchsia-bg-light border border-status-fuchsia-border text-status-fuchsia-text' },
      { variant: 'bordered', color: 'rose',      className: 'bg-status-rose-bg-light border border-status-rose-border text-status-rose-text' },
      { variant: 'bordered', color: 'teal',      className: 'bg-status-teal-bg-light border border-status-teal-border text-status-teal-text' },
      // ── Tertiary ── -light bg + text-___ (no border; dot & icon inherit text color)
      { variant: 'tertiary', color: 'primary',   className: 'bg-bg-brand-light text-text-brand' },
      { variant: 'tertiary', color: 'secondary', className: 'bg-bg-brand-secondary-light text-text-brand-secondary' },
      { variant: 'tertiary', color: 'success',   className: 'bg-bg-success-light text-text-success' },
      { variant: 'tertiary', color: 'warning',   className: 'bg-bg-warning-light text-text-warning' },
      { variant: 'tertiary', color: 'critical',  className: 'bg-bg-critical-light text-text-critical' },
      { variant: 'tertiary', color: 'gray',      className: 'bg-bg-secondary text-text-primary' },
      { variant: 'tertiary', color: 'cyan',      className: 'bg-status-cyan-bg-light text-status-cyan-text' },
      { variant: 'tertiary', color: 'indigo',    className: 'bg-status-indigo-bg-light text-status-indigo-text' },
      { variant: 'tertiary', color: 'purple',    className: 'bg-status-purple-bg-light text-status-purple-text' },
      { variant: 'tertiary', color: 'fuchsia',   className: 'bg-status-fuchsia-bg-light text-status-fuchsia-text' },
      { variant: 'tertiary', color: 'rose',      className: 'bg-status-rose-bg-light text-status-rose-text' },
      { variant: 'tertiary', color: 'teal',      className: 'bg-status-teal-bg-light text-status-teal-text' },
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