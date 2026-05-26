import React, { useState } from 'react';
import { RichTextEditor, type RichTextEditorCornerRadius, type RichTextEditorPadding, type RichTextEditorTextSize } from '../../../components/ui/main_components/RichTextEditor';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import richTextEditorMd from '../md_files/richTextEditor-instruction.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showLabel',    label: 'Label',       type: 'toggle' },
  { key: 'showRequired', label: 'Required',    type: 'toggle' },
  { key: 'showHelper',   label: 'Helper Text', type: 'toggle' },
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
  showRequired: true,
  showHelper:   true,
  cornerRadius: '12px',
  padding:      '12px',
  textSize:     '14px',
};

/* ── Demo wrapper ───────────────────────────────────────── */
interface DemoProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  focused?: boolean;
  placeholder?: string;
  defaultValue?: string;
  cornerRadius: RichTextEditorCornerRadius;
  padding: RichTextEditorPadding;
  textSize: RichTextEditorTextSize;
}

function Demo({ label, required, helperText, errorText, disabled, focused, placeholder, defaultValue, cornerRadius, padding, textSize }: DemoProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  return (
    <div className="w-[480px]">
      <RichTextEditor
        label={label}
        required={required}
        placeholder={placeholder}
        helperText={helperText}
        errorText={errorText}
        disabled={disabled}
        focused={focused}
        cornerRadius={cornerRadius}
        padding={padding}
        textSize={textSize}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

/* ── MD helpers ─────────────────────────────────────────── */
const RADIUS_MD: Record<RichTextEditorCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
};

const PADDING_MD: Record<RichTextEditorPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MD: Record<RichTextEditorTextSize, { cls: string; leading: string }> = {
  '12px': { cls: 'text-xs', leading: 'leading-4'   },
  '14px': { cls: 'text-sm', leading: 'leading-4.5' },
  '16px': { cls: 'text-md', leading: 'leading-5.5' },
};

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showLabel    = vals.showLabel    as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper   = vals.showHelper   as boolean;
  const cornerRadius = (vals.cornerRadius as RichTextEditorCornerRadius) ?? '12px';
  const padding      = (vals.padding      as RichTextEditorPadding)      ?? '12px';
  const textSize     = (vals.textSize     as RichTextEditorTextSize)     ?? '14px';

  const label    = showLabel ? 'Description' : undefined;
  const required = showLabel && showRequired;
  const helper   = showHelper ? 'This is a hint text to help the user.' : undefined;

  const shared = { label, required, cornerRadius, padding, textSize };

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
                { label: 'Enabled',  node: <Demo {...shared} helperText={helper} placeholder="Enter text…" /> },
                { label: 'Focused',  node: <Demo {...shared} helperText={helper} placeholder="Enter text…" focused /> },
              ],
            },
            {
              cells: [
                { label: 'Filled',   node: <Demo {...shared} helperText={helper} defaultValue="<p>This is some filled content in the editor.</p>" /> },
                { label: 'Error',    node: <Demo {...shared} errorText="This field is required." placeholder="Enter text…" /> },
              ],
            },
            {
              cells: [
                { label: 'Disabled', node: <Demo {...shared} helperText={helper} placeholder="Enter text…" disabled /> },
              ],
            },
          ],
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
function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const cornerRadius = (vals.cornerRadius as RichTextEditorCornerRadius) ?? '12px';
  const padding      = (vals.padding      as RichTextEditorPadding)      ?? '12px';
  const textSize     = (vals.textSize     as RichTextEditorTextSize)     ?? '14px';

  const radiusCls  = RADIUS_MD[cornerRadius];
  const paddingCls = PADDING_MD[padding];
  const { cls: textCls, leading: leadingCls } = TEXT_SIZE_MD[textSize];

  // CVA base class — update corner radius
  md = md.replace(
    /flex flex-col w-full (rounded\S+) border overflow-hidden relative/g,
    `flex flex-col w-full ${radiusCls} border overflow-hidden relative`,
  );

  // Content area — update horizontal padding
  md = md.replace(
    /flex-1 min-h-0 (px-\S+) py-2 relative/g,
    `flex-1 min-h-0 ${paddingCls} py-2 relative`,
  );

  // Content area note
  md = md.replace(
    /> `(px-\S+)` = \d+px · `py-2` = 8px/g,
    `> \`${paddingCls}\` = ${padding} · \`py-2\` = 8px`,
  );

  // Typography table rows — Editor content & Placeholder
  md = md.replace(
    /(\| (?:Editor content|Placeholder) \| `)(text-\S+) font-medium (leading-\S+)/g,
    `$1${textCls} font-medium ${leadingCls}`,
  );

  // Typography note
  md = md.replace(
    /> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-\S+` [≈=] \d+px/g,
    `> \`text-xs\` = 12px · \`text-sm\` = 14px · \`leading-4\` = 16px · \`${leadingCls}\` ≈ ${textSize === '16px' ? '22' : textSize === '12px' ? '16' : '18'}px`,
  );

  // ProseMirror text class
  md = md.replace(
    /\[&_\.ProseMirror\]:(text-\S+)/g,
    `[&_.ProseMirror]:${textCls.split(' ')[0]}`,
  );

  // ProseMirror leading class
  md = md.replace(
    /\[&_\.ProseMirror\]:(leading-\S+)/g,
    `[&_.ProseMirror]:${leadingCls}`,
  );

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function RichTextEditorPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={richTextEditorMd}
      markdownFileName="richTextEditor"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
