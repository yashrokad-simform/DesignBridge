import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../../../components/ui/main_components/Breadcrumb';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';

import breadcrumbMd from '../md_files/breadcrumb-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Typography', type: 'divider' },
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
  { key: 'div1', label: 'Spacing', type: 'divider' },
  {
    key: 'separatorSize',
    label: 'Separator Icon Size',
    type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
    ],
  },
  {
    key: 'gap',
    label: 'Gap Size',
    type: 'select',
    options: [
      { value: '0.5', label: '2px' },
      { value: '1', label: '4px (default)' },
      { value: '1.5', label: '6px' },
      { value: '2', label: '8px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  textSize: '14px',
  separatorSize: '12px',
  gap: '1',
};

function buildVariants(vals: InputValues): VariantGroup[] {
  const tSize = vals.textSize as '12px' | '14px' | '16px';
  const sSize = vals.separatorSize as '12px' | '14px';
  const gapSize = vals.gap as '0.5' | '1' | '1.5' | '2';

  const i1 = 'Home';
  const i2 = 'Products';
  const i3 = 'Category';
  const i4 = 'Item';

  return [
    {
      id: 'item-states',
      label: 'Item States',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'states',
          label: '',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  label: 'Default',
                  node: <BreadcrumbItem label="Products" href="/products" size={tSize} state="default" />,
                },
                {
                  label: 'Hover',
                  node: <BreadcrumbItem label="Products" href="/products" size={tSize} state="hover" />,
                },
                {
                  label: 'Current',
                  node: <BreadcrumbItem label="Products" size={tSize} state="current" />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'breadcrumb',
      label: 'Example Breadcrumbs',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: '2-items',
          label: '2 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} size={tSize} />
                    </Breadcrumb>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: '3-items',
          label: '3 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} href="/products" size={tSize} />
                      <BreadcrumbItem label={i3} size={tSize} />
                    </Breadcrumb>
                  ),
                },
              ],
            },
          ],
        },
        {
          id: '4-items',
          label: '4 Items',
          accentColor: '',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb separatorSize={sSize} gap={gapSize}>
                      <BreadcrumbItem label={i1} href="/" size={tSize} />
                      <BreadcrumbItem label={i2} href="/products" size={tSize} />
                      <BreadcrumbItem label={i3} href="/products/category" size={tSize} />
                      <BreadcrumbItem label={i4} size={tSize} />
                    </Breadcrumb>
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

function resolveTokens(vals: InputValues): Record<string, string> {
  const tSize = vals.textSize as string;
  const sSize = vals.separatorSize as string;
  
  let textSizeClass = 'text-sm';
  let leadingClass = 'leading-4.5';
  let pxSize = '14px';
  let pxLeading = '18px';
  
  if (tSize === '12px') {
    textSizeClass = 'text-xs';
    leadingClass = 'leading-4';
    pxSize = '12px';
    pxLeading = '16px';
  } else if (tSize === '16px') {
    textSizeClass = 'text-md';
    leadingClass = 'leading-5.5';
    pxSize = '16px';
    pxLeading = '22px';
  }
  
  const separatorClass = sSize === '14px' ? 'size-3.5' : 'size-3';
  const separatorPx = sSize === '14px' ? '14×14px' : '12×12px';

  const gap = vals.gap as string;
  const gapClass = `gap-${gap}`;
  const gapPx = gap === '0.5' ? '2px' : gap === '1' ? '4px' : gap === '1.5' ? '6px' : '8px';

  return {
    textSizeClass,
    leadingClass,
    pxSize,
    pxLeading,
    separatorClass,
    separatorPx,
    gapClass,
    gapPx,
  };
}

export default function BreadcrumbPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={breadcrumbMd}
      markdownFileName="breadcrumb"
      resolveTokens={resolveTokens}
    />
  );
}
