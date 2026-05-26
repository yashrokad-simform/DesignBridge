import React from 'react';
import { Button } from '../../../components/ui/main_components/Button';
function CircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import buttonMd from '../md_files/button-instruction.md?raw';

type BtnVariant =
  | 'primary' | 'bordered' | 'text' | 'link' | 'critical'
  | 'critical-bordered' | 'critical-text'
  | 'icon-filled' | 'icon-secondary' | 'icon-only';

const ALL_VARIANTS: BtnVariant[] = [
  'primary', 'bordered', 'text', 'link', 'critical', 'critical-bordered', 'critical-text',
  'icon-filled', 'icon-secondary', 'icon-only',
];

const INPUT_CONFIG: InputConfig[] = [
  { key: 'sizes', label: 'Sizes', type: 'divider' },
  {
    key: 'sizes', label: '', type: 'togglelist',
    options: [
      { value: 'lg', label: 'Large (lg)' },
      { value: 'sm', label: 'Small (sm)' },
    ],
  },
  { key: 'variants', label: 'Variants', type: 'divider' },
  {
    key: 'variants', label: '', type: 'togglelist',
    options: [
      { value: 'primary',           label: 'Primary' },
      { value: 'bordered',          label: 'Bordered' },
      { value: 'text',              label: 'Text' },
      { value: 'link',              label: 'Link' },
      { value: 'critical',          label: 'Critical' },
      { value: 'critical-bordered', label: 'Critical Bordered' },
      { value: 'critical-text',     label: 'Critical Text' },
      { value: 'icon-filled',       label: 'Icon Filled' },
      { value: 'icon-secondary',    label: 'Icon Secondary' },
      { value: 'icon-only',         label: 'Icon Only' },
    ],
  },
  { key: 'div1', label: 'Dimensions', type: 'divider' },
  { key: 'heightLg',   label: 'Height LG (px)',    type: 'number', min: 20, max: 80 },
  { key: 'heightSm',   label: 'Height SM (px)',    type: 'number', min: 20, max: 80 },
  { key: 'paddingXLg', label: 'Padding X LG (px)', type: 'number', min: 4,  max: 48 },
  { key: 'paddingXSm', label: 'Padding X SM (px)', type: 'number', min: 4,  max: 48 },
  { key: 'div2', label: 'Appearance', type: 'divider' },
  {
    key: 'cornerRadius', label: 'Corner Radius', type: 'select',
    options: [
      { value: '4px',  label: '4px' },
      { value: '8px',  label: '8px' },
      { value: '12px', label: '12px (default)' },
      { value: '16px', label: '16px' },
      { value: 'full', label: 'Full' },
    ],
  },
  {
    key: 'textSizeLg', label: 'Text Size LG', type: 'select',
    options: [
      { value: '14px', label: '14px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
  {
    key: 'textSizeSm', label: 'Text Size SM', type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
    ],
  },
  { key: 'div3', label: 'Features', type: 'divider' },
  { key: 'loading', label: 'Loading State', type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  variants:     ALL_VARIANTS.join(','),
  sizes:        'lg,sm',
  heightLg:     44,
  heightSm:     36,
  paddingXLg:   20,
  paddingXSm:   16,
  cornerRadius: '12px',
  textSizeLg:   '14px',
  textSizeSm:   '12px',
  loading:      true,
};

/* ── Helpers ────────────────────────────────────────────── */

function cap(s: string) {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function hClass(px: number): string {
  const n = px / 4;
  if (Number.isInteger(n)) return `h-${n}`;
  if (Number.isInteger(n * 2)) return `h-${n}`;
  return `h-[${px}px]`;
}
function pxClass(px: number): string {
  return px % 4 === 0 ? `px-${px / 4}` : `px-[${px}px]`;
}
function sqClass(px: number): string {
  return px % 4 === 0 ? `size-${px / 4}` : `size-[${px}px]`;
}

const RADIUS_MAP: Record<string, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  'full': 'rounded-full',
};

const TEXT_MAP: Record<string, { cls: string; leading: string }> = {
  '12px': { cls: 'text-xs', leading: 'leading-4' },
  '14px': { cls: 'text-sm', leading: 'leading-4.5' },
  '16px': { cls: 'text-md', leading: 'leading-5.5' },
};

/* ── buildVariants ──────────────────────────────────────── */

const STATES = [
  { id: 'default',  label: 'Default',  disabled: false, loading: false },
  { id: 'disabled', label: 'Disabled', disabled: true,  loading: false },
  { id: 'loading',  label: 'Loading',  disabled: false, loading: true  },
] as const;

function buildVariants(vals: InputValues): VariantGroup[] {
  const enabled      = (vals.variants as string).split(',').filter(Boolean) as BtnVariant[];
  const sizes        = (vals.sizes    as string).split(',').filter(Boolean) as ('lg' | 'sm')[];
  const cornerRadius = vals.cornerRadius as string;
  const cr           = cornerRadius === 'full' ? '9999px' : cornerRadius;
  const showLoading  = vals.loading as boolean;

  const stdEnabled  = enabled.filter(v => !v.startsWith('icon-'));
  const iconEnabled = enabled.filter(v =>  v.startsWith('icon-'));
  const activeStates = showLoading ? STATES : STATES.slice(0, 2);

  const groups: VariantGroup[] = [];

  for (const size of sizes) {
    const h  = size === 'lg' ? (vals.heightLg  as number) : (vals.heightSm  as number);
    const px = size === 'lg' ? (vals.paddingXLg as number) : (vals.paddingXSm as number);
    const fs = size === 'lg' ? (vals.textSizeLg as string) : (vals.textSizeSm as string);
    const iconCls = size === 'lg' ? 'size-5 flex-shrink-0' : 'size-4 flex-shrink-0';

    const stdStyle: React.CSSProperties  = { height: `${h}px`, paddingLeft: `${px}px`, paddingRight: `${px}px`, borderRadius: cr, fontSize: fs };
    const flatStyle: React.CSSProperties = { borderRadius: cr, fontSize: fs };
    const iconStyle: React.CSSProperties = { width: `${h}px`, height: `${h}px`, borderRadius: cr, padding: 0 };

    const FLAT_VARIANTS = new Set<BtnVariant>(['text', 'link', 'critical-text']);

    const colHeaders = activeStates.map(s => s.label);

    const rows = [
      ...stdEnabled.map(v => ({
        rowLabel: cap(v),
        cells: activeStates.map(state => ({
          node: (
            <Button
              key={`${v}-${state.id}`}
              variant={v}
              size={size}
              disabled={state.disabled}
              loading={state.loading}
              style={FLAT_VARIANTS.has(v) ? flatStyle : stdStyle}
              leftIcon={<CircleIcon className={iconCls} />}
              rightIcon={<CircleIcon className={iconCls} />}
            >
              {cap(v)}
            </Button>
          ),
        })),
      })),
      ...iconEnabled.map(v => ({
        rowLabel: cap(v),
        cells: activeStates.map(state => ({
          node: (
            <Button key={`${v}-${state.id}`} variant={v} size={size} disabled={state.disabled} loading={state.loading} aria-label={cap(v)} style={iconStyle}>
              <CircleIcon className={iconCls} />
            </Button>
          ),
        })),
      })),
    ];

    groups.push({
      id:    `size-${size}`,
      label: `Size — ${size.toUpperCase()}`,
      dotColor:      '',
      hideDivider:   true,
      noGroupDivider: false,
      styles: [{ id: 'states', label: '', accentColor: '', colHeaders, grid: true, rows }],
    });
  }

  return groups;
}

/* ── transformMarkdown ──────────────────────────────────── */

function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const enabledVariants = (vals.variants as string).split(',').filter(Boolean);
  const enabledSizes    = (vals.sizes    as string).split(',').filter(Boolean);
  const heightLg     = vals.heightLg     as number;
  const heightSm     = vals.heightSm     as number;
  const paddingXLg   = vals.paddingXLg   as number;
  const paddingXSm   = vals.paddingXSm   as number;
  const cornerRadius = vals.cornerRadius as string;
  const textSizeLg   = vals.textSizeLg   as string;
  const textSizeSm   = vals.textSizeSm   as string;
  const loading      = vals.loading      as boolean;

  if (enabledVariants.length === 0 || enabledSizes.length === 0) return md;

  const lgText = TEXT_MAP[textSizeLg] ?? TEXT_MAP['14px'];
  const smText = TEXT_MAP[textSizeSm] ?? TEXT_MAP['12px'];

  // ── 1. Variant prop default ─────────────────────────────
  const variantDefault =
    enabledVariants.length === 1 ? enabledVariants[0]
    : enabledVariants.includes('primary') ? 'primary'
    : enabledVariants[0];

  md = md.replace(
    /\| `variant` \| `ButtonVariant` \| `'[^']*'` \|/,
    `| \`variant\` | \`ButtonVariant\` | \`'${variantDefault}'\` |`,
  );

  md = md.replace(
    /\*\*ButtonVariant:\*\* .+/,
    `**ButtonVariant:** ${enabledVariants.map(v => `\`${v}\``).join(' ')}`,
  );

  // ── 2. Remove disabled variant rows ────────────────────
  for (const v of ALL_VARIANTS) {
    if (!enabledVariants.includes(v)) {
      md = md.replace(new RegExp(`^\\| \`${v}\` \\|[^\\n]*\\n?`, 'gm'), '');
    }
  }

  // ── 3. Size prop type and default ──────────────────────
  const sizeType    = enabledSizes.length === 1 ? `'${enabledSizes[0]}'` : `'lg' \\| 'sm'`;
  const sizeDefault = enabledSizes.length === 1 ? enabledSizes[0] : 'lg';
  md = md.replace(
    /\| `size` \| `[^`]+` \| `'[^`]+'` \|/,
    `| \`size\` | \`${sizeType}\` | \`'${sizeDefault}'\` |`,
  );

  // ── 4. Update enabled size rows (height, padding, text) ─
  if (enabledSizes.includes('lg')) {
    md = md.replace(/^(\| `lg` \| `)([^`]+)(` \|)$/m, (_, pre, content, post) =>
      pre + content
        .replace(/\bh-\S+/, hClass(heightLg))
        .replace(/\bpx-\S+/, pxClass(paddingXLg))
        .replace(/\btext-\S+/, lgText.cls)
        .replace(/\bleading-\S+/, lgText.leading)
      + post,
    );
  }
  if (enabledSizes.includes('sm')) {
    md = md.replace(/^(\| `sm` \| `)([^`]+)(` \|)$/m, (_, pre, content, post) =>
      pre + content
        .replace(/\bh-\S+/, hClass(heightSm))
        .replace(/\bpx-\S+/, pxClass(paddingXSm))
        .replace(/\btext-\S+/, smText.cls)
        .replace(/\bleading-\S+/, smText.leading)
      + post,
    );
  }

  // ── 5. Remove disabled size rows (size table + compound) ─
  for (const s of ['lg', 'sm']) {
    if (!enabledSizes.includes(s)) {
      md = md.replace(new RegExp(`^\\| \`${s}\` \\|[^\\n]*\\n?`, 'gm'), '');
      md = md.replace(new RegExp(`^\\|[^|]*\\| \`${s}\` \\|[^\\n]*\\n?`, 'gm'), '');
    }
  }

  // ── 6. Update icon compound variant size classes ────────
  if (enabledSizes.includes('lg')) {
    md = md.replace(
      /^(\| `icon-filled`, `icon-secondary` \| `lg` \| `)(size-\S+)( p-0` \|)$/m,
      (_, pre, _old, post) => `${pre}${sqClass(heightLg)}${post}`,
    );
  }
  if (enabledSizes.includes('sm')) {
    md = md.replace(
      /^(\| `icon-filled`, `icon-secondary` \| `sm` \| `)(size-\S+)( p-0` \|)$/m,
      (_, pre, _old, post) => `${pre}${sqClass(heightSm)}${post}`,
    );
  }

  // ── 7. Corner radius in variant Classes section ─────────
  const radiusCls = RADIUS_MAP[cornerRadius] ?? 'rounded-xl';
  md = md.replace(
    /(### `variant` Classes)([\s\S]*?)(?=\n###|\n---)/,
    (_, header, body) => header + body.replace(/\brounded-xl\b/g, radiusCls),
  );

  // ── 8. Icon Slots — simplify if only one size enabled ───
  if (enabledSizes.length === 1) {
    const keep = enabledSizes[0] === 'lg'
      ? '`size-5 flex-shrink-0` for `lg`'
      : '`size-4 flex-shrink-0` for `sm`';
    md = md.replace(/- Icon size: .+/, `- Icon size: ${keep}.`);
  }

  // ── 9. Loading State ────────────────────────────────────
  if (!loading) {
    const loadingIdx = md.indexOf('\n## Loading State');
    if (loadingIdx !== -1) {
      const nextSection = md.indexOf('\n---', loadingIdx + 1);
      md = nextSection !== -1
        ? md.slice(0, loadingIdx) + md.slice(nextSection)
        : md.slice(0, loadingIdx);
    }
    md = md.replace(/^\| `loading` \|[^\n]*\n?/m, '');
  }

  // ── 10. Rebuild Dimensions Reference ───────────────────
  const radiusValue = cornerRadius === 'full' ? '9999px' : cornerRadius;

  const hParts: string[] = [];
  if (enabledSizes.includes('lg')) hParts.push(`\`${hClass(heightLg)}\` = ${heightLg}px`);
  if (enabledSizes.includes('sm')) hParts.push(`\`${hClass(heightSm)}\` = ${heightSm}px`);
  hParts.push('`h-5` = 20px', '`h-4` = 16px');

  const pParts: string[] = [];
  if (enabledSizes.includes('lg')) pParts.push(`\`${pxClass(paddingXLg)}\` = ${paddingXLg}px`);
  if (enabledSizes.includes('sm')) pParts.push(`\`${pxClass(paddingXSm)}\` = ${paddingXSm}px`);
  pParts.push('`gap-2` = 8px', '`gap-1` = 4px');

  const szParts: string[] = [];
  if (enabledSizes.includes('lg')) szParts.push(`\`${sqClass(heightLg)}\` = ${heightLg}×${heightLg}px`);
  if (enabledSizes.includes('sm')) szParts.push(`\`${sqClass(heightSm)}\` = ${heightSm}×${heightSm}px`);
  szParts.push('`size-5` = 20×20px', '`size-4` = 16×16px');

  const rtParts: string[] = [`\`${radiusCls}\` = ${radiusValue}`];
  if (enabledSizes.includes('lg')) rtParts.push(`\`${lgText.cls}\` = ${textSizeLg}`);
  if (enabledSizes.includes('sm')) rtParts.push(`\`${smText.cls}\` = ${textSizeSm}`);

  const newDimBlock = [
    '> **Tailwind scale (1 unit = 4px):**',
    '> ' + hParts.join(' · '),
    '> ' + pParts.join(' · '),
    '> ' + szParts.join(' · '),
    '> ' + rtParts.join(' · '),
  ].join('\n');

  md = md.replace(
    /> \*\*Tailwind scale \(1 unit = 4px\):\*\*[\s\S]*?(?=\n\n|\n---)/,
    newDimBlock,
  );

  return md;
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── Page ───────────────────────────────────────────────── */
export default function ButtonPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={buttonMd}
      markdownFileName="button"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
