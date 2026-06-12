import React from 'react';
import { Stepper, type StepItemData } from '../../../components/ui/main_components/Stepper';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import stepperMd from '../md_files/stepper-instruction.md?raw';
import stepperFigmaMd from '../figma_prompt/stepper-prompt.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Variants', type: 'divider' },
  { key: 'showRegular', label: 'Regular Size', type: 'toggle' },
  { key: 'showLarge',   label: 'Large Size',   type: 'toggle' },
  { key: 'div1', label: 'Options', type: 'divider' },
  { key: 'showCaption', label: 'Caption',  type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  showRegular: true,
  showLarge:   true,
  showCaption: true,
};

/* ── Demo steps ─────────────────────────────────────────── */
const DEMO_STEPS: StepItemData[] = [
  { title: 'Your details',  caption: 'Provide your name and email',   state: 'completed' },
  { title: 'Company info',  caption: 'Provide your company details',  state: 'current'   },
  { title: 'Invite team',   caption: 'Add team members',              state: 'incomplete' },
  { title: 'Review',        caption: 'Confirm all details',           state: 'incomplete' },
];

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showRegular  = vals.showRegular as boolean;
  const showLarge    = vals.showLarge   as boolean;
  const showCaption  = vals.showCaption as boolean;

  const renderRegular = showRegular || !showLarge;
  const renderLarge   = showLarge   || !showRegular;

  const steps = showCaption
    ? DEMO_STEPS
    : DEMO_STEPS.map(s => ({ ...s, caption: undefined }));

  const cells: { label: string; node: React.ReactNode }[] = [];

  if (renderRegular) {
    cells.push({
      label: 'Regular',
      node: (
        <div className="w-[280px]">
          <Stepper steps={steps} size="regular" />
        </div>
      ),
    });
  }

  if (renderLarge) {
    cells.push({
      label: 'Large',
      node: (
        <div className="w-[280px]">
          <Stepper steps={steps} size="large" />
        </div>
      ),
    });
  }

  return [
    {
      id:          'sizes',
      label:       'Sizes',
      dotColor:    '',
      hideDivider: true,
      styles: [
        {
          id:          'all-sizes',
          label:       '',
          accentColor: '#0056b8',
          rows: [{ cells }],
        },
      ],
    },
  ];
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformMarkdown ──────────────────────────────────── */
function transformMarkdown(raw: string, _vals: InputValues): string {
  return raw;
}

/* ── removeTableColumn ───────────────────────────────────── */
function removeTableColumn(md: string, header: string): string {
  const lines = md.split('\n');
  let colIdx = -1;
  return lines.map(line => {
    if (!line.startsWith('|')) { colIdx = -1; return line; }
    const cells = line.split('|');
    if (colIdx === -1) {
      colIdx = cells.findIndex((c, i) => i > 0 && c.trim() === header);
    }
    if (colIdx > 0) {
      const updated = [...cells];
      updated.splice(colIdx, 1);
      return updated.join('|');
    }
    return line;
  }).join('\n');
}

/* ── transformFigmaMarkdown ─────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;
  const showCaption = vals.showCaption as boolean;
  const showRegular = (vals.showRegular as boolean) || !(vals.showLarge as boolean);
  const showLarge   = (vals.showLarge   as boolean) || !(vals.showRegular as boolean);

  // Caption marker blocks
  if (!showCaption) {
    md = md.replace(/<!-- IF_CAPTION -->\n[\s\S]*?<!-- \/IF_CAPTION -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_CAPTION -->\n/g, '').replace(/<!-- \/IF_CAPTION -->\n/g, '');
  }

  // Size marker blocks
  if (!showLarge) {
    md = md.replace(/<!-- IF_LARGE -->\n[\s\S]*?<!-- \/IF_LARGE -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_LARGE -->\n/g, '').replace(/<!-- \/IF_LARGE -->\n/g, '');
  }
  if (!showRegular) {
    md = md.replace(/<!-- IF_REGULAR -->\n[\s\S]*?<!-- \/IF_REGULAR -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_REGULAR -->\n/g, '').replace(/<!-- \/IF_REGULAR -->\n/g, '');
  }

  if (!showLarge) {
    // Comparison tables: remove Large / Large Style column
    md = removeTableColumn(md, 'Large');
    md = removeTableColumn(md, 'Large Style');
    // Hierarchy tree lines
    md = md.replace(/^[ \t]*[├└│][^\n]*Size=Large[^\n]*\n/gm, '');
    // Table rows whose first cell contains Large or (L)
    md = md.replace(/^\| [^|]*(Large|\(L\))[^|]*\|[^\n]*\n/gm, '');
    // Construction blocks: **Size=Large:** and **`Size=Large`:**
    md = md.replace(/\*\*`?Size=Large`?:\*\*\n[\s\S]*?(?=\n###|\n---|\n##)/g, '');
    // Inline paired size values: " · VALUE (Large)" and " · VALUE (L)"
    md = md.replace(/ · [^·\n|]*\(Large\)/g, '');
    md = md.replace(/ · [^·\n|]*\(L\)/g, '');
    // Strip now-redundant size labels on remaining values
    md = md.replace(/ \(Regular\)/g, '');
    md = md.replace(/ \(R\)/g, '');
    // Fixed size notation in code blocks
    md = md.replace(/\(28px R \/ 64px L\)/g, '(28px)');
    md = md.replace(/ or Large \(\d+px\)/g, '');
    // Size property lists
    md = md.replace(/`Regular`, `Large`/g, '`Regular`');
    md = md.replace(/`Regular` · `Large`/g, '`Regular`');
    md = md.replace(/Regular · Large/g, 'Regular');
    md = md.replace(/Regular, `Large`/g, 'Regular');
    // Prose: step combine text
    md = md.replace(/Select both size variants\./g, 'Select the variant.');
    md = md.replace(/Select all 6 variants\./g, 'Select all 3 variants.');
    md = md.replace(/State × Size/g, 'State');
    md = md.replace(/Size × State/g, 'State');
    // Arrangement section inline mentions
    md = md.replace(/ · Large · /g, ' · ');
    md = md.replace(/ · Large: Body md/g, '');
    // Variant counts
    md = md.replace(/6 \(State × Size\)/g, '3 (State)').replace(/6 \(Size × State\)/g, '3 (State)');
    md = md.replace(/2 \(Size\)/g, '1');
    md = md.replace(/_base Step Icon — 6 Variants/g, '_base Step Icon — 3 Variants');
    md = md.replace(/_base Step — 6 Variants/g, '_base Step — 3 Variants');
    md = md.replace(/Stepper — 2 Sizes/g, 'Stepper — 1 Size');
  }

  if (!showRegular) {
    // Comparison tables: remove Regular / Regular Style column
    md = removeTableColumn(md, 'Regular');
    md = removeTableColumn(md, 'Regular Style');
    // Hierarchy tree lines
    md = md.replace(/^[ \t]*[├└│][^\n]*Size=Regular[^\n]*\n/gm, '');
    // Table rows whose first cell contains Regular or (R)
    md = md.replace(/^\| [^|]*(Regular|\(R\))[^|]*\|[^\n]*\n/gm, '');
    // Construction blocks: **Size=Regular:** and **`Size=Regular`:**
    md = md.replace(/\*\*`?Size=Regular`?:\*\*\n[\s\S]*?(?=\n\*\*`?Size=Large`?:\*\*)/g, '');
    // Inline paired size values: "VALUE (Regular) · " and "VALUE (R) · "
    md = md.replace(/\S+ \(Regular\) · /g, '');
    md = md.replace(/HUG × FILL \(R\) · /g, '');
    // Strip now-redundant size labels on remaining values
    md = md.replace(/ \(Large\)/g, '');
    md = md.replace(/ \(L\)/g, '');
    // Fixed size notation in code blocks
    md = md.replace(/\(28px R \/ 64px L\)/g, '(64px)');
    md = md.replace(/Regular \(\d+px\) or /g, '');
    // Size property lists
    md = md.replace(/`Regular`, `Large`/g, '`Large`');
    md = md.replace(/`Regular` · `Large`/g, '`Large`');
    md = md.replace(/Regular · Large/g, 'Large');
    md = md.replace(/`Regular`, /g, '');
    // Prose: step combine text
    md = md.replace(/Select both size variants\./g, 'Select the variant.');
    md = md.replace(/Select all 6 variants\./g, 'Select all 3 variants.');
    md = md.replace(/State × Size/g, 'State');
    md = md.replace(/Size × State/g, 'State');
    // Arrangement section inline mentions
    md = md.replace(/Regular · Large/g, 'Large');
    md = md.replace(/Regular · /g, '');
    md = md.replace(/ · Regular: Body sm/g, '');
    // Variant counts
    md = md.replace(/6 \(State × Size\)/g, '3 (State)').replace(/6 \(Size × State\)/g, '3 (State)');
    md = md.replace(/2 \(Size\)/g, '1');
    md = md.replace(/_base Step Icon — 6 Variants/g, '_base Step Icon — 3 Variants');
    md = md.replace(/_base Step — 6 Variants/g, '_base Step — 3 Variants');
    md = md.replace(/Stepper — 2 Sizes/g, 'Stepper — 1 Size');
  }

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function StepperPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={stepperMd}
      markdownFileName="stepper"
      figmaMarkdownContent={stepperFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
