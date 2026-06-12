import React from 'react';
import { Input, type InputCornerRadius, type InputPadding, type InputTextSize } from '../../../components/ui/main_components/Input';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import inputMd from '../md_files/input-instruction.md?raw';
import inputFigmaMd from '../figma_prompt/input-prompt.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showLabel',    label: 'Label',         type: 'toggle' },
  { key: 'showRequired', label: 'Required',      type: 'toggle' },
  { key: 'showHelper',   label: 'Helper Text',   type: 'toggle' },
  { key: 'showLeading',  label: 'Leading Icon',  type: 'toggle' },
  { key: 'showTrailing', label: 'Trailing Icon', type: 'toggle' },
  { key: 'div1', label: 'Appearance', type: 'divider' },
  {
    key: 'cornerRadius',
    label: 'Corner Radius',
    type: 'select',
    options: [
      { value: '4px',  label: '4px' },
      { value: '8px',  label: '8px' },
      { value: '12px', label: '12px (default)' },
      { value: '16px', label: '16px' },
      { value: 'full', label: 'Full' },
    ],
  },
  {
    key: 'padding',
    label: 'Padding',
    type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
      { value: '16px', label: '16px' },
      { value: '20px', label: '20px' },
    ],
  },
  { key: 'height', label: 'Height (px)', type: 'number', min: 28, max: 80, step: 1 },
  {
    key: 'textSize',
    label: 'Text Size',
    type: 'select',
    options: [
      { value: '14px', label: '14px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  showLabel:    true,
  showRequired: true,
  showHelper:   true,
  showLeading:  true,
  showTrailing: true,
  cornerRadius: '12px',
  padding:      '12px',
  height:       44,
  textSize:     '14px',
};

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showLabel    = vals.showLabel    as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper   = vals.showHelper   as boolean;
  const showLeading  = vals.showLeading  as boolean;
  const showTrailing = vals.showTrailing as boolean;
  const cornerRadius = (vals.cornerRadius as InputCornerRadius) ?? '12px';
  const padding      = (vals.padding      as InputPadding)       ?? '12px';
  const height       = (vals.height       as number)             ?? 44;
  const textSize     = (vals.textSize     as InputTextSize)      ?? '14px';

  const leading  = showLeading  ? <SearchIcon /> : undefined;
  const trailing = showTrailing ? <CloseIcon />  : undefined;
  const label    = showLabel    ? 'Label'        : undefined;
  const required = showLabel && showRequired;
  const helper   = showHelper   ? 'This is a hint text to help user.' : undefined;

  return [
    {
      id:          'States',
      label:       'States',
      dotColor:    '',
      hideDivider: true,
      styles: [
        {
          id:          'all-states',
          label:       '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: (
                    <div className="w-[400px]">
                      <Input
                        label={label}
                        required={required}
                        placeholder="Text"
                        helperText={helper}
                        leadingIcon={leading}
                        trailingIcon={trailing}
                        cornerRadius={cornerRadius}
                        padding={padding}
                        height={height}
                        textSize={textSize}
                      />
                    </div>
                  ),
                },
                {
                  label: 'Focused',
                  node: (
                    <div className="w-[400px]">
                      <Input
                        label={label}
                        required={required}
                        placeholder="Text"
                        helperText={helper}
                        focused
                        leadingIcon={leading}
                        trailingIcon={trailing}
                        cornerRadius={cornerRadius}
                        padding={padding}
                        height={height}
                        textSize={textSize}
                      />
                    </div>
                  ),
                },
              ],
            },
            {
              cells: [
                {
                  label: 'Filled',
                  node: (
                    <div className="w-[400px]">
                      <Input
                        label={label}
                        required={required}
                        defaultValue="Text"
                        helperText={helper}
                        leadingIcon={leading}
                        trailingIcon={trailing}
                        cornerRadius={cornerRadius}
                        padding={padding}
                        height={height}
                        textSize={textSize}
                      />
                    </div>
                  ),
                },
                {
                  label: 'Disabled',
                  node: (
                    <div className="w-[400px]">
                      <Input
                        label={label}
                        required={required}
                        defaultValue="Text"
                        helperText={helper}
                        disabled
                        leadingIcon={leading}
                        trailingIcon={trailing}
                        cornerRadius={cornerRadius}
                        padding={padding}
                        height={height}
                        textSize={textSize}
                      />
                    </div>
                  ),
                },
              ],
            },
            {
              cells: [
                {
                  label: 'Error',
                  node: (
                    <div className="w-[400px]">
                      <Input
                        label={label}
                        required={required}
                        defaultValue="Text"
                        errorText="This is a hint text to help user."
                        leadingIcon={leading}
                        trailingIcon={trailing}
                        cornerRadius={cornerRadius}
                        padding={padding}
                        height={height}
                        textSize={textSize}
                      />
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

/* ── MD helpers ─────────────────────────────────────────── */
const RADIUS_MD: Record<InputCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  'full': 'rounded-full',
};

const PADDING_MD: Record<InputPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MD: Record<InputTextSize, string> = {
  '14px': 'text-sm',
  '16px': 'text-base',
};

function hClass(h: number): string {
  const n = h / 4;
  if (Number.isInteger(n)) return `h-${n}`;
  if (Number.isInteger(n * 2)) return `h-${n}`;
  return `h-[${h}px]`;
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformMarkdown ──────────────────────────────────── */
function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const cornerRadius = (vals.cornerRadius as InputCornerRadius) ?? '12px';
  const padding      = (vals.padding      as InputPadding)       ?? '12px';
  const height       = (vals.height       as number)             ?? 44;
  const textSize     = (vals.textSize     as InputTextSize)      ?? '14px';

  const radiusCls  = RADIUS_MD[cornerRadius];
  const paddingCls = PADDING_MD[padding];
  const heightCls  = hClass(height);
  const textCls    = TEXT_SIZE_MD[textSize];
  const leadingCls = textSize === '16px' ? 'leading-5.5' : 'leading-4.5';

  // CVA base classes
  md = md.replace(
    /flex items-center h-\S+ w-full \S+ border \S+ gap-2/g,
    `flex items-center ${heightCls} w-full ${radiusCls} border ${paddingCls} gap-2`,
  );

  // CVA descriptive note
  md = md.replace(
    /> `h-[^`]+` = \d+px · `[^`]+` = \d+px · `gap-2` = 8px · `[^`]+` = \d+px/g,
    `> \`${heightCls}\` = ${height}px · \`${paddingCls}\` = ${padding} · \`gap-2\` = 8px · \`${radiusCls}\` = ${cornerRadius}`,
  );

  // Typography table: Value and Placeholder rows
  md = md.replace(
    /(\| (?:Value|Placeholder) \| `)(text-\S+)( font-medium )(leading-\S+)/g,
    `$1${textCls}$3${leadingCls}`,
  );

  // Typography note: update text-size entry
  md = md.replace(
    /`text-\S+` = \d+px(?= · `leading-4`)/g,
    `\`${textCls}\` = ${textSize}`,
  );

  // Typography note: update leading entry
  md = md.replace(
    /`leading-4\.5` ≈ 18px/g,
    textSize === '16px' ? '`leading-5.5` ≈ 22px' : '`leading-4.5` ≈ 18px',
  );

  // Native Input Element block: text size line
  md = md.replace(
    /^text-\S+ font-medium leading-\S+$/m,
    `${textCls} font-medium ${leadingCls}`,
  );

  return md;
}

/* ── Figma transform ────────────────────────────────────── */
const INP_FIGMA_RADIUS: Record<string, string> = {
  '4px': 'radius-xs', '8px': 'radius-md', '12px': 'radius-xl', '16px': 'radius-2xl', 'full': 'radius-full',
};
const INP_FIGMA_PAD: Record<string, { var: string; px: string }> = {
  '12px': { var: 'spacing-xl',  px: '12px' },
  '14px': { var: 'spacing-2xl', px: '14px' },
  '16px': { var: 'spacing-3xl', px: '16px' },
  '20px': { var: 'spacing-4xl', px: '20px' },
};

function transformInputFigmaMd(raw: string, vals: InputValues): string {
  let md = raw;
  const textSize    = vals.textSize    as InputTextSize;
  const cornerRadius = vals.cornerRadius as InputCornerRadius;
  const padding     = vals.padding     as InputPadding;
  const height      = vals.height      as number;
  const showLabel   = vals.showLabel   as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper  = vals.showHelper  as boolean;
  const showLeading = vals.showLeading as boolean;
  const showTrailing = vals.showTrailing as boolean;

  // ── Typography ─────────────────────────────────────────
  if (textSize === '16px') {
    md = md.replace(/Body sm\/Medium/g, 'Body md/Medium');
    md = md.replace(/Inter · Medium 500 · 14px · 18px LH/g, 'Inter · Medium 500 · 16px · 22px LH');
    md = md.replace(/14px · 18px LH · truncated/g, '16px · 22px LH · truncated');
  }

  // ── Corner radius ──────────────────────────────────────
  const rr = INP_FIGMA_RADIUS[cornerRadius] ?? 'radius-xl';
  if (rr !== 'radius-xl') {
    md = md.replace(/`radius-xl`(?=.*(?:Input|corner|Radius))/g, `\`${rr}\``);
    md = md.replace(/(Radius:\s*)radius-xl/g, `$1${rr}`);
    md = md.replace(/(corner radius[^|]*\| )`radius-xl`/g, `$1\`${rr}\``);
  }

  // ── Padding ────────────────────────────────────────────
  const pad = INP_FIGMA_PAD[padding] ?? INP_FIGMA_PAD['12px'];
  if (padding !== '12px') {
    md = md.replace(/`spacing-xl` \(12px\)(?=.*(?:Left|Right|Padding))/g, `\`${pad.var}\` (${pad.px})`);
    md = md.replace(/(Input padding (?:Left|Right) \| )`spacing-xl` \| 12px/g, `$1\`${pad.var}\` | ${pad.px}`);
    md = md.replace(/Padding:  spacing-xl \(12px\) Left\/Right/g, `Padding:  ${pad.var} (${pad.px}) Left/Right`);
  }

  // ── Height ─────────────────────────────────────────────
  if (height !== 44) {
    md = md.replace(/FIXED\(44px\)/g,   `FIXED(${height}px)`);
    md = md.replace(/FIXED at 44px/g,   `FIXED at ${height}px`);
    md = md.replace(/Fixed \(44px\)/g,  `Fixed (${height}px)`);
    md = md.replace(/height = \*\*FIXED at 44px\*\*/g, `height = **FIXED at ${height}px**`);
  }

  // ── Boolean defaults ───────────────────────────────────
  md = md.replace(/(Show Label[^|]*\| BOOLEAN \| )`(?:true|false)`/, `$1\`${showLabel}\``);
  md = md.replace(/(Mandatory[^|]*\| BOOLEAN \| )`(?:true|false)`/, `$1\`${showRequired}\``);
  md = md.replace(/(Show Hint[^|]*\| BOOLEAN \| )`(?:true|false)`/, `$1\`${showHelper}\``);
  md = md.replace(/(Show Prefix[^|]*\| BOOLEAN \| )`(?:true|false)`/, `$1\`${showLeading}\``);
  md = md.replace(/(Show Suffix[^|]*\| BOOLEAN \| )`(?:true|false)`/, `$1\`${showTrailing}\``);

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function InputPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={inputMd}
      markdownFileName="input"
      figmaMarkdownContent={inputFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformInputFigmaMd}
    />
  );
}
