import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/main_components/Checkbox';
import { Badge, type BadgeColor, type BadgeVariant } from '@/components/ui/main_components/Badge';
import { ToggleButton } from '@/components/ui/main_components/ToggleButton';
import { Tooltip } from '@/components/ui/main_components/Tooltip';
import { Button } from '@/components/ui/main_components/Button';
import { Input } from '@/components/ui/main_components/Input';
import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { DotsVerticalIcon } from '@/assets/icons/DotsVerticalIcon';
import { DotsHorizontalIcon } from '@/assets/icons/DotsHorizontalIcon';
import { InfoCircleOutlineIcon } from '@/assets/icons/InfoCircleOutlineIcon';

/* ─────────────────────────────────────────────────────────── */
/*  TableHeaderCell                                            */
/* ─────────────────────────────────────────────────────────── */

export interface TableHeaderCellProps {
  label: string;
  showCheckbox?: boolean;
  checkboxChecked?: boolean;
  checkboxIndeterminate?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  sort?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: (dir: 'asc' | 'desc' | null) => void;
  height?: number;
  className?: string;
}

export function TableHeaderCell({
  label,
  showCheckbox = false,
  checkboxChecked = false,
  checkboxIndeterminate = false,
  onCheckboxChange,
  sort = false,
  sortDirection = null,
  onSort,
  height,
  className,
}: TableHeaderCellProps) {
  function cycleSortDirection() {
    if (!onSort) return;
    if (sortDirection === null) onSort('asc');
    else if (sortDirection === 'asc') onSort('desc');
    else onSort(null);
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5',
        height ? '' : 'py-2.5',
        'bg-bg-gray-light border-b border-border-gray-light font-inter',
        className,
      )}
      style={height ? { height: `${height}px` } : undefined}
    >
      {showCheckbox && (
        <div className="flex-shrink-0 flex items-center">
          <Checkbox
            checked={checkboxChecked}
            indeterminate={checkboxIndeterminate}
            onChange={onCheckboxChange}
          />
        </div>
      )}

      <div className="flex flex-1 items-center gap-1.5 h-5 min-w-0">
        <span className="text-xs font-medium leading-4 text-text-secondary whitespace-nowrap">
          {label}
        </span>

        {sort && (
          <button
            type="button"
            onClick={cycleSortDirection}
            className="flex items-center p-0 bg-transparent border-0 cursor-pointer"
            aria-label={`Sort by ${label}`}
          >
            {sortDirection === null && (
              <div className="flex flex-col items-center gap-[1px] opacity-50">
                <ArrowUpIcon aria-hidden="true" className="size-2.5 text-text-secondary" />
                <ArrowDownIcon aria-hidden="true" className="size-2.5 text-text-secondary" />
              </div>
            )}
            {sortDirection === 'asc' && (
              <ArrowUpIcon aria-hidden="true" className="size-3.5 text-text-brand" />
            )}
            {sortDirection === 'desc' && (
              <ArrowDownIcon aria-hidden="true" className="size-3.5 text-text-brand" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  TableCell                                                  */
/* ─────────────────────────────────────────────────────────── */

export type TableCellType = 'two-line' | 'edit-cell' | 'action' | 'status' | 'tooltip' | 'default' | 'toggle';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
}

export interface TableCellProps {
  type?: TableCellType;
  /* default */
  avatar?: boolean;
  avatarSrc?: string;
  checkbox?: boolean;
  /* action */
  edit?: boolean;
  button1?: boolean;
  button2?: boolean;
  delete?: boolean;
  more?: boolean;
  /* status */
  badges?: BadgeProps[];
  /* text */
  primaryText?: string;
  secondaryText?: string;
  /* tooltip */
  showTooltip?: boolean;
  height?: number;
  className?: string;
}

const BASE_CELL = 'flex px-5 py-0 bg-bg-white border-b border-border-gray-light font-inter';
const DEFAULT_ROW_HEIGHT = 60;

export function TableCell({
  type = 'default',
  avatar = true,
  avatarSrc,
  checkbox = true,
  edit = true,
  button1 = true,
  button2 = true,
  delete: showDelete = true,
  more = true,
  badges = [],
  primaryText = 'Cell content',
  secondaryText = 'Secondary text',
  showTooltip = false,
  height,
  className,
}: TableCellProps) {
  const cellHeight = height ?? DEFAULT_ROW_HEIGHT;

  if (type === 'two-line') {
    return (
      <div className={cn(BASE_CELL, 'flex-col items-start justify-center gap-0.5 whitespace-nowrap', className)} style={{ height: `${cellHeight}px` }}>
        <span className="text-sm font-medium leading-4.5 text-text-primary truncate w-full">{primaryText}</span>
        <span className="text-xs font-medium leading-4 text-text-secondary truncate w-full">{secondaryText}</span>
      </div>
    );
  }

  if (type === 'default') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        {checkbox && <div className="flex-shrink-0"><Checkbox /></div>}
        {avatar && (
          <div className="size-9 rounded-full overflow-hidden flex-shrink-0 bg-bg-gray-light flex items-center justify-center">
            {avatarSrc
              ? <img src={avatarSrc} alt="" className="size-9 object-cover" />
              : <span className="text-xs font-medium text-text-secondary">AV</span>
            }
          </div>
        )}
        <span className="flex-1 min-w-0 text-sm font-medium leading-4.5 text-text-primary truncate">{primaryText}</span>
      </div>
    );
  }

  if (type === 'action') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        {edit && (
          <Button variant="bordered" size="sm" aria-label="Edit">
            <EditIcon aria-hidden="true" className="size-4" />
          </Button>
        )}
        {button1 && <Button variant="bordered" size="sm">Button</Button>}
        {button2 && <Button variant="bordered" size="sm">Button</Button>}
        {showDelete && (
          <Button variant="bordered" size="sm" aria-label="Delete">
            <TrashIcon aria-hidden="true" className="size-4" />
          </Button>
        )}
        {more && (
          <Button variant="bordered" size="sm" aria-label="More options">
            <DotsVerticalIcon aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
    );
  }

  if (type === 'status') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        <div className="flex items-center gap-1 h-7">
          {badges.length > 0
            ? badges.map((b, i) => (
                <Badge key={i} variant={b.variant ?? 'filled'} color={b.color ?? 'primary'} label={b.label} />
              ))
            : <Badge variant="filled" color="primary" label="Active" />
          }
        </div>
      </div>
    );
  }

  if (type === 'edit-cell') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        <div className="flex-1 min-w-0">
          <Input placeholder="Text" />
        </div>
      </div>
    );
  }

  if (type === 'tooltip') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        <div className="flex-1 min-w-0 flex items-center">
          <span className="text-sm font-medium leading-4.5 text-text-primary truncate">{primaryText}</span>
        </div>
        <Tooltip
          heading="More info"
          caption="Additional details about this cell."
          placement="bottom-end"
        >
          <button type="button" className="flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer text-text-secondary" aria-label="More info">
            <InfoCircleOutlineIcon aria-hidden="true" className="size-4" />
          </button>
        </Tooltip>
      </div>
    );
  }

  if (type === 'toggle') {
    return (
      <div className={cn(BASE_CELL, 'items-center gap-3', className)} style={{ height: `${cellHeight}px` }}>
        <ToggleButton defaultChecked />
      </div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────────────────── */
/*  PaginationButton                                           */
/* ─────────────────────────────────────────────────────────── */

type PaginationVariant = 'page' | 'active' | 'ellipsis' | 'prev' | 'next';

interface PaginationButtonProps {
  variant?: PaginationVariant;
  label: string | number;
  onClick?: () => void;
  disabled?: boolean;
}

function PaginationButton({ variant = 'page', label, onClick, disabled }: PaginationButtonProps) {
  const base = 'size-8.5 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center';

  const variantCls = {
    page:     'bg-bg-white',
    active:   'bg-bg-brand',
    ellipsis: 'bg-bg-white',
    prev:     'bg-bg-white border border-border-gray-light',
    next:     'bg-bg-white border border-border-gray-light',
  }[variant];

  const isDisabled = disabled || variant === 'ellipsis';

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={variant === 'prev' ? 'Previous page' : variant === 'next' ? 'Next page' : undefined}
      aria-current={variant === 'active' ? 'page' : undefined}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={cn(
        base,
        variantCls,
        isDisabled && variant !== 'active' && 'opacity-40 pointer-events-none',
        !isDisabled && variant !== 'active' && 'cursor-pointer hover:bg-bg-gray-light',
      )}
    >
      {variant === 'prev' && <ArrowLeftIcon aria-hidden="true" className="size-5" />}
      {variant === 'next' && <ArrowRightIcon aria-hidden="true" className="size-5" />}
      {variant === 'ellipsis' && <DotsHorizontalIcon aria-hidden="true" className="size-4 text-text-secondary" />}
      {(variant === 'page' || variant === 'active') && (
        <span className={cn('text-sm font-medium leading-4.5 text-center whitespace-nowrap', variant === 'active' ? 'text-text-white' : 'text-text-primary')}>
          {label}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Pagination                                                 */
/* ─────────────────────────────────────────────────────────── */

export interface PaginationProps {
  total: number;
  page?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showRowsPerPage?: boolean;
  className?: string;
}

function buildPageSequence(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | 'ellipsis')[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push('ellipsis');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('ellipsis');
  pages.push(total);

  return pages;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export function Pagination({
  total,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  showRowsPerPage = true,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const sequence = buildPageSequence(page, totalPages);
  let ellipsisCount = 0;

  return (
    <div className={cn('flex items-center justify-center gap-6 px-5 py-3 bg-bg-white border-t border-border-gray-light w-full font-inter', className)}>
      <div className="flex flex-1 items-center gap-1 min-w-0 whitespace-nowrap text-sm leading-4.5">
        <span className="font-medium text-text-primary">Total Rows:</span>
        <span className="font-semibold text-text-primary">{total}</span>
      </div>

      {showRowsPerPage && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-medium leading-4.5 text-text-primary whitespace-nowrap">Rows per page</span>
          <div className="flex items-center gap-2 px-3 py-2 w-20 bg-bg-white border border-border-gray-light rounded-lg overflow-hidden shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <select
              value={pageSize}
              onChange={e => onPageSizeChange?.(Number(e.target.value))}
              className="flex-1 text-sm font-medium leading-4.5 text-text-primary min-w-0 bg-transparent border-0 outline-none appearance-none cursor-pointer"
            >
              {PAGE_SIZE_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ArrowDownIcon aria-hidden="true" className="size-5 flex-shrink-0 text-text-secondary pointer-events-none" />
          </div>
        </div>
      )}

      <nav aria-label="Pagination" className="flex items-center gap-2 flex-shrink-0">
        <PaginationButton variant="prev" label="prev" disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
        {sequence.map(item => {
          if (item === 'ellipsis') {
            ellipsisCount++;
            return <PaginationButton key={`ellipsis-${ellipsisCount}`} variant="ellipsis" label="…" />;
          }
          return (
            <PaginationButton
              key={item}
              variant={item === page ? 'active' : 'page'}
              label={item}
              onClick={() => onPageChange(item)}
            />
          );
        })}
        <PaginationButton variant="next" label="next" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} />
      </nav>
    </div>
  );
}
