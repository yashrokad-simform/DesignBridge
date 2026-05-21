import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../../components/ui/Breadcrumb';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'item1', label: 'Item 1', type: 'text' },
  { key: 'item2', label: 'Item 2', type: 'text' },
  { key: 'item3', label: 'Item 3', type: 'text' },
  { key: 'item4', label: 'Item 4', type: 'text' },
];

const DEFAULT_VALUES: InputValues = {
  item1: 'Home',
  item2: 'Products',
  item3: 'Category',
  item4: 'Item',
};

function buildVariants(vals: InputValues): VariantGroup[] {
  const i1 = vals.item1 as string;
  const i2 = vals.item2 as string;
  const i3 = vals.item3 as string;
  const i4 = vals.item4 as string;

  return [
    {
      id: 'breadcrumb',
      label: 'Breadcrumb',
      dotColor: '#0056b8',
      styles: [
        {
          id: '2-items',
          label: '2 Items',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb>
                      <BreadcrumbItem label={i1} href="/" />
                      <BreadcrumbItem label={i2} />
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
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb>
                      <BreadcrumbItem label={i1} href="/" />
                      <BreadcrumbItem label={i2} href="/products" />
                      <BreadcrumbItem label={i3} />
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
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  node: (
                    <Breadcrumb>
                      <BreadcrumbItem label={i1} href="/" />
                      <BreadcrumbItem label={i2} href="/products" />
                      <BreadcrumbItem label={i3} href="/products/category" />
                      <BreadcrumbItem label={i4} />
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
  return {
    item1: vals.item1 as string,
    item2: vals.item2 as string,
    item3: vals.item3 as string,
    item4: vals.item4 as string,
  };
}

export default function BreadcrumbPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Breadcrumb Variants"
      markdownContent=""
      markdownFileName="breadcrumb"
      resolveTokens={resolveTokens}
    />
  );
}
