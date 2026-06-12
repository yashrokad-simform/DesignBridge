import { ToggleButton, ToggleButtonTile } from '../../../components/ui/main_components/ToggleButton';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import toggleMd from '../md_files/toggleButton-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showLabel', label: 'Label', type: 'toggle' },
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
  showLabel:   true,
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
  const label   = (vals.showLabel   as boolean) ? DEMO_LABEL   : undefined;
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

export default function ToggleButtonPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={toggleMd}
      markdownFileName="toggleButton"
      resolveTokens={resolveTokens}
    />
  );
}
