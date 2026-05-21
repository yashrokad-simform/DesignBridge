import React, { Children, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon';

const breadcrumbItemVariants = cva(
  'text-xs leading-4 whitespace-nowrap transition-colors',
  {
    variants: {
      state: {
        default: 'font-normal text-text-secondary hover:text-text-brand hover:underline',
        hover:   'font-normal text-text-brand underline',
        current: 'font-medium text-text-primary',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

export type BreadcrumbState = 'default' | 'hover' | 'current';

export interface BreadcrumbItemProps extends VariantProps<typeof breadcrumbItemVariants> {
  label: string;
  href?: string;
  state?: BreadcrumbState;
  onClick?: () => void;
  className?: string;
}

export function BreadcrumbItem({ label, href, state = 'default', onClick, className }: BreadcrumbItemProps) {
  const textClass = cn(breadcrumbItemVariants({ state }), className);

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
}

export function Breadcrumb({
  children,
  'aria-label': ariaLabel = 'Breadcrumb',
  className,
}: BreadcrumbProps) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<BreadcrumbItemProps> =>
      isValidElement(child) && child.type === BreadcrumbItem,
  );

  return (
    <nav aria-label={ariaLabel}>
      <ol className={cn('inline-flex items-center gap-0.5', className)}>
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
                  <ArrowRightIcon aria-hidden="true" className="size-3 text-text-secondary" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
