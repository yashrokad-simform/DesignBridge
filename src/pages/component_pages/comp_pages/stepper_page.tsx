import React from 'react';
import { Stepper, type StepItemData, type StepSize } from '../../../components/ui/main_components/Stepper';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import stepperMd from '../md_files/stepper-instruction.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Variants', type: 'divider' },
  { key: 'showRegular', label: 'Regular Size', type: 'toggle' },
  { key: 'showLarge',   label: 'Large Size',   type: 'toggle' },
  { key: 'div1', label: 'Options', type: 'divider' },
  { key: 'showCaption', label: 'Caption',  type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  showRegular: true,
  showLarge:   true,
  showCaption: true,
};

/* ── Demo steps ─────────────────────────────────────────── */
const DEMO_STEPS: StepItemData[] = [
  { title: 'Your details',  caption: 'Provide your name and email',   state: 'completed' },
  { title: 'Company info',  caption: 'Provide your company details',  state: 'current'   },
  { title: 'Invite team',   caption: 'Add team members',              state: 'incomplete' },
  { title: 'Review',        caption: 'Confirm all details',           state: 'incomplete' },
];

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showRegular  = vals.showRegular as boolean;
  const showLarge    = vals.showLarge   as boolean;
  const showCaption  = vals.showCaption as boolean;

  const renderRegular = showRegular || !showLarge;
  const renderLarge   = showLarge   || !showRegular;

  const steps = showCaption
    ? DEMO_STEPS
    : DEMO_STEPS.map(s => ({ ...s, caption: undefined }));

  const cells: { label: string; node: React.ReactNode }[] = [];

  if (renderRegular) {
    cells.push({
      label: 'Regular',
      node: (
        <div className="w-[280px]">
          <Stepper steps={steps} size="regular" />
        </div>
      ),
    });
  }

  if (renderLarge) {
    cells.push({
      label: 'Large',
      node: (
        <div className="w-[280px]">
          <Stepper steps={steps} size="large" />
        </div>
      ),
    });
  }

  return [
    {
      id:          'sizes',
      label:       'Sizes',
      dotColor:    '',
      hideDivider: true,
      styles: [
        {
          id:          'all-sizes',
          label:       '',
          accentColor: '#0056b8',
          rows: [{ cells }],
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
function transformMarkdown(raw: string, _vals: InputValues): string {
  return raw;
}

/* ── Page ───────────────────────────────────────────────── */
export default function StepperPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={stepperMd}
      markdownFileName="stepper"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
