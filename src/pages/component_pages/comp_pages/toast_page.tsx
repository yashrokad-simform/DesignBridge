import React from 'react';
import { Toast, type ToastVariant, type ToastCornerRadius } from '../../../components/ui/main_components/Toast';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import toastMd from '../md_files/toast-instruction.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  {
    key: 'showClose',
    label: 'Close Icon',
    type: 'toggle',
  },
  {
    key: 'showDescription',
    label: 'Description Text',
    type: 'toggle',
  },
  {
    key: 'cornerRadius',
    label: 'Corner Radius',
    type: 'select',
    options: [
      { value: 'none', label: '0px' },
      { value: 'sm',   label: '6px' },
      { value: 'md',   label: '12px (default)' },
      { value: 'lg',   label: '16px' },
      { value: 'full', label: 'Full' },
    ],
  },
  { key: 'div1', label: 'Variants', type: 'divider' },
  {
    key: 'variants',
    label: '',
    type: 'togglelist',
    options: [
      { value: 'success',  label: 'Success' },
      { value: 'warning',  label: 'Warning' },
      { value: 'critical', label: 'Critical' },
      { value: 'info',     label: 'Info' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  variants:        'success,warning,critical,info',
  showClose:       true,
  showDescription: true,
  cornerRadius:    'md',
};

/* ── Variant dot colors per toast variant ───────────────── */
const DOT_COLOR: Record<string, string> = {
  success:  '#22C55E',
  warning:  '#F59E0B',
  critical: '#EF4444',
  info:     '#3B82F6',
};

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const enabledVariants = (vals.variants as string).split(',').filter(Boolean) as ToastVariant[];
  const showClose       = vals.showClose       as boolean;
  const showDescription = vals.showDescription as boolean;
  const cornerRadius    = (vals.cornerRadius   as ToastCornerRadius) ?? 'md';

  return enabledVariants.map(variant => ({
    id:       variant,
    label:    variant.charAt(0).toUpperCase() + variant.slice(1),
    dotColor: '',
    hideDivider: true,
    styles: [
      {
        id:    'preview',
        label: '',
        accentColor: DOT_COLOR[variant] ?? '#888',
        rows: [
          {
            cells: [
              {
                node: (
                  <Toast
                    key={variant}
                    variant={variant}
                    title="Notification title"
                    description={showDescription ? 'Supporting description text goes here.' : undefined}
                    onClose={showClose ? () => {} : undefined}
                    cornerRadius={cornerRadius}
                  />
                ),
              },
            ],
          },
        ],
      },
    ],
  }));
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformToastMd ───────────────────────────────────── */
function transformToastMd(raw: string, vals: InputValues): string {
  let md = raw;

  const enabledVariants = (vals.variants as string).split(',').filter(Boolean);
  const showClose       = vals.showClose       as boolean;
  const showDescription = vals.showDescription as boolean;

  const ALL_VARIANTS: ToastVariant[] = ['success', 'warning', 'critical', 'info'];
  const disabledVariants = ALL_VARIANTS.filter(v => !enabledVariants.includes(v));

  /* ── 1. Variants ─────────────────────────────────────── */
  if (enabledVariants.length > 0) {
    const defaultVariant = enabledVariants.includes('info') ? 'info' : enabledVariants[0];
    const variantType = enabledVariants.map(v => `'${v}'`).join(" \\| ");

    md = md.replace(
      /\| `variant` \| `[^`]+` \| `'[^`]+'` \|/,
      `| \`variant\` | \`${variantType}\` | \`'${defaultVariant}'\` |`,
    );

    // Remove disabled rows from CVA variant table
    for (const v of disabledVariants) {
      md = md.replace(new RegExp(`\\| \`${v}\`[^\\n]*\\n`, 'g'), '');
    }

    // Remove disabled rows from Status Icon Files table
    for (const v of disabledVariants) {
      md = md.replace(new RegExp(`\\| \`${v}\`[^\\n]*\\n`, 'g'), '');
    }
  }

  /* ── 2. Close Icon ───────────────────────────────────── */
  if (!showClose) {
    // Remove onClose prop from Props table
    md = md.replace(/\n\| `onClose` \|[^\n]*\|/g, '');

    // Remove entire Close Button section
    md = md.replace(/\n---\n\n## Close Button[\s\S]*?(?=\n---\n\n## )/, '\n---\n\n');

    // Remove Close Button line from Layout Structure
    md = md.replace(/\s*└── \[Close Button\][^\n]*\n/, '\n');

    // Remove onClose line from Toast Manager section
    md = md.replace(/[^\n]*`onClose` removes the toast[^\n]*\n?/, '');
  }

  /* ── 4. Description Text ─────────────────────────────── */
  if (!showDescription) {
    // Remove description prop from Props table
    md = md.replace(/\n\| `description` \|[^\n]*\|/g, '');

    // Remove Description subsection from Text Content
    md = md.replace(/\n### Description[\s\S]*?(?=\n---\n|\n## )/, '\n');

    // Update gap annotation in Text Content
    md = md.replace(
      /`gap-0\.5` = 2px between title and description/,
      '`gap-0.5` = 2px · description is disabled',
    );
  }

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function ToastPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={toastMd}
      markdownFileName="toast"
      resolveTokens={resolveTokens}
      transformMarkdown={transformToastMd}
    />
  );
}
