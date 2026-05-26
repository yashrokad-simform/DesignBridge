import React, { useMemo, useState } from 'react';
import {
  TableHeaderCell,
  TableCell,
  Pagination,
} from '../../../components/ui/main_components/Table';
import { Checkbox }       from '../../../components/ui/main_components/Checkbox';
import { Button }         from '../../../components/ui/main_components/Button';
import { Badge }          from '../../../components/ui/main_components/Badge';
import { ToggleButton }   from '../../../components/ui/main_components/ToggleButton';
import { EditIcon }       from '../../../assets/icons/EditIcon';
import { TrashIcon }      from '../../../assets/icons/TrashIcon';
import { ArrowUpIcon }    from '../../../assets/icons/ArrowUpIcon';
import { ArrowDownIcon }  from '../../../assets/icons/ArrowDownIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tableMd from '../md_files/table-instruction.md?raw';
import { cn } from '../../../lib/utils';

/* ── Controls ────────────────────────────────────────────── */

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Appearance', type: 'divider' },
  { key: 'headerHeight', label: 'Header Height (px)', type: 'number', min: 36, max: 64, step: 2 },
  { key: 'rowHeight',    label: 'Row Height (px)',    type: 'number', min: 48, max: 88, step: 4 },
  { key: 'div1', label: 'Pagination', type: 'divider' },
  { key: 'showRowsPerPage', label: 'Rows per Page', type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  headerHeight:    40,
  rowHeight:       60,
  showRowsPerPage: true,
};

/* ── Showcase data ───────────────────────────────────────── */

const VENDOR_ROWS = [
  { id: 1, vendor: 'Apex Logistics Inc.',  contact: 'Sarah Mitchell', email: 'sarah@apexlogistics.com',    active: true  },
  { id: 2, vendor: 'Horizon Freight Co.',  contact: 'Marcus Chen',    email: 'm.chen@horizonfreight.io',   active: true  },
  { id: 3, vendor: 'BlueWave Shipping',    contact: 'Priya Sharma',   email: 'priya.s@bluewaveships.com',  active: false },
  { id: 4, vendor: 'NorthStar Carriers',   contact: 'David Torres',   email: 'd.torres@northstar.net',     active: true  },
];

const CELL_CLS = 'flex px-5 py-0 bg-bg-white font-inter items-center';
const HEADER_CLS = 'flex items-center bg-bg-gray-light font-inter';

/* ── Shared header strip ─────────────────────────────────── */

function HeaderStrip({
  withCheckbox,
  withSort,
  height,
}: {
  withCheckbox: boolean;
  withSort: boolean;
  height: number;
}) {
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

  function cycleSortDirection() {
    setSortDir(d => d === null ? 'asc' : d === 'asc' ? 'desc' : null);
  }

  return (
    <div className="flex rounded-xl overflow-hidden border border-border-gray-light">
      {withCheckbox && (
        <div className="flex-shrink-0 w-14">
          <TableHeaderCell label="" showCheckbox height={height} />
        </div>
      )}
      <div className="flex-1 min-w-[160px]">
        <TableHeaderCell label="Vendor Name" sort={withSort} sortDirection={sortDir} onSort={withSort ? setSortDir : undefined} height={height} />
      </div>
      <div className="w-[150px] flex-shrink-0">
        <TableHeaderCell label="Contact Person" sort={withSort} height={height} />
      </div>
      <div className="w-[130px] flex-shrink-0">
        <TableHeaderCell label="Status" height={height} />
      </div>
      <div className="w-[110px] flex-shrink-0">
        <TableHeaderCell label="Actions" height={height} />
      </div>
    </div>
  );
}

/* ── Row variants strip ──────────────────────────────────── */

const ROW_TYPES = [
  { type: 'default'   as const, label: 'Default'   },
  { type: 'two-line'  as const, label: 'Two Line'  },
  { type: 'status'    as const, label: 'Status'    },
  { type: 'toggle'    as const, label: 'Toggle'    },
  { type: 'tooltip'   as const, label: 'Tooltip'   },
  { type: 'action'    as const, label: 'Action'    },
  { type: 'edit-cell' as const, label: 'Edit Cell' },
];

function RowVariantsDemo({ height }: { height: number }) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border-gray-light">
      {/* Header */}
      <div className="flex">
        {ROW_TYPES.map(({ label }) => (
          <div key={label} className="flex-1 min-w-0">
            <TableHeaderCell label={label} height={height} />
          </div>
        ))}
      </div>
      {/* One demo row */}
      <div className="flex">
        {ROW_TYPES.map(({ type }) => (
          <div key={type} className="flex-1 min-w-0">
            <TableCell
              type={type}
              height={height}
              primaryText="Sample"
              secondaryText="Subtitle"
              badges={[{ label: 'Active', variant: 'filled', color: 'success' }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Full showcase table ─────────────────────────────────── */

function ShowcaseTable({ headerHeight, rowHeight, showRowsPerPage }: { headerHeight: number; rowHeight: number; showRowsPerPage: boolean }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [sortDir,     setSortDir]     = useState<'asc' | 'desc' | null>(null);
  const [activeRows,  setActiveRows]  = useState<Record<number, boolean>>(
    Object.fromEntries(VENDOR_ROWS.map(r => [r.id, r.active])),
  );
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allSelected  = selectedIds.size === VENDOR_ROWS.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  function toggleHeader() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(VENDOR_ROWS.map(r => r.id)));
    }
  }

  function toggleRow(id: number) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function cycleSortDir() {
    setSortDir(d => d === null ? 'asc' : d === 'asc' ? 'desc' : null);
  }

  const sortedRows = useMemo(() => {
    if (!sortDir) return VENDOR_ROWS;
    return [...VENDOR_ROWS].sort((a, b) => {
      const cmp = a.vendor.localeCompare(b.vendor);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [sortDir]);

  const BORDER_B = 'border-b border-border-gray-light';

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border-gray-light">
      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          {/* Header */}
          <div className={cn(HEADER_CLS, BORDER_B)} style={{ height: `${headerHeight}px` }}>
            {/* Checkbox col */}
            <div className="flex-shrink-0 w-14 flex items-center justify-center px-4">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={toggleHeader}
              />
            </div>
            {/* Vendor Name */}
            <div className="flex-1 min-w-[200px] flex items-center gap-1.5 px-4">
              <span className="text-xs font-medium text-text-secondary">Vendor Name</span>
              <button
                type="button"
                onClick={cycleSortDir}
                className="p-0 bg-transparent border-0 cursor-pointer"
                aria-label="Sort by Vendor Name"
              >
                {sortDir === null && (
                  <div className="flex flex-col items-center gap-[1px] opacity-50">
                    <ArrowUpIcon   aria-hidden="true" className="size-2.5 text-text-secondary" />
                    <ArrowDownIcon aria-hidden="true" className="size-2.5 text-text-secondary" />
                  </div>
                )}
                {sortDir === 'asc'  && <ArrowUpIcon   aria-hidden="true" className="size-3.5 text-text-brand" />}
                {sortDir === 'desc' && <ArrowDownIcon aria-hidden="true" className="size-3.5 text-text-brand" />}
              </button>
            </div>
            {/* Contact Person */}
            <div className="flex-shrink-0 w-[160px] flex items-center px-4">
              <span className="text-xs font-medium text-text-secondary">Contact Person</span>
            </div>
            {/* Contact Email */}
            <div className="flex-shrink-0 w-[220px] flex items-center px-4">
              <span className="text-xs font-medium text-text-secondary">Contact Email</span>
            </div>
            {/* Status */}
            <div className="flex-shrink-0 w-[100px] flex items-center px-4">
              <span className="text-xs font-medium text-text-secondary">Status</span>
            </div>
            {/* Actions */}
            <div className="flex-shrink-0 w-[110px] flex items-center px-4">
              <span className="text-xs font-medium text-text-secondary">Actions</span>
            </div>
          </div>

          {/* Rows */}
          {sortedRows.map((row, idx) => {
            const isLast = idx === sortedRows.length - 1;
            return (
              <div
                key={row.id}
                className={cn(CELL_CLS, !isLast && BORDER_B)}
                style={{ height: `${rowHeight}px` }}
              >
                {/* Checkbox */}
                <div className="flex-shrink-0 w-14 flex items-center justify-center px-4">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onChange={checked => {
                      if (checked) {
                        setSelectedIds(prev => new Set([...prev, row.id]));
                      } else {
                        setSelectedIds(prev => { const n = new Set(prev); n.delete(row.id); return n; });
                      }
                    }}
                  />
                </div>
                {/* Vendor Name */}
                <div className="flex-1 min-w-[200px] flex items-center px-4">
                  <span className="text-sm font-medium text-text-primary truncate">{row.vendor}</span>
                </div>
                {/* Contact Person */}
                <div className="flex-shrink-0 w-[160px] flex items-center px-4">
                  <span className="text-sm font-medium text-text-primary truncate">{row.contact}</span>
                </div>
                {/* Contact Email */}
                <div className="flex-shrink-0 w-[220px] flex items-center px-4">
                  <span className="text-sm font-medium text-text-secondary truncate">{row.email}</span>
                </div>
                {/* Status toggle */}
                <div className="flex-shrink-0 w-[100px] flex items-center px-4">
                  <ToggleButton
                    checked={activeRows[row.id]}
                    onChange={checked => setActiveRows(prev => ({ ...prev, [row.id]: checked }))}
                  />
                </div>
                {/* Actions */}
                <div className="flex-shrink-0 w-[110px] flex items-center gap-2 px-4">
                  <Button variant="icon-secondary" size="sm" aria-label="Edit">
                    <EditIcon aria-hidden="true" className="size-4" />
                  </Button>
                  <Button variant="critical-bordered" size="sm" aria-label="Delete">
                    <TrashIcon aria-hidden="true" className="size-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        total={VENDOR_ROWS.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={s => { setPageSize(s); setPage(1); }}
        showRowsPerPage={showRowsPerPage}
      />
    </div>
  );
}

/* ── buildVariants ───────────────────────────────────────── */

function buildVariants(vals: InputValues): VariantGroup[] {
  const headerHeight     = (vals.headerHeight    as number)  ?? 40;
  const rowHeight        = (vals.rowHeight        as number)  ?? 60;
  const showRowsPerPage  = (vals.showRowsPerPage  as boolean) ?? true;

  return [
    /* ── 1. Header Variants ── */
    {
      id: 'header-variants',
      label: 'Header',
      dotColor: '#0056b8',
      styles: [
        {
          id: 'hv-checkbox-sort',
          label: 'Checkbox + Sort',
          accentColor: '#0056b8',
          rows: [{ cells: [{ label: '', node: <div className="w-full"><HeaderStrip withCheckbox withSort height={headerHeight} /></div> }] }],
        },
        {
          id: 'hv-sort',
          label: 'Sort Only',
          accentColor: '#0056b8',
          rows: [{ cells: [{ label: '', node: <div className="w-full"><HeaderStrip withCheckbox={false} withSort height={headerHeight} /></div> }] }],
        },
        {
          id: 'hv-plain',
          label: 'Plain',
          accentColor: '#0056b8',
          rows: [{ cells: [{ label: '', node: <div className="w-full"><HeaderStrip withCheckbox={false} withSort={false} height={headerHeight} /></div> }] }],
        },
      ],
    },

    /* ── 2. Row Variants ── */
    {
      id: 'row-variants',
      label: 'Row',
      dotColor: '#c65910',
      styles: [
        {
          id: 'rv-all',
          label: 'All Cell Types',
          accentColor: '#c65910',
          rows: [{ cells: [{ label: '', node: <div className="w-full"><RowVariantsDemo height={rowHeight} /></div> }] }],
        },
      ],
    },

    /* ── 3. Pagination ── */
    {
      id: 'pagination',
      label: 'Pagination',
      dotColor: '#036821',
      styles: [
        {
          id: 'pag-demo',
          label: 'Component',
          accentColor: '#036821',
          rows: [{
            cells: [{
              label: '',
              node: (
                <div className="w-full rounded-xl overflow-hidden border border-border-gray-light">
                  <PaginationDemo showRowsPerPage={showRowsPerPage} />
                </div>
              ),
            }],
          }],
        },
      ],
    },

    /* ── 4. Full Table Showcase ── */
    {
      id: 'table-showcase',
      label: 'Table Showcase',
      dotColor: '#29384d',
      hideDivider: true,
      styles: [
        {
          id: 'showcase-full',
          label: '',
          accentColor: '#29384d',
          rows: [{
            cells: [{
              label: '',
              node: (
                <div className="w-full">
                  <ShowcaseTable headerHeight={headerHeight} rowHeight={rowHeight} showRowsPerPage={showRowsPerPage} />
                </div>
              ),
            }],
          }],
        },
      ],
    },
  ];
}

function PaginationDemo({ showRowsPerPage }: { showRowsPerPage: boolean }) {
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Pagination
      total={340}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={s => { setPageSize(s); setPage(1); }}
      showRowsPerPage={showRowsPerPage}
    />
  );
}

function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── Page ───────────────────────────────────────────────── */

export default function TablePage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={tableMd}
      markdownFileName="table"
      resolveTokens={resolveTokens}
    />
  );
}
