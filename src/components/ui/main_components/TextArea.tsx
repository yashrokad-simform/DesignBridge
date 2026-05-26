import React, { useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useResizeDrag }    from '@/hooks/useResizeDrag';
import { ResizeHandleIcon } from '@/assets/icons/ResizeHandleIcon';

export type TextAreaCornerRadius = '4px' | '8px' | '12px' | '16px';
export type TextAreaPadding     = '12px' | '14px' | '16px' | '20px';
export type TextAreaTextSize    = '12px' | '14px' | '16px';

const RADIUS_MAP: Record<TextAreaCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
};

const PADDING_MAP: Record<TextAreaPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MAP: Record<TextAreaTextSize, string> = {
  '12px': 'text-xs leading-4',
  '14px': 'text-sm leading-4.5',
  '16px': 'text-md leading-5.5',
};

export interface TextAreaProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  focused?: boolean;
  minHeight?: number;
  cornerRadius?: TextAreaCornerRadius;
  padding?: TextAreaPadding;
  textSize?: TextAreaTextSize;
  value?: string;
  onChange?: (value: string) => void;
}

/* ── Container CVA ───────────────────────────────────────── */
const containerVariants = cva(
  'flex flex-col w-full border overflow-hidden relative bg-input-bg-primary transition-colors',
  {
    variants: {
      state: {
        default:  'border-input-border-enabled',
        focused:  'border-input-border-selected',
        error:    'border-input-border-critical',
        disabled: 'border-input-border-disabled bg-input-bg-disabled pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

type ContainerState = 'default' | 'focused' | 'error' | 'disabled';

/* ── TextArea ────────────────────────────────────────────── */
export function TextArea({
  label,
  required = false,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  focused: forceFocused = false,
  minHeight = 80,
  cornerRadius = '12px',
  padding = '12px',
  textSize = '14px',
  value,
  onChange,
}: TextAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalFocused, setInternalFocused] = useState(false);
  const focused = forceFocused || internalFocused;

  const { isDragging, handleMouseDown, handleTouchStart } = useResizeDrag({
    containerRef,
    minHeight,
    disabled,
  });

  let containerState: ContainerState = 'default';
  if (disabled)       containerState = 'disabled';
  else if (errorText) containerState = 'error';
  else if (focused)   containerState = 'focused';

  return (
    <div className="flex flex-col gap-1 w-full font-inter">
      {/* Label */}
      {label && (
        <div className="flex items-center gap-0.5">
          <span className="text-xs font-medium leading-4 text-input-text-label">{label}</span>
          {required && <span className="text-xs font-medium leading-4 text-input-text-critical">*</span>}
        </div>
      )}

      {/* Container */}
      <div
        ref={containerRef}
        className={cn(
          containerVariants({ state: containerState }),
          RADIUS_MAP[cornerRadius],
          isDragging && 'ring-1 ring-input-border-selected',
        )}
      >
        {/* Content Area */}
        <div className={cn('flex flex-1 min-h-0 py-2 relative', PADDING_MAP[padding])}>
          <textarea
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setInternalFocused(true)}
            onBlur={() => setInternalFocused(false)}
            style={{ minHeight }}
            className={cn(
              'w-full flex-1 min-h-0 resize-none bg-transparent border-none outline-none',
              'font-medium',
              TEXT_SIZE_MAP[textSize],
              'text-input-text-enabled placeholder:text-input-text-placeholder',
              'disabled:text-input-text-disabled disabled:cursor-not-allowed',
            )}
          />
        </div>

        {/* Resize Handle */}
        <div
          className={cn(
            'absolute bottom-[3px] right-[3px] size-4 cursor-se-resize',
            disabled && 'cursor-default',
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ResizeHandleIcon
            aria-hidden="true"
            className={cn('size-4 text-input-text-label', disabled && 'opacity-40')}
          />
        </div>
      </div>

      {/* Helper / Error Text */}
      {(errorText || helperText) && (
        <span className={cn(
          'text-xs font-medium leading-4',
          errorText ? 'text-input-text-critical' : 'text-input-text-helper',
        )}>
          {errorText ?? helperText}
        </span>
      )}
    </div>
  );
}
