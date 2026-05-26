import React, { useState } from 'react';
import { Tabs, TabList, TabItem, TabPanel } from '../../../components/ui/main_components/Tabs';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tabsMd from '../md_files/tabs-instruction.md?raw';

const TEXT_SIZE_OPTIONS = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px (default)' },
  { value: '16px', label: '16px' },
];

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Variants', type: 'divider' },
  { key: 'showStandard', label: 'Standard', type: 'toggle' },
  { key: 'showCapsule',  label: 'Capsule',  type: 'toggle' },
  { key: 'div1', label: 'Options', type: 'divider' },
  { key: 'showCount', label: 'Count Badge', type: 'toggle' },
  { key: 'div2', label: 'Standard', type: 'divider' },
  { key: 'standardTextSize', label: 'Text Size', type: 'select', options: TEXT_SIZE_OPTIONS },
  { key: 'div3', label: 'Capsule', type: 'divider' },
  { key: 'capsuleTextSize',  label: 'Text Size', type: 'select', options: TEXT_SIZE_OPTIONS },
];

const DEFAULT_VALUES: InputValues = {
  showStandard:    true,
  showCapsule:     true,
  showCount:       true,
  standardTextSize: '14px',
  capsuleTextSize:  '14px',
};

type TabTextSize = '12px' | '14px' | '16px';

/* ── Demo: Standard ─────────────────────────────────────── */
function StandardDemo({ showCount, textSize }: { showCount: boolean; textSize: TabTextSize }) {
  const [active, setActive] = useState('overview');
  return (
    <div className="w-fit">
      <Tabs value={active} onChange={setActive} variant="standard" textSize={textSize}>
        <TabList>
          <TabItem value="overview"  label="Overview"  count={showCount ? 3  : undefined} />
          <TabItem value="analytics" label="Analytics" count={showCount ? 12 : undefined} />
          <TabItem value="reports"   label="Reports" />
          <TabItem value="settings"  label="Settings"  disabled />
        </TabList>
        <TabPanel value="overview"  className="p-4 text-sm text-text-primary">Overview content</TabPanel>
        <TabPanel value="analytics" className="p-4 text-sm text-text-primary">Analytics content</TabPanel>
        <TabPanel value="reports"   className="p-4 text-sm text-text-primary">Reports content</TabPanel>
      </Tabs>
    </div>
  );
}

/* ── Demo: Capsule ──────────────────────────────────────── */
function CapsuleDemo({ textSize }: { textSize: TabTextSize }) {
  const [active, setActive] = useState('month');
  return (
    <div className="w-fit">
      <Tabs value={active} onChange={setActive} variant="capsule" textSize={textSize}>
        <TabList>
          <TabItem value="day"   label="Day" />
          <TabItem value="week"  label="Week" />
          <TabItem value="month" label="Month" />
          <TabItem value="year"  label="Year" />
        </TabList>
        <TabPanel value="day"   className="p-4 text-sm text-text-primary">Day view</TabPanel>
        <TabPanel value="week"  className="p-4 text-sm text-text-primary">Week view</TabPanel>
        <TabPanel value="month" className="p-4 text-sm text-text-primary">Month view</TabPanel>
        <TabPanel value="year"  className="p-4 text-sm text-text-primary">Year view</TabPanel>
      </Tabs>
    </div>
  );
}

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showStandard    = vals.showStandard    as boolean;
  const showCapsule     = vals.showCapsule     as boolean;
  const showCount       = vals.showCount       as boolean;
  const standardTextSize = (vals.standardTextSize as TabTextSize) ?? '14px';
  const capsuleTextSize  = (vals.capsuleTextSize  as TabTextSize) ?? '14px';

  const renderStandard = showStandard || !showCapsule;
  const renderCapsule  = showCapsule  || !showStandard;

  const groups: VariantGroup[] = [];

  if (renderStandard) {
    groups.push({
      id:          'standard',
      label:       'Standard',
      dotColor:    '',
      hideDivider: true,
      styles: [{
        id:          'standard-demo',
        label:       '',
        accentColor: '#0056b8',
        rows: [{ cells: [{ label: 'Standard Tabs', node: <StandardDemo showCount={showCount} textSize={standardTextSize} /> }] }],
      }],
    });
  }

  if (renderCapsule) {
    groups.push({
      id:          'capsule',
      label:       'Capsule',
      dotColor:    '',
      hideDivider: true,
      styles: [{
        id:          'capsule-demo',
        label:       '',
        accentColor: '#7839ee',
        rows: [{ cells: [{ label: 'Capsule Tabs', node: <CapsuleDemo textSize={capsuleTextSize} /> }] }],
      }],
    });
  }

  return groups;
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
export default function TabsPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={tabsMd}
      markdownFileName="tabs"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
