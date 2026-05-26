import React, { createContext, useContext, useId, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ── RadioGroup Context ──────────────────────────────────────── */
interface RadioGroupCtx {
  name: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

/* ── RadioGroup ──────────────────────────────────────────────── */
export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children: React.ReactNode;
  'aria-label'?: string;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = '',
  onChange,
  name: nameProp,
  disabled = false,
  orientation = 'vertical',
  children,
  'aria-label': ariaLabel,
}: RadioGroupProps) {
  const autoName = useId();
  const name = nameProp ?? autoName;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ name, value, onChange: handleChange, disabled }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-disabled={disabled}
        className={cn(
          'flex font-inter',
          orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2',
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

/* ── CVA — control circle ────────────────────────────────────── */
type RadioState = 'enabled' | 'selected' | 'disabled';

const radioCircle = cva(
  'size-[18px] rounded-full flex items-center justify-center flex-shrink-0 border transition-colors',
  {
    variants: {
      state: {
        enabled:  'bg-bg-white border-border-gray-dark group-hover:border-border-brand-secondary',
        selected: 'bg-bg-brand-secondary border-0',
        disabled: 'bg-input-bg-disabled border-input-border-disabled',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

/* ── RadioButton ─────────────────────────────────────────────── */
export interface RadioButtonProps {
  value: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  labelSize?: string;
}

export function RadioButton({
  value,
  label,
  checked: checkedProp,
  disabled: disabledProp,
  onChange: onChangeProp,
  name: nameProp,
  className,
  labelSize,
}: RadioButtonProps) {
  const ctx = useContext(RadioGroupContext);
  const name = nameProp ?? ctx?.name ?? value;
  const checked = checkedProp ?? (ctx ? ctx.value === value : false);
  const disabled = disabledProp ?? ctx?.disabled ?? false;
  const onChange = onChangeProp ?? ctx?.onChange;

  const state: RadioState = disabled ? 'disabled' : checked ? 'selected' : 'enabled';
  const labelColor = disabled ? 'text-input-text-disabled' : 'text-text-primary';

  return (
    <label
      className={cn(
        'inline-flex flex-row items-start gap-1 cursor-pointer select-none group font-inter',
        disabled && 'cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <input
        type="radio"
        className="sr-only peer"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <div
        aria-hidden="true"
        className={cn(
          radioCircle({ state }),
          'peer-focus-visible:outline peer-focus-visible:outline-2',
          'peer-focus-visible:outline-border-brand-secondary peer-focus-visible:outline-offset-2',
        )}
      >
        {checked && (
          <span className={cn('size-2 rounded-full', disabled ? 'bg-input-border-disabled' : 'bg-bg-white')} />
        )}
      </div>
      {label && (
        <span className={cn('font-medium leading-4.5 whitespace-nowrap', labelSize ?? 'text-sm', labelColor)}>
          {label}
        </span>
      )}
    </label>
  );
}

/* ── RadioTile ───────────────────────────────────────────────── */
const tileCva = cva(
  'flex flex-row items-start w-full rounded-xl border p-3 gap-2 transition-colors select-none cursor-pointer',
  {
    variants: {
      state: {
        enabled:  'bg-bg-white border-input-border-enabled hover:border-border-brand-secondary',
        selected: 'bg-bg-secondary border-border-brand-secondary',
        disabled: 'bg-input-bg-disabled border-input-border-disabled cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: { state: 'enabled' },
  },
);

export interface RadioTileProps {
  value: string;
  title: string;
  caption?: string;
  icon?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  titleSize?: string;
}

export function RadioTile({
  value,
  title,
  caption,
  icon,
  checked: checkedProp,
  disabled: disabledProp,
  onChange: onChangeProp,
  name: nameProp,
  className,
  titleSize,
}: RadioTileProps) {
  const ctx = useContext(RadioGroupContext);
  const name = nameProp ?? ctx?.name ?? value;
  const checked = checkedProp ?? (ctx ? ctx.value === value : false);
  const disabled = disabledProp ?? ctx?.disabled ?? false;
  const onChange = onChangeProp ?? ctx?.onChange;

  const tileState = disabled ? 'disabled' : checked ? 'selected' : 'enabled';
  const radioState: RadioState = disabled ? 'disabled' : checked ? 'selected' : 'enabled';
  const textCls = disabled ? 'text-input-text-disabled' : '';

  return (
    <label className={cn(tileCva({ state: tileState }), className)}>
      <input
        type="radio"
        className="sr-only peer"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <div
        aria-hidden="true"
        className={cn(
          radioCircle({ state: radioState }),
          'peer-focus-visible:outline peer-focus-visible:outline-2',
          'peer-focus-visible:outline-border-brand-secondary peer-focus-visible:outline-offset-2',
        )}
      >
        {checked && (
          <span className={cn('size-2 rounded-full', disabled ? 'bg-input-border-disabled' : 'bg-bg-white')} />
        )}
      </div>
      {icon && (
        <div className="flex-shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className={cn('font-medium leading-4.5 text-text-primary w-full', titleSize ?? 'text-sm', textCls)}>
          {title}
        </span>
        {caption && (
          <span className={cn('text-xs font-medium leading-4 text-text-secondary w-full', textCls)}>
            {caption}
          </span>
        )}
      </div>
    </label>
  );
}
