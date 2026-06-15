import { ToggleButton, ToggleButtonTile } from '../../../components/ui/main_components/ToggleButton';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import toggleMd from '../md_files/toggleButton-instruction.md?raw';
import toggleFigmaMd from '../figma_prompt/toggle-prompt.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showCaption', label: 'Caption (Tile)', type: 'toggle' },
  { key: 'div1', label: 'Appearance', type: 'divider' },
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
];

const DEFAULT_VALUES: InputValues = {
  showCaption: true,
  textSize:    '14px',
};

const SIZE_MAP: Record<string, string> = {
  '12px': 'text-xs',
  '14px': 'text-sm',
  '16px': 'text-base',
};

const DEMO_LABEL   = 'Toggle label';
const DEMO_TITLE   = 'Option title';
const DEMO_CAPTION = 'Optional caption text';

function buildVariants(vals: InputValues): VariantGroup[] {
  const label   = DEMO_LABEL;
  const caption = (vals.showCaption as boolean) ? DEMO_CAPTION : undefined;
  const sizeCls = SIZE_MAP[vals.textSize as string] ?? 'text-sm';

  return [
    {
      id: 'toggle-button',
      label: 'Toggle Button',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'tb-states',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                { label: 'Enabled',         node: <ToggleButton label={label} labelSize={sizeCls} /> },
                { label: 'Active',          node: <ToggleButton label={label} labelSize={sizeCls} defaultChecked /> },
                { label: 'Disabled',        node: <ToggleButton label={label} labelSize={sizeCls} disabled /> },
                { label: 'Active Disabled', node: <ToggleButton label={label} labelSize={sizeCls} defaultChecked disabled /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'toggle-button-tile',
      label: 'Toggle Button Tile',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'tbt-states',
          label: '',
          accentColor: '#7839ee',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: <div className="w-[220px]"><ToggleButtonTile title={DEMO_TITLE} caption={caption} titleSize={sizeCls} /></div>,
                },
                {
                  label: 'Active',
                  node: <div className="w-[220px]"><ToggleButtonTile title={DEMO_TITLE} caption={caption} titleSize={sizeCls} defaultChecked /></div>,
                },
                {
                  label: 'Disabled',
                  node: <div className="w-[220px]"><ToggleButtonTile title={DEMO_TITLE} caption={caption} titleSize={sizeCls} disabled /></div>,
                },
                {
                  label: 'Active Disabled',
                  node: <div className="w-[220px]"><ToggleButtonTile title={DEMO_TITLE} caption={caption} titleSize={sizeCls} defaultChecked disabled /></div>,
                },
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

/* ── Figma prompt transform ─────────────────────────────────────────────────
 * Mirrors the live input controls into the Figma prompt. Text Size maps to a
 * text-style tier: 12px → Label sm, 14px → Body sm, 16px → Body md. The Toggle
 * label + Tile title use the `Body sm/Medium` style, so changing the size swaps
 * that style name (and its px · line-height) everywhere it appears. */
const TEXT_STYLE: Record<string, { name: string; px: string; lh: string }> = {
  '12px': { name: 'Label sm/Medium', px: '12px', lh: '16px' },
  '14px': { name: 'Body sm/Medium',  px: '14px', lh: '18px' },
  '16px': { name: 'Body md/Medium',  px: '16px', lh: '22px' },
};

function transformToggleFigmaMd(raw: string, vals: InputValues): string {
  let md = raw;
  const showCaption = (vals.showCaption as boolean) ?? true;
  const textSize    = (vals.textSize    as string)  || '14px';
  const style       = TEXT_STYLE[textSize] ?? TEXT_STYLE['14px'];

  // ── Customised Settings summary — injected right after the title ──
  const summary =
    `## Customised Settings\n\n` +
    `> Reflects the current Customise panel selections for this export.\n\n` +
    `| Setting | Value |\n|---|---|\n` +
    `| Text Size (Toggle label / Tile title) | \`${style.name}\` · ${style.px} · ${style.lh} LH |\n` +
    `| Caption (Tile \`Supporting text\`) | ${showCaption ? '`Shown`' : '`Hidden`'} |\n\n`;
  md = md.replace(
    /^(# Toggle, Toggle & Toggle Button Tile\n)/,
    `$1\n${summary}`,
  );

  // ── Text Size — swap the `Body sm/Medium` style tier everywhere it appears ──
  // (the caption uses `Label sm/Medium`, a distinct style, so it is untouched)
  if (textSize !== '14px') {
    md = md.split('Body sm/Medium').join(style.name);
    md = md.split('14px · 18px LH').join(`${style.px} · ${style.lh} LH`);
  }

  // ── Caption — mark the Tile "Supporting text" layer hidden everywhere ──
  if (!showCaption) {
    // Component Structure hierarchy
    md = md.replace(
      '└── Supporting text [TEXT · FILL × HUG]',
      '└── Supporting text [TEXT · FILL × HUG · HIDDEN — caption off]',
    );
    // Layer Descriptions table
    md = md.replace(
      '| `Supporting text` | TEXT | Caption. `Label sm/Medium`. FILL × HUG |',
      '| `Supporting text` | TEXT | Caption. `Label sm/Medium`. FILL × HUG · **Hidden (caption off)** |',
    );
    // Construction step
    md = md.replace(
      '2. Default content: `Caption`.',
      '2. Default content: `Caption`. _(Hidden — caption is turned off; omit this layer.)_',
    );
  }

  return md;
}

export default function ToggleButtonPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={toggleMd}
      markdownFileName="toggleButton"
      figmaMarkdownContent={toggleFigmaMd}
      transformFigmaMarkdown={transformToggleFigmaMd}
      resolveTokens={resolveTokens}
    />
  );
}
