import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SpinnerIcon } from '@/assets/icons/SpinnerIcon';

export type ButtonVariant =
  | 'primary'
  | 'bordered'
  | 'text'
  | 'link'
  | 'critical'
  | 'critical-bordered'
  | 'critical-text'
  | 'icon-filled'
  | 'icon-secondary'
  | 'icon-only';

export type ButtonSize = 'lg' | 'sm';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none',
  {
    variants: {
      variant: {
        'primary':           'rounded-xl bg-btn-bg-primary text-btn-text-primary hover:bg-btn-bg-primary-focused disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled',
        'bordered':          'rounded-xl border border-btn-border-primary bg-btn-bg-bordered text-btn-text-bordered hover:border-btn-border-focused disabled:border-btn-border-disabled disabled:text-btn-text-disabled',
        'text':              'text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled',
        'link':              'underline text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled',
        'critical':          'rounded-xl bg-btn-bg-critical text-btn-text-primary disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled',
        'critical-bordered': 'rounded-xl border border-btn-border-critical bg-btn-bg-bordered text-btn-text-critical disabled:border-btn-border-disabled disabled:text-btn-text-disabled',
        'critical-text':     'text-btn-text-critical disabled:text-btn-text-disabled',
        'icon-filled':       'rounded-xl bg-btn-bg-primary text-btn-icon-primary hover:bg-btn-bg-primary-focused disabled:bg-btn-bg-primary-disabled disabled:text-btn-icon-disabled',
        'icon-secondary':    'rounded-xl border border-btn-border-primary bg-btn-bg-bordered text-btn-icon-bordered hover:border-btn-border-focused disabled:border-btn-border-disabled disabled:text-btn-icon-disabled',
        'icon-only':         'text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled',
      },
      size: {
        lg: 'h-11 px-5 gap-2 text-sm leading-snug',
        sm: 'h-9 px-4 gap-1 text-xs leading-4',
      },
    },
    compoundVariants: [
      { variant: ['text', 'link', 'critical-text'], size: 'lg', className: 'h-5 px-0' },
      { variant: ['text', 'link', 'critical-text'], size: 'sm', className: 'h-4 px-0' },
      { variant: ['icon-filled', 'icon-secondary'],  size: 'lg', className: 'size-11 p-0' },
      { variant: ['icon-filled', 'icon-secondary'],  size: 'sm', className: 'size-9 p-0' },
      { variant: 'icon-only', size: 'lg', className: 'size-5 p-0' },
      { variant: 'icon-only', size: 'sm', className: 'size-4 p-0' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

export { buttonVariants };

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIconVariant =
      variant === 'icon-filled' || variant === 'icon-secondary' || variant === 'icon-only';
    const iconCls = size === 'lg' ? 'size-5 flex-shrink-0' : 'size-4 flex-shrink-0';

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {isIconVariant ? (
          loading ? (
            <SpinnerIcon aria-hidden="true" className={cn(iconCls, 'animate-spin')} />
          ) : (
            children
          )
        ) : (
          <>
            {loading ? (
              <SpinnerIcon aria-hidden="true" className={cn(iconCls, 'animate-spin')} />
            ) : leftIcon ? (
              <span aria-hidden="true" className={iconCls}>{leftIcon}</span>
            ) : null}
            {children}
            {!loading && rightIcon && (
              <span aria-hidden="true" className={iconCls}>{rightIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
