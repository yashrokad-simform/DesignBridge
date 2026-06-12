import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../../../components/ui/main_components/Breadcrumb';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';

import breadcrumbMd from '../md_files/breadcrumb-instruction.md?raw';
import breadcrumbFigmaMd from '../figma_prompt/breadcrumb-prompt.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Typography', type: 'divider' },
  {
    key: 'textSize',
    label: 'Text Size',
    type: 'select',
    options: [
      { value: '12px', label: '12px' },
      { value: '14px', label: '14px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
  { key: 'div1', label: 'Spacing', type: 'divider' },
  {
    key: 'separatorSize',
    label: 'Separator Icon Size',
    type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
    ],
  },
  {
    key: 'gap',
    label: 'Gap Size',
    type: 'select',
    options: [
      { value: '0.5', label: '2px' },
      { value: '1', label: '4px (default)' },
      { value: '1.5', label: '6px' },
      { value: '2', label: '8px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  textSize: '14px',
  separatorSize: '12px',
  gap: '1',
};

function buildVariants(vals: InputValues): VariantGroup[] {
  const tSize = vals.textSize as '12px' | '14px' | '16px';
  const sSize = vals.separatorSize as '12px' | '14px';
  const gapSize = vals.gap as '0.5' | '1' | '1.5' | '2';

  const i1 = 'Home';
  const i2 = 'Products';
  const i3 = 'Category';
  const i4 = 'Item';

  return [
    {
      id: 'item-states',
      label: 'Item States',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'states',
          label: '',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  label: 'Default',
                  node: <BreadcrumbItem label="Products" href="/products" size={tSize} state="default" />,
                },
                {
                  label: 'Hover',
                  node: <BreadcrumbItem label="Products" href="/products" size={tSize} state="hover" />,
                },
                {
                  label: 'Current',
                  node: <BreadcrumbItem label="Products" size={tSize} state="current" />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'breadcrumb',
      label: 'Example Breadcrumbs',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: '2-items',
          label: '2 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} size={tSize} />
                    </Breadcrumb>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: '3-items',
          label: '3 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} href="/products" size={tSize} />
                      <BreadcrumbItem label={i3} size={tSize} />
                    </Breadcrumb>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: '4-items',
          label: '4 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} href="/products" size={tSize} />
                      <BreadcrumbItem label={i3} href="/products/category" size={tSize} />
                      <BreadcrumbItem label={i4} size={tSize} />
                    </Breadcrumb>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

function resolveTokens(vals: InputValues): Record<string, string> {
  const tSize = vals.textSize as string;
  const sSize = vals.separatorSize as string;
  
  let textSizeClass = 'text-sm';
  let leadingClass = 'leading-4.5';
  let pxSize = '14px';
  let pxLeading = '18px';
  
  if (tSize === '12px') {
    textSizeClass = 'text-xs';
    leadingClass = 'leading-4';
    pxSize = '12px';
    pxLeading = '16px';
  } else if (tSize === '16px') {
    textSizeClass = 'text-base';
    leadingClass = 'leading-5.5';
    pxSize = '16px';
    pxLeading = '22px';
  }
  
  const separatorClass = sSize === '14px' ? 'size-3.5' : 'size-3';
  const separatorPx = sSize === '14px' ? '14×14px' : '12×12px';

  const gap = vals.gap as string;
  const gapClass = `gap-${gap}`;
  const gapPx = gap === '0.5' ? '2px' : gap === '1' ? '4px' : gap === '1.5' ? '6px' : '8px';

  return {
    textSizeClass,
    leadingClass,
    pxSize,
    pxLeading,
    separatorClass,
    separatorPx,
    gapClass,
    gapPx,
  };
}

/* ── Figma typography map ───────────────────────────────── */
const FIGMA_TYPO: Record<string, { style: string; px: string; lh: string }> = {
  '12px': { style: 'Label sm', px: '12px', lh: '16px' },
  '14px': { style: 'Body sm',  px: '14px', lh: '18px' },
  '16px': { style: 'Body md',  px: '16px', lh: '22px' },
};
const FIGMA_GAP: Record<string, { var: string; px: string }> = {
  '0.5': { var: 'spacing-xxs', px: '2px' },
  '1':   { var: 'spacing-xs',  px: '4px' },
  '1.5': { var: 'spacing-sm',  px: '6px' },
  '2':   { var: 'spacing-md',  px: '8px' },
};

function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;
  const tSize = vals.textSize as string;
  const sSize = vals.separatorSize as string;
  const gap   = vals.gap as string;

  // ── 1. Text style (typography) ──────────────────────────
  const typo = FIGMA_TYPO[tSize] ?? FIGMA_TYPO['14px'];
  if (tSize !== '14px') {
    md = md.replace(/Body sm\/Regular/g, `${typo.style}/Regular`);
    md = md.replace(/Body sm\/Medium/g,  `${typo.style}/Medium`);
    md = md.replace(/14px · 18px LH · 0 LS/g, `${typo.px} · ${typo.lh} LH · 0 LS`);
    md = md.replace(/14px · 18px LH/g,         `${typo.px} · ${typo.lh} LH`);
    md = md.replace(/Inter · Regular \(400\) · 14px/g, `Inter · Regular (400) · ${typo.px}`);
    md = md.replace(/Inter · Medium \(500\) · 14px/g,  `Inter · Medium (500) · ${typo.px}`);
  }

  // ── 2. Separator icon size ───────────────────────────────
  if (sSize !== '12px') {
    md = md.replace(/Property 1 — Size \| `12px`/g, `Property 1 — Size | \`${sSize}\``);
    md = md.replace(/Property 1 — Size \* \| \`12px\`/g, `Property 1 — Size * | \`${sSize}\``);
    md = md.replace(/Size=12px/g,  `Size=${sSize}`);
    md = md.replace(/\bsize=12px\b/g, `size=${sSize}`);
    // In icon property tables
    md = md.replace(/(Property 1 — Size \| )`12px`/g, `$1\`${sSize}\``);
    md = md.replace(/arrow-right · 12px/g,  `arrow-right · ${sSize}`);
    md = md.replace(/\| `12px` \|(?=.*arrow-right)/g, `| \`${sSize}\` |`);
    md = md.replace(/Icon \[INSTANCE\] → 12px/g,  `Icon [INSTANCE] → ${sSize}`);
    md = md.replace(/12px \[COMPONENT\]/g,          `${sSize} [COMPONENT]`);
  }

  // ── 3. Gap variable ─────────────────────────────────────
  const gapEntry = FIGMA_GAP[gap] ?? FIGMA_GAP['1'];
  // Replace any existing spacing var (xxs/xs/sm/md) + px value in gap context
  md = md.replace(/`spacing-(?:xxs|xs|sm|md)` \((?:2|4|6|8)px\)(?= (?:gap|Gap))/g,
    `\`${gapEntry.var}\` (${gapEntry.px})`);
  md = md.replace(/Bind \*\*Gap\*\* → `spacing-(?:xxs|xs|sm|md)` \((?:2|4|6|8)px\)/g,
    `Bind **Gap** → \`${gapEntry.var}\` (${gapEntry.px})`);
  md = md.replace(/(Gap between items \| )`spacing-(?:xxs|xs|sm|md)` \| (?:2|4|6|8)px/g,
    `$1\`${gapEntry.var}\` | ${gapEntry.px}`);
  md = md.replace(/(Gap \| )`spacing-(?:xxs|xs|sm|md)`/g, `$1\`${gapEntry.var}\``);
  // Variable attachment table
  md = md.replace(/(`Step` variant frame \| Gap \| )`spacing-(?:xxs|xs|sm|md)`/g,
    `$1\`${gapEntry.var}\``);
  // Fallback: any remaining spacing-xs tied to 2px (the known wrong default in the prompt)
  md = md.replace(/spacing-xs \(2px\)/g, `${gapEntry.var} (${gapEntry.px})`);

  return md;
}

export default function BreadcrumbPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={breadcrumbMd}
      markdownFileName="breadcrumb"
      figmaMarkdownContent={breadcrumbFigmaMd}
      resolveTokens={resolveTokens}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
