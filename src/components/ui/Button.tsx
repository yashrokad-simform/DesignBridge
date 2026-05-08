import React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center flex-row flex-nowrap',
    'box-border whitespace-nowrap overflow-hidden select-none cursor-pointer',
    'font-inter font-medium normal-case',
    'outline-none',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-btn-border-focused',
    'disabled:cursor-not-allowed disabled:pointer-events-none',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-btn-bg-primary text-btn-text-primary',
          'hover:bg-btn-bg-primary-focused active:bg-btn-bg-primary-focused',
          'disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        bordered: [
          'bg-btn-bg-bordered text-btn-text-bordered border border-btn-border-primary',
          'hover:border-btn-border-focused active:border-btn-border-focused',
          'disabled:border-btn-border-disabled disabled:text-btn-text-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        text: [
          'text-btn-text-secondary no-underline',
          'hover:text-btn-text-secondary-focused active:text-btn-text-secondary-focused',
          'disabled:text-btn-text-secondary-disabled',
        ],
        link: [
          'text-btn-text-secondary underline',
          'hover:text-btn-text-secondary-focused active:text-btn-text-secondary-focused',
          'disabled:text-btn-text-secondary-disabled',
        ],
        critical: [
          'bg-btn-bg-critical text-btn-text-primary',
          'hover:bg-btn-bg-critical active:bg-btn-bg-critical',
          'disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        'critical-bordered': [
          'bg-btn-bg-bordered text-btn-text-critical border border-btn-border-critical',
          'hover:border-btn-border-critical active:border-btn-border-critical',
          'disabled:border-btn-border-disabled disabled:text-btn-text-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        'critical-text': [
          'text-btn-text-critical no-underline',
          'hover:text-btn-text-critical active:text-btn-text-critical',
          'disabled:text-btn-text-disabled',
        ],
        'icon-filled': [
          'bg-btn-bg-primary text-btn-icon-primary',
          'hover:bg-btn-bg-primary-focused active:bg-btn-bg-primary-focused',
          'disabled:bg-btn-bg-primary-disabled disabled:text-btn-icon-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        'icon-secondary': [
          'bg-btn-bg-bordered text-btn-icon-bordered border border-btn-border-primary',
          'hover:border-btn-border-focused active:border-btn-border-focused',
          'disabled:border-btn-border-disabled disabled:text-btn-icon-disabled',
          'rounded-[var(--radius-lg)]',
        ],
        'icon-only': [
          'text-btn-icon-secondary',
          'hover:text-btn-icon-secondary-focused active:text-btn-icon-secondary-focused',
          'disabled:text-btn-icon-secondary-disabled',
        ],
      },
      size: {
        large: 'text-14',
        small: 'text-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Large — with background / border
      { variant: 'primary', size: 'large', className: 'h-11 px-5 gap-2' },
      { variant: 'bordered', size: 'large', className: 'h-11 px-5 gap-2' },
      { variant: 'critical', size: 'large', className: 'h-11 px-5 gap-2' },
      { variant: 'critical-bordered', size: 'large', className: 'h-11 px-5 gap-2' },
      // Large — no background (content-height)
      { variant: 'text', size: 'large', className: 'gap-2' },
      { variant: 'link', size: 'large', className: 'gap-2' },
      { variant: 'critical-text', size: 'large', className: 'gap-2' },
      // Large — icon variants (fixed square)
      { variant: 'icon-filled', size: 'large', className: 'w-11 h-11' },
      { variant: 'icon-secondary', size: 'large', className: 'w-11 h-11' },
      { variant: 'icon-only', size: 'large', className: 'w-6 h-6' },
      // Small — with background / border
      { variant: 'primary', size: 'small', className: 'h-9 px-4 gap-1' },
      { variant: 'bordered', size: 'small', className: 'h-9 px-4 gap-1' },
      { variant: 'critical', size: 'small', className: 'h-9 px-4 gap-1' },
      { variant: 'critical-bordered', size: 'small', className: 'h-9 px-4 gap-1' },
      // Small — no background (content-height)
      { variant: 'text', size: 'small', className: 'gap-1' },
      { variant: 'link', size: 'small', className: 'gap-1' },
      { variant: 'critical-text', size: 'small', className: 'gap-1' },
      // Small — icon variants (fixed square)
      { variant: 'icon-filled', size: 'small', className: 'w-9 h-9' },
      { variant: 'icon-secondary', size: 'small', className: 'w-9 h-9' },
      { variant: 'icon-only', size: 'small', className: 'w-4 h-4' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'large',
      fullWidth: false,
    },
  },
);

const ICON_ONLY_VARIANTS = new Set<string>(['icon-filled', 'icon-secondary', 'icon-only']);

function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block shrink-0 rounded-full border-2 border-transparent border-t-current',
        '[animation:btn-spin_600ms_linear_infinite]',
        className,
      )}
    />
  );
}

function IconWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center', className)}>
      {children}
    </span>
  );
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Required for icon-only variants (icon-filled, icon-secondary, icon-only). Must also provide aria-label. */
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'large',
      fullWidth = false,
      asChild = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      icon,
      type = 'button',
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIconOnly = ICON_ONLY_VARIANTS.has(variant ?? 'primary');
    const iconSizeClass = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={disabled}
        aria-busy={loading || undefined}
        data-loading={loading ? 'true' : undefined}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          loading && 'cursor-not-allowed pointer-events-none',
          className,
        )}
        {...props}
      >
        {isIconOnly ? (
          <IconWrapper className={iconSizeClass}>
            {loading ? <Spinner className={iconSizeClass} /> : icon}
          </IconWrapper>
        ) : (
          <>
            {(loading || leftIcon) && (
              <IconWrapper className={iconSizeClass}>
                {loading ? <Spinner className={iconSizeClass} /> : leftIcon}
              </IconWrapper>
            )}
            {children}
            {rightIcon && (
              <IconWrapper className={iconSizeClass}>{rightIcon}</IconWrapper>
            )}
            {loading && (
              <span aria-atomic="true" aria-live="polite" className="sr-only">
                Loading…
              </span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
