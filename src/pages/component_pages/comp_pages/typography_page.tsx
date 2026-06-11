import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import typographyMd from '../md_files/typography-instruction.md?raw';
import typographyFigmaMd from '../figma_prompt/typography.md?raw';

/* ────────────────────────────────────────────────────────────────
 * Typography tiers — anchored to typography-instruction.md.
 * The markdown file is the read-only source of truth; this page
 * regenerates it per the user's choices.
 * ──────────────────────────────────────────────────────────────── */
type TierKey =
  | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

interface Tier {
  key: TierKey;
  className: string;     // tailwind class, e.g. `text-2xs`
  defaultPx: number;
  figmaLabel: string;    // matches the Figma → Tailwind reference table
}

const TIERS: Tier[] = [
  { key: '2xs', className: 'text-2xs', defaultPx: 10, figmaLabel: 'Caption' },
  { key: 'xs',  className: 'text-xs',  defaultPx: 12, figmaLabel: 'Label sm' },
  { key: 'sm',  className: 'text-sm',  defaultPx: 14, figmaLabel: 'Body sm' },
  { key: 'md',  className: 'text-md',  defaultPx: 16, figmaLabel: 'Body md' },
  { key: 'lg',  className: 'text-lg',  defaultPx: 18, figmaLabel: 'Body lg' },
  { key: 'xl',  className: 'text-xl',  defaultPx: 20, figmaLabel: 'Heading md' },
  { key: '2xl', className: 'text-2xl', defaultPx: 24, figmaLabel: 'Heading lg' },
  { key: '3xl', className: 'text-3xl', defaultPx: 32, figmaLabel: 'Heading xl' },
  { key: '4xl', className: 'text-4xl', defaultPx: 40, figmaLabel: 'Display sm' },
  { key: '5xl', className: 'text-5xl', defaultPx: 48, figmaLabel: 'Display md' },
  { key: '6xl', className: 'text-6xl', defaultPx: 60, figmaLabel: 'Display lg' },
  { key: '7xl', className: 'text-7xl', defaultPx: 72, figmaLabel: 'Display xl' },
];

const tierKey = (k: TierKey) => `tier_${k}`;

function parseTier(val: string | boolean | number | undefined): { enabled: boolean; px: number } {
  const s = String(val ?? 'true:0');
  const colon = s.indexOf(':');
  if (colon === -1) return { enabled: true, px: Number(s) || 0 };
  return { enabled: s.slice(0, colon) !== 'false', px: Number(s.slice(colon + 1)) || 0 };
}

/* ────────────────────────────────────────────────────────────────
 * Customise panel — one tokencontrol per tier
 * ──────────────────────────────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Tiers', type: 'divider' },
  ...TIERS.map(t => ({
    key: tierKey(t.key),
    label: t.className,
    type: 'tokencontrol' as const,
    min: 6,
    max: 200,
  })),
];

const DEFAULT_VALUES: InputValues = Object.fromEntries(
  TIERS.map(t => [tierKey(t.key), `true:${t.defaultPx}`]),
);

/* ────────────────────────────────────────────────────────────────
 * Variants — one row per enabled tier, sample glyph + class + size.
 * ──────────────────────────────────────────────────────────────── */
function getEnabled(vals: InputValues): Tier[] {
  return TIERS.filter(t => parseTier(vals[tierKey(t.key)]).enabled);
}

function buildVariants(vals: InputValues): VariantGroup[] {
  const enabled = getEnabled(vals);
  return [{
    id: 'typography',
    label: 'Typography Scale',
    dotColor: '',
    hideDivider: true,
    styles: [{
      id: 'scale',
      label: '',
      accentColor: '#0056b8',
      rows: enabled.map(t => {
        const { px } = parseTier(vals[tierKey(t.key)]);
        return {
          cells: [{
            label: '',
            node: <TypeRow key={t.key} className={t.className} px={px || t.defaultPx} />,
          }],
        };
      }),
    }],
  }];
}

function TypeRow({ className, px }: { className: string; px: number }) {
  return (
    <div className="tp-row">
      <div className="tp-row-meta">
        <span className="tp-row-class">{className}</span>
        <span className="tp-row-size">{px}px</span>
      </div>
      <div className="tp-row-sample" style={{ fontSize: `${px}px` }}>
        The quick brown fox
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * MD generation — preserve the original document structure and
 * only substitute sizes / drop disabled tiers.
 * ──────────────────────────────────────────────────────────────── */
function transformMarkdown(raw: string, vals: InputValues): string {
  const lines = raw.split('\n');
  const out: string[] = [];

  for (const line of lines) {
    const cssMatch = line.match(/^(\s*--text-([0-9a-z]+):)(\s*)\d+px;\s*$/);
    if (cssMatch) {
      const k = cssMatch[2] as TierKey;
      const { enabled, px } = parseTier(vals[tierKey(k)]);
      if (!enabled) continue;
      const fallback = TIERS.find(t => t.key === k)?.defaultPx;
      out.push(`${cssMatch[1]}${cssMatch[3]}${px || fallback}px;`);
      continue;
    }

    const tableMatch = line.match(/^\|\s*[^|]+\|\s*\d+px\s*\|\s*`text-([0-9a-z]+)`\s*\|\s*$/);
    if (tableMatch) {
      const k = tableMatch[1] as TierKey;
      const { enabled, px } = parseTier(vals[tierKey(k)]);
      if (!enabled) continue;
      const tier = TIERS.find(t => t.key === k);
      out.push(`| ${tier?.figmaLabel ?? '—'} | ${px || tier?.defaultPx}px | \`text-${k}\` |`);
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

/**
 * Figma transform — substitutes the `Font/Size/{figmaLabel} → N` lines
 * from the user-supplied tier sizes. Disabled tiers are skipped (line
 * dropped). The 2xs tier has no Figma equivalent, so it is never
 * emitted on this side. Line-height, letter-spacing, and font-weight
 * sections are left untouched — the input panel doesn't customise them.
 */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  const labelToTier = new Map<string, typeof TIERS[number]>();
  for (const t of TIERS) {
    if (t.figmaLabel && t.figmaLabel !== '—') labelToTier.set(t.figmaLabel, t);
  }

  const out: string[] = [];
  for (const line of raw.split('\n')) {
    const m = line.match(/^(\s*Font\/Size\/)([A-Za-z ]+?)(\s*→\s*)\d+\s*$/);
    if (m) {
      const tier = labelToTier.get(m[2].trim());
      if (tier) {
        const { enabled, px } = parseTier(vals[tierKey(tier.key)]);
        if (!enabled) continue;
        out.push(`${m[1]}${m[2]}${m[3]}${px || tier.defaultPx}`);
        continue;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

function resolveTokens(_vals: InputValues): Record<string, string> { return {}; }

/* ────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────── */
export default function TypographyPage() {
  return (
    <>
      <style>{LOCAL_CSS}</style>
      <ComponentPageLayout
        inputConfig={INPUT_CONFIG}
        defaultInputValues={DEFAULT_VALUES}
        buildVariants={buildVariants}
        variantTitle="Variants"
        markdownContent={typographyMd}
        markdownFileName="typography-instruction"
        figmaMarkdownContent={typographyFigmaMd}
        resolveTokens={resolveTokens}
        transformMarkdown={transformMarkdown}
        transformFigmaMarkdown={transformFigmaMarkdown}
      />
    </>
  );
}

const LOCAL_CSS = `
  .tp-row {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 12px 4px;
    border-bottom: 1px solid #eef0f3;
    width: 100%;
  }
  .tp-row:last-child { border-bottom: none; }
  .tp-row-meta {
    flex: 0 0 140px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .tp-row-class {
    color: #051325;
    font-weight: 500;
    font-size: 14px;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .tp-row-size {
    color: #6b7689;
    font-size: 13px;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .tp-row-sample {
    color: #051325;
    line-height: 1.15;
    font-weight: 500;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
