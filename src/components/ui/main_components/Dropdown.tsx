import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import { CheckIcon } from '@/assets/icons/CheckIcon';
import { ChevronDownIcon } from '@/assets/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/assets/icons/ChevronUpIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { Input } from './Input';

export type DropdownCornerRadius = '4px' | '8px' | '12px' | '16px' | 'full';
export type DropdownPadding = '12px' | '14px' | '16px' | '20px';
export type DropdownTextSize = '14px' | '16px';

const TEXT_SIZE_CLASS: Record<DropdownTextSize, string> = {
  '14px': 'text-sm leading-4.5',
  '16px': 'text-md leading-5.5',
};

const RADIUS_CLASS: Record<DropdownCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  'full': 'rounded-full',
};

const PADDING_CLASS: Record<DropdownPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const triggerCva = cva(
  'flex items-center w-full border gap-2 bg-input-bg-primary transition-colors cursor-pointer select-none',
  {
    variants: {
      state: {
        default:  'border-input-border-enabled',
        open:     'border-input-border-selected',
        error:    'border-input-border-critical',
        disabled: 'border-input-border-disabled bg-input-bg-disabled pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

type TriggerState = 'default' | 'open' | 'error' | 'disabled';

function cloneIcon(icon: React.ReactNode, colorClass: string): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(
    icon as React.ReactElement<{ className?: string; 'aria-hidden'?: string }>,
    { className: cn('size-4 flex-shrink-0', colorClass), 'aria-hidden': 'true' },
  );
}

export interface DropdownProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  cornerRadius?: DropdownCornerRadius;
  padding?: DropdownPadding;
  height?: number;
  textSize?: DropdownTextSize;
  defaultOpen?: boolean;
}

export function Dropdown({
  label,
  required = false,
  placeholder = 'Select',
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  helperText,
  errorText,
  disabled = false,
  leadingIcon,
  cornerRadius = '12px',
  padding = '12px',
  height = 44,
  textSize = '14px',
  defaultOpen = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [search, setSearch] = useState('');
  const [flipUp, setFlipUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedValues = multiple
    ? (Array.isArray(value) ? value : [])
    : (typeof value === 'string' ? [value] : []);

  const triggerState: TriggerState = disabled
    ? 'disabled'
    : errorText
    ? 'error'
    : isOpen
    ? 'open'
    : 'default';

  const iconColorCls = disabled
    ? 'text-input-icon-disabled'
    : errorText
    ? 'text-input-icon-critical'
    : 'text-input-icon-enabled';

  const displayValue = !multiple && selectedValues.length > 0
    ? options.find(o => o.value === selectedValues[0])?.label
    : null;

  const filteredOptions = searchable && search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const open = useCallback(() => {
    if (disabled) return;
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setFlipUp(window.innerHeight - rect.bottom < 260);
    }
    setIsOpen(true);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  const toggle = () => (isOpen ? close() : open());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [close]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [close]);

  const selectOption = (optValue: string) => {
    if (multiple) {
      const next = selectedValues.includes(optValue)
        ? selectedValues.filter(v => v !== optValue)
        : [...selectedValues, optValue];
      onChange(next);
    } else {
      onChange(optValue);
      close();
    }
  };

  const removeOption = (optValue: string) => {
    onChange(selectedValues.filter(v => v !== optValue));
  };

  return (
    <div ref={wrapperRef} className="flex flex-col gap-1 relative w-full font-inter">
      {label && (
        <div className="text-xs font-medium leading-4 text-input-text-label">
          {label}
          {required && <span className="text-input-text-critical ml-0.5">*</span>}
        </div>
      )}

      <div
        style={{ height: `${height}px` }}
        className={cn(
          triggerCva({ state: triggerState }),
          RADIUS_CLASS[cornerRadius],
          PADDING_CLASS[padding],
        )}
        onClick={toggle}
      >
        {leadingIcon && cloneIcon(leadingIcon, iconColorCls)}

        <span className={cn(
          'flex-1 font-medium truncate',
          TEXT_SIZE_CLASS[textSize],
          disabled
            ? 'text-input-text-disabled'
            : displayValue ? 'text-input-text-enabled' : 'text-input-text-placeholder',
        )}>
          {displayValue ?? (multiple && selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder)}
        </span>

        {isOpen
          ? <ChevronUpIcon aria-hidden="true" className={cn('size-4 flex-shrink-0 ml-auto', iconColorCls)} />
          : <ChevronDownIcon aria-hidden="true" className={cn('size-4 flex-shrink-0 ml-auto', iconColorCls)} />
        }
      </div>

      {(helperText && !errorText) && (
        <span className="text-xs font-medium leading-4 text-input-text-helper">{helperText}</span>
      )}
      {errorText && (
        <span className="text-xs font-medium leading-4 text-input-text-critical">{errorText}</span>
      )}

      {multiple && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1.5 w-full">
          {selectedValues.map(v => {
            const opt = options.find(o => o.value === v);
            return opt ? (
              <Badge
                key={v}
                variant="tertiary"
                color="gray"
                label={opt.label}
                showSuffix
                onRemove={() => removeOption(v)}
              />
            ) : null;
          })}
        </div>
      )}

      {isOpen && (
        <div className={cn(
          'absolute left-0 right-0 rounded-xl border border-input-border-enabled bg-input-bg-primary',
          'shadow-[0px_2px_20px_0px_rgba(98,96,96,0.08)] overflow-hidden z-50 max-h-60 overflow-y-auto',
          flipUp ? 'bottom-full mb-1' : 'top-full mt-1',
        )}>
          {searchable && (
            <div className="p-3 border-b border-input-border-enabled">
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                leadingIcon={<SearchIcon />}
                autoFocus
              />
            </div>
          )}

          {filteredOptions.map(opt => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={cn(
                  'flex items-center h-10 px-3 gap-2 cursor-pointer transition-colors',
                  isSelected ? 'bg-bg-brand-light' : 'bg-input-bg-primary hover:bg-bg-secondary',
                )}
                onClick={() => selectOption(opt.value)}
              >
                {opt.icon && (
                  <span className="size-4 flex-shrink-0 text-input-icon-enabled">{opt.icon}</span>
                )}
                <span className="flex-1 text-sm leading-4.5 font-medium text-input-text-enabled">
                  {opt.label}
                </span>
                {multiple ? (
                  <Checkbox checked={isSelected} onChange={() => selectOption(opt.value)} />
                ) : isSelected ? (
                  <CheckIcon aria-hidden="true" className="size-5 flex-shrink-0 text-input-icon-enabled" />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
