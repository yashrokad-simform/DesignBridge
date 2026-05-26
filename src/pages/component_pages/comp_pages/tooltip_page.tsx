import React from 'react';
import { Tooltip, type TooltipPlacement } from '../../../components/ui/main_components/Tooltip';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tooltipMd from './tooltip-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showHeading', label: 'Heading', type: 'toggle' },
  { key: 'showCaption', label: 'Caption', type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  showHeading: true,
  showCaption: true,
  showClose:   false,
};

const HEADING = 'Tooltip heading';
const CAPTION = 'This is a supporting caption for the tooltip.';

function TriggerBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-text-primary border border-input-border-enabled"
    >
      {label}
    </button>
  );
}

function makeCell(heading: string | undefined, caption: string | undefined, showClose: boolean, placement: TooltipPlacement, label: string) {
  return {
    label,
    node: (
      <div className="flex items-center justify-center w-full p-8">
        <Tooltip heading={heading} caption={caption} placement={placement} showClose={showClose}>
          <TriggerBtn label={label} />
        </Tooltip>
      </div>
    ),
  };
}

function buildVariants(vals: InputValues): VariantGroup[] {
  const heading   = (vals.showHeading as boolean) ? HEADING : undefined;
  const caption   = (vals.showCaption as boolean) ? CAPTION : undefined;
  const showClose = vals.showClose as boolean;

  const mc = (p: TooltipPlacement, l: string) => makeCell(heading, caption, showClose, p, l);

  return [
    {
      id: 'tooltip-placements',
      label: 'Tooltip',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'tp-all',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                mc('top',       'Top'),
                mc('top-start', 'Top Start'),
                mc('top-end',   'Top End'),
              ],
            },
            {
              cells: [
                mc('bottom',       'Bottom'),
                mc('bottom-start', 'Bottom Start'),
                mc('bottom-end',   'Bottom End'),
              ],
            },
            {
              cells: [
                mc('right', 'Right'),
                mc('left',  'Left'),
                { label: '', node: <div className="w-full p-8" /> },
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

export default function TooltipPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={tooltipMd}
      markdownFileName="tooltip"
      resolveTokens={resolveTokens}
    />
  );
}
