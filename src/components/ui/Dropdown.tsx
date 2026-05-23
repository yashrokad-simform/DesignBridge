import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import { CheckIcon } from '@/assets/icons/CheckIcon';
import { ChevronDownIcon } from '@/assets/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/assets/icons/ChevronUpIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const triggerCva = cva(
  'flex items-center h-11 w-full rounded-xl border px-3 gap-2 bg-input-bg-primary transition-colors cursor-pointer select-none',
  {
    variants: {
      state: {
        default:  'border-input-border-enabled',
        open:     'border-input-border-selected',
        error:    'border-input-border-critical',
        disabled: 'border-input-border-disabled bg-input-bg-disabled pointer-events-none cursor-not-allowed',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

type TriggerState = 'default' | 'open' | 'error' | 'disabled';

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
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [flipUp, setFlipUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
    if (isOpen && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

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
    <div ref={wrapperRef} className="flex flex-col gap-1 relative w-full">
      {label && (
        <div className="text-xs font-medium leading-4 text-input-text-label">
          {label}
          {required && <span className="text-input-text-critical ml-0.5">*</span>}
        </div>
      )}

      <div className={triggerCva({ state: triggerState })} onClick={toggle}>
        {leadingIcon && (
          <span aria-hidden="true" className={cn('size-4 flex-shrink-0', iconColorCls)}>
            {leadingIcon}
          </span>
        )}

        <span className={cn('flex-1 text-sm font-medium leading-snug truncate', displayValue ? 'text-input-text-enabled' : 'text-input-text-placeholder')}>
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
                color="black"
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
              <div className="flex items-center gap-2 h-9 px-3 rounded-xl border border-input-border-enabled bg-input-bg-primary">
                <SearchIcon aria-hidden="true" className="size-4 flex-shrink-0 text-input-icon-enabled" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                  className="flex-1 text-sm font-medium leading-snug text-input-text-enabled bg-transparent outline-none placeholder:text-input-text-placeholder"
                />
              </div>
            </div>
          )}

          {filteredOptions.map(opt => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={cn(
                  'flex items-center h-10 px-3 gap-2 cursor-pointer transition-colors',
                  isSelected ? 'bg-bg-primary' : 'bg-input-bg-primary hover:bg-bg-gray-light',
                )}
                onClick={() => selectOption(opt.value)}
              >
                {opt.icon && (
                  <span className="size-4 flex-shrink-0 text-input-icon-enabled">{opt.icon}</span>
                )}
                <span className="flex-1 text-sm font-medium leading-snug text-input-text-enabled">
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
