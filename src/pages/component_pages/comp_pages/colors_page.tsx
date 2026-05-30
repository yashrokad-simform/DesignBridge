import { oklch, formatHex, type Oklch } from 'culori';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import colorsMd from '../md_files/color-instruction.md?raw';

/* ────────────────────────────────────────────────────────────────
 * Defaults — anchored to color-instruction.md (READ-ONLY reference)
 *   --color-primary-500:   #0056b8
 *   --color-secondary-500: #c65910
 *   --color-gray-500:      #4f5c6d
 * ──────────────────────────────────────────────────────────────── */
const DEFAULTS = {
  primary:   '#0056b8',
  secondary: '#c65910',
  neutral:   '#4f5c6d',
} as const;

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
type Shade = typeof SHADES[number];
type Palette = Record<Shade, string>;

/* ────────────────────────────────────────────────────────────────
 * OKLCH targets (see generateShades). For shades < 500 these are
 * absolute lightness targets; for shades > 500 they are deltas from
 * the user-provided anchor lightness.
 * ──────────────────────────────────────────────────────────────── */
const L_TARGETS: Record<Shade, number> = {
  50:  0.97,
  100: 0.93,
  200: 0.87,
  300: 0.80,
  400: 0.72,
  500: 0,        // anchor — keep as-is
  600: -0.07,
  700: -0.15,
  800: -0.22,
  900: -0.30,
};
const CHROMA_LIGHT_TAIL = 0.02;   // chroma target at shade 50 (near-grey)
const CHROMA_DARK_DECAY = 0.15;   // % chroma decrease from 500 → 900

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const isHex6 = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);

/**
 * OKLCH-based perceptual ramp from a single anchor.
 *   • Hue is held constant across all shades.
 *   • L lerps to ~0.97 on the light side, anchor−0.30 on the dark side.
 *   • C lerps toward CHROMA_LIGHT_TAIL on the light side, mild decay on the dark side.
 */
function generateShades(hex: string): Palette {
  const parsed = oklch(isHex6(hex) ? hex : '#000000');
  const anchorL = parsed?.l ?? 0.5;
  const anchorC = parsed?.c ?? 0;
  const anchorH = parsed?.h ?? 0;   // achromatic inputs (greys) → hue may be undefined

  const out = {} as Palette;
  for (const k of SHADES) {
    let L: number;
    let C: number;
    if (k === 500) {
      L = anchorL;
      C = anchorC;
    } else if (k < 500) {
      L = L_TARGETS[k];
      const t = (500 - k) / 450;            // 50 → 1, 400 → 0.22
      C = anchorC * (1 - t) + CHROMA_LIGHT_TAIL * t;
    } else {
      L = clamp(anchorL + L_TARGETS[k], 0.05, 0.95);
      const t = (k - 500) / 400;            // 600 → 0.25, 900 → 1
      C = Math.max(0, anchorC * (1 - CHROMA_DARK_DECAY * t));
    }
    const color: Oklch = { mode: 'oklch', l: clamp(L, 0, 1), c: Math.max(0, C), h: anchorH };
    out[k] = formatHex(color) ?? '#000000';
  }
  return out;
}

/* ────────────────────────────────────────────────────────────────
 * Customise panel — same structure as every other page (divider +
 * fields). Uses the built-in `color` InputPanel field.
 * ──────────────────────────────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0',      label: 'Anchors',       type: 'divider' },
  { key: 'primary',   label: 'Primary 500',   type: 'colorhex' },
  { key: 'secondary', label: 'Secondary 500', type: 'colorhex' },
  { key: 'neutral',   label: 'Neutral 500',   type: 'colorhex' },
];

const DEFAULT_VALUES: InputValues = { ...DEFAULTS };

/* ────────────────────────────────────────────────────────────────
 * Variants — one VariantGroup per family. Each group has a single
 * row of 10 cells; .cp-vcells uses flex-wrap so cells naturally
 * reflow to a second row when the panel is narrow.
 * ──────────────────────────────────────────────────────────────── */
const FAMILIES = [
  { key: 'primary',   label: 'Primary Colors',   name: 'Primary',   accent: '#0056b8' },
  { key: 'secondary', label: 'Secondary Colors', name: 'Secondary', accent: '#c65910' },
  { key: 'neutral',   label: 'Neutral Colors',   name: 'Neutral',   accent: '#4f5c6d' },
] as const;

function buildVariants(vals: InputValues): VariantGroup[] {
  return FAMILIES.map(fam => {
    const hex = vals[fam.key] as string;
    const palette = generateShades(hex);
    return {
      id: fam.key,
      label: fam.label,
      dotColor: '',
      hideDivider: true,
      styles: [{
        id: fam.key,
        label: '',
        accentColor: fam.accent,
        rows: [{
          cells: SHADES.map(k => ({
            label: '',  // swatch carries its own label/hex inside, per the spec
            node: <Swatch key={k} name={fam.name} shade={k} hex={palette[k]} />,
          })),
        }],
      }],
    };
  });
}

function Swatch({ name, shade, hex }: { name: string; shade: Shade; hex: string }) {
  return (
    <div className="cg-swatch">
      <div className="cg-swatch-block" style={{ background: hex, color: hex }}>
        {shade === 500 && <span className="cg-swatch-marker" aria-label="Anchor shade (500)" />}
      </div>
      <div className="cg-swatch-meta">
        <div className="cg-swatch-label">{name}/{shade}</div>
        <div className="cg-swatch-hex">{hex.toLowerCase()}</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * MD generation — preserve the entire color-instruction.md document
 * (intro, prerequisites, rules, file-structure summary) and only
 * substitute the 30 primitive hex values inside the embedded CSS
 * code block. Anchoring the regex on `:` after the shade number
 * (e.g. `primary-50:`) safely distinguishes 50 from 500.
 * ──────────────────────────────────────────────────────────────── */
function substituteHex(md: string, tokenName: string, newHex: string): string {
  const re = new RegExp(`(--color-${tokenName}:\\s*)#[0-9a-fA-F]{3,8}`);
  return md.replace(re, `$1${newHex.toLowerCase()}`);
}

function transformMarkdown(raw: string, vals: InputValues): string {
  const primary   = generateShades(vals.primary   as string);
  const secondary = generateShades(vals.secondary as string);
  const neutral   = generateShades(vals.neutral   as string);

  let md = raw;
  for (const k of SHADES) {
    md = substituteHex(md, `primary-${k}`,   primary[k]);
    md = substituteHex(md, `secondary-${k}`, secondary[k]);
    md = substituteHex(md, `gray-${k}`,      neutral[k]);   // MD token is `gray`, UI label is "Neutral"
  }
  return md;
}

function resolveTokens(_vals: InputValues): Record<string, string> { return {}; }

/* ────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────── */
export default function ColorsPage() {
  return (
    <>
      <style>{LOCAL_CSS}</style>
      <ComponentPageLayout
        inputConfig={INPUT_CONFIG}
        defaultInputValues={DEFAULT_VALUES}
        buildVariants={buildVariants}
        variantTitle="Variants"
        markdownContent={colorsMd}
        markdownFileName="color-instruction"
        resolveTokens={resolveTokens}
        transformMarkdown={transformMarkdown}
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Swatch styles — scoped to .cg-swatch* so they don't bleed.
 * Chrome (Component Details panel, Customise sidebar, header, toast,
 * Preview drawer) is provided by ComponentPageLayout / component_pages.css.
 * ──────────────────────────────────────────────────────────────── */
const LOCAL_CSS = `
  .cg-swatch {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    width: 96px;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .cg-swatch-block { position: relative; height: 56px; }
  .cg-swatch-marker {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 0 0 1px rgba(5, 19, 37, 0.18), 0 1px 2px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cg-swatch-marker::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
  }
  .cg-swatch-meta { padding: 6px 8px 8px; }
  .cg-swatch-label {
    color: #051325;
    font-weight: 500;
    font-size: 11px;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cg-swatch-hex {
    color: #4f5c6d;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    line-height: 1.4;
    margin-top: 2px;
    text-transform: lowercase;
  }
`;
