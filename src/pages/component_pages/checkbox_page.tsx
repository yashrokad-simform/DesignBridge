import React from 'react';
import { Checkbox, CheckboxTile } from '../../components/ui/Checkbox';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'label',   label: 'Checkbox label', type: 'text' },
  { key: 'title',   label: 'Tile title',     type: 'text' },
  { key: 'caption', label: 'Tile caption',   type: 'text' },
];

const DEFAULT_VALUES: InputValues = {
  label:   'Checkbox label',
  title:   'Option title',
  caption: 'Optional caption text',
};

function buildVariants(vals: InputValues): VariantGroup[] {
  const label   = vals.label   as string;
  const title   = vals.title   as string;
  const caption = vals.caption as string;

  return [
    {
      id: 'checkbox',
      label: 'Checkbox',
      dotColor: '#0056b8',
      styles: [
        {
          id: 'states',
          label: 'All States',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: <Checkbox label={label} />,
                },
                {
                  label: 'Selected',
                  node: <Checkbox label={label} defaultChecked />,
                },
                {
                  label: 'Indeterminate',
                  node: <Checkbox label={label} indeterminate />,
                },
                {
                  label: 'Disabled',
                  node: <Checkbox label={label} disabled />,
                },
                {
                  label: 'Disabled Selected',
                  node: <Checkbox label={label} defaultChecked disabled />,
                },
              ],
            },
          ],
        },
        {
          id: 'no-label',
          label: 'Without Label',
          accentColor: '#89919d',
          rows: [
            {
              cells: [
                { label: 'Enabled',           node: <Checkbox /> },
                { label: 'Selected',          node: <Checkbox defaultChecked /> },
                { label: 'Indeterminate',     node: <Checkbox indeterminate /> },
                { label: 'Disabled',          node: <Checkbox disabled /> },
                { label: 'Disabled Selected', node: <Checkbox defaultChecked disabled /> },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'tile',
      label: 'Checkbox Tile',
      dotColor: '#7839ee',
      styles: [
        {
          id: 'with-caption',
          label: 'With Caption',
          accentColor: '#7839ee',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: (
                    <div className="w-[220px]">
                      <CheckboxTile title={title} caption={caption} />
                    </div>
                  ),
                },
                {
                  label: 'Selected',
                  node: (
                    <div className="w-[220px]">
                      <CheckboxTile title={title} caption={caption} defaultChecked />
                    </div>
                  ),
                },
                {
                  label: 'Disabled',
                  node: (
                    <div className="w-[220px]">
                      <CheckboxTile title={title} caption={caption} disabled />
                    </div>
                  ),
                },
                {
                  label: 'Disabled Selected',
                  node: (
                    <div className="w-[220px]">
                      <CheckboxTile title={title} caption={caption} defaultChecked disabled />
                    </div>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: 'no-caption',
          label: 'Without Caption',
          accentColor: '#89919d',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: <div className="w-[220px]"><CheckboxTile title={title} /></div>,
                },
                {
                  label: 'Selected',
                  node: <div className="w-[220px]"><CheckboxTile title={title} defaultChecked /></div>,
                },
                {
                  label: 'Disabled',
                  node: <div className="w-[220px]"><CheckboxTile title={title} disabled /></div>,
                },
                {
                  label: 'Disabled Selected',
                  node: <div className="w-[220px]"><CheckboxTile title={title} defaultChecked disabled /></div>,
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

export default function CheckboxPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent=""
      markdownFileName="checkbox"
      resolveTokens={resolveTokens}
    />
  );
}
