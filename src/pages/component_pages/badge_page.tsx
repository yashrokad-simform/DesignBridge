import React from 'react';
import { Badge, type BadgeColor, type BadgeVariant } from '../../components/ui/Badge';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';
import badgeMd from './md_files/Badge-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  {
    key: 'variants', label: 'Variants', type: 'togglelist',
    options: [
      { value: 'filled',   label: 'Filled' },
      { value: 'bordered', label: 'Bordered' },
      { value: 'tertiary', label: 'Tertiary' },
    ],
  },
  { key: 'dotPrefix', label: 'Dot Prefix', type: 'toggle' },
  {
    key: 'height', label: 'Height', type: 'number',
    min: 0, max: 64, step: 2,
  },
  {
    key: 'textSize', label: 'Text Size', type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
    ],
  },
  {
    key: 'borderRadius', label: 'Border Radius', type: 'select',
    options: [
      { value: '4px',  label: '4px' },
      { value: '8px',  label: '8px' },
      { value: 'full', label: 'Full (default)' },
    ],
  },
  {
    key: 'padding', label: 'Padding', type: 'select',
    options: [
      { value: 'px-2', label: '8px (default)' },
      { value: 'px-3', label: '12px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  variants:     'filled,bordered,tertiary',
  dotPrefix:    true,
  height:       24,
  textSize:     '12px',
  borderRadius: 'full',
  paddingX:     'px-2',
};

/* ── Preview helpers ────────────────────────────────────── */
const BR_PREVIEW: Record<string, string> = {
  '4px': '4px', '8px': '8px', 'full': '9999px',
};
const TS_PREVIEW: Record<string, string> = {
  '12px': '12px', '14px': '14px',
};
const PX_PREVIEW: Record<string, string> = {
  'px-2': '8px', 'px-3': '12px', 'px-4': '16px', 'px-5': '20px',
};

/* ── buildVariants ──────────────────────────────────────── */
const SEMANTIC: BadgeColor[] = ['primary','secondary','success','warning','critical','gray','black'];
const EXTENDED: BadgeColor[] = ['cyan','indigo','purple','fuchsia','rose','teal'];

function buildVariants(vals: InputValues): VariantGroup[] {
  const selectedVariants = (vals.variants as string).split(',').filter(Boolean) as BadgeVariant[];
  const showPrefix   = vals.dotPrefix    as boolean;
  const height       = vals.height       as number;
  const textSize     = vals.textSize     as string;
  const borderRadius = vals.borderRadius as string;
  const paddingX     = vals.paddingX     as string;

  const previewStyle: React.CSSProperties = {
    ...(height > 0 ? { height: `${height}px` } : {}),
    ...(textSize !== '12px' ? { fontSize: TS_PREVIEW[textSize] ?? textSize } : {}),
    ...(borderRadius !== 'full' ? { borderRadius: BR_PREVIEW[borderRadius] ?? borderRadius } : {}),
    ...(paddingX !== 'px-2' ? { paddingLeft: PX_PREVIEW[paddingX], paddingRight: PX_PREVIEW[paddingX] } : {}),
  };

  function makeStyle(variant: BadgeVariant, colors: BadgeColor[], label: string, accent: string) {
    return {
      id: label, label, accentColor: accent,
      rows: [{
        cells: colors.map(c => ({
          label: cap(c),
          node: (
            <Badge
              key={c}
              variant={variant}
              color={c}
              label="Badge"
              showPrefix={showPrefix}
              showSuffix={true}
              style={Object.keys(previewStyle).length > 0 ? previewStyle : undefined}
            />
          ),
        })),
      }],
    };
  }

  const allGroups: VariantGroup[] = (['filled', 'bordered', 'tertiary'] as BadgeVariant[]).map(v => ({
    id: v,
    label: cap(v),
    dotColor: v === 'filled' ? '#0056b8' : v === 'bordered' ? '#89919d' : '#051325',
    styles: [
      makeStyle(v, SEMANTIC, 'Semantic', '#0056b8'),
      makeStyle(v, EXTENDED, 'Extended', '#7839ee'),
    ],
  }));

  return allGroups.filter(g => selectedVariants.includes(g.id as BadgeVariant));
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformBadgeMd ───────────────────────────────────── */
function transformBadgeMd(raw: string, vals: InputValues): string {
  let md = raw;

  const selectedVariants = (vals.variants as string).split(',').filter(Boolean);
  if (selectedVariants.length === 0) return md;

  const dotPrefix    = vals.dotPrefix    as boolean;
  const height       = vals.height       as number;
  const textSize     = vals.textSize     as string;
  const borderRadius = vals.borderRadius as string;
  const paddingX     = vals.paddingX     as string;

  // ── 1. Variant prop ─────────────────────────────────────
  const priorityOrder = ['filled', 'bordered', 'tertiary'];
  const defaultVariant = priorityOrder.find(v => selectedVariants.includes(v)) ?? selectedVariants[0];
  const variantType = selectedVariants.map(v => `'${v}'`).join(" \\| ");
  md = md.replace(
    /\| `variant` \| `[^`]+` \| `'[^`]+'` \|/,
    `| \`variant\` | \`${variantType}\` | \`'${defaultVariant}'\` |`,
  );

  // ── 2. showPrefix default ───────────────────────────────
  md = md.replace(
    /(\| `showPrefix` \| `boolean` \| )`(?:true|false)`( \|)/,
    `$1\`${dotPrefix}\`$2`,
  );

  // ── 3. Border radius ────────────────────────────────────
  const brMap: Record<string, { cls: string; note: string }> = {
    '4px':  { cls: 'rounded',      note: '0.25rem (4px)' },
    '8px':  { cls: 'rounded-lg',   note: '0.5rem (8px)' },
    'full': { cls: 'rounded-full', note: '9999px' },
  };
  const br = brMap[borderRadius] ?? brMap['full'];
  md = md.replace(/(rounded-[a-z0-9-]+)( px-2 py-1 gap-1\.5)/, `${br.cls}$2`);
  md = md.replace(/· `rounded-[a-z0-9-]+` = [^\n]+/, `· \`${br.cls}\` = ${br.note}`);

  // ── 4. Padding X ────────────────────────────────────────
  const pxNote: Record<string, string> = {
    'px-2': '8px', 'px-3': '12px', 'px-4': '16px', 'px-5': '20px',
  };
  md = md.replace(
    /(rounded-[a-z0-9-]+) px-\d+ (py-[0-9.]+ gap-[0-9.]+)/,
    `$1 ${paddingX} $2`,
  );
  md = md.replace(/`px-\d+` = \d+px/, `\`${paddingX}\` = ${pxNote[paddingX] ?? '8px'}`);

  // ── 5. Typography ───────────────────────────────────────
  const tsMap: Record<string, { cls: string; ldr: string; sizePx: string; ldrPx: string }> = {
    '12px': { cls: 'text-xs', ldr: 'leading-4',   sizePx: '12px', ldrPx: '16px' },
    '14px': { cls: 'text-sm', ldr: 'leading-4.5', sizePx: '14px', ldrPx: '18px' },
  };
  const ts = tsMap[textSize] ?? tsMap['12px'];
  md = md.replace(/text-[a-z]+ font-medium leading-[0-9.]+/, `${ts.cls} font-medium ${ts.ldr}`);
  md = md.replace(
    /> `text-[a-z]+` = [0-9]+px · `leading-[0-9.]+` = [0-9]+px · `font-medium` = 500/,
    `> \`${ts.cls}\` = ${ts.sizePx} · \`${ts.ldr}\` = ${ts.ldrPx} · \`font-medium\` = 500`,
  );

  // ── 6. Height ───────────────────────────────────────────
  const calcH = (h: number, isBordered: boolean): string => {
    const px = isBordered ? h - 2 : h;
    const units = px / 4;
    return Number.isInteger(units) ? `h-${units}` : `h-[${px}px]`;
  };

  if (height > 0) {
    md = md.replace(/\nHeight is content-driven\. Never set an explicit height or width\.\n/, '\n');
    const filledCls   = calcH(height, false);
    const borderedCls = calcH(height, true);
    const nonBordered = selectedVariants.filter(v => v !== 'bordered');
    const parts: string[] = [];
    if (nonBordered.length === 2) parts.push(`\`filled\` and \`tertiary\` use \`${filledCls}\``);
    else if (nonBordered.length === 1) parts.push(`\`${nonBordered[0]}\` uses \`${filledCls}\``);
    if (selectedVariants.includes('bordered'))
      parts.push(`\`bordered\` uses a reduced height \`${borderedCls}\` to account for its 1px border`);
    md = md.replace(
      /(> \*\*Variant exception:\*\*[^\n]*\n)/,
      `$1\n${`Height is explicitly set. ${parts.join('. ')}.`}\n`,
    );
  }

  // ── 7. Remove all Prefix Dot traces when disabled ───────
  if (!dotPrefix) {
    // Remove the ## Prefix Dot instructions section
    md = md.replace(/\n\n## Prefix Dot[\s\S]*?\n---/, '');
    // Remove showPrefix row from Props table
    md = md.replace(/\n\| `showPrefix` \| `boolean` \| `[^`]*` \|/, '');
    // Remove showPrefix line from Current Configuration code block
    md = md.replace(/\n  showPrefix=\{[^}]*\}/, '');
    // Remove "[Prefix Dot?] → " from slot order description
    md = md.replace(/`\[Prefix Dot\?\] → \[Label\]`/, '`[Label]`');
    md = md.replace(/\[Prefix Dot\?\] → /, '');
  }

  // ── 8. Remove unselected Color Token Map sections ───────
  if (!selectedVariants.includes('filled'))
    md = md.replace(/### Filled[\s\S]*?(?=### Bordered|### Tertiary)/, '');
  if (!selectedVariants.includes('bordered'))
    md = md.replace(/### Bordered[\s\S]*?(?=### Tertiary|$)/, '');
  if (!selectedVariants.includes('tertiary'))
    md = md.replace(/### Tertiary[\s\S]*$/, '');

  // ── 8. Fill Current Configuration tokens ────────────────
  md = md
    .replace(/\{\{\{label\}\}\}/g, 'Badge')
    .replace(/\{\{\{variant\}\}\}/g, defaultVariant)
    .replace(/\{\{\{color\}\}\}/g, 'primary')
    .replace(/\{\{\{showPrefix\}\}\}/g, String(dotPrefix))
    .replace(/\{\{\{showSuffix\}\}\}/g, 'false');

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function BadgePage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={badgeMd}
      markdownFileName="badge"
      resolveTokens={resolveTokens}
      transformMarkdown={transformBadgeMd}
    />
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
