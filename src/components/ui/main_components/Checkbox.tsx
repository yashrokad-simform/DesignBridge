import React, { useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/assets/icons/CheckIcon';
import { IndeterminateIcon } from '@/assets/icons/IndeterminateIcon';

type CheckboxState =
  | 'enabled'
  | 'hover'
  | 'selected'
  | 'indeterminate'
  | 'disabled'
  | 'disabled-selected';

const controlBox = cva(
  'size-[18px] rounded-[4px] flex items-center justify-center flex-shrink-0 box-border relative overflow-hidden transition-colors',
  {
    variants: {
      state: {
        'enabled':           'bg-bg-primary border border-border-gray-dark group-hover:border-border-warning',
        'hover':             'bg-bg-primary border border-border-warning',
        'selected':          'bg-bg-brand-secondary border-0',
        'indeterminate':     'border-0',
        'disabled':          'bg-input-bg-disabled border border-input-border-disabled opacity-100',
        'disabled-selected': 'bg-input-bg-disabled border border-input-border-disabled opacity-100',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

function deriveState(
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean,
  hovered = false,
): CheckboxState {
  if (disabled) return checked ? 'disabled-selected' : 'disabled';
  if (indeterminate) return 'indeterminate';
  if (checked) return 'selected';
  if (hovered) return 'hover';
  return 'enabled';
}

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelSize?: string;
}

export function Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  hovered = false,
  onChange,
  className,
  labelSize,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const inputRef = useRef<HTMLInputElement>(null);
  const state = deriveState(checked, indeterminate, disabled, hovered);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newChecked = indeterminate ? true : e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    if (onChange) {
      onChange(newChecked);
    }
  };

  const ariaChecked = indeterminate ? 'mixed' : checked;

  const labelTextCls =
    state === 'disabled' || state === 'disabled-selected'
      ? 'text-input-text-disabled'
      : 'text-text-primary';

  return (
    <label
      className={cn(
        'relative inline-flex flex-row items-start gap-1 cursor-pointer group font-inter',
        disabled && 'cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="sr-only peer/input"
        checked={checked}
        disabled={disabled}
        aria-checked={ariaChecked}
        onChange={handleChange}
      />

      <div
        className={cn(
          controlBox({ state }),
          'control-box',
          'peer-focus-visible/input:outline peer-focus-visible/input:outline-2',
          'peer-focus-visible/input:outline-offset-2',
          'peer-focus-visible/input:[outline-color:var(--color-border-warning)]',
        )}
      >
        {(state === 'selected') && (
          <CheckIcon
            aria-hidden="true"
            className="absolute inset-[2.25px] text-icon-white"
          />
        )}
        {(state === 'disabled-selected') && (
          <CheckIcon
            aria-hidden="true"
            className="absolute inset-[2.25px] text-bg-gray-dark"
          />
        )}
        {(state === 'disabled' && checked) && (
          <CheckIcon
            aria-hidden="true"
            className="absolute inset-[2.25px] text-icon-white opacity-60"
          />
        )}
        {state === 'indeterminate' && (
          <IndeterminateIcon
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {label && (
        <span className={cn('font-medium leading-4.5 whitespace-nowrap', labelSize ?? 'text-sm', labelTextCls)}>
          {label}
        </span>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Checkbox Tile                                              */
/* ─────────────────────────────────────────────────────────── */

const tileCva = cva(
  'flex flex-row items-start w-full rounded-xl border p-3 gap-2 cursor-pointer transition-colors',
  {
    variants: {
      state: {
        'enabled':           'bg-bg-primary border-input-border-enabled hover:border-border-warning',
        'selected':          'bg-bg-brand-secondary-light border-border-warning',
        'disabled':          'bg-input-bg-disabled border-input-border-disabled cursor-not-allowed pointer-events-none',
        'disabled-selected': 'bg-input-bg-disabled border-input-border-disabled cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

type TileState = 'enabled' | 'selected' | 'disabled' | 'disabled-selected';

function deriveTileState(checked: boolean, disabled: boolean): TileState {
  if (disabled) return checked ? 'disabled-selected' : 'disabled';
  return checked ? 'selected' : 'enabled';
}

export interface CheckboxTileProps {
  title: string;
  caption?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  titleSize?: string;
}

export function CheckboxTile({
  title,
  caption,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  titleSize,
}: CheckboxTileProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const [isHovered, setIsHovered] = React.useState(false);
  const tileState = deriveTileState(checked, disabled);

  const textCls =
    tileState === 'disabled' || tileState === 'disabled-selected'
      ? 'text-input-text-disabled'
      : '';

  return (
    <div
      className={cn(tileCva({ state: tileState }), 'font-inter', className)}
      onClick={() => {
        if (!disabled) {
          const newChecked = !checked;
          if (!isControlled) setInternalChecked(newChecked);
          if (onChange) onChange(newChecked);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        hovered={isHovered && !checked && !disabled}
      />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span
          className={cn(
            'font-medium leading-4.5 text-text-primary w-full',
            titleSize ?? 'text-sm',
            textCls,
          )}
        >
          {title}
        </span>
        {caption && (
          <span
            className={cn(
              'text-xs font-medium leading-4 text-text-secondary w-full',
              textCls,
            )}
          >
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
