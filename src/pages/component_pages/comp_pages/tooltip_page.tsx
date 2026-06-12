import { Tooltip, type TooltipPlacement } from '../../../components/ui/main_components/Tooltip';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tooltipMd from './tooltip-instruction.md?raw';
import tooltipFigmaMd from '../figma_prompt/tooltip-prompt.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showHeading', label: 'Heading', type: 'toggle' },
  { key: 'showCaption', label: 'Caption', type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  showHeading: true,
  showCaption: true,
  showClose:   false,
};

const HEADING = 'Tooltip heading';
const CAPTION = 'This is a supporting caption for the tooltip.';

function TriggerBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-text-primary border border-input-border-enabled"
    >
      {label}
    </button>
  );
}

function makeCell(heading: string | undefined, caption: string | undefined, showClose: boolean, placement: TooltipPlacement, label: string) {
  return {
    label,
    node: (
      <div className="flex items-center justify-center w-full p-8">
        <Tooltip heading={heading} caption={caption} placement={placement} showClose={showClose}>
          <TriggerBtn label={label} />
        </Tooltip>
      </div>
    ),
  };
}

function buildVariants(vals: InputValues): VariantGroup[] {
  const heading   = (vals.showHeading as boolean) ? HEADING : undefined;
  const caption   = (vals.showCaption as boolean) ? CAPTION : undefined;
  const showClose = vals.showClose as boolean;

  const mc = (p: TooltipPlacement, l: string) => makeCell(heading, caption, showClose, p, l);

  return [
    {
      id: 'tooltip-placements',
      label: 'Tooltip',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'tp-all',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                mc('top',       'Top'),
                mc('top-start', 'Top Start'),
                mc('top-end',   'Top End'),
              ],
            },
            {
              cells: [
                mc('bottom',       'Bottom'),
                mc('bottom-start', 'Bottom Start'),
                mc('bottom-end',   'Bottom End'),
              ],
            },
            {
              cells: [
                mc('right', 'Right'),
                mc('left',  'Left'),
                { label: '', node: <div className="w-full p-8" /> },
              ],
            },
          ],
        },
      ],
    },
  ];
}

function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformFigmaMarkdown ──────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;
  const showHeading = vals.showHeading as boolean;
  const showCaption = vals.showCaption as boolean;

  // ── 1. Overview description paragraph ─────────────────────
  if (!showHeading && !showCaption) {
    md = md.replace(
      /Supports an optional Heading, Caption, and Close button controlled via Boolean properties\./,
      'Supports a Close button controlled via Boolean properties.',
    );
  } else if (!showHeading) {
    md = md.replace(/Heading, Caption, and/, 'Caption and');
  } else if (!showCaption) {
    md = md.replace(/Heading, Caption, and/, 'Heading and');
  }

  // ── 2. Variant Properties table rows ──────────────────────
  if (!showHeading) {
    md = md.replace(/\| `Heading#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
  }
  if (!showCaption) {
    md = md.replace(/\| `Caption#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
  }

  // ── 3. Component Structure code block ─────────────────────
  if (!showHeading && !showCaption) {
    // Remove Heading + its sub-line
    md = md.replace(/[ \t]*│[ \t]*├── Heading[^\n]*\n[ \t]*│[ \t]*│[^\n]*\n/, '');
    // Remove Caption + its sub-line
    md = md.replace(/[ \t]*│[ \t]*└── Caption[^\n]*\n[ \t]*│[^\n]*\n/, '');
    // Remove now-empty Frame 4 block (header line + gap line)
    md = md.replace(/[ \t]*├── Frame 4[ \t]+\[FRAME[^\n]*\n[ \t]*│[ \t]*Gap: spacing-md[^\n]*\n/, '');
  } else if (!showHeading) {
    // Remove Heading + its sub-line; Caption stays as └──
    md = md.replace(/[ \t]*│[ \t]*├── Heading[^\n]*\n[ \t]*│[ \t]*│[^\n]*\n/, '');
  } else if (!showCaption) {
    // Remove Caption + its sub-line
    md = md.replace(/[ \t]*│[ \t]*└── Caption[^\n]*\n[ \t]*│[^\n]*\n/, '');
    // Promote Heading's connector from ├── to └──
    md = md.replace(/([ \t]*│[ \t]*)├── (Heading[ \t]+\[TEXT)/, '$1└── $2');
    // Fix Heading sub-line indent (remove the extra │ column)
    md = md.replace(/([ \t]*│[ \t]*)│([ \t]*\(text content — inspect Frame 4)/, '$1 $2');
  }

  // ── 4. Step 1 — TEXT layer additions ──────────────────────
  if (!showHeading) {
    md = md.replace(/[ \t]*- Add Heading TEXT layer\.[^\n]*\n/, '');
  }
  if (!showCaption) {
    md = md.replace(/[ \t]*- Add Caption TEXT layer\.[^\n]*\n/, '');
  }
  if (!showHeading && !showCaption) {
    // Remove the "Set text styles..." note — no text layers left to style
    md = md.replace(/[ \t]*- \(Set text styles after inspecting `Frame 4`[^\n]*\)\n/, '');
    // Remove the Frame 4 sub-item from the Frame 2 build step
    md = md.replace(/[ \t]*- Add `Frame 4` inside[^\n]*:\n/, '');
  }

  // ── 5. Step 3 — Boolean property additions ────────────────
  if (!showHeading) {
    md = md.replace(/\n\d+\. Add Boolean `Heading` \(default: `true`\)\./, '');
  }
  if (!showCaption) {
    md = md.replace(/\n\d+\. Add Boolean `Caption` \(default: `true`\)\./, '');
  }

  // ── 6. Variable Attachment — Frame 4 row ──────────────────
  if (!showHeading && !showCaption) {
    md = md.replace(/\| `Frame 4` \| Gap[^\n]+\n/, '');
  }

  // ── 7. Mandatory Rules ────────────────────────────────────
  if (!showHeading && !showCaption) {
    md = md.replace(/\n- \*\*Text content in `Frame 4` requires[^\n]+\n/, '\n');
  } else if (!showHeading) {
    md = md.replace(/heading and caption TEXT layer styles/, 'caption TEXT layer styles');
  } else if (!showCaption) {
    md = md.replace(/heading and caption TEXT layer styles/, 'heading TEXT layer styles');
  }

  // ── 8. Flags — Frame 4 text content block ─────────────────
  if (!showHeading && !showCaption) {
    // Remove entire flag block up to the next ### flag
    md = md.replace(
      /\n### ⚠️ `Frame 4` text content — not confirmed[\s\S]*?(?=\n### ⚠️ `VariableID)/,
      '\n',
    );
  } else {
    if (!showHeading) {
      md = md.replace(
        'The `Frame 4` children (Heading and Caption TEXT layers)',
        'The `Frame 4` children (Caption TEXT layers)',
      );
      md = md.replace(/\n- Heading text style and fill/, '');
    }
    if (!showCaption) {
      md = md.replace(
        'The `Frame 4` children (Heading and Caption TEXT layers)',
        'The `Frame 4` children (Heading TEXT layers)',
      );
      md = md.replace(/\n- Caption text style and fill/, '');
    }
  }

  // ── 9. Arrangement ASCII art ──────────────────────────────
  if (!showHeading) {
    // "Close · Heading        │" → "Close                │"
    md = md.replace(/· Heading(\s*│)/, '      $1');
  }
  if (!showCaption) {
    // "Caption · beak arrow indicator" → "beak arrow indicator"
    md = md.replace(/Caption · (beak arrow indicator)/, '$1');
  }

  // ── 10. Arrangement table subtitle ───────────────────────
  if (!showHeading && !showCaption) {
    md = md.replace(/Direction · Heading · Caption ·/, 'Direction ·');
  } else if (!showHeading) {
    md = md.replace(/Direction · Heading · Caption ·/, 'Direction · Caption ·');
    md = md.replace(/· Heading(?= ·)/, '');
    md = md.replace(/· Heading/, '');
  } else if (!showCaption) {
    md = md.replace(/· Heading · Caption ·/, '· Heading ·');
    md = md.replace(/· Caption(?= ·)/, '');
    md = md.replace(/· Caption/, '');
  }

  // ── 11. Clean up excess blank lines left by removals ─────
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md + '\n';
}

export default function TooltipPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={tooltipMd}
      markdownFileName="tooltip"
      figmaMarkdownContent={tooltipFigmaMd}
      resolveTokens={resolveTokens}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
