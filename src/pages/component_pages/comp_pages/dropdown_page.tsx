import React, { useState } from 'react';
import {
  Dropdown,
  type DropdownOption,
  type DropdownCornerRadius,
  type DropdownPadding,
  type DropdownTextSize,
} from '../../../components/ui/main_components/Dropdown';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import dropdownMd from '../md_files/dropdown-instruction.md?raw';

const FRUITS: DropdownOption[] = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'date',       label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',        label: 'Fig' },
];

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showLabel',    label: 'Label',        type: 'toggle' },
  { key: 'showRequired', label: 'Required',     type: 'toggle' },
  { key: 'showHelper',   label: 'Helper Text',  type: 'toggle' },
  { key: 'showLeading',  label: 'Leading Icon', type: 'toggle' },
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
  { key: 'height', label: 'Height (px)', type: 'number', min: 28, max: 80 },
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
  showLeading:  false,
  cornerRadius: '12px',
  padding:      '12px',
  height:       44,
  textSize:     '14px',
};

/* ── Demo components (need local state for selection) ───── */
interface DemoProps {
  label?: string;
  required?: boolean;
  helper?: string;
  leading?: React.ReactNode;
  cornerRadius: DropdownCornerRadius;
  padding: DropdownPadding;
  height: number;
  textSize: DropdownTextSize;
  errorText?: string;
  disabled?: boolean;
  multiple?: boolean;
}

function SingleDemo({ label, required, helper, leading, cornerRadius, padding, height, textSize, errorText, disabled }: DemoProps) {
  const [value, setValue] = useState('');
  return (
    <div className="w-[400px]">
      <Dropdown
        label={label}
        required={required}
        placeholder="Select"
        options={FRUITS}
        value={value}
        onChange={v => setValue(v as string)}
        helperText={helper}
        errorText={errorText}
        disabled={disabled}
        leadingIcon={leading}
        cornerRadius={cornerRadius}
        padding={padding}
        height={height}
        textSize={textSize}
      />
    </div>
  );
}

function MultiDemo({ label, required, helper, leading, cornerRadius, padding, height, textSize }: DemoProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="w-[400px]">
      <Dropdown
        label={label}
        required={required}
        placeholder="Select"
        options={FRUITS}
        value={value}
        onChange={v => setValue(v as string[])}
        multiple
        searchable
        helperText={helper}
        leadingIcon={leading}
        cornerRadius={cornerRadius}
        padding={padding}
        height={height}
        textSize={textSize}
      />
    </div>
  );
}

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showLabel    = vals.showLabel    as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper   = vals.showHelper   as boolean;
  const showLeading  = vals.showLeading  as boolean;
  const cornerRadius = (vals.cornerRadius as DropdownCornerRadius) ?? '12px';
  const padding      = (vals.padding      as DropdownPadding)       ?? '12px';
  const height       = (vals.height       as number)                ?? 44;
  const textSize     = (vals.textSize     as DropdownTextSize)      ?? '14px';

  const label    = showLabel    ? 'Label'   : undefined;
  const required = showLabel && showRequired;
  const helper   = showHelper   ? 'This is a hint text to help user.' : undefined;
  const leading  = showLeading  ? <SearchIcon /> : undefined;

  const common: DemoProps = { label, required, helper, leading, cornerRadius, padding, height, textSize };

  return [
    {
      id:          'states',
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
                { label: 'Default',      node: <SingleDemo {...common} /> },
                { label: 'Multi Select', node: <MultiDemo {...common} /> },
              ],
            },
            {
              cells: [
                { label: 'Error',    node: <SingleDemo {...common} errorText="This is a hint text to help user." /> },
                { label: 'Disabled', node: <SingleDemo {...common} disabled /> },
              ],
            },
          ],
        },
      ],
    },
  ];
}

/* ── MD helpers ─────────────────────────────────────────── */
const RADIUS_MD: Record<DropdownCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  'full': 'rounded-full',
};

const PADDING_MD: Record<DropdownPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MD: Record<DropdownTextSize, string> = {
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

  const cornerRadius = (vals.cornerRadius as DropdownCornerRadius) ?? '12px';
  const padding      = (vals.padding      as DropdownPadding)       ?? '12px';
  const height       = (vals.height       as number)                ?? 44;
  const textSize     = (vals.textSize     as DropdownTextSize)      ?? '14px';

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
    /> `h-[^`]+` = \d+px · `[^`]+` = [^·]+· `gap-2` = 8px · `[^`]+` = [^\n]+/g,
    `> \`${heightCls}\` = ${height}px · \`${paddingCls}\` = ${padding} · \`gap-2\` = 8px · \`${radiusCls}\` = ${cornerRadius}`,
  );

  // Typography table: Placeholder and Selected value rows
  md = md.replace(
    /(\| (?:Placeholder|Selected value) \| `)(text-\S+)( font-medium )(leading-\S+)/g,
    `$1${textCls}$3${leadingCls}`,
  );

  // Typography table: Option label row (has flex-1 prefix)
  md = md.replace(
    /(\| Option label \| `flex-1 )(text-\S+)( font-medium )(leading-\S+)/g,
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

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function DropdownPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={dropdownMd}
      markdownFileName="dropdown"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
