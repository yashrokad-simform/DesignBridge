import React from 'react';
import { Button } from '../../components/ui/Button';
import { ArrowRightIcon } from '../../assets/icons/ArrowRightIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';

type BtnVariant =
  | 'primary' | 'bordered' | 'text' | 'link' | 'critical'
  | 'critical-bordered' | 'critical-text'
  | 'icon-filled' | 'icon-secondary' | 'icon-only';

type BtnSize = 'lg' | 'sm';

const STANDARD_VARIANTS: BtnVariant[] = [
  'primary', 'bordered', 'text', 'link', 'critical', 'critical-bordered', 'critical-text',
];

const ICON_VARIANTS: BtnVariant[] = ['icon-filled', 'icon-secondary', 'icon-only'];

const INPUT_CONFIG: InputConfig[] = [
  { key: 'label',     label: 'Label',      type: 'text' },
  {
    key: 'size', label: 'Size', type: 'select',
    options: [
      { value: 'lg', label: 'Large (lg)' },
      { value: 'sm', label: 'Small (sm)' },
    ],
  },
  { key: 'leftIcon',  label: 'Left icon',  type: 'toggle' },
  { key: 'rightIcon', label: 'Right icon', type: 'toggle' },
  { key: 'loading',   label: 'Loading',    type: 'toggle' },
  { key: 'disabled',  label: 'Disabled',   type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  label:     'Button',
  size:      'lg',
  leftIcon:  false,
  rightIcon: false,
  loading:   false,
  disabled:  false,
};

function cap(s: string) {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildVariants(vals: InputValues): VariantGroup[] {
  const label     = vals.label     as string;
  const size      = vals.size      as BtnSize;
  const showLeft  = vals.leftIcon  as boolean;
  const showRight = vals.rightIcon as boolean;
  const loading   = vals.loading   as boolean;
  const disabled  = vals.disabled  as boolean;

  const iconCls = size === 'lg' ? 'size-5 flex-shrink-0' : 'size-4 flex-shrink-0';

  const leftIconNode  = showLeft  ? <ArrowRightIcon  aria-hidden="true" className={iconCls} /> : undefined;
  const rightIconNode = showRight ? <ChevronRightIcon aria-hidden="true" className={iconCls} /> : undefined;

  return [
    {
      id: 'standard',
      label: 'Standard',
      dotColor: '#0056b8',
      styles: [
        {
          id: 'all',
          label: 'All Variants',
          accentColor: '#0056b8',
          rows: [{
            cells: STANDARD_VARIANTS.map(v => ({
              label: cap(v),
              node: (
                <Button
                  key={v}
                  variant={v}
                  size={size}
                  leftIcon={leftIconNode}
                  rightIcon={rightIconNode}
                  loading={loading}
                  disabled={disabled}
                >
                  {label}
                </Button>
              ),
            })),
          }],
        },
      ],
    },
    {
      id: 'icon',
      label: 'Icon Buttons',
      dotColor: '#7839ee',
      styles: [
        {
          id: 'all',
          label: 'All Variants',
          accentColor: '#7839ee',
          rows: [{
            cells: ICON_VARIANTS.map(v => ({
              label: cap(v),
              node: (
                <Button
                  key={v}
                  variant={v}
                  size={size}
                  loading={loading}
                  disabled={disabled}
                  aria-label={cap(v)}
                >
                  <ArrowRightIcon aria-hidden="true" className={iconCls} />
                </Button>
              ),
            })),
          }],
        },
      ],
    },
    {
      id: 'states',
      label: 'States',
      dotColor: '#89919d',
      styles: [
        {
          id: 'states',
          label: 'Enabled / Disabled / Loading',
          accentColor: '#0056b8',
          rows: [
            {
              rowLabel: 'Enabled',
              cells: (['primary', 'bordered', 'critical', 'critical-bordered'] as BtnVariant[]).map(v => ({
                label: cap(v),
                node: <Button key={v} variant={v} size={size}>{label}</Button>,
              })),
            },
            {
              rowLabel: 'Disabled',
              cells: (['primary', 'bordered', 'critical', 'critical-bordered'] as BtnVariant[]).map(v => ({
                label: cap(v),
                node: <Button key={v} variant={v} size={size} disabled>{label}</Button>,
              })),
            },
            {
              rowLabel: 'Loading',
              cells: (['primary', 'bordered', 'critical', 'critical-bordered'] as BtnVariant[]).map(v => ({
                label: cap(v),
                node: <Button key={v} variant={v} size={size} loading>{label}</Button>,
              })),
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

export default function ButtonPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent=""
      markdownFileName="button"
      resolveTokens={resolveTokens}
    />
  );
}
