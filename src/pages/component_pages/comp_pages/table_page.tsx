import { useMemo, useState } from 'react';
import {
  TableHeaderCell,
  TableCell,
  Pagination,
} from '../../../components/ui/main_components/Table';
import { Button }         from '../../../components/ui/main_components/Button';
import { ToggleButton }   from '../../../components/ui/main_components/ToggleButton';
import { EditIcon }       from '../../../assets/icons/EditIcon';
import { TrashIcon }      from '../../../assets/icons/TrashIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tableMd from '../md_files/table-instruction.md?raw';
import tableFigmaMd from '../figma_prompt/table-prompt.md?raw';
import { cn } from '../../../lib/utils';

/* ── Controls ────────────────────────────────────────────── */

const ROW_VARIANT_TOGGLES: { key: string; label: string; type: 'default' | 'two-line' | 'status' | 'toggle' | 'tooltip' | 'action' | 'edit-cell' }[] = [
  { key: 'row_default',  label: 'Default',   type: 'default'   },
  { key: 'row_twoLine',  label: 'Two Line',  type: 'two-line'  },
  { key: 'row_status',   label: 'Status',    type: 'status'    },
  { key: 'row_toggle',   label: 'Toggle',    type: 'toggle'    },
  { key: 'row_tooltip',  label: 'Tooltip',   type: 'tooltip'   },
  { key: 'row_action',   label: 'Action',    type: 'action'    },
  { key: 'row_editCell', label: 'Edit Cell', type: 'edit-cell' },
];

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Row Variants', type: 'divider' },
  ...ROW_VARIANT_TOGGLES.map(r => ({ key: r.key, label: r.label, type: 'toggle' as const })),
  { key: 'div1', label: 'Pagination', type: 'divider' },
  { key: 'showRowsPerPage', label: 'Rows per Page', type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  headerHeight:    40,
  rowHeight:       60,
  showRowsPerPage: true,
  row_default:  true,
  row_twoLine:  true,
  row_status:   true,
  row_toggle:   true,
  row_tooltip:  true,
  row_action:   true,
  row_editCell: true,
};

/* ── Showcase data ───────────────────────────────────────── */

const VENDOR_ROWS = [
  { id: 1, vendor: 'Apex Logistics Inc.',  contact: 'Sarah Mitchell', email: 'sarah@apexlogistics.com',    active: true  },
  { id: 2, vendor: 'Horizon Freight Co.',  contact: 'Marcus Chen',    email: 'm.chen@horizonfreight.io',   active: true  },
  { id: 3, vendor: 'BlueWave Shipping',    contact: 'Priya Sharma',   email: 'priya.s@bluewaveships.com',  active: false },
  { id: 4, vendor: 'NorthStar Carriers',   contact: 'David Torres',   email: 'd.torres@northstar.net',     active: true  },
];

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
  const [vendorSort, setVendorSort] = useState<'asc' | 'desc' | null>(null);
  const [contactSort, setContactSort] = useState<'asc' | 'desc' | null>(null);
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex overflow-hidden">
      <div className="flex-1 min-w-[160px]">
        <TableHeaderCell
          label="Vendor Name"
          showCheckbox={withCheckbox}
          checkboxChecked={checked}
          onCheckboxChange={setChecked}
          sort={withSort}
          sortDirection={vendorSort}
          onSort={withSort ? setVendorSort : undefined}
          height={height}
        />
      </div>
      <div className="w-[150px] flex-shrink-0">
        <TableHeaderCell
          label="Contact Person"
          sort={withSort}
          sortDirection={contactSort}
          onSort={withSort ? setContactSort : undefined}
          height={height}
        />
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

/* ── Full showcase table ─────────────────────────────────── */

const COL_CELL = 'flex items-center px-5 bg-bg-primary font-inter';
const BORDER_B = 'border-b border-border-primary';

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
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(VENDOR_ROWS.map(r => r.id)));
  }

  function toggleRow(id: number, checked: boolean) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  }

  const sortedRows = useMemo(() => {
    if (!sortDir) return VENDOR_ROWS;
    return [...VENDOR_ROWS].sort((a, b) => {
      const cmp = a.vendor.localeCompare(b.vendor);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [sortDir]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border-primary">
      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          {/* Header */}
          <div className="flex">
            <div className="flex-1 min-w-[200px]">
              <TableHeaderCell
                showCheckbox
                checkboxChecked={allSelected}
                checkboxIndeterminate={someSelected}
                onCheckboxChange={toggleHeader}
                label="Vendor Name"
                sort
                sortDirection={sortDir}
                onSort={setSortDir}
                height={headerHeight}
              />
            </div>
            <div className="w-[160px] flex-shrink-0">
              <TableHeaderCell label="Contact Person" height={headerHeight} />
            </div>
            <div className="w-[220px] flex-shrink-0">
              <TableHeaderCell label="Contact Email" height={headerHeight} />
            </div>
            <div className="w-[100px] flex-shrink-0">
              <TableHeaderCell label="Status" height={headerHeight} />
            </div>
            <div className="w-[120px] flex-shrink-0">
              <TableHeaderCell label="Actions" height={headerHeight} />
            </div>
          </div>

          {/* Rows */}
          {sortedRows.map((row, idx) => {
            const isLast = idx === sortedRows.length - 1;
            const borderCls = !isLast ? BORDER_B : '';
            return (
              <div key={row.id} className="flex bg-bg-primary font-inter">
                {/* Vendor Name — checkbox built into TableCell */}
                <div className="flex-1 min-w-[200px]">
                  <TableCell
                    type="default"
                    checkbox
                    checkboxChecked={selectedIds.has(row.id)}
                    onCheckboxChange={(checked) => toggleRow(row.id, checked)}
                    avatar={false}
                    primaryText={row.vendor}
                    height={rowHeight}
                    className={isLast ? 'border-b-0' : ''}
                  />
                </div>
                <div className={cn(COL_CELL, 'w-[160px] flex-shrink-0', borderCls)} style={{ height: `${rowHeight}px` }}>
                  <span className="text-sm font-medium text-text-primary truncate">{row.contact}</span>
                </div>
                <div className={cn(COL_CELL, 'w-[220px] flex-shrink-0', borderCls)} style={{ height: `${rowHeight}px` }}>
                  <span className="text-sm font-medium text-text-secondary truncate">{row.email}</span>
                </div>
                <div className={cn(COL_CELL, 'w-[100px] flex-shrink-0', borderCls)} style={{ height: `${rowHeight}px` }}>
                  <ToggleButton
                    checked={activeRows[row.id]}
                    onChange={checked => setActiveRows(prev => ({ ...prev, [row.id]: checked }))}
                  />
                </div>
                <div className={cn('flex items-center gap-2 px-5 w-[120px] flex-shrink-0 bg-bg-primary font-inter', borderCls)} style={{ height: `${rowHeight}px` }}>
                  <div className="flex-shrink-0">
                    <Button variant="icon-secondary" size="sm" aria-label="Edit">
                      <EditIcon aria-hidden="true" className="size-4" />
                    </Button>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="icon-secondary" size="sm" aria-label="Delete">
                      <TrashIcon aria-hidden="true" className="size-4 text-btn-text-critical" />
                    </Button>
                  </div>
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

  const rowVariantCells = [
    { key: 'row_default',  label: 'Default',   node: <TableCell type="default"   primaryText="Sample content" /> },
    { key: 'row_twoLine',  label: 'Two Line',  node: <TableCell type="two-line"  primaryText="Sample content" secondaryText="Subtitle text" /> },
    { key: 'row_status',   label: 'Status',    node: <TableCell type="status"    badges={[{ label: 'Active', variant: 'filled', color: 'success' }]} /> },
    { key: 'row_toggle',   label: 'Toggle',    node: <TableCell type="toggle" /> },
    { key: 'row_tooltip',  label: 'Tooltip',   node: <TableCell type="tooltip"   primaryText="Sample content" /> },
    { key: 'row_action',   label: 'Action',    node: <TableCell type="action"    button2={false} /> },
    { key: 'row_editCell', label: 'Edit Cell', node: <TableCell type="edit-cell" /> },
  ].filter(c => (vals[c.key] as boolean) !== false).map(({ label, node }) => ({ label, node }));

  return [
    /* ── 1. Header Variants ── */
    {
      id: 'header-variants',
      label: 'Header',
      dotColor: '#0056b8',
      styles: [
        {
          id: 'hv-checkbox-sort',
          label: '',
          accentColor: '#0056b8',
          rows: [{ cells: [{ label: '', node: <div className="w-full"><HeaderStrip withCheckbox withSort height={headerHeight} /></div> }] }],
        },
      ],
    },

    /* ── 2. Row Variants ── */
    {
      id: 'row-variants',
      label: 'Row',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'rv-all',
          label: '',
          accentColor: '',
          rows: [{ cells: rowVariantCells }],
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
          label: '',
          accentColor: '#036821',
          rows: [{
            cells: [{
              label: '',
              node: (
                <div className="w-full">
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

const TYPE_MAP: Record<string, { marker: string; label: string }> = {
  row_twoLine:  { marker: 'TWO_LINE',  label: 'Two line'  },
  row_status:   { marker: 'STATUS',    label: 'Status'    },
  row_toggle:   { marker: 'TOGGLE',    label: 'Toggle'    },
  row_tooltip:  { marker: 'TOOLTIP',   label: 'Tooltip'   },
  row_action:   { marker: 'ACTION',    label: 'Action'    },
  row_editCell: { marker: 'EDIT_CELL', label: 'Edit Cell' },
  row_default:  { marker: 'DEFAULT',   label: 'Default'   },
};

function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const disabled = Object.entries(TYPE_MAP).filter(([key]) => vals[key] === false);
  const enabledCount = Object.keys(TYPE_MAP).length - disabled.length;

  // Strip/unwrap type marker blocks
  for (const [, { marker }] of Object.entries(TYPE_MAP)) {
    const isDisabled = vals[ROW_VARIANT_TOGGLES.find(r => TYPE_MAP[r.key]?.marker === marker)?.key ?? ''] === false;
    if (isDisabled) {
      md = md.replace(new RegExp(`<!-- IF_${marker} -->\\n[\\s\\S]*?<!-- \\/${marker} -->\\n`, 'g'), '');
    } else {
      md = md.replace(new RegExp(`<!-- IF_${marker} -->\\n`, 'g'), '');
      md = md.replace(new RegExp(`<!-- \\/${marker} -->\\n`, 'g'), '');
    }
  }

  // Remove disabled type labels from the Type variant options cell
  for (const [, { label }] of disabled) {
    md = md.replace(new RegExp(`\`${label}\` · `, 'g'), '');
    md = md.replace(new RegExp(` · \`${label}\``, 'g'), '');
    md = md.replace(new RegExp(`\`${label}\`, `, 'g'), '');
    md = md.replace(new RegExp(`, \`${label}\``, 'g'), '');
    md = md.replace(new RegExp(`\`${label}\``, 'g'), '');
  }

  // Update variant count
  if (enabledCount !== 7) {
    md = md.replace(/\b7 type variants\b/g, `${enabledCount} type variant${enabledCount === 1 ? '' : 's'}`);
    md = md.replace(/\b7\b(\s+(?:type )?variants?)/g, `${enabledCount}$1`);
    md = md.replace(/Select all 7 type variants/g, `Select all ${enabledCount} type variant${enabledCount === 1 ? '' : 's'}`);
  }

  // Rows per page
  const showRowsPerPage = vals.showRowsPerPage as boolean;
  if (!showRowsPerPage) {
    md = md.replace(/<!-- IF_ROWS_PER_PAGE -->\n[\s\S]*?<!-- \/IF_ROWS_PER_PAGE -->\n/g, '');
    // Remove the No. Rows frame from within the Pagination code block (lines starting with │ that mention No. Rows / Input)
    md = md.replace(/^[ \t]*│[ \t]*├── No\. Rows[^\n]*\n([ \t]*│[^\n]*\n)*/gm, '');
  } else {
    md = md.replace(/<!-- IF_ROWS_PER_PAGE -->\n/g, '').replace(/<!-- \/IF_ROWS_PER_PAGE -->\n/g, '');
  }

  return md;
}

function stripSection(src: string, headingPrefix: string): string {
  const startIdx = src.indexOf(headingPrefix);
  if (startIdx === -1) return src;
  const remainder = src.slice(startIdx);
  // First, look for the next heading of equal or higher level
  const headingLevel = (headingPrefix.match(/^#+/)?.[0].length) ?? 3;
  const stopHeadingRegex = new RegExp(`\\n#{1,${headingLevel}} `);
  const sepRegex = /\n---\n/;
  const nextStop = remainder.slice(headingPrefix.length).search(stopHeadingRegex);
  const sepMatch = remainder.slice(headingPrefix.length).search(sepRegex);

  const candidates = [nextStop, sepMatch].filter(n => n !== -1) as number[];
  let endOffset: number;
  if (candidates.length === 0) {
    endOffset = remainder.length;
  } else {
    const minStop = Math.min(...candidates);
    // include the trailing `---\n` separator if that's what we matched first
    endOffset = headingPrefix.length + minStop + (minStop === sepMatch ? '\n---\n'.length : 1);
  }
  return src.slice(0, startIdx) + src.slice(startIdx + endOffset);
}

function transformMarkdown(raw: string, vals: InputValues): string {
  let out = raw;

  const disabled = ROW_VARIANT_TOGGLES.filter(r => vals[r.key] === false);
  const enabledCount = ROW_VARIANT_TOGGLES.length - disabled.length;

  // 1. Strip disabled row-variant subsections inside Part B
  disabled.forEach(r => {
    out = stripSection(out, `### \`${r.type}\``);
  });

  // 2. Strip the layout-variation table row for each disabled variant
  disabled.forEach(r => {
    const rowRegex = new RegExp(`^\\| \`${r.type}\` \\|.*$\\n?`, 'm');
    out = out.replace(rowRegex, '');
  });

  // 3. Remove the variant from the TableCellType union
  disabled.forEach(r => {
    out = out.replace(new RegExp(`'${r.type}'\\s*\\|\\s*`, 'g'), '');
    out = out.replace(new RegExp(`\\s*\\|\\s*'${r.type}'`, 'g'), '');
  });

  // 4. Update "7 variants" / "7 types" counters
  out = out.replace(/(\b)7(\s+(?:variants|types)\b)/g, `$1${enabledCount}$2`);

  // 5. Strip Pagination "Rows Per Page" content if disabled
  if (vals.showRowsPerPage === false) {
    out = stripSection(out, '## Rows Per Page Selector');
    // Drop the inline mention in the Pagination overview line
    out = out.replace(/,\s*rows-per-page selector \(center-left\)/i, '');
  }

  return out;
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
      figmaMarkdownContent={tableFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
