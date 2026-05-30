import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import { TickCircleIcon } from '@/assets/icons/TickCircleIcon';
import { WarningIcon } from '@/assets/icons/WarningIcon';
import { CloseCircleIcon } from '@/assets/icons/CloseCircleIcon';
import { InfoCircleIcon } from '@/assets/icons/InfoCircleIcon';

export type ToastVariant = 'success' | 'warning' | 'critical' | 'info';

const toastVariants = cva(
  'relative flex flex-row items-start gap-3 p-3 bg-bg-black max-w-[343px] w-full shadow-[0px_3px_30px_0px_rgba(140,140,140,0.12)] font-inter',
  {
    variants: {
      variant: {
        success:  '',
        warning:  '',
        critical: '',
        info:     '',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

interface StatusIconProps {
  variant: ToastVariant;
}

function StatusIcon({ variant }: StatusIconProps) {
  const cls = cn('size-5', variant === 'info' && 'text-icon-white');
  switch (variant) {
    case 'success':  return <TickCircleIcon  className={cls} aria-hidden="true" />;
    case 'warning':  return <WarningIcon     className={cls} aria-hidden="true" />;
    case 'critical': return <CloseCircleIcon className={cls} aria-hidden="true" />;
    case 'info':     return <InfoCircleIcon  className={cls} aria-hidden="true" />;
  }
}

export type ToastCornerRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

const CORNER_RADIUS_CLASS: Record<ToastCornerRadius, string> = {
  none: 'rounded-none',
  sm:   'rounded-md',
  md:   'rounded-xl',
  lg:   'rounded-2xl',
  full: 'rounded-full',
};

export interface ToastProps extends VariantProps<typeof toastVariants> {
  variant?: ToastVariant;
  title: string;
  description?: string;
  onClose?: () => void;
  cornerRadius?: ToastCornerRadius;
  className?: string;
}

export function Toast({ variant = 'info', title, description, onClose, cornerRadius = 'md', className }: ToastProps) {
  return (
    <div className={cn(toastVariants({ variant }), CORNER_RADIUS_CLASS[cornerRadius], className)}>
      <div className="flex items-start flex-shrink-0">
        <StatusIcon variant={variant} />
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-medium leading-[22px] text-text-white w-full">{title}</span>
        {description && (
          <span className="text-xs font-normal leading-4 text-text-white w-full">{description}</span>
        )}
      </div>

      {onClose && (
        <div className="flex items-center py-[2px] flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex items-center justify-center bg-transparent border-0 p-0"
          >
            <CloseIcon className="size-4 cursor-pointer text-icon-secondary" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
