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
  '16px': 'text-md',
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
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
