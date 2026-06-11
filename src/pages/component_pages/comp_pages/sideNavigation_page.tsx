import React from 'react';
import { SideNav, type NavItemData, type NavProfileData } from '../../../components/ui/main_components/SideNavigation';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import sideNavMd from '../md_files/sideNavigation-instruction.md?raw';
import navFigmaMd from '../figma_prompt/navigation-prompt.md?raw';
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

const DEMO_LOGO_COLLAPSED = (
  <div className="flex items-center justify-center">
    <div className="size-8 rounded bg-white/20 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold">DS</span>
    </div>
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
            logo={DEMO_LOGO_COLLAPSED}
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

/* ── removeTableColumn ───────────────────────────────────── */
function removeTableColumn(md: string, header: string): string {
  const lines = md.split('\n');
  let colIdx = -1;
  return lines.map(line => {
    if (!line.startsWith('|')) { colIdx = -1; return line; }
    const cells = line.split('|');
    if (colIdx === -1) {
      colIdx = cells.findIndex((c, i) => i > 0 && c.trim() === header);
    }
    if (colIdx > 0) {
      const updated = [...cells];
      updated.splice(colIdx, 1);
      return updated.join('|');
    }
    return line;
  }).join('\n');
}

/* ── transformFigmaMarkdown ──────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const showExpanded  = (vals.showExpanded  as boolean) || !(vals.showCollapsed as boolean);
  const showCollapsed = (vals.showCollapsed as boolean) || !(vals.showExpanded  as boolean);
  const showProfile   = vals.showProfile as boolean;

  // ── 1. Block comment markers ───────────────────────────────
  if (!showExpanded) {
    md = md.replace(/<!-- IF_EXPANDED -->\n[\s\S]*?<!-- \/IF_EXPANDED -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_EXPANDED -->\n/g, '').replace(/<!-- \/IF_EXPANDED -->\n/g, '');
  }

  if (!showCollapsed) {
    md = md.replace(/<!-- IF_COLLAPSED -->\n[\s\S]*?<!-- \/IF_COLLAPSED -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_COLLAPSED -->\n/g, '').replace(/<!-- \/IF_COLLAPSED -->\n/g, '');
  }

  if (!showProfile) {
    md = md.replace(/<!-- IF_PROFILE -->\n[\s\S]*?<!-- \/IF_PROFILE -->\n/g, '');
  } else {
    md = md.replace(/<!-- IF_PROFILE -->\n/g, '').replace(/<!-- \/IF_PROFILE -->\n/g, '');
  }

  // ── 2. Overview table counts ───────────────────────────────
  if (!showExpanded) {
    md = md.replace(
      /\| `_Nav item base` Variants \| 4 \(Active × Type\) \|/,
      '| `_Nav item base` Variants | 2 (Active) |',
    );
    md = md.replace(
      /\| `Navigation` Variants \| 2 \(State\) \|/,
      '| `Navigation` Variants | 1 (State=Collapsed) |',
    );
  } else if (!showCollapsed) {
    md = md.replace(
      /\| `_Nav item base` Variants \| 4 \(Active × Type\) \|/,
      '| `_Nav item base` Variants | 2 (Active) |',
    );
    md = md.replace(
      /\| `Navigation` Variants \| 2 \(State\) \|/,
      '| `Navigation` Variants | 1 (State=Expanded) |',
    );
  }

  // ── 3. Intro paragraph ────────────────────────────────────
  if (!showExpanded) {
    md = md.replace(/Horizontal and Vertical layouts/, 'Vertical layouts');
  } else if (!showCollapsed) {
    md = md.replace(/Horizontal and Vertical layouts/, 'Horizontal layouts');
  }
  if (!showProfile) {
    md = md.replace(/, optional Profile section at the bottom,/, '');
  }

  // ── 4. Component Hierarchy code block lines ───────────────
  if (!showExpanded) {
    md = md.replace(/  ├── Active=No,  Type=Horizontal\n/, '');
    md = md.replace(/  ├── Active=Yes, Type=Horizontal\n/, '');
    md = md.replace(/  ├── State=Expanded[^\n]*\n/, '');
    md = md.replace(/  ├── State=Collapsed/, '  └── State=Collapsed');
  }
  if (!showCollapsed) {
    md = md.replace(/  ├── Active=No,  Type=Vertical\n/, '');
    md = md.replace(/  └── Active=Yes, Type=Vertical\n/, '');
    md = md.replace(/  └── State=Collapsed[^\n]*\n/, '');
    md = md.replace(/  ├── State=Expanded/, '  └── State=Expanded');
    md = md.replace(/  ├── Active=Yes, Type=Horizontal/, '  └── Active=Yes, Type=Horizontal');
  }

  // ── 5. Variant Properties tables ─────────────────────────
  if (!showExpanded) {
    md = md.replace(/`Horizontal` · `Vertical`/, '`Vertical`');
  } else if (!showCollapsed) {
    md = md.replace(/`Horizontal` · `Vertical`/, '`Horizontal`');
  }
  if (!showExpanded) {
    md = md.replace(/`Expanded` · `Collapsed`/, '`Collapsed`');
  } else if (!showCollapsed) {
    md = md.replace(/`Expanded` · `Collapsed`/, '`Expanded`');
  }
  if (!showProfile) {
    md = md.replace(/\| `Show Profile#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
  }

  // ── 6. Toggle Icon Rules table rows ───────────────────────
  if (!showExpanded) {
    md = md.replace(/\| `State=Expanded` \| \*\*chevron-left\*\*[^\n]+\n/, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| `State=Collapsed` \| \*\*chevron-right\*\*[^\n]+\n/, '');
  }

  // ── 7. Layer Descriptions — `_Nav item base` table ────────
  if (!showCollapsed) {
    md = md.replace(/\| `Container` \| FRAME \| Icon container for Vertical[^\n]+\n/, '');
  }
  if (!showExpanded && !showCollapsed) {
    // both gone — impossible due to guard above, but be safe
  }
  // Simplify H/V notes if only one type shown
  if (!showExpanded) {
    md = md.replace(/FILL × FIXED\(44px\) \(H\) · FIXED\(44px\) × HUG \(V\)/, 'FIXED(44px) × HUG');
    md = md.replace(/Horizontal AL \(H\) · Vertical AL \(V\)/, 'Vertical AL');
    md = md.replace(/Body sm\/Medium \(inactive H\) · Body sm\/Semi Bold \(active H\) · Label sm\/Medium \(V\)/, 'Label sm/Medium');
  } else if (!showCollapsed) {
    md = md.replace(/FILL × FIXED\(44px\) \(H\) · FIXED\(44px\) × HUG \(V\)/, 'FILL × FIXED(44px)');
    md = md.replace(/Horizontal AL \(H\) · Vertical AL \(V\)/, 'Horizontal AL');
    md = md.replace(/Body sm\/Medium \(inactive H\) · Body sm\/Semi Bold \(active H\) · Label sm\/Medium \(V\)/, 'Body sm/Medium (inactive) · Body sm/Semi Bold (active)');
  }

  // ── 8. Layer Descriptions — `Navigation` table ────────────
  if (!showProfile) {
    md = md.replace(/\| `Profile_Container` \| FRAME \|[^\n]+\n/, '');
    md = md.replace(/\| `Profile` \| FRAME \|[^\n]+\n/, '');
    md = md.replace(/\| `Avatar Image` \| INSTANCE \|[^\n]+\n/, '');
    md = md.replace(/\| `Contenet` \| FRAME \|[^\n]+\n/, '');
  }
  if (!showExpanded && !showCollapsed) {
    md = md.replace(/FIXED\(240 or 96px\)/, 'FIXED(96px)');
  } else if (!showExpanded) {
    md = md.replace(/FIXED\(240 or 96px\)/, 'FIXED(96px)');
  } else if (!showCollapsed) {
    md = md.replace(/FIXED\(240 or 96px\)/, 'FIXED(240px)');
  }

  // ── 9. Spacing — `_Nav item base` table rows ──────────────
  if (!showExpanded) {
    md = md.replace(/\| Horizontal \|[^\n]+\n/g, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| Vertical \|[^\n]+\n/g, '');
  }

  // ── 10. Radius — `_Nav item base` table rows ──────────────
  if (!showCollapsed) {
    md = md.replace(/\| `Container` \(V icon container\)[^\n]+\n/, '');
    md = md.replace(/Outer item frame \(both types\)/, 'Outer item frame');
  }

  // ── 11. Spacing — `Navigation` table rows ─────────────────
  if (!showExpanded) {
    md = md.replace(/\| `Frame 1261153134` \(Expanded\)[^\n]+\n/g, '');
    md = md.replace(/\| `Profile` \(Expanded\)[^\n]+\n/, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| `Frame 1261153134` \(Collapsed\)[^\n]+\n/g, '');
  }
  if (!showProfile) {
    md = md.replace(/\| `Profile_Container` \(both states\)[^\n]+\n/g, '');
    md = md.replace(/\| `Profile` \(Expanded\)[^\n]+\n/, '');
    md = md.replace(/\| `Contenet`[^\n]+\n/g, '');
  }

  // ── 12. Radius — `Navigation` table rows ──────────────────
  if (!showProfile) {
    md = md.replace(/\| `Profile_Container` \|[^\n]+\n/g, '');
    md = md.replace(/\| `Avatar Image`[^\n]+\n/g, '');
  }

  // ── 13. Typography table rows ─────────────────────────────
  if (!showExpanded) {
    md = md.replace(/\| Horizontal inactive text[^\n]+\n/, '');
    md = md.replace(/\| Horizontal active text[^\n]+\n/, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| Vertical text \(both states\)[^\n]+\n/, '');
  }
  if (!showProfile) {
    md = md.replace(/\| `Contenet` → Name `Text`[^\n]+\n/g, '');
    md = md.replace(/\| `Contenet` → Role `Text`[^\n]+\n/g, '');
  }

  // ── 14. Color Variables table rows ────────────────────────
  if (!showExpanded && !showProfile) {
    md = md.replace(/\| `Navigation\/nav-text-active` \|[^\n]+\n/, '');
  }
  if (!showCollapsed && !showProfile) {
    md = md.replace(/\| `Navigation\/nav-text-active-vertical` \|[^\n]+\n/, '');
    md = md.replace(/\| `Navigation\/nav-icon-bg` \|[^\n]+\n/, '');
  }

  // ── 15. Color Per Variant — `_Nav item base` table ────────
  if (!showCollapsed) {
    md = removeTableColumn(md, 'Container fill (V)');
    md = md.replace(/`nav-text-active` \(H\) · `nav-text-active-vertical` \(V\)/, '`nav-text-active`');
  } else if (!showExpanded) {
    md = md.replace(/`nav-text-active` \(H\) · `nav-text-active-vertical` \(V\)/, '`nav-text-active-vertical`');
  }

  // ── 16. Color Per Variant — `Navigation` Sidebar table ────
  if (!showProfile) {
    md = md.replace(/\| `Profile_Container` fill[^\n]+\n/, '');
    md = md.replace(/\| `Contenet` → Name[^\n]+\n/g, '');
    md = md.replace(/\| `Contenet` → Role[^\n]+\n/g, '');
    md = md.replace(/\| `chevron-right` VECTOR stroke[^\n]+\n/, '');
  }

  // ── 17. Variable Attachment — `_Nav item base` table rows ─
  if (!showExpanded) {
    md = md.replace(/\| Outer frame \(H\)[^\n]+\n/g, '');
    md = md.replace(/\| `Content` \(H\)[^\n]+\n/g, '');
    md = md.replace(/\| `Text` H[^\n]+\n/g, '');
    md = md.replace(/\| Outer frame Active=Yes[^\n]+\n/g, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| Outer frame \(V\)[^\n]+\n/g, '');
    md = md.replace(/\| `Content` \(V\)[^\n]+\n/g, '');
    md = md.replace(/\| `Container` \(V\)[^\n]+\n/g, '');
    md = md.replace(/\| `Container` Active=No[^\n]+\n/g, '');
    md = md.replace(/\| `Container` Active=Yes[^\n]+\n/g, '');
    md = md.replace(/\| `Text` V[^\n]+\n/g, '');
  }

  // ── 18. Variable Attachment — `Navigation` table rows ─────
  if (!showExpanded) {
    md = md.replace(/\| `Frame 1261153134` \(Expanded\)[^\n]+\n/g, '');
    md = md.replace(/\| `Profile` \(Expanded\)[^\n]+\n/g, '');
    md = md.replace(/\| Toggle `Icon` \(Expanded\)[^\n]+\n/g, '');
  }
  if (!showCollapsed) {
    md = md.replace(/\| `Frame 1261153134` \(Collapsed\)[^\n]+\n/g, '');
    md = md.replace(/\| Toggle `Icon` \(Collapsed\)[^\n]+\n/g, '');
  }
  if (!showProfile) {
    md = md.replace(/\| `Profile_Container`[^\n]+\n/g, '');
    md = md.replace(/\| `Profile` \(Expanded\)[^\n]+\n/g, '');
    md = md.replace(/\| `Avatar Image`[^\n]+\n/g, '');
    md = md.replace(/\| `Contenet`[^\n]+\n/g, '');
    md = md.replace(/\| `Contenet` → Name[^\n]+\n/g, '');
    md = md.replace(/\| `Contenet` → Role[^\n]+\n/g, '');
    md = md.replace(/\| `chevron-right` VECTOR[^\n]+\n/g, '');
  }

  // ── 19. Construction Step 5 text ─────────────────────────
  if (!showExpanded) {
    md = md.replace(/Select all 4\. Combine/, 'Select all 2. Combine');
    md = md.replace(/`Type` → `Horizontal`, `Vertical`\./, '`Type` → `Vertical`.');
    md = md.replace(/on all 4 variants\./, 'on all 2 variants.');
  } else if (!showCollapsed) {
    md = md.replace(/Select all 4\. Combine/, 'Select all 2. Combine');
    md = md.replace(/`Type` → `Horizontal`, `Vertical`\./, '`Type` → `Horizontal`.');
    md = md.replace(/on all 4 variants\./, 'on all 2 variants.');
  }

  // ── 20. Construction Step 9 text ─────────────────────────
  if (!showExpanded) {
    md = md.replace(/Select both\. Combine into/, 'Select the variant. Combine into');
    md = md.replace(/`State` → `Expanded`, `Collapsed`\./, '`State` → `Collapsed`.');
    md = md.replace(/on both variants\./, 'on the variant.');
  } else if (!showCollapsed) {
    md = md.replace(/Select both\. Combine into/, 'Select the variant. Combine into');
    md = md.replace(/`State` → `Expanded`, `Collapsed`\./, '`State` → `Expanded`.');
    md = md.replace(/on both variants\./, 'on the variant.');
  }
  if (!showProfile) {
    md = md.replace(/^3\. Boolean `Show Profile`[^\n]+\n/m, '');
  }

  // ── 21. Mandatory Rules list items ───────────────────────
  if (!showProfile) {
    md = md.replace(/^- \*\*`Profile_Container` wraps[^\n]+\n/m, '');
    md = md.replace(/^- \*\*Layer name `Contenet`[^\n]+\n/m, '');
    md = md.replace(/^- \*\*Profile in collapsed state:[^\n]+\n/m, '');
    md = md.replace(/^- \*\*`Profile` is a plain frame[^\n]+\n/m, '');
  }
  if (!showCollapsed && showProfile) {
    md = md.replace(/^- \*\*Profile in collapsed state:[^\n]+\n/m, '');
  }
  if (!showExpanded && !showCollapsed) {
    // guard — can't happen
  }
  // Toggle rule — if only one state, simplify
  if (!showExpanded) {
    md = md.replace(
      /\*\*Toggle icon is NOT optional[^*]+\*\* Expanded = `chevron-left`\. Collapsed = `chevron-right`\./,
      '**Toggle icon is NOT optional — it must be set for the Collapsed state.** Use `chevron-right`. Swap via Instance Swap property, not by rotating the icon.',
    );
  } else if (!showCollapsed) {
    md = md.replace(
      /\*\*Toggle icon is NOT optional[^*]+\*\* Expanded = `chevron-left`\. Collapsed = `chevron-right`\./,
      '**Toggle icon is NOT optional — it must be set for the Expanded state.** Use `chevron-left`. Swap via Instance Swap property, not by rotating the icon.',
    );
  }

  // ── 22. Figma Arrangement section ────────────────────────
  if (!showExpanded) {
    md = md.replace(/_Nav item base: 4 variants · Active × Type/, '_Nav item base: 2 variants · Active');
    md = md.replace(/Navigation: 2 states · Expanded \(240px\) · Collapsed \(96px\)/, 'Navigation: 1 state · Collapsed (96px)');
    md = md.replace(/▌ _Nav item base — 4 Variants/, '▌ _Nav item base — 2 Variants');
    md = md.replace(/Active=No\/Yes · Type=Horizontal\/Vertical/, 'Active=No/Yes · Type=Vertical');
    md = md.replace(/▌ Navigation — 2 States/, '▌ Navigation — 1 State');
    md = md.replace(/Expanded 240px · Collapsed 96px/, 'Collapsed 96px');
    md = md.replace(/Toggle: chevron-left \(Expanded\) · chevron-right \(Collapsed\)/, 'Toggle: chevron-right');
    md = md.replace(/\| `_Nav item base — 4 Variants`[^\n]+\n/, '| `_Nav item base — 2 Variants` | `Active=No · Active=Yes · Vertical (icon + label)` | Actual `_Nav item base` COMPONENT_SET |\n');
    md = md.replace(/\| `Navigation — 2 States`[^\n]+\n/, '| `Navigation — 1 State` | `Collapsed 96px · Toggle chevron-right` | Actual `Navigation` COMPONENT_SET |\n');
  } else if (!showCollapsed) {
    md = md.replace(/_Nav item base: 4 variants · Active × Type/, '_Nav item base: 2 variants · Active');
    md = md.replace(/Navigation: 2 states · Expanded \(240px\) · Collapsed \(96px\)/, 'Navigation: 1 state · Expanded (240px)');
    md = md.replace(/▌ _Nav item base — 4 Variants/, '▌ _Nav item base — 2 Variants');
    md = md.replace(/Active=No\/Yes · Type=Horizontal\/Vertical/, 'Active=No/Yes · Type=Horizontal');
    md = md.replace(/▌ Navigation — 2 States/, '▌ Navigation — 1 State');
    md = md.replace(/Expanded 240px · Collapsed 96px/, 'Expanded 240px');
    md = md.replace(/Toggle: chevron-left \(Expanded\) · chevron-right \(Collapsed\)/, 'Toggle: chevron-left');
    md = md.replace(/\| `_Nav item base — 4 Variants`[^\n]+\n/, '| `_Nav item base — 2 Variants` | `Active=No · Active=Yes · Horizontal (44px)` | Actual `_Nav item base` COMPONENT_SET |\n');
    md = md.replace(/\| `Navigation — 2 States`[^\n]+\n/, '| `Navigation — 1 State` | `Expanded 240px · Toggle chevron-left` | Actual `Navigation` COMPONENT_SET |\n');
  }
  if (!showProfile) {
    md = md.replace(/Dark sidebar · Profile_Container \(spacing-4xl\) → Profile/, 'Dark sidebar');
    md = md.replace(/Contenet \+ Avatar Image \+ chevron-right · /g, '');
    md = md.replace(/\| `Navigation — 2 States`[^\n]+Contenet[^\n]+\n/, (m) =>
      m.replace(/Contenet \+ Avatar Image \+ chevron-right · /g, ''),
    );
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
      figmaMarkdownContent={navFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
