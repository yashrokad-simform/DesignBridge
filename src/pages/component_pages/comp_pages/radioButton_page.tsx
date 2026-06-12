import { RadioButton, RadioTile, RadioGroup } from '../../../components/ui/main_components/RadioButton';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import radioMd from '../md_files/radioButton-instruction.md?raw';
import radioFigmaMd from '../figma_prompt/radio-button-prompt.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showCaption', label: 'Caption', type: 'toggle' },
  { key: 'div1', label: 'Appearance', type: 'divider' },
  {
    key: 'cornerRadius',
    label: 'Tile Corner Radius',
    type: 'select',
    options: [
      { value: '8px',  label: '8px' },
      { value: '12px', label: '12px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
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
  showLabel:    true,
  showCaption:  true,
  cornerRadius: '12px',
  textSize:     '14px',
};

const SIZE_MAP: Record<string, string> = {
  '12px': 'text-xs',
  '14px': 'text-sm',
  '16px': 'text-base',
};

const RADIUS_MAP: Record<string, { cls: string; px: string }> = {
  '8px':  { cls: 'rounded-lg',  px: '8px'  },
  '12px': { cls: 'rounded-xl',  px: '12px' },
  '16px': { cls: 'rounded-2xl', px: '16px' },
};

const DEMO_LABEL   = 'Radio Button';
const DEMO_TITLE   = 'Option title';
const DEMO_CAPTION = 'Optional caption text';

function buildVariants(vals: InputValues): VariantGroup[] {
  const showLabel   = vals.showLabel   as boolean;
  const showCaption = vals.showCaption as boolean;
  const radiusCls   = RADIUS_MAP[vals.cornerRadius as string]?.cls ?? 'rounded-xl';
  const sizeCls     = SIZE_MAP[vals.textSize as string] ?? 'text-sm';

  const label   = showLabel   ? DEMO_LABEL   : undefined;
  const caption = showCaption ? DEMO_CAPTION : undefined;

  return [
    {
      id: 'radio-button',
      label: 'Radio Button',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'rb-states',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: (
                    <RadioGroup name="rb-en">
                      <RadioButton value="a" label={label} labelSize={sizeCls} />
                    </RadioGroup>
                  ),
                },
                {
                  label: 'Selected',
                  node: (
                    <RadioGroup name="rb-sel" defaultValue="a">
                      <RadioButton value="a" label={label} labelSize={sizeCls} />
                    </RadioGroup>
                  ),
                },
                {
                  label: 'Disabled',
                  node: (
                    <RadioGroup name="rb-dis" disabled>
                      <RadioButton value="a" label={label} labelSize={sizeCls} />
                    </RadioGroup>
                  ),
                },
                {
                  label: 'Disabled Selected',
                  node: (
                    <RadioGroup name="rb-dis-sel" defaultValue="a" disabled>
                      <RadioButton value="a" label={label} labelSize={sizeCls} />
                    </RadioGroup>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'radio-tile',
      label: 'Radio Button Tile',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'rt-states',
          label: '',
          accentColor: '#7839ee',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: (
                    <div className="w-[220px]">
                      <RadioGroup name="rt-en">
                        <RadioTile value="a" title={DEMO_TITLE} caption={caption} className={radiusCls} titleSize={sizeCls} />
                      </RadioGroup>
                    </div>
                  ),
                },
                {
                  label: 'Selected',
                  node: (
                    <div className="w-[220px]">
                      <RadioGroup name="rt-sel" defaultValue="a">
                        <RadioTile value="a" title={DEMO_TITLE} caption={caption} className={radiusCls} titleSize={sizeCls} />
                      </RadioGroup>
                    </div>
                  ),
                },
                {
                  label: 'Disabled',
                  node: (
                    <div className="w-[220px]">
                      <RadioGroup name="rt-dis" disabled>
                        <RadioTile value="a" title={DEMO_TITLE} caption={caption} className={radiusCls} titleSize={sizeCls} />
                      </RadioGroup>
                    </div>
                  ),
                },
                {
                  label: 'Disabled Selected',
                  node: (
                    <div className="w-[220px]">
                      <RadioGroup name="rt-dis-sel" defaultValue="a" disabled>
                        <RadioTile value="a" title={DEMO_TITLE} caption={caption} className={radiusCls} titleSize={sizeCls} />
                      </RadioGroup>
                    </div>
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

function transformMarkdown(raw: string, vals: InputValues): string {
  const { cls, px } = RADIUS_MAP[vals.cornerRadius as string] ?? RADIUS_MAP['12px'];
  let md = raw;

  md = md.replace(
    /flex flex-row items-start w-full rounded[\w-]* border p-3 gap-2/,
    `flex flex-row items-start w-full ${cls} border p-3 gap-2`,
  );

  md = md.replace(
    /> `p-3` = 12px · `gap-2` = 8px · `rounded[\w-]*` = \d+px/,
    `> \`p-3\` = 12px · \`gap-2\` = 8px · \`${cls}\` = ${px}`,
  );

  return md;
}

function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── Figma transform ────────────────────────────────────── */
const RB_FIGMA_RADIUS: Record<string, string> = {
  '8px': 'radius-md', '12px': 'radius-xl', '16px': 'radius-2xl',
};
const RB_FIGMA_TYPO: Record<string, { style: string; px: string; lh: string }> = {
  '12px': { style: 'Label sm', px: '12px', lh: '16px' },
  '14px': { style: 'Body sm',  px: '14px', lh: '18px' },
  '16px': { style: 'Body md',  px: '16px', lh: '22px' },
};

function transformRadioFigmaMd(raw: string, vals: InputValues): string {
  let md = raw;
  const textSize    = vals.textSize    as string;
  const cornerRadius = vals.cornerRadius as string;
  const showCaption = vals.showCaption as boolean;

  // ── Typography ─────────────────────────────────────────
  const typo = RB_FIGMA_TYPO[textSize] ?? RB_FIGMA_TYPO['14px'];
  if (textSize !== '14px') {
    md = md.replace(/Body sm\/Medium/g,  `${typo.style}/Medium`);
    md = md.replace(/Body sm\/Regular/g, `${typo.style}/Regular`);
    md = md.replace(/Inter · Medium \(500\) · 14px · 18px LH/g,
      `Inter · Medium (500) · ${typo.px} · ${typo.lh} LH`);
    md = md.replace(/14px · 18px LH/g, `${typo.px} · ${typo.lh} LH`);
  }

  // ── Tile corner radius ─────────────────────────────────
  const rr = RB_FIGMA_RADIUS[cornerRadius] ?? 'radius-xl';
  if (rr !== 'radius-xl') {
    md = md.replace(/(Tile corner radius[^|]*\| )`radius-xl`/g, `$1\`${rr}\``);
    md = md.replace(/(Corner Radius: )radius-xl(?=.*(?:Tile|tile))/g, `$1${rr}`);
    md = md.replace(/(Bind corner radius all 4 corners → )`radius-xl`/g, `$1\`${rr}\``);
    md = md.replace(/(Tile frame \| Corner radius[^|]*\| )`radius-xl`/g, `$1\`${rr}\``);
  }

  // ── Show Caption default ───────────────────────────────
  md = md.replace(
    /(`Show Caption#[^`]+` \| BOOLEAN \| )`(?:true|false)`/,
    `$1\`${showCaption}\``,
  );

  return md;
}

export default function RadioButtonPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={radioMd}
      markdownFileName="radioButton"
      figmaMarkdownContent={radioFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformRadioFigmaMd}
    />
  );
}
