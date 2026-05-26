import React, { Children, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@/assets/icons/ChevronRightIcon';

const breadcrumbItemVariants = cva(
  'whitespace-nowrap transition-colors font-inter',
  {
    variants: {
      state: {
        default: 'font-normal text-text-secondary hover:text-text-brand hover:underline',
        hover:   'font-normal text-text-brand underline',
        current: 'font-medium text-text-primary',
      },
      size: {
        '12px': 'text-xs leading-4',
        '14px': 'text-sm leading-4.5',
        '16px': 'text-md leading-5.5',
      },
    },
    defaultVariants: {
      state: 'default',
      size: '14px',
    },
  },
);

export type BreadcrumbState = 'default' | 'hover' | 'current';

export interface BreadcrumbItemProps extends VariantProps<typeof breadcrumbItemVariants> {
  label: string;
  href?: string;
  state?: BreadcrumbState;
  size?: '12px' | '14px' | '16px';
  onClick?: () => void;
  className?: string;
}

export function BreadcrumbItem({ label, href, state = 'default', size, onClick, className }: BreadcrumbItemProps) {
  const textClass = cn(breadcrumbItemVariants({ state, size }), className);

  if (state === 'current') {
    return (
      <span aria-current="page" className={textClass}>
        {label}
      </span>
    );
  }

  if (href) {
    return (
      <a href={href} className={textClass} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <span
      className={textClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  );
}

export interface BreadcrumbProps {
  children: React.ReactNode;
  'aria-label'?: string;
  className?: string;
  separatorSize?: '12px' | '14px';
  gap?: '0.5' | '1' | '1.5' | '2';
}

export function Breadcrumb({
  children,
  'aria-label': ariaLabel = 'Breadcrumb',
  className,
  separatorSize = '12px',
  gap = '0.5',
}: BreadcrumbProps) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<BreadcrumbItemProps> =>
      isValidElement(child) && child.type === BreadcrumbItem,
  );

  const gapClass = {
    '0.5': 'gap-0.5',
    '1': 'gap-1',
    '1.5': 'gap-1.5',
    '2': 'gap-2',
  }[gap];

  return (
    <nav aria-label={ariaLabel}>
      <ol className={cn('inline-flex items-center', gapClass, className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const child = isLast
            ? React.cloneElement(item, { state: item.props.state ?? 'current' })
            : item;

          return (
            <React.Fragment key={index}>
              <li className="inline-flex items-center">{child}</li>
              {!isLast && (
                <li aria-hidden="true" className="inline-flex items-center">
                  <ChevronRightIcon aria-hidden="true" className={cn("text-text-secondary", separatorSize === '14px' ? "size-3.5" : "size-3")} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
