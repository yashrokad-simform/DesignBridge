import React from 'react';
import { Toast, type ToastVariant, type ToastCornerRadius } from '../../../components/ui/main_components/Toast';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import toastMd from '../md_files/toast-instruction.md?raw';
import toastFigmaMd from '../figma_prompt/toast-prompt.md?raw';

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

/* ── Figma radius token map ──────────────────────────────── */
const RADIUS_FIGMA: Record<ToastCornerRadius, { token: string; value: string }> = {
  none: { token: '0',          value: '0px'   },
  sm:   { token: 'radius-sm',  value: '6px'   },
  md:   { token: 'radius-xl',  value: '12px'  },
  lg:   { token: 'radius-2xl', value: '16px'  },
  full: { token: 'radius-full', value: '9999px' },
};

/* ── transformFigmaMarkdown ──────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const enabledVariants  = (vals.variants as string).split(',').filter(Boolean);
  const showClose        = vals.showClose       as boolean;
  const showDescription  = vals.showDescription as boolean;
  const cornerRadius     = (vals.cornerRadius   as ToastCornerRadius) ?? 'md';

  const ALL_VARIANTS: ToastVariant[] = ['success', 'warning', 'critical', 'info'];
  // Map to Figma variant names (critical → Critcal typo preserved)
  const FIGMA_NAME: Record<string, string> = {
    success: 'Success', warning: 'Warning', critical: 'Critcal', info: 'Info',
  };
  const disabledVariants = ALL_VARIANTS.filter(v => !enabledVariants.includes(v));
  const activeCount = enabledVariants.length || 4;

  // ── 1. Block comment markers ───────────────────────────────
  if (!showDescription) {
    md = md.replace(/<!-- IF_DESCRIPTION -->\n[\s\S]*?<!-- \/IF_DESCRIPTION -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_DESCRIPTION -->\n/g, '').replace(/<!-- \/IF_DESCRIPTION -->\n/g, '');
  }

  if (!showClose) {
    md = md.replace(/<!-- IF_CLOSE -->\n[\s\S]*?<!-- \/IF_CLOSE -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_CLOSE -->\n/g, '').replace(/<!-- \/IF_CLOSE -->\n/g, '');
  }

  // ── 2. Structure code block — description body line ───────
  if (!showDescription) {
    md = md.replace(/^[ \t]*│[ \t]*└── Toast Message[ \t]+\[TEXT · FILL × HUG — body[^\n]*\n([ \t]*│[^\n]*\n)*/m, '');
    // fix last-child connector on title line
    md = md.replace(/├── Toast Message[ \t]+\[TEXT · FILL × HUG — title/, '└── Toast Message [TEXT · FILL × HUG — title');
  }

  // ── 3. Structure code block — close / Frame 1 lines ───────
  if (!showClose) {
    md = md.replace(/^[ \t]*└── Frame 1[ \t]+\[FRAME[^\n]*\n([ \t]*[^\n]*\n)*/m, '');
    // fix last-child connector on Frame 2
    md = md.replace(/├── Frame 2/, '└── Frame 2');
  }

  // ── 4. Variant Structure code block — disabled variants ───
  for (const v of disabledVariants) {
    const name = FIGMA_NAME[v];
    // Remove the ├── or └── State=X block (2 lines each)
    md = md.replace(
      new RegExp(`[ \\t]*[├└]── State=${name}[^\\n]*\\n[ \\t]*│[ \\t]*└── _base Toast[^\\n]*\\n`, 'g'),
      '',
    );
  }
  // Fix last remaining variant connector to └──
  md = md.replace(/  ├── (State=\w+[ \t]+\[COMPONENT[^\n]*\n[ \t]*└── _base Toast[^\n]*)\n([ \t]*\n## )/, '  └── $1\n$2');

  // ── 5. Variant Properties — State options ─────────────────
  if (enabledVariants.length < 4 && enabledVariants.length > 0) {
    const activeOptions = enabledVariants.map(v => `\`${FIGMA_NAME[v]}\``).join(' · ');
    md = md.replace(/`Success` · `Warning` · `Critcal` · `Info`/, activeOptions);
  }

  // ── 6. Icon Per State table — remove disabled rows ────────
  for (const v of disabledVariants) {
    const name = FIGMA_NAME[v];
    md = md.replace(new RegExp(`\\| \`${name}\`[^\\n]+\\n`), '');
  }

  // ── 7. Step 2 icon-per-state table — remove disabled rows ─
  for (const v of disabledVariants) {
    const name = FIGMA_NAME[v];
    md = md.replace(new RegExp(`\\| \`State=${name}\`[^\\n]+\\n`), '');
  }

  // ── 8. Overview variant count ─────────────────────────────
  if (activeCount !== 4) {
    md = md.replace(/Toast Variants \| 4 \(State\)/, `Toast Variants | ${activeCount} (State)`);
    md = md.replace(/Component Hierarchy[^`]*```\nLevel 1[^`]*Level 2 — Toast[^\n]*\[COMPONENT_SET — 4 state variants\]/,
      (m) => m.replace('4 state variants', `${activeCount} state variant${activeCount === 1 ? '' : 's'}`));
    md = md.replace(/\[COMPONENT_SET — 4 state variants\]/, `[COMPONENT_SET — ${activeCount} state variant${activeCount === 1 ? '' : 's'}]`);
  }

  // ── 9. Step 2 & Step 3 variant count text ─────────────────
  if (activeCount !== 4) {
    md = md.replace(/For each of the 4 states:/, `For each of the ${activeCount} state${activeCount === 1 ? '' : 's'}:`);
    md = md.replace(/Select all 4 variants\./, `Select all ${activeCount} variant${activeCount === 1 ? '' : 's'}.`);
    md = md.replace(/Add property `State` → `Success`, `Warning`, `Critcal`, `Info`\./, () => {
      const opts = enabledVariants.map(v => `\`${FIGMA_NAME[v]}\``).join(', ');
      return `Add property \`State\` → ${opts}.`;
    });
    md = md.replace(/on all 4 variants\./, `on all ${activeCount} variant${activeCount === 1 ? '' : 's'}.`);
  }

  // ── 10. Variable Attachment — remove close/description rows
  if (!showClose) {
    md = md.replace(/\| `Frame 1` \| Padding T\/B[^\n]+\n/, '');
    md = md.replace(/\| `Frame 1` \| Gap[^\n]+\n/, '');
    md = md.replace(/\| `close` VECTOR[^\n]+\n/, '');
  }
  if (!showDescription) {
    md = md.replace(/\| `Toast Message` \(body\) \| Text Style[^\n]+\n/, '');
    md = md.replace(/\| `Toast Message` \(body\) \| Fill[^\n]+\n/, '');
  }

  // ── 11. Typography table — remove description row ─────────
  if (!showDescription) {
    md = md.replace(/\| `Toast Message` \(body\)[^\n]+\n/, '');
  }

  // ── 12. Colors table — remove close / description rows ────
  if (!showClose) {
    md = md.replace(/\| `close` VECTOR stroke[^\n]+\n/, '');
  }
  if (!showDescription) {
    md = md.replace(/\| `Toast Message` \(body\) fill[^\n]+\n/, '');
  }

  // ── 13. Spacing table — remove Frame 1 rows ───────────────
  if (!showClose) {
    md = md.replace(/\| `Frame 1` \|[^\n]+\n/g, '');
  }

  // ── 14. Mandatory Rules ────────────────────────────────────
  if (!showClose) {
    md = md.replace(/^- \*\*`Frame 1`[^\n]+\n/m, '');
  }
  if (!showDescription) {
    md = md.replace(/^- \*\*Body text style[^\n]+\n/m, '');
  }

  // ── 15. Corner Radius ─────────────────────────────────────
  const { token: rToken, value: rValue } = RADIUS_FIGMA[cornerRadius];
  if (rToken !== 'radius-xl') {
    md = md.replace(/Radius:      radius-xl \(all 4 corners\)/, `Radius:      ${rToken} (all 4 corners)`);
    md = md.replace(/\| `_base Toast` \(all 4 corners\) \| `radius-xl` \| 12px \|/, `| \`_base Toast\` (all 4 corners) | \`${rToken}\` | ${rValue} |`);
    md = md.replace(/Bind corner radius all 4 → `radius-xl`\./, `Bind corner radius all 4 → \`${rToken}\`.`);
    md = md.replace(/\| `_base Toast` frame \| Corner radius \(all 4\) \| `radius-xl` \|/, `| \`_base Toast\` frame | Corner radius (all 4) | \`${rToken}\` |`);
    md = md.replace(/spacing-xl padding · radius-xl/, `spacing-xl padding · ${rToken}`);
    if (rToken === '0') {
      // No radius — remove radius binding step
      md = md.replace(/5\. Bind corner radius all 4 → `0`\.\n/, '');
      md = md.replace(/Radius:      0 \(all 4 corners\)\n/, '');
      // Remove entire Radius section from Attached Variables
      md = md.replace(/### Radius\n\n\| Layer[^\n]+\n\|[^\n]+\n\| `_base Toast`[^\n]+\n\n/, '');
    }
  }

  // ── 16. Arrangement section ────────────────────────────────
  const activeLabels = enabledVariants.map(v => FIGMA_NAME[v]).join(' · ');
  if (activeCount !== 4) {
    md = md.replace(/4 states · Success · Warning · Critical · Info/, `${activeCount} state${activeCount === 1 ? '' : 's'} · ${activeLabels}`);
    md = md.replace(/▌ Toast — All 4 States/, `▌ Toast — All ${activeCount} State${activeCount === 1 ? '' : 's'}`);
    // Box-art format: replace state labels line (followed by whitespace + │ border)
    md = md.replace(/Success · Warning · Critical · Info(\s*│)/, `${activeLabels}$1`);
    md = md.replace(/\| `Toast — All 4 States`[^\n]+\n/, `| \`Toast — All ${activeCount} State${activeCount === 1 ? '' : 's'}\` | \`State · ${activeLabels} · vuesax/bold icons · icon-only differentiation\` | Actual \`Toast\` COMPONENT_SET |\n`);
  }
  if (!showClose) {
    md = md.replace(/Show Icon · Show Light · close button/, 'Show Icon · Show Light');
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
      figmaMarkdownContent={toastFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformToastMd}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
