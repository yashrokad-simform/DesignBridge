import React from 'react';
import { Checkbox, CheckboxTile } from '../../../components/ui/main_components/Checkbox';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import checkboxMd from '../md_files/checkbox-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showCaption', label: 'Caption', type: 'toggle' },
  { key: 'div1', label: 'Appearance', type: 'divider' },
  {
    key: 'cornerRadius',
    label: 'Tile Corner Radius',
    type: 'select',
    options: [
      { value: '4px',  label: '4px' },
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
  '4px':  { cls: 'rounded',     px: '4px'  },
  '8px':  { cls: 'rounded-lg',  px: '8px'  },
  '12px': { cls: 'rounded-xl',  px: '12px' },
  '16px': { cls: 'rounded-2xl', px: '16px' },
};

const LABEL   = 'Checkbox';
const TITLE   = 'Option title';
const CAPTION = 'Optional caption text';

function buildVariants(vals: InputValues): VariantGroup[] {
  const showCaption = vals.showCaption as boolean;
  const radiusCls   = RADIUS_MAP[vals.cornerRadius as string]?.cls ?? 'rounded-xl';
  const sizeCls     = SIZE_MAP[vals.textSize as string] ?? 'text-sm';
  const caption     = showCaption ? CAPTION : undefined;
  return [
    {
      id: 'checkbox',
      label: 'Checkbox',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'states',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                { label: 'Enabled',           node: <Checkbox label={LABEL} labelSize={sizeCls} /> },
                { label: 'Selected',          node: <Checkbox label={LABEL} labelSize={sizeCls} defaultChecked /> },
                { label: 'Indeterminate',     node: <Checkbox label={LABEL} labelSize={sizeCls} indeterminate /> },
                { label: 'Disabled',          node: <Checkbox label={LABEL} labelSize={sizeCls} disabled /> },
                { label: 'Disabled Selected', node: <Checkbox label={LABEL} labelSize={sizeCls} defaultChecked disabled /> },
              ],
            },
          ],
        },
        // {
        //   id: 'no-label',
        //   label: '',
        //   accentColor: '#89919d',
        //   rows: [
        //     {
        //       cells: [
        //         { label: 'Enabled',           node: <Checkbox /> },
        //         { label: 'Selected',          node: <Checkbox defaultChecked /> },
        //         { label: 'Indeterminate',     node: <Checkbox indeterminate /> },
        //         { label: 'Disabled',          node: <Checkbox disabled /> },
        //         { label: 'Disabled Selected', node: <Checkbox defaultChecked disabled /> },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
    {
      id: 'tile',
      label: 'Checkbox Tile',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'with-caption',
          label: '',
          accentColor: '#7839ee',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: <div className="w-[220px]"><CheckboxTile title={TITLE} caption={caption} className={radiusCls} titleSize={sizeCls} /></div>,
                },
                {
                  label: 'Selected',
                  node: <div className="w-[220px]"><CheckboxTile title={TITLE} caption={caption} defaultChecked className={radiusCls} titleSize={sizeCls} /></div>,
                },
                {
                  label: 'Disabled',
                  node: <div className="w-[220px]"><CheckboxTile title={TITLE} caption={caption} disabled className={radiusCls} titleSize={sizeCls} /></div>,
                },
                {
                  label: 'Disabled Selected',
                  node: <div className="w-[220px]"><CheckboxTile title={TITLE} caption={caption} defaultChecked disabled className={radiusCls} titleSize={sizeCls} /></div>,
                },
              ],
            },
          ],
        },
        // {
        //   id: 'no-caption',
        //   label: '',
        //   accentColor: '#89919d',
        //   rows: [
        //     {
        //       cells: [
        //         { label: 'Enabled',           node: <div className="w-[220px]"><CheckboxTile title={TITLE} className={radiusCls} /></div> },
        //         { label: 'Selected',          node: <div className="w-[220px]"><CheckboxTile title={TITLE} defaultChecked className={radiusCls} /></div> },
        //         { label: 'Disabled',          node: <div className="w-[220px]"><CheckboxTile title={TITLE} disabled className={radiusCls} /></div> },
        //         { label: 'Disabled Selected', node: <div className="w-[220px]"><CheckboxTile title={TITLE} defaultChecked disabled className={radiusCls} /></div> },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
  ];
}

function transformMarkdown(raw: string, vals: InputValues): string {
  const { cls, px } = RADIUS_MAP[vals.cornerRadius as string] ?? RADIUS_MAP['12px'];
  let md = raw;

  // Part B only — tile container base classes block
  md = md.replace(
    /flex flex-row items-start w-full rounded[\w-]* border p-3 gap-2/,
    `flex flex-row items-start w-full ${cls} border p-3 gap-2`,
  );

  // Part B only — annotation below base classes block
  md = md.replace(
    /> `p-3` = 12px all sides · `gap-2` = 8px · `rounded[\w-]*` = \d+px/,
    `> \`p-3\` = 12px all sides · \`gap-2\` = 8px · \`${cls}\` = ${px}`,
  );

  return md;
}

function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

export default function CheckboxPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={checkboxMd}
      markdownFileName="checkbox"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
