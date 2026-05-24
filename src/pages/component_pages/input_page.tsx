import React from 'react';
import { Input, type InputCornerRadius, type InputPadding } from '../../components/ui/Input';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';
import inputMd from './md_files/input-instruction.md?raw';

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
  { key: 'height', label: 'Height (px)', type: 'number', min: 28, max: 80 },
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

  const leading  = showLeading  ? <SearchIcon /> : undefined;
  const trailing = showTrailing ? <CloseIcon />  : undefined;
  const label    = showLabel    ? 'Label'        : undefined;
  const required = showLabel && showRequired;
  const helper   = showHelper   ? 'This is a hint text to help user.' : undefined;

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

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── Page ───────────────────────────────────────────────── */
export default function InputPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="States"
      markdownContent={inputMd}
      markdownFileName="input"
      resolveTokens={resolveTokens}
    />
  );
}
