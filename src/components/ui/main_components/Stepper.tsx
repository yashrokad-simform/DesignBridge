import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { StepDotIcon } from '@/assets/icons/StepDotIcon';
import { StepSpinnerIcon } from '@/assets/icons/StepSpinnerIcon';
import { CheckIcon } from '@/assets/icons/CheckIcon';

export type StepState = 'incomplete' | 'current' | 'completed';
export type StepSize  = 'regular' | 'large';

export interface StepItemData {
  title: string;
  caption?: string;
  state: StepState;
}

export interface StepperProps {
  steps: StepItemData[];
  size?: StepSize;
  className?: string;
}

/* ── StepIcon CVA ────────────────────────────────────────── */
const stepIconVariants = cva(
  'flex items-center justify-center rounded-full flex-shrink-0',
  {
    variants: {
      state: {
        incomplete: 'bg-bg-primary border-[1.5px] border-border-primary',
        current:    'bg-bg-brand-secondary-light border-[1.5px] border-border-brand-secondary',
        completed:  'bg-bg-success',
      },
      size: {
        regular: 'size-6',
        large:   'size-8',
      },
    },
    defaultVariants: { state: 'incomplete', size: 'regular' },
  },
);

/* ── StepIcon ────────────────────────────────────────────── */
function StepIcon({ state, size }: { state: StepState; size: StepSize }) {
  return (
    <div className={stepIconVariants({ state, size })}>
      {state === 'incomplete' && (
        <StepDotIcon
          aria-hidden="true"
          className={cn(
            'text-border-primary',
            size === 'regular' ? 'size-2' : 'size-3',
          )}
        />
      )}
      {state === 'current' && (
        <StepSpinnerIcon
          aria-hidden="true"
          className={cn(
            'animate-spin text-border-brand-secondary',
            size === 'regular' ? 'size-3' : 'size-4',
          )}
        />
      )}
      {state === 'completed' && (
        <CheckIcon
          aria-hidden="true"
          className={cn(
            'text-white',
            size === 'regular' ? 'size-4' : 'size-5',
          )}
        />
      )}
    </div>
  );
}

/* ── Connector ───────────────────────────────────────────── */
function Connector({ state, size }: { state: StepState; size: StepSize }) {
  return (
    <div className={cn(
      'w-0.5 rounded-full flex-shrink-0',
      size === 'regular' ? 'h-7' : 'h-16',
      state === 'completed' ? 'bg-border-success' : 'bg-border-primary',
    )} />
  );
}

/* ── StepItem ────────────────────────────────────────────── */
interface StepItemProps extends StepItemData {
  size: StepSize;
  showConnector: boolean;
  showCaption?: boolean;
}

function StepItem({ title, caption, state, size, showConnector, showCaption = true }: StepItemProps) {
  const titleClasses: Record<StepState, Record<StepSize, string>> = {
    incomplete: {
      regular: 'text-sm font-medium leading-4.5 text-text-primary',
      large:   'text-base font-medium leading-5.5 text-text-primary',
    },
    current: {
      regular: 'text-sm font-semibold leading-4.5 text-text-brand-secondary',
      large:   'text-base font-semibold leading-5.5 text-text-brand-secondary',
    },
    completed: {
      regular: 'text-sm font-medium leading-4.5 text-text-success',
      large:   'text-base font-medium leading-5.5 text-text-success',
    },
  };

  const captionClasses: Record<StepSize, string> = {
    regular: 'text-xs font-medium leading-4 text-text-secondary',
    large:   'text-sm font-medium leading-4.5 text-text-secondary',
  };

  const textPadding: Record<StepSize, string> = {
    regular: 'pt-0.5 pb-6 gap-1',
    large:   'pt-1 pb-8 gap-0.5',
  };

  const itemGap: Record<StepSize, string> = {
    regular: 'gap-2',
    large:   'gap-3',
  };

  return (
    <div className={cn('flex flex-row items-start w-full', itemGap[size])}>
      {/* ConnectorWrap */}
      <div className={cn(
        'flex flex-col gap-1 items-center pb-1 flex-shrink-0',
        size === 'regular' && 'self-stretch',
      )}>
        <StepIcon state={state} size={size} />
        {showConnector && <Connector state={state} size={size} />}
      </div>

      {/* TextContent */}
      <div className={cn('flex flex-col flex-1 min-w-0', textPadding[size])}>
        <span className={titleClasses[state][size]}>{title}</span>
        {showCaption && caption && (
          <span className={captionClasses[size]}>{caption}</span>
        )}
      </div>
    </div>
  );
}

/* ── Stepper ─────────────────────────────────────────────── */
export function Stepper({ steps, size = 'regular', className }: StepperProps) {
  return (
    <div className={cn('flex flex-col gap-2 items-start w-full font-inter', className)}>
      {steps.map((step, i) => (
        <StepItem
          key={i}
          title={step.title}
          caption={step.caption}
          state={step.state}
          size={size}
          showConnector={i < steps.length - 1}
        />
      ))}
    </div>
  );
}
