import { useState } from 'react';
import { Tabs, TabList, TabItem, TabPanel } from '../../../components/ui/main_components/Tabs';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import tabsMd from '../md_files/tabs-instruction.md?raw';
import tabsFigmaMd from '../figma_prompt/tabs-prompt.md?raw';

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

/* ── Style maps ─────────────────────────────────────────── */
const TEXT_CLS: Record<TabTextSize, { cls: string; leading: string; px: string }> = {
  '12px': { cls: 'text-xs', leading: 'leading-4',   px: '12px' },
  '14px': { cls: 'text-sm', leading: 'leading-4.5', px: '14px' },
  '16px': { cls: 'text-base', leading: 'leading-5.5', px: '16px' },
};

const FIGMA_STD_INACTIVE: Record<TabTextSize, string> = {
  '12px': 'Label sm/Medium',
  '14px': 'Body sm/Medium',
  '16px': 'Body md/Medium',
};
const FIGMA_STD_ACTIVE: Record<TabTextSize, string> = {
  '12px': 'Label sm/Semi Bold',
  '14px': 'Body sm/Semi Bold',
  '16px': 'Body md/Semi Bold',
};
const FIGMA_CAPS_STYLE: Record<TabTextSize, string> = {
  '12px': 'Label sm/Medium',
  '14px': 'Body sm/Medium',
  '16px': 'Body md/Medium',
};

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
function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;
  const stdSize = (vals.standardTextSize as TabTextSize) ?? '14px';
  const capSize = (vals.capsuleTextSize  as TabTextSize) ?? '14px';

  const std = TEXT_CLS[stdSize];
  const cap = TEXT_CLS[capSize];

  // Standard label class in code block
  md = md.replace(
    /(text-sm|text-xs|text-base) (leading-4\.5|leading-4|leading-5\.5) (whitespace-nowrap text-center)/,
    `${std.cls} ${std.leading} $3`,
  );
  // Standard size note
  md = md.replace(
    /> `(text-sm|text-xs|text-base)` = \d+px · `(leading-4\.5|leading-4|leading-5\.5)` = \d+px/,
    `> \`${std.cls}\` = ${std.px} · \`${std.leading}\``,
  );

  // Capsule label class in code block
  md = md.replace(
    /(text-sm|text-xs|text-base) (font-medium) (leading-4\.5|leading-4|leading-5\.5) (text-text-primary text-center whitespace-nowrap)/,
    `${cap.cls} $2 ${cap.leading} $4`,
  );

  return md;
}

/* ── Figma transform helpers ────────────────────────────── */
const STD_S   = '<!-- STD_S -->';
const STD_E   = '<!-- STD_E -->';
const CAPS_S  = '<!-- CAPS_S -->';
const CAPS_E  = '<!-- CAPS_E -->';
const COUNT_S = '<!-- COUNT_S -->';
const COUNT_E = '<!-- COUNT_E -->';

const STD_FONT_INACTIVE: Record<TabTextSize, string> = {
  '12px': 'Inter · Medium 500 · 12px · 16px LH',
  '14px': 'Inter · Medium 500 · 14px · 18px LH',
  '16px': 'Inter · Medium 500 · 16px · 22px LH',
};
const STD_FONT_ACTIVE: Record<TabTextSize, string> = {
  '12px': 'Inter · Semi Bold 600 · 12px · 16px LH',
  '14px': 'Inter · Semi Bold 600 · 14px · 18px LH',
  '16px': 'Inter · Semi Bold 600 · 16px · 22px LH',
};
const CAPS_FONT: Record<TabTextSize, string> = {
  '12px': 'Inter · Medium 500 · 12px · 16px LH',
  '14px': 'Inter · Medium 500 · 14px · 18px LH',
  '16px': 'Inter · Medium 500 · 16px · 22px LH',
};

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function stripSections(md: string, start: string, end: string): string {
  return md.replace(new RegExp(escRe(start) + '[\\s\\S]*?' + escRe(end) + '[ \\t]*\\n?', 'g'), '');
}
function transformSection(md: string, start: string, end: string, fn: (s: string) => string): string {
  let result = md;
  let from = 0;
  while (true) {
    const si = result.indexOf(start, from);
    if (si === -1) break;
    const ei = result.indexOf(end, si + start.length);
    if (ei === -1) break;
    const inner = result.slice(si + start.length, ei);
    result = result.slice(0, si + start.length) + fn(inner) + result.slice(ei);
    from = si + start.length + fn(inner).length + end.length;
  }
  return result;
}

/* ── transformFigmaMarkdown ─────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const showCount      = vals.showCount as boolean;
  const stdSize        = (vals.standardTextSize as TabTextSize) ?? '14px';
  const capSize        = (vals.capsuleTextSize  as TabTextSize) ?? '14px';
  const renderStandard = (vals.showStandard as boolean) || !(vals.showCapsule as boolean);
  const renderCapsule  = (vals.showCapsule  as boolean) || !(vals.showStandard as boolean);

  // 1. Strip entire Standard / Capsule / Count blocks when toggled off
  if (!renderStandard) md = stripSections(md, STD_S, STD_E);
  if (!renderCapsule)  md = stripSections(md, CAPS_S, CAPS_E);
  if (!showCount)      md = stripSections(md, COUNT_S, COUNT_E);

  // Rename layer Text+Count → Text when badge is hidden
  if (!showCount)      md = md.replace(/Text\+Count/g, 'Text');

  // 2. Replace text styles + font specs globally within remaining Standard blocks
  if (renderStandard) {
    const inactive = FIGMA_STD_INACTIVE[stdSize];
    const active   = FIGMA_STD_ACTIVE[stdSize];
    const fontInactive = STD_FONT_INACTIVE[stdSize];
    const fontActive   = STD_FONT_ACTIVE[stdSize];
    md = transformSection(md, STD_S, STD_E, s => {
      s = s.replace(/Body sm\/Medium|Label sm\/Medium|Body md\/Medium/g, inactive);
      s = s.replace(/Body sm\/Semi Bold|Label sm\/Semi Bold|Body md\/Semi Bold/g, active);
      s = s.replace(/Inter · Medium 500 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontInactive);
      s = s.replace(/Inter · Semi Bold 600 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontActive);
      s = s.replace(/Inter · 500 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontInactive);
      s = s.replace(/Inter · 600 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontActive);
      return s;
    });
  }

  // 3. Replace text styles + font specs globally within remaining Capsule blocks
  if (renderCapsule) {
    const style    = FIGMA_CAPS_STYLE[capSize];
    const fontSpec = CAPS_FONT[capSize];
    md = transformSection(md, CAPS_S, CAPS_E, s => {
      s = s.replace(/Body sm\/Medium|Label sm\/Medium|Body md\/Medium/g, style);
      s = s.replace(/Inter · Medium 500 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontSpec);
      s = s.replace(/Inter · 500 · (?:12|14|16)px · (?:16|18|22)px LH/g, fontSpec);
      return s;
    });
  }

  // 4. Remove all section markers
  md = md.replace(/[ \t]*<!-- (?:STD|CAPS|COUNT)_[SE] -->[ \t]*\n?/g, '');

  // 5. Clean up excess blank lines left by stripped sections
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md;
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
      figmaMarkdownContent={tabsFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
