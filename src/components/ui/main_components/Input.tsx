import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type InputState = 'default' | 'error' | 'disabled';
export type InputCornerRadius = '4px' | '8px' | '12px' | '16px' | 'full';
export type InputPadding = '12px' | '14px' | '16px' | '20px';
export type InputTextSize = '14px' | '16px';

const TEXT_SIZE_CLASS: Record<InputTextSize, string> = {
  '14px': 'text-sm leading-4.5',
  '16px': 'text-base leading-5.5',
};

const RADIUS_CLASS: Record<InputCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  'full': 'rounded-full',
};

const PADDING_CLASS: Record<InputPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const inputContainerVariants = cva(
  'flex items-center w-full border gap-2 bg-input-bg-primary transition-colors',
  {
    variants: {
      state: {
        default:  'border-input-border-enabled focus-within:border-input-border-selected',
        error:    'border-input-border-critical',
        disabled: 'border-input-border-disabled bg-input-bg-disabled pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

const ICON_COLOR: Record<InputState, string> = {
  default:  'text-input-icon-enabled',
  error:    'text-input-icon-critical',
  disabled: 'text-input-icon-disabled',
};

function cloneIcon(icon: React.ReactNode, colorClass: string): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(
    icon as React.ReactElement<{ className?: string; 'aria-hidden'?: string }>,
    { className: cn('size-4 flex-shrink-0', colorClass), 'aria-hidden': 'true' },
  );
}

export interface InputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  focused?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  cornerRadius?: InputCornerRadius;
  padding?: InputPadding;
  height?: number;
  textSize?: InputTextSize;
  className?: string;
}

export function Input({
  label,
  required = false,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  focused = false,
  defaultValue,
  value,
  onChange,
  autoFocus,
  leadingIcon,
  trailingIcon,
  cornerRadius = '12px',
  padding = '12px',
  height = 44,
  textSize = '14px',
  className,
}: InputProps) {
  const state: InputState = disabled ? 'disabled' : errorText ? 'error' : 'default';
  const iconColor = ICON_COLOR[state];
  const bottomText = errorText ?? helperText;

  return (
    <div className={cn('flex flex-col gap-1 font-inter', className)}>
      {label && (
        <label className="text-xs font-medium leading-4 text-input-text-label">
          {label}
          {required && <span className="text-input-text-critical ml-0.5">*</span>}
        </label>
      )}

      <div
        style={{ minHeight: `${height}px` }}
        className={cn(inputContainerVariants({ state }), RADIUS_CLASS[cornerRadius], PADDING_CLASS[padding], focused && 'border-input-border-selected')}
      >
        {leadingIcon && cloneIcon(leadingIcon, iconColor)}
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          className={cn('w-full bg-transparent border-none outline-none font-medium text-input-text-enabled placeholder:text-input-text-placeholder disabled:text-input-text-disabled disabled:cursor-not-allowed', TEXT_SIZE_CLASS[textSize])}
        />
        {trailingIcon && cloneIcon(trailingIcon, iconColor)}
      </div>

      {bottomText && (
        <span className={cn('text-xs font-medium leading-4', errorText ? 'text-input-text-critical' : 'text-input-text-helper')}>
          {bottomText}
        </span>
      )}
    </div>
  );
}
