import React from 'react';
import { Badge, type BadgeColor, type BadgeVariant } from '../../../components/ui/main_components/Badge';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import badgeMd from '../md_files/badge-instruction.md?raw';
import badgeFigmaMd from '../figma_prompt/badge-prompt.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Variants', type: 'divider' },
  { key: 'filled',    label: 'Filled',     type: 'toggle' },
  { key: 'bordered',  label: 'Bordered',   type: 'toggle' },
  { key: 'tertiary',  label: 'Tertiary',   type: 'toggle' },
  { key: 'dotPrefix', label: 'Dot Prefix', type: 'toggle' },
  { key: 'div1', label: 'Dimensions', type: 'divider' },
  {
    key: 'height', label: 'Height', type: 'number',
    min: 0, max: 64, step: 2,
  },
  { key: 'div2', label: 'Appearance', type: 'divider' },
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
    key: 'paddingX', label: 'Padding', type: 'select',
    options: [
      { value: 'px-2', label: '8px (default)' },
      { value: 'px-3', label: '12px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  filled:       true,
  bordered:     true,
  tertiary:     true,
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
const SEMANTIC: BadgeColor[] = ['primary','secondary','success','warning','critical','gray'];
const EXTENDED: BadgeColor[] = ['cyan','indigo','purple','fuchsia','rose','teal'];

function buildVariants(vals: InputValues): VariantGroup[] {
  const selectedVariants: BadgeVariant[] = [];
  if (vals.filled) selectedVariants.push('filled');
  if (vals.bordered) selectedVariants.push('bordered');
  if (vals.tertiary) selectedVariants.push('tertiary');
  
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
    dotColor: '',
    hideDivider: true,
    styles: [
      makeStyle(v, SEMANTIC, '', '#0056b8'),
      makeStyle(v, EXTENDED, '', '#7839ee'),
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

  const selectedVariants: string[] = [];
  if (vals.filled)   selectedVariants.push('filled');
  if (vals.bordered) selectedVariants.push('bordered');
  if (vals.tertiary) selectedVariants.push('tertiary');
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
  if (paddingX !== 'px-2') {
    md = md.replace(
      /(rounded-[a-z0-9-]+) px-\d+ (py-[0-9.]+ gap-[0-9.]+)/,
      `$1 ${paddingX} $2`,
    );
    md = md.replace(/`px-\d+` = \d+px/, `\`${paddingX}\` = ${pxNote[paddingX] ?? '8px'}`);
  }

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

/* ── Figma maps ─────────────────────────────────────────── */
const BADGE_FIGMA_RADIUS: Record<string, { var: string; px: string; desc: string }> = {
  '4px':  { var: 'radius-xs',   px: '4px',   desc: '4px' },
  '8px':  { var: 'radius-md',   px: '8px',   desc: '8px' },
  'full': { var: 'radius-full', px: '9999px', desc: '9999 (pill shape)' },
};
const BADGE_FIGMA_PADDING: Record<string, { var: string; px: string }> = {
  'px-2': { var: 'spacing-md', px: '8px' },
  'px-3': { var: 'spacing-xl', px: '12px' },
};
const BADGE_FIGMA_TYPO: Record<string, { style: string; px: string; lh: string }> = {
  '12px': { style: 'Label sm', px: '12px', lh: '16px' },
  '14px': { style: 'Body sm',  px: '14px', lh: '18px' },
};

function transformBadgeFigmaMd(raw: string, vals: InputValues): string {
  let md = raw;
  const textSize    = vals.textSize     as string;
  const borderRadius = vals.borderRadius as string;
  const paddingX    = vals.paddingX     as string;
  const dotPrefix   = vals.dotPrefix    as boolean;

  const selectedVariants: string[] = [];
  if (vals.filled)   selectedVariants.push('filled');
  if (vals.bordered) selectedVariants.push('bordered');
  if (vals.tertiary) selectedVariants.push('tertiary');

  // ── 1. Typography ─────────────────────────────────────────
  const typo = BADGE_FIGMA_TYPO[textSize] ?? BADGE_FIGMA_TYPO['12px'];
  if (textSize !== '12px') {
    md = md.replace(/Label sm\/Medium/g,   `${typo.style}/Medium`);
    md = md.replace(/Label sm\/Regular/g,  `${typo.style}/Regular`);
    md = md.replace(/12px · 16px LH · 0 LS/g, `${typo.px} · ${typo.lh} LH · 0 LS`);
    md = md.replace(/Inter · Medium \(500\) · 12px/g, `Inter · Medium (500) · ${typo.px}`);
    md = md.replace(/\| `Label sm\/Medium` \|/g, `| \`${typo.style}/Medium\` |`);
  }

  // ── 2. Corner radius ──────────────────────────────────────
  const rr = BADGE_FIGMA_RADIUS[borderRadius] ?? BADGE_FIGMA_RADIUS['full'];
  if (rr.var !== 'radius-full') {
    md = md.replace(/\bradius-full\b/g, rr.var);
    md = md.replace(/9999 \(pill shape\)/g, rr.desc);
    md = md.replace(/9999px/g, rr.px);
    md = md.replace(/\(9999\)/g, `(${rr.px})`);
  }

  // ── 3. Padding variable ───────────────────────────────────
  const pad = BADGE_FIGMA_PADDING[paddingX] ?? BADGE_FIGMA_PADDING['px-2'];
  if (paddingX !== 'px-2') {
    md = md.replace(/`spacing-md` \| 8px(?=.*Left|.*Right|.*Padding)/g, `\`${pad.var}\` | ${pad.px}`);
    md = md.replace(/Padding Left\/Right \| `spacing-md`/g, `Padding Left/Right | \`${pad.var}\``);
    md = md.replace(/Padding Left \| `spacing-md`/g,  `Padding Left | \`${pad.var}\``);
    md = md.replace(/Padding Right \| `spacing-md`/g, `Padding Right | \`${pad.var}\``);
  }

  // ── 4. Show Dot default ───────────────────────────────────
  md = md.replace(
    /(`Show Dot#[^`]+` \| BOOLEAN \| )`(?:true|false)`/,
    `$1\`${dotPrefix}\``,
  );

  // ── 5. Remove disabled variant type sections ──────────────
  const VARIANT_MAP: Array<{ key: string; header: string }> = [
    { key: 'filled',   header: '### Colors — Filled Type' },
    { key: 'bordered', header: '### Colors — Bordered Type' },
    { key: 'tertiary', header: '### Colors — Tertiary Type' },
  ];
  for (const { key, header } of VARIANT_MAP) {
    if (!selectedVariants.includes(key)) {
      const escaped = header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      md = md.replace(
        new RegExp(`\\n${escaped}[\\s\\S]*?(?=\\n### |\\n---|\n## |$)`),
        '',
      );
    }
  }

  // Remove disabled type from "Type (N options)" table rows
  if (!selectedVariants.includes('filled'))   md = md.replace(/^\| `Filled` \|[^\n]*\n?/gm, '');
  if (!selectedVariants.includes('bordered')) md = md.replace(/^\| `Bordered` \|[^\n]*\n?/gm, '');
  if (!selectedVariants.includes('tertiary')) md = md.replace(/^\| `Tertiary` \|[^\n]*\n?/gm, '');

  // ── 6. Code-block filtering ────────────────────────────────
  const typeNames: Record<string, string> = { filled: 'Filled', bordered: 'Bordered', tertiary: 'Tertiary' };
  const totalVariants = selectedVariants.length * 12;

  // Section header
  md = md.replace(/### Type \(3 options\)/, `### Type (${selectedVariants.length} option${selectedVariants.length === 1 ? '' : 's'})`);

  // Overview count
  md = md.replace(
    /\| Total Variants \| 36 \(3 Types × 12 Colors\) \|/,
    `| Total Variants | ${totalVariants} (${selectedVariants.length} Type${selectedVariants.length === 1 ? '' : 's'} × 12 Colors) |`,
  );

  // Component Hierarchy code block — Level 2 explicit examples
  // Filled and Bordered are the two explicitly shown types; Tertiary is in "N more"
  if (!selectedVariants.includes('filled')) {
    md = md.replace(
      /^    └── Type=Filled, Color=Primary \[COMPONENT — variant wrapper\][^\n]*\n          └── _base Badge[^\n]*\n/m,
      '',
    );
  }
  if (!selectedVariants.includes('bordered')) {
    md = md.replace(
      /^    └── Type=Bordered, Color=Primary\n          └── _base Badge[^\n]*\n/m,
      '',
    );
  }
  // If both Filled and Bordered are off but Tertiary is on, show Tertiary as the example
  if (!selectedVariants.includes('filled') && !selectedVariants.includes('bordered') && selectedVariants.includes('tertiary')) {
    md = md.replace(
      /^    └── … \(\d+ more variants, same structure\)/m,
      '    └── Type=Tertiary, Color=Primary [COMPONENT — variant wrapper]\n          └── _base Badge          [INSTANCE of Level 1]\n    └── … (11 more variants, same structure)',
    );
  } else {
    // Update "N more" count in hierarchy
    const hierarchyShown = selectedVariants.filter(v => v === 'filled' || v === 'bordered').length;
    const hierarchyMore = totalVariants - hierarchyShown;
    md = md.replace(/^    └── … \(\d+ more variants, same structure\)/m, `    └── … (${hierarchyMore} more variants, same structure)`);
  }

  // Level 2 Variant Structure code block — remove disabled type blocks
  for (const key of ['filled', 'bordered', 'tertiary']) {
    if (!selectedVariants.includes(key)) {
      const name = typeNames[key];
      md = md.replace(
        new RegExp(`  ├── Type=${name}, Color=Primary[^\\n]*\\n(?:  │[^\\n]*\\n)*  │\\n`),
        '',
      );
    }
  }
  // Update "N more variants" count in Variant Structure
  const structureShown = selectedVariants.length; // one per enabled type
  const structureMore = totalVariants - structureShown;
  md = md.replace(/^  └── … \d+ more variants \(same structure\)/m, `  └── … ${structureMore} more variants (same structure)`);

  // Inheritance blockquote example — ensure it shows an enabled type
  // Original shows "Type=Bordered" — change if Bordered is off
  if (!selectedVariants.includes('bordered')) {
    const fallback = typeNames[selectedVariants[0]] ?? 'Filled';
    md = md.replace(
      /^> ▼ Type=Bordered, Color=Primary/m,
      `> ▼ Type=${fallback}, Color=Primary`,
    );
    md = md.replace(
      /^> ▼ Bordered, Primary/m,
      `> ▼ ${fallback}, Primary`,
    );
  }

  // "What changes between variants" table — remove disabled type columns
  // The table has format: | What changes | Filled | Bordered | Tertiary |
  for (const key of ['filled', 'bordered', 'tertiary']) {
    if (!selectedVariants.includes(key)) {
      const name = typeNames[key];
      // Header row
      md = md.replace(new RegExp(` \\| ${name}(?= \\||$)`, 'gm'), '');
      // Separator row — remove one |---| for each disabled col
      // Done after all column removals below
    }
  }
  // Fix separator row to match remaining column count (1 "What changes" + N enabled types)
  const colCount = 1 + selectedVariants.length;
  const newSep = Array(colCount).fill('---').map(s => `| ${s} `).join('') + '|';
  md = md.replace(/^\|---\|---\|---\|---\|$/m, newSep);

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
      figmaMarkdownContent={badgeFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformBadgeMd}
      transformFigmaMarkdown={transformBadgeFigmaMd}
    />
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
