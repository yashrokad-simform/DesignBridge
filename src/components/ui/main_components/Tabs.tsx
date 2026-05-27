import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ── Text size map ───────────────────────────────────────── */
type TabTextSize = '12px' | '14px' | '16px';

const TEXT_SIZE_MAP: Record<TabTextSize, string> = {
  '12px': 'text-xs leading-4',
  '14px': 'text-sm leading-4.5',
  '16px': 'text-md leading-5.5',
};

/* ── Context ─────────────────────────────────────────────── */
interface TabsContextValue {
  activeTab: string;
  onChange: (value: string) => void;
  variant: 'standard' | 'capsule';
  textSize: TabTextSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used inside <Tabs>');
  return ctx;
}

/* ── Tabs ────────────────────────────────────────────────── */
export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'standard' | 'capsule';
  textSize?: TabTextSize;
  children: React.ReactNode;
}

export function Tabs({ value, defaultValue = '', onChange, variant = 'standard', textSize = '14px', children }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const handleChange = useCallback((v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  }, [isControlled, onChange]);

  return (
    <TabsContext.Provider value={{ activeTab, onChange: handleChange, variant, textSize }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

/* ── TabList ─────────────────────────────────────────────── */
export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  const { variant } = useTabsContext();

  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    const tabs = Array.from(listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') ?? []) as HTMLElement[];
    const current = document.activeElement as HTMLElement;
    const idx = tabs.indexOf(current);
    if (idx === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      tabs[(idx + 1) % tabs.length]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      tabs[(idx - 1 + tabs.length) % tabs.length]?.focus();
    }
  }

  if (variant === 'capsule') {
    return (
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn('flex items-start p-1 rounded-xl bg-bg-secondary font-inter', className)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn('flex items-start border-b border-border-primary font-inter', className)}
    >
      {children}
    </div>
  );
}

/* ── Standard TabItem ────────────────────────────────────── */
export interface TabItemProps {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export function TabItem({ value, label, count, disabled = false, className }: TabItemProps) {
  const { activeTab, onChange, variant, textSize } = useTabsContext();
  const active = activeTab === value;
  const tabId  = `tab-${value}`;
  const panelId = `panel-${value}`;

  if (variant === 'capsule') {
    return (
      <CapsuleTabItem value={value} label={label} disabled={disabled} className={className} />
    );
  }

  return (
    <div
      id={tabId}
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      tabIndex={active ? 0 : -1}
      onClick={() => !disabled && onChange(value)}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) onChange(value); }}
      className={cn(
        'flex flex-col items-center relative shrink-0 cursor-pointer select-none',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
    >
      {/* Content Row */}
      <div className="flex items-center justify-center p-3 gap-1 shrink-0">
        <span className={cn(
          TEXT_SIZE_MAP[textSize], 'whitespace-nowrap text-center',
          active ? 'font-semibold text-text-brand-secondary' : 'font-medium text-text-primary',
        )}>
          {label}
        </span>
        {count !== undefined && (
          <div className="size-[18px] rounded-full bg-bg-critical flex items-center justify-center flex-shrink-0">
            <span className="text-2xs leading-3 tracking-[0.1px] font-medium text-text-white text-center">
              {count}
            </span>
          </div>
        )}
      </div>
      {/* Indicator Bar */}
      <div className={cn('h-0.5 w-full shrink-0', active ? 'bg-border-brand-secondary' : 'bg-transparent')} />
    </div>
  );
}

/* ── Capsule CVA ─────────────────────────────────────────── */
const capsuleItemVariants = cva(
  'flex items-center justify-center px-5 py-2 cursor-pointer select-none transition-all whitespace-nowrap',
  {
    variants: {
      state: {
        inactive: 'rounded-xl',
        active:   'bg-bg-primary rounded-lg shadow-[0px_1px_12px_rgba(194,194,194,0.22)]',
      },
    },
    defaultVariants: { state: 'inactive' },
  },
);

/* ── Capsule TabItem ─────────────────────────────────────── */
function CapsuleTabItem({ value, label, disabled = false, className }: Omit<TabItemProps, 'count'>) {
  const { activeTab, onChange, textSize } = useTabsContext();
  const active  = activeTab === value;
  const tabId   = `tab-${value}`;
  const panelId = `panel-${value}`;

  return (
    <div
      id={tabId}
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      tabIndex={active ? 0 : -1}
      onClick={() => !disabled && onChange(value)}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) onChange(value); }}
      className={cn(
        capsuleItemVariants({ state: active ? 'active' : 'inactive' }),
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
    >
      <span className={cn(TEXT_SIZE_MAP[textSize], 'font-medium text-text-primary text-center whitespace-nowrap')}>
        {label}
      </span>
    </div>
  );
}

/* ── TabPanel ────────────────────────────────────────────── */
export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      id={`panel-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      className={className}
    >
      {children}
    </div>
  );
}
