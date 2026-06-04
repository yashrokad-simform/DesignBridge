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
import buttonFigmaMd from '../figma_prompt/button-prompt.md?raw';

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

/* ── Figma helpers ──────────────────────────────────────── */
const FIGMA_RADIUS_BTN: Record<string, string> = {
  '4px': 'radius-xs', '8px': 'radius-md', '12px': 'radius-xl',
  '16px': 'radius-2xl', 'full': 'radius-full',
};
const FIGMA_SPACING_BTN: Record<number, string> = {
  0: 'spacing-none', 2: 'spacing-xxs', 4: 'spacing-xs', 6: 'spacing-sm',
  8: 'spacing-md', 10: 'spacing-lg', 12: 'spacing-xl', 14: 'spacing-2xl',
  16: 'spacing-3xl', 20: 'spacing-4xl', 24: 'spacing-5xl', 32: 'spacing-6xl',
  40: 'spacing-7xl', 48: 'spacing-8xl',
};
const BTN_TEXT_FIGMA: Record<string, string> = {
  '12px': 'Label sm/Medium', '14px': 'Body md/Medium', '16px': 'Body lg/Medium',
};

/* ── transformFigmaMarkdown ─────────────────────────────── */

// Ordered list: code key → display name (for inline stripping)
const ALL_BTN_TYPES: Array<{ key: string; name: string }> = [
  { key: 'primary',          name: 'Primary' },
  { key: 'bordered',         name: 'Bordered' },
  { key: 'text',             name: 'Text' },
  { key: 'link',             name: 'Link' },
  { key: 'icon-filled',      name: 'Icon Filled' },
  { key: 'icon-secondary',   name: 'Icon Secondary' },
  { key: 'icon-only',        name: 'Icon Only' },
  { key: 'critical',         name: 'Critical Primary' },
  { key: 'critical-bordered', name: 'Critical Bordered' },
  { key: 'critical-text',    name: 'Critical Text' },
];

function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;
  const hLg  = vals.heightLg    as number;
  const hSm  = vals.heightSm    as number;
  const pLg  = vals.paddingXLg  as number;
  const pSm  = vals.paddingXSm  as number;
  const cr   = vals.cornerRadius as string;
  const tLg  = vals.textSizeLg  as string;
  const tSm  = vals.textSizeSm  as string;

  const rvLg = FIGMA_SPACING_BTN[pLg]  ?? `${pLg}px`;
  const rvSm = FIGMA_SPACING_BTN[pSm]  ?? `${pSm}px`;
  const rr   = FIGMA_RADIUS_BTN[cr]    ?? 'radius-xl';
  const stLg = BTN_TEXT_FIGMA[tLg]     ?? 'Body md/Medium';
  const stSm = BTN_TEXT_FIGMA[tSm]     ?? 'Label sm/Medium';

  const enabledVariants = (vals.variants as string).split(',').filter(Boolean);
  const enabledSizes    = (vals.sizes    as string).split(',').filter(Boolean);
  const has = (k: string) => enabledVariants.includes(k);

  // ── Large height ─────────────────────────────────────────
  md = md.replace(/44px \(fixed\)/g,        `${hLg}px (fixed)`);
  md = md.replace(/FIXED \(44px\)/g,        `FIXED (${hLg}px)`);
  md = md.replace(/FIXED height \(44px\)/g, `FIXED height (${hLg}px)`);
  md = md.replace(/Large \(44px\)/g,        `Large (${hLg}px)`);
  md = md.replace(/44×44px/g,               `${hLg}×${hLg}px`);

  // ── Small height ─────────────────────────────────────────
  md = md.replace(/36px \(fixed\)/g,        `${hSm}px (fixed)`);
  md = md.replace(/FIXED \(36px\)/g,        `FIXED (${hSm}px)`);
  md = md.replace(/Small \(36px\)/g,        `Small (${hSm}px)`);
  md = md.replace(/36×36px/g,               `${hSm}×${hSm}px`);
  md = md.replace(/→ `36px` \(fixed\)/g,    `→ \`${hSm}px\` (fixed)`);

  // ── Large H-padding ──────────────────────────────────────
  md = md.replace(/`spacing-4xl` \| 20px/g,           `\`${rvLg}\` | ${pLg}px`);
  md = md.replace(/`spacing-4xl` \(20px\)/g,           `\`${rvLg}\` (${pLg}px)`);
  md = md.replace(/spacing-4xl \(20px\)/g,             `${rvLg} (${pLg}px)`);
  md = md.replace(/20px left\/right \(spacing-4xl\)/g, `${pLg}px left/right (${rvLg})`);
  md = md.replace(/`spacing-4xl`/g,                    `\`${rvLg}\``);

  // ── Small H-padding ──────────────────────────────────────
  md = md.replace(/`spacing-3xl` \| 16px/g,           `\`${rvSm}\` | ${pSm}px`);
  md = md.replace(/`spacing-3xl` \(16px\)/g,           `\`${rvSm}\` (${pSm}px)`);
  md = md.replace(/spacing-3xl \(16px\)/g,             `${rvSm} (${pSm}px)`);
  md = md.replace(/16px left\/right \(spacing-3xl\)/g, `${pSm}px left/right (${rvSm})`);
  md = md.replace(/`spacing-3xl`/g,                    `\`${rvSm}\``);

  // ── Corner radius ────────────────────────────────────────
  if (rr !== 'radius-xl') md = md.replace(/\bradius-xl\b/g, rr);

  // ── Large text style ─────────────────────────────────────
  if (stLg !== 'Body md/Medium') {
    md = md.replace(/Body md\/Medium/g, stLg);
    if (tLg === '16px') {
      md = md.replace(/14px · 18px LH · 0 LS/g, '16px · 22px LH · 0 LS');
      md = md.replace(/Inter · Medium \(500\) · 14px/g, 'Inter · Medium (500) · 16px');
    }
  }

  // ── Small text style ─────────────────────────────────────
  if (stSm !== 'Label sm/Medium') {
    md = md.replace(/Label sm\/Medium/g, stSm);
    if (tSm === '14px') {
      md = md.replace(/12px · 16px LH · 0 LS/g, '14px · 18px LH · 0 LS');
      md = md.replace(/Inter · Medium \(500\) · 12px/g, 'Inter · Medium (500) · 14px');
    }
  }

  // ══════════════════════════════════════════════════════════
  // VARIANT REMOVAL — remove every trace of disabled variants
  // ══════════════════════════════════════════════════════════

  // 1. Remove whole "#### Section" blocks (Variable Map Per Variant)
  for (const { key, name } of ALL_BTN_TYPES) {
    if (!has(key)) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      md = md.replace(
        new RegExp(`#### ${escaped}[\\s\\S]*?(?=\\n####|\\n---|\n## |$)`), '',
      );
    }
  }

  // 2. Remove rows from "Type (N options)" table: | `Primary` | ... |
  for (const { key, name } of ALL_BTN_TYPES) {
    if (!has(key)) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      md = md.replace(new RegExp(`^\\| \`${escaped}\` \\|[^\\n]*\\n?`, 'gm'), '');
    }
  }

  // 3. Remove rows from "State Details Per Type" table: | Primary | ... |
  for (const { key, name } of ALL_BTN_TYPES) {
    if (!has(key)) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      md = md.replace(new RegExp(`^\\| ${escaped} \\|[^\\n]*\\n?`, 'gm'), '');
    }
  }

  // 4. Strip inline "Name · " and " · Name" mentions from variable table cells
  for (const { key, name } of ALL_BTN_TYPES) {
    if (!has(key)) {
      const n = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      md = md.replace(new RegExp(`${n} · `, 'g'), '');
      md = md.replace(new RegExp(` · ${n}`, 'g'), '');
      md = md.replace(new RegExp(`, ${n}`, 'g'), '');
      md = md.replace(new RegExp(`${n}, `, 'g'), '');
    }
  }

  // 5. Update Type list in Step 5 construction guide
  const enabledTypeNames = ALL_BTN_TYPES
    .filter(({ key }) => has(key))
    .map(({ name }) => `\`${name}\``);
  md = md.replace(
    /- `Type` → `Primary`, `Bordered`, `Text`, `Link`, `Icon Only`, `Icon Secondary`, `Icon Filled`, `Critical Primary`, `Critical Bordered`, `Critical Text`/,
    `- \`Type\` → ${enabledTypeNames.join(', ')}`,
  );

  // 6. Icon Filled/Secondary-specific size table rows and rules
  if (!has('icon-filled') && !has('icon-secondary')) {
    md = md.replace(/^\| \*\*Padding H \(Icon Filled · Icon Secondary\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*Padding Left\/Right\*\* \*\(Icon Filled · Icon Secondary only\)\*[^\n]*\n?/gm, '');
    md = md.replace(/> \*\*Icon Filled & Icon Secondary sizing rule:\*\*[^\n]*\n?/gm, '');
    md = md.replace(/- \*\*For `Icon Filled` and `Icon Secondary`\*\*:[^\n]*\n?/gm, '');
  }

  // 7. Icon Only-specific rows and rules
  if (!has('icon-only')) {
    md = md.replace(/^\| \*\*Padding H \(Icon Only\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*Padding V \(Icon Only\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*Gap \(Icon Only\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*All Padding \+ Gap\*\* \*\(Icon Only\)\*[^\n]*\n?/gm, '');
    md = md.replace(/> \*\*Icon Only sizing rule:\*\*[^\n]*\n?/gm, '');
    md = md.replace(/- \*\*For `Icon Only`\*\*:[^\n]*\n?/gm, '');
  }

  // 8. Text/Link-specific rows and rules
  if (!has('text') && !has('link')) {
    md = md.replace(/^\| \*\*Padding H \(Text · Link\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*Padding V \(Text · Link\)\*\*[^\n]*\n?/gm, '');
    md = md.replace(/^\| \*\*All Padding\*\* \*\(Text · Link\)\*[^\n]*\n?/gm, '');
    md = md.replace(/> ⚠️ \*\*CRITICAL — Text & Link Padding Removal[^\n]*\n(>[^\n]*\n)*/gm, '');
    md = md.replace(/- \*\*For `Text` and `Link`\*\*:[^\n]*\n?/gm, '');
    md = md.replace(/> \*\*Text & Link sizing rule:\*\*[^\n]*\n?/gm, '');
  }

  // 9. All-critical disabled: remove the "Critical types" note and rule
  if (!has('critical') && !has('critical-bordered') && !has('critical-text')) {
    md = md.replace(/> \*\*Critical types\*\*[^\n]*\n?/gm, '');
    md = md.replace(/- \*\*Critical types are Disabled-only\.\*\*[^\n]*\n?/gm, '');
  }

  // 10. Size filtering
  if (!enabledSizes.includes('lg')) {
    // Table rows
    md = md.replace(/^\| Large \|[^\n]*\n?/gm, '');
    md = md.replace(/\| Large \([^)]+\)/g, '');

    // Size table: 3-col header/separator → 2-col
    md = md.replace(/^\| Property \| Large \| Small \|$/m, '| Property | Small |');
    md = md.replace(/^\|---\|---\|---\|$/m, '|---|---|');

    // Section header
    md = md.replace(/### Size \(2 options\)/, '### Size (1 option)');

    // Overview counts
    md = md.replace(/\| Total Variants \| 48 \|/, '| Total Variants | 24 |');

    // Code block — component hierarchy: remove ├── Size=Large [COMPONENT] line
    md = md.replace(/^[ \t]*├── Size=Large[ \t]+\[COMPONENT\][^\n]*\n?/gm, '');
    // Component hierarchy Level 2: remove Size=Large variant example lines
    md = md.replace(/^[ \t]*└── Size=Large, State=[^\n]*\n(?:[ \t]*└── [^\n]*\n)?/gm, '');
    // Level 2 struct block: ├── Size=Large, ... lines with │ children
    md = md.replace(/^  ├── Size=Large,[^\n]*\n(?:  │[^\n]*\n)*/gm, '');

    // Blockquote inheritance example: ▼ Size=Large → ▼ Size=Small
    md = md.replace(/^> ▼ Size=Large,[^\n]*/gm, '> ▼ Size=Small, State=Enabled, Type=Primary   ← variant COMPONENT');

    // Component structure code block: remove _base Button — Size=Large block
    md = md.replace(/_base Button — Size=Large[\s\S]*?(?=_base Button — Size=Small)/g, '');
    md = md.replace(/\[All other properties same as Large\]\n?/g, '');

    // "What never changes" table rows
    md = md.replace(/^\| Padding \(Large\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| Gap \(Large\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| Icon size \(Large\)[^\n]*\n?/gm, '');

    // Step 7 variable attachment rows
    md = md.replace(/^\| `_base Button` frame \(Large\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| `Button` text layer \(Large\)[^\n]*\n?/gm, '');

    // Icon sizes table
    md = md.replace(/^\| `20px` \| `_base Button — Size=Large` \|\n?/gm, '');

    // CRITICAL base-component note
    md = md.replace(
      /two size variants — Large and Small — each with[^.]*\. When building a Button variant, always place an instance of the correct size \(`Size=Large` or `Size=Small`\)/,
      'one size variant — Small. When building a Button variant, always place an instance of `Size=Small`',
    );

    // Component Properties default
    md = md.replace(/\| `Size` \| VARIANT \| `Large` \|/, '| `Size` | VARIANT | `Small` |');

    // Mandatory rules
    md = md.replace(/`Size=Large` or `Size=Small`/g, '`Size=Small`');
    md = md.replace(/\(`spacing-xl` for Large, `spacing-lg` for Small\)/g, '(`spacing-lg`)');

    // Construction Guide — remove Steps 1 & 2 (Size=Large build)
    md = md.replace(/### Step 1 — Build `_base Button — Size=Large`[\s\S]*?(?=### Step 3)/, '');
    // Rename & renumber remaining steps
    md = md.replace(/### Step 3 — Build `_base Button — Size=Small`/, '### Step 1 — Build `_base Button — Size=Small`');
    md = md.replace(
      /Duplicate `Size=Large` and apply every adjustment below\.[^\n]*/,
      'Create a new **Frame**. Name it `Size=Small`. Apply **Horizontal Auto Layout**, set to **HUG × FIXED (36px)**, and configure:',
    );
    md = md.replace(/### Step 4 — Combine into/, '### Step 2 — Combine into');
    md = md.replace(/1\. Select both `Size=Large` and `Size=Small` components\./, '1. Select the `Size=Small` component.');
    md = md.replace(/3\. Add variant property `Size` → options: `Large`, `Small`\./, '3. Add variant property `Size` → option: `Small`.');
    md = md.replace(/### Step 5 — Build Button Variants/, '### Step 3 — Build Button Variants');
    md = md.replace(/### Step 6 — Expose/, '### Step 4 — Expose');
    md = md.replace(/### Step 7 — Variable/, '### Step 5 — Variable');
    md = md.replace(/### Step 8 — Naming/, '### Step 6 — Naming');
    md = md.replace(/`Size` → `Large`, `Small`/, '`Size` → `Small`');
    md = md.replace(/Name it: `Size=Large, State=Enabled, Type=Primary`/, 'Name it: `Size=Small, State=Enabled, Type=Primary`');
    md = md.replace(/For each of the 48 variants:/, 'For each of the 24 variants:');
    md = md.replace(/Select all 48 variant components/, 'Select all 24 variant components');
    md = md.replace(/Do this for \*\*all 48 variants\*\*/, 'Do this for **all 24 variants**');

    // Page arrangement tagline
    md = md.replace(/48 variants · Size: Large · Small/g, '24 variants · Size: Small');
    md = md.replace(/Size: Large · Small/g, 'Size: Small');
    md = md.replace(/Large \(44px\) · Small \(36px\)/g, 'Small (36px)');
    md = md.replace(/2 size variants · Large \(44px\) · Small \(36px\)/g, '1 size variant · Small (36px)');
  }

  if (!enabledSizes.includes('sm')) {
    // Table rows
    md = md.replace(/^\| Small \|[^\n]*\n?/gm, '');
    md = md.replace(/\| Small \([^)]+\)/g, '');

    // Size table: 3-col header/separator → 2-col
    md = md.replace(/^\| Property \| Large \| Small \|$/m, '| Property | Large |');
    md = md.replace(/^\|---\|---\|---\|$/m, '|---|---|');

    // Section header
    md = md.replace(/### Size \(2 options\)/, '### Size (1 option)');

    // Overview counts
    md = md.replace(/\| Total Variants \| 48 \|/, '| Total Variants | 24 |');

    // Code block — component hierarchy: remove └── Size=Small [COMPONENT] line
    md = md.replace(/^[ \t]*└── Size=Small[ \t]+\[COMPONENT\][^\n]*\n?/gm, '');
    // Promote ├── Size=Large to └──
    md = md.replace(/├── Size=Large(\s+\[COMPONENT\])/, '└── Size=Large$1');
    // Level 2: remove Size=Small variant example lines
    md = md.replace(/^[ \t]*└── Size=Small, State=[^\n]*\n(?:[ \t]*└── [^\n]*\n)?/gm, '');
    md = md.replace(/^  ├── Size=Small,[^\n]*\n(?:  │[^\n]*\n)*/gm, '');

    // Blockquote inheritance example already shows Size=Large — no change needed

    // Component structure code block: remove _base Button — Size=Small block
    md = md.replace(/\n\n_base Button — Size=Small[\s\S]*?\[All other properties same as Large\]\n?/g, '');

    // "What never changes" table rows
    md = md.replace(/^\| Padding \(Small\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| Gap \(Small\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| Icon size \(Small\)[^\n]*\n?/gm, '');

    // Step 7 variable attachment rows
    md = md.replace(/^\| `_base Button` frame \(Small\)[^\n]*\n?/gm, '');
    md = md.replace(/^\| `Button` text layer \(Small\)[^\n]*\n?/gm, '');

    // Icon sizes table
    md = md.replace(/^\| `16px` \| `_base Button — Size=Small` \|\n?/gm, '');

    // CRITICAL base-component note
    md = md.replace(
      /two size variants — Large and Small — each with[^.]*\. When building a Button variant, always place an instance of the correct size \(`Size=Large` or `Size=Small`\)/,
      'one size variant — Large. When building a Button variant, always place an instance of `Size=Large`',
    );

    // Mandatory rules
    md = md.replace(/`Size=Large` or `Size=Small`/g, '`Size=Large`');
    md = md.replace(/\(`spacing-xl` for Large, `spacing-lg` for Small\)/g, '(`spacing-xl`)');

    // Construction Guide — remove Step 3 (Size=Small build)
    md = md.replace(/### Step 3 — Build `_base Button — Size=Small`[\s\S]*?(?=### Step 4)/, '');
    // Renumber remaining steps
    md = md.replace(/### Step 4 — Combine into/, '### Step 2 — Combine into');
    md = md.replace(/1\. Select both `Size=Large` and `Size=Small` components\./, '1. Select the `Size=Large` component.');
    md = md.replace(/3\. Add variant property `Size` → options: `Large`, `Small`\./, '3. Add variant property `Size` → option: `Large`.');
    md = md.replace(/### Step 5 — Build Button Variants/, '### Step 3 — Build Button Variants');
    md = md.replace(/### Step 6 — Expose/, '### Step 4 — Expose');
    md = md.replace(/### Step 7 — Variable/, '### Step 5 — Variable');
    md = md.replace(/### Step 8 — Naming/, '### Step 6 — Naming');
    md = md.replace(/`Size` → `Large`, `Small`/, '`Size` → `Large`');
    md = md.replace(/For each of the 48 variants:/, 'For each of the 24 variants:');
    md = md.replace(/Select all 48 variant components/, 'Select all 24 variant components');
    md = md.replace(/Do this for \*\*all 48 variants\*\*/, 'Do this for **all 24 variants**');

    // Page arrangement tagline
    md = md.replace(/48 variants · Size: Large · Small/g, '24 variants · Size: Large');
    md = md.replace(/Size: Large · Small/g, 'Size: Large');
    md = md.replace(/Large \(44px\) · Small \(36px\)/g, 'Large (44px)');
    md = md.replace(/2 size variants · Large \(44px\) · Small \(36px\)/g, '1 size variant · Large (44px)');
  }

  return md;
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
      figmaMarkdownContent={buttonFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
