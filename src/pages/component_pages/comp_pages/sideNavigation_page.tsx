import React from 'react';
import { SideNav, type NavItemData, type NavProfileData } from '../../../components/ui/main_components/SideNavigation';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import sideNavMd from '../md_files/sideNavigation-instruction.md?raw';
import { DashboardIcon } from '../../../assets/icons/DashboardIcon';
import { AnalyticsIcon } from '../../../assets/icons/AnalyticsIcon';
import { UsersIcon } from '../../../assets/icons/UsersIcon';
import { ProjectsIcon } from '../../../assets/icons/ProjectsIcon';
import { ReportsIcon } from '../../../assets/icons/ReportsIcon';
import { SettingsIcon } from '../../../assets/icons/SettingsIcon';

/* ── Demo data ───────────────────────────────────────────── */
const DEMO_ITEMS: NavItemData[] = [
  { label: 'Dashboard',  icon: <DashboardIcon />,  href: '#', selected: true },
  { label: 'Analytics',  icon: <AnalyticsIcon />,  href: '#' },
  { label: 'Team',       icon: <UsersIcon />,       href: '#' },
  { label: 'Projects',   icon: <ProjectsIcon />,    href: '#' },
  { label: 'Reports',    icon: <ReportsIcon />,     href: '#' },
  { label: 'Settings',   icon: <SettingsIcon />,    href: '#' },
];

const DEMO_PROFILE: NavProfileData = {
  name: 'John Doe',
  role: 'Admin',
  avatarColor: '#4f46e5',
};

const DEMO_LOGO = (
  <div className="flex items-center gap-2 min-w-0">
    <div className="size-8 rounded bg-white/20 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold">DS</span>
    </div>
    <span className="text-white text-sm font-semibold whitespace-nowrap">Design System</span>
  </div>
);

/* ── Input config ────────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Variants', type: 'divider' },
  { key: 'showExpanded',  label: 'Expanded Variant',  type: 'toggle' },
  { key: 'showCollapsed', label: 'Collapsed Variant', type: 'toggle' },
  { key: 'showProfile',   label: 'Show Profile',      type: 'toggle' },
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
  { key: 'navHeight', label: 'Nav Item Height (px)', type: 'number', min: 32, max: 80, step: 1 },
  { key: 'div2', label: 'Profile', type: 'divider' },
  {
    key: 'avatarColor',
    label: 'Avatar Color',
    type: 'colorswatches',
    colors: ['#4f46e5', '#0056b8', '#0891b2', '#036821', '#e06320', '#dc2626', '#7c3aed', '#ca8a04', '#374151'],
  },
];

const DEFAULT_VALUES: InputValues = {
  showExpanded:  true,
  showCollapsed: true,
  showProfile:   true,
  textSize:      '14px',
  navHeight:     44,
  avatarColor:   '#4f46e5',
};

/* ── buildVariants ───────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showExpanded  = vals.showExpanded  as boolean;
  const showCollapsed = vals.showCollapsed as boolean;
  const showProfile   = vals.showProfile   as boolean;
  const navHeight     = (vals.navHeight    as number) ?? 44;
  const avatarColor   = (vals.avatarColor  as string) ?? '#4f46e5';
  const textSize      = (vals.textSize     as '12px' | '14px' | '16px') ?? '14px';

  // Guard: both false is invalid — show both
  const renderExpanded  = showExpanded  || !showCollapsed;
  const renderCollapsed = showCollapsed || !showExpanded;

  const profile = showProfile ? { ...DEMO_PROFILE, avatarColor } : undefined;

  const cells: { label: string; node: React.ReactNode }[] = [];

  if (renderExpanded) {
    cells.push({
      label: 'Expanded',
      node: (
        <div style={{ height: 560, width: 280 }}>
          <SideNav
            collapsed={false}
            onToggle={() => {}}
            logo={DEMO_LOGO}
            items={DEMO_ITEMS}
            showProfile={showProfile}
            profile={profile}
            navItemHeight={navHeight}
            textSize={textSize}
          />
        </div>
      ),
    });
  }

  if (renderCollapsed) {
    cells.push({
      label: 'Collapsed',
      node: (
        <div style={{ height: 560, width: 120 }}>
          <SideNav
            collapsed={true}
            onToggle={() => {}}
            logo={DEMO_LOGO}
            items={DEMO_ITEMS}
            showProfile={showProfile}
            profile={profile}
            textSize={textSize}
          />
        </div>
      ),
    });
  }

  return [
    {
      id:          'states',
      label:       'States',
      dotColor:    '',
      hideDivider: true,
      styles: [
        {
          id:          'all-states',
          label:       '',
          accentColor: '#0056b8',
          rows: [{ cells }],
        },
      ],
    },
  ];
}

/* ── MD helpers ──────────────────────────────────────────── */
function hClass(h: number): string {
  const n = h / 4;
  if (Number.isInteger(n)) return `h-${n}`;
  if (Number.isInteger(n * 2)) return `h-${n}`;
  return `h-[${h}px]`;
}

const TEXT_SIZE_MAP: Record<string, { cls: string; leading: string; px: string; leadingPx: string }> = {
  '12px': { cls: 'text-xs', leading: 'leading-4',   px: '12px', leadingPx: '16px' },
  '14px': { cls: 'text-sm', leading: 'leading-4.5', px: '14px', leadingPx: '18px' },
  '16px': { cls: 'text-md', leading: 'leading-5.5', px: '16px', leadingPx: '22px' },
};

/* ── resolveTokens ───────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformMarkdown ───────────────────────────────────── */
function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const showExpanded  = vals.showExpanded  as boolean;
  const showCollapsed = vals.showCollapsed as boolean;
  const showProfile   = vals.showProfile   as boolean;
  const textSize      = (vals.textSize     as string) ?? '14px';
  const navHeight     = (vals.navHeight    as number) ?? 44;

  // Guard: both false → keep intact
  const doHideExpanded  = !showExpanded  && showCollapsed;
  const doHideCollapsed = !showCollapsed && showExpanded;

  const heightCls = hClass(navHeight);
  const { cls: textCls, leading: leadingCls, px: textPx, leadingPx } = TEXT_SIZE_MAP[textSize] ?? TEXT_SIZE_MAP['14px'];

  // ── 4. Nav Item Height ──────────────────────────────────
  md = md.replace(
    /(\| `expanded-(?:selected|default)` \| `)h-\S+( px-3)/g,
    `$1${heightCls}$2`,
  );
  md = md.replace(
    /`h-\S+` = \d+px(?= · `px-3`)/g,
    `\`${heightCls}\` = ${navHeight}px`,
  );

  // ── 3. Text Size — expanded label rows ─────────────────
  md = md.replace(
    /(\| Selected \| `)(text-\S+)( font-semibold )(leading-\S+)( text-nav-text-primary flex-1 min-w-0`)/g,
    `$1${textCls}$3${leadingCls}$5`,
  );
  md = md.replace(
    /(\| Default \| `)(text-\S+)( font-medium )(leading-\S+)( text-nav-text-secondary flex-1 min-w-0`)/g,
    `$1${textCls}$3${leadingCls}$5`,
  );
  // Expanded label annotation (only the entry before `font-semibold`)
  md = md.replace(
    /`text-\S+` = \d+px(?= · `leading-[^`]+` ≈)/g,
    `\`${textCls}\` = ${textPx}`,
  );
  md = md.replace(
    /`leading-\S+` ≈ \d+px(?= · `font-semibold`)/g,
    `\`${leadingCls}\` ≈ ${leadingPx}`,
  );

  // ── 3. Text Size — profile name ────────────────────────
  if (showProfile) {
    md = md.replace(
      /(\| Name \| `)(text-\S+)( font-medium )(leading-\S+)( text-nav-text-primary-collapse`)/g,
      `$1${textCls}$3${leadingCls}$5`,
    );
  }

  // ── 1. Expanded/Collapsed variant filtering ─────────────

  if (doHideExpanded) {
    // collapsed prop default → true
    md = md.replace(/(\| `collapsed` \| `boolean` \| )`false`( \|)/, `$1\`true\`$2`);
    // Width table
    md = md.replace(/\| Expanded \| `w-60` \|\n/, '');
    // Header alignment table
    md = md.replace(/\| Expanded \| `justify-start` \|\n/, '');
    // Content padding table
    md = md.replace(/\| Expanded \|[^\n]+`p-5 gap-1`[^\n]+\n/, '');
    // CVA variant rows
    md = md.replace(/\| `expanded-selected`[^\n]+\n/g, '');
    md = md.replace(/\| `expanded-default`[^\n]+\n/g, '');
    // Remove "NavItem Internal Layout — Expanded" section
    md = md.replace(
      /\n### NavItem Internal Layout — Expanded[\s\S]*?(?=\n### NavItem Internal Layout — Collapsed)/,
      '',
    );
    // Toggle position table
    md = md.replace(/\| Expanded \| `left-\[228px\]` \|\n/, '');
    // Profile — Expanded Layout subsection
    md = md.replace(
      /\n### Profile — Expanded Layout[\s\S]*?(?=\n### Profile — Collapsed Layout)/,
      '',
    );
  }

  if (doHideCollapsed) {
    // Width table
    md = md.replace(/\| Collapsed \| `w-24` \|\n/, '');
    // Header alignment table
    md = md.replace(/\| Collapsed \| `justify-center` \|\n/, '');
    // Content padding table
    md = md.replace(/\| Collapsed \|[^\n]+`px-1[^\n]+\n/, '');
    // CVA variant rows
    md = md.replace(/\| `collapsed-selected`[^\n]+\n/g, '');
    md = md.replace(/\| `collapsed-default`[^\n]+\n/g, '');
    // Remove "NavItem Internal Layout — Collapsed" section
    md = md.replace(
      /\n### NavItem Internal Layout — Collapsed[\s\S]*?(?=\n---\n\n## SideNavProfile)/,
      '',
    );
    // Toggle position table
    md = md.replace(/\| Collapsed \| `left-\[84px\]` \|\n/, '');
    // Profile — Collapsed Layout subsection
    md = md.replace(
      /\n### Profile — Collapsed Layout[\s\S]*?(?=\n---\n\n## SideNavToggle)/,
      '',
    );
  }

  // ── 2. Show Profile ─────────────────────────────────────
  if (!showProfile) {
    md = md.replace(/(\| `showProfile` \| `boolean` \| )`true`( \|)/, `$1\`false\`$2`);
    md = md.replace(/\| `profile` \|[^\n]+\n/, '');
    md = md.replace(/\ninterface NavProfileData \{[\s\S]*?\}\n/, '\n');
    md = md.replace(/└── SideNavProfile[^\n]+\n/, '');
    // Remove entire SideNavProfile section (including its preceding ---)
    md = md.replace(
      /\n---\n\n## SideNavProfile[\s\S]*?(?=\n---\n\n## SideNavToggle)/,
      '',
    );
    // Color token: remove nav-tile-bg-secondary only when collapsed is also hidden
    if (doHideCollapsed) {
      md = md.replace(/\| `--color-nav-tile-bg-secondary`[^\n]+\n/, '');
    }
  }

  return md;
}

/* ── Page ────────────────────────────────────────────────── */
export default function SideNavigationPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={sideNavMd}
      markdownFileName="sideNavigation"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
