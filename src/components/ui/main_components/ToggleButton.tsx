import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ToggleThumbWhite } from '@/assets/icons/ToggleThumbWhite';
import { ToggleThumbGray } from '@/assets/icons/ToggleThumbGray';

/* ─────────────────────────────────────────────────────────── */
/*  ToggleSwitch (sub-component)                               */
/* ─────────────────────────────────────────────────────────── */

type ToggleSwitchState = 'enabled' | 'active' | 'disabled' | 'active-disabled';

const trackCva = cva(
  'relative w-10 h-[22px] rounded-full flex-shrink-0 transition-colors',
  {
    variants: {
      state: {
        'enabled':        'bg-bg-brand-light',
        'active':         'bg-bg-brand-secondary',
        'disabled':       'bg-bg-secondary',
        'active-disabled': 'bg-bg-secondary',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

interface ToggleSwitchProps {
  state?: ToggleSwitchState;
}

function ToggleSwitch({ state = 'enabled' }: ToggleSwitchProps) {
  const isOn = state === 'active' || state === 'active-disabled';
  const isDisabled = state === 'disabled' || state === 'active-disabled';

  const thumbCls = isOn
    ? 'absolute top-1/2 -translate-y-1/2 right-[2px] size-[18px]'
    : 'absolute inset-y-[2px] left-[2px] w-[18px]';

  return (
    <div className={trackCva({ state })}>
      {isDisabled ? (
        <ToggleThumbGray aria-hidden="true" className={thumbCls} />
      ) : (
        <ToggleThumbWhite aria-hidden="true" className={thumbCls} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ToggleButton                                               */
/* ─────────────────────────────────────────────────────────── */

export interface ToggleButtonProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelSize?: string;
}

export function ToggleButton({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  labelSize,
}: ToggleButtonProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newChecked = e.target.checked;
    if (!isControlled) setInternalChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  function deriveState(): ToggleSwitchState {
    if (disabled) return checked ? 'active-disabled' : 'disabled';
    return checked ? 'active' : 'enabled';
  }

  const isDisabledState = disabled;
  const labelTextCls = isDisabledState ? 'text-input-text-disabled' : 'text-text-primary';

  return (
    <label
      className={cn(
        'relative inline-flex flex-row items-center gap-2 cursor-pointer select-none font-inter',
        disabled && 'cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <input
        type="checkbox"
        className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        onChange={handleChange}
      />
      <ToggleSwitch state={deriveState()} />
      {label && (
        <span className={cn('font-medium leading-4.5 whitespace-nowrap', labelSize ?? 'text-sm', labelTextCls)}>
          {label}
        </span>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  ToggleButtonTile                                           */
/* ─────────────────────────────────────────────────────────── */

export interface ToggleButtonTileProps {
  title: string;
  caption?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  titleSize?: string;
}

export function ToggleButtonTile({
  title,
  caption,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  titleSize,
}: ToggleButtonTileProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  function deriveState(): ToggleSwitchState {
    if (disabled) return checked ? 'active-disabled' : 'disabled';
    return checked ? 'active' : 'enabled';
  }

  const isDisabledState = disabled;
  const textCls = isDisabledState ? 'text-input-text-disabled' : '';

  return (
    <div
      className={cn(
        'flex flex-row items-start gap-2 rounded-xl w-full cursor-pointer select-none',
        disabled && 'cursor-not-allowed pointer-events-none',
        className,
      )}
      onClick={() => {
        if (disabled) return;
        const newChecked = !checked;
        if (!isControlled) setInternalChecked(newChecked);
        if (onChange) onChange(newChecked);
      }}
    >
      <ToggleSwitch state={deriveState()} />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className={cn('font-medium leading-4.5 w-full text-text-primary', titleSize ?? 'text-sm', textCls)}>
          {title}
        </span>
        {caption && (
          <span
            className={cn('text-xs font-medium leading-4 w-full text-text-secondary', textCls)}
          >
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
