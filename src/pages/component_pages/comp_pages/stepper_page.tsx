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

  // ── Caption inline refs (code blocks / arrangement not covered by markers) ──
  if (!showCaption) {
    // Remove Supporting text subtree from _base Step Structure code block
    md = md.replace(
      /\n        │\n        └── Supporting text[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*\n/,
      '\n',
    );
    // ├── Text becomes └── Text (now the last child)
    md = md.replace(
      '        ├── Text                   [TEXT · FILL × HUG]',
      '        └── Text                   [TEXT · FILL × HUG]',
    );
    // Arrangement code block subtitle line
    md = md.replace(
      /│    Size × State · Connector · Text · Supporting text[ ]+│/,
      '│    Size × State · Connector · Text                    │',
    );
    // Rename "Text stack gap (title ↔ caption)" row label
    md = md.replace(/\| Text stack gap \(title ↔ caption\)/, '| Text stack gap (title ↔ title)');
  }

  if (!showLarge) {
    // `_base Step` Size variant-property row + Step 8 framing + mandatory rule
    // (run before generic size-label stripping so the full source text still matches)
    md = md.replace(
      /\| `Size` \| VARIANT \| `Regular` \| Switches between Regular and Large sizing \|/,
      '| `Size` | VARIANT | `Regular` | Only the Regular size is built |',
    );
    md = md.replace(
      /`Body sm\/Semi Bold` \(Regular\) or `Body md\/Semi Bold` \(Large\)/,
      '`Body sm/Semi Bold`',
    );
    // Comparison tables: remove Large / Large Style column
    md = removeTableColumn(md, 'Large');
    md = removeTableColumn(md, 'Large Style');
    // Hierarchy tree lines
    md = md.replace(/^[ \t]*[├└│][^\n]*Size=Large[^\n]*\n/gm, '');
    // Fix ├── that became the last tree entry after Large lines removed
    md = md.replace(/  ├── Size=Regular\n  └── Size=Large/, '  └── Size=Regular');
    // Table rows whose first cell contains Large or (L)
    md = md.replace(/^\| [^|]*(Large|\(L\))[^|]*\|[^\n]*\n/gm, '');
    // Construction blocks: **Size=Large:** and **`Size=Large`:**
    md = md.replace(/\*\*`?Size=Large`?:\*\*\n[\s\S]*?(?=\n###|\n---|\n##)/g, '');
    // Remove Stepper Size=Large subtree from structure code block
    md = md.replace(/  │\n  └── Size=Large[\s\S]*?(?=\n```\n)/, '');
    md = md.replace(/  ├── Size=Regular\s+\[COMPONENT/, '  └── Size=Regular                [COMPONENT');
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
    // Prose: step combine / expose text
    md = md.replace(/Select both size variants\./g, 'Select the variant.');
    md = md.replace(/Select all 6 variants\./g, 'Select all 3 variants.');
    md = md.replace(/on both Stepper variants\./g, 'on the Stepper variant.');
    md = md.replace(/State × Size/g, 'State');
    md = md.replace(/Size × State/g, 'State');
    // Mandatory Rules inline size references
    md = md.replace(/`Body sm\/Semi Bold` \(Regular\) or `Body md\/Semi Bold` \(Large\)/, '`Body sm/Semi Bold`');
    md = md.replace(/\. \*\*`spacing-5xl`\*\* for Large\./, '.');
    // Arrangement section inline mentions
    md = md.replace(/ · Large · /g, ' · ');
    md = md.replace(/ · Large: Body md/g, '');
    // Arrangement table subtitle: Regular 24px · Large 32px → Regular 24px
    md = md.replace(/ · Large 32px/g, '');
    // Variant counts
    md = md.replace(/6 \(State × Size\)/g, '3 (State)').replace(/6 \(Size × State\)/g, '3 (State)');
    md = md.replace(/2 \(Size\)/g, '1');
    md = md.replace(/_base Step Icon — 6 Variants/g, '_base Step Icon — 3 Variants');
    md = md.replace(/_base Step — 6 Variants/g, '_base Step — 3 Variants');
    md = md.replace(/Stepper — 2 Sizes/g, 'Stepper — 1 Size');
  }

  if (!showRegular) {
    // `_base Step` Size variant-property row + Step 8 framing + mandatory rule
    // (run before generic size-label stripping so the full source text still matches)
    md = md.replace(
      /\| `Size` \| VARIANT \| `Regular` \| Switches between Regular and Large sizing \|/,
      '| `Size` | VARIANT | `Large` | Only the Large size is built |',
    );
    md = md.replace(
      /Duplicate each Regular variant and apply:/,
      'Build each `_base Step` Large variant (Incomplete · Current · Completed) with:',
    );
    md = md.replace(
      /`Body sm\/Semi Bold` \(Regular\) or `Body md\/Semi Bold` \(Large\)/,
      '`Body md/Semi Bold`',
    );
    // Comparison tables: remove Regular / Regular Style column
    md = removeTableColumn(md, 'Regular');
    md = removeTableColumn(md, 'Regular Style');
    // Hierarchy tree lines
    md = md.replace(/^[ \t]*[├└│][^\n]*Size=Regular[^\n]*\n/gm, '');
    // Table rows whose first cell contains Regular or (R)
    md = md.replace(/^\| [^|]*(Regular|\(R\))[^|]*\|[^\n]*\n/gm, '');
    // Construction blocks: **Size=Regular:** and **`Size=Regular`:**
    md = md.replace(/\*\*`?Size=Regular`?:\*\*\n[\s\S]*?(?=\n\*\*`?Size=Large`?:\*\*)/g, '');
    // Remove Stepper Size=Regular subtree from structure code block
    md = md.replace(/  ├── Size=Regular[\s\S]*?  │\n  └── Size=Large/, '  └── Size=Large');
    // Fix _base Step Icon code block labels: Size=Regular → Size=Large, update frame size
    md = md.replace(/State=(Incomplete|Current|Completed), Size=Regular\s+\[COMPONENT · 24×24px/g,
      'State=$1, Size=Large     [COMPONENT · 32×32px');
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
    // Prose: step combine / expose text
    md = md.replace(/Select both size variants\./g, 'Select the variant.');
    md = md.replace(/Select all 6 variants\./g, 'Select all 3 variants.');
    md = md.replace(/on both Stepper variants\./g, 'on the Stepper variant.');
    md = md.replace(/State × Size/g, 'State');
    md = md.replace(/Size × State/g, 'State');
    // Mandatory Rules inline size references
    md = md.replace(/`Body sm\/Semi Bold` \(Regular\) or `Body md\/Semi Bold` \(Large\)/, '`Body md/Semi Bold`');
    md = md.replace(/\*\*`spacing-4xl`\*\* for Regular[^.]+\. \*\*`spacing-5xl`\*\* for Large\./, '**`spacing-5xl`** for `Text and supporting text` paddingBottom.');
    // Arrangement section inline mentions
    md = md.replace(/Regular · Large/g, 'Large');
    md = md.replace(/Regular · /g, '');
    md = md.replace(/ · Regular: Body sm/g, '');
    // Arrangement table subtitle: Regular 24px · Large 32px → Large 32px
    md = md.replace(/Regular 24px · /g, '');
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
