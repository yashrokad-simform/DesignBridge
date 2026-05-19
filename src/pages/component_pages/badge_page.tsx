import React, { useState } from 'react';
import { Badge, type BadgeVariant, type BadgeColor } from '../../components/ui/Badge';

const PAGE_CSS = `
  .bp-wrap {
    --bp-muted: #6b7689;
    --bp-line: #eef0f4;
    --bp-surface: #ffffff;
    --bp-surface-2: #f8f9fb;
    --bp-ink: #051325;
    --bp-ink-2: #374151;
    --bp-accent: #0056b8;
    --bp-accent-bg: #e6eef8;
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .bp-wrap *, .bp-wrap *::before, .bp-wrap *::after { box-sizing: border-box; }

  /* Section label */
  .bp-section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: var(--bp-muted);
    margin: 32px 0 14px;
  }
  .bp-section-label:first-child { margin-top: 0; }

  /* Card */
  .bp-card {
    background: var(--bp-surface);
    border: 1px solid var(--bp-line);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .bp-card-header {
    padding: 14px 20px;
    border-bottom: 1px solid var(--bp-line);
    font-size: 13px;
    font-weight: 600;
    color: var(--bp-ink);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .bp-card-body {
    padding: 28px 24px;
  }

  /* Description */
  .bp-desc {
    font-size: 14px;
    line-height: 1.65;
    color: var(--bp-ink-2);
    margin-bottom: 24px;
  }
  .bp-desc strong { color: var(--bp-ink); }


  /* Tabs */
  .bp-tabs {
    display: inline-flex;
    gap: 4px;
    background: var(--bp-surface-2);
    border: 1px solid var(--bp-line);
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 24px;
  }
  .bp-tab {
    padding: 6px 16px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    color: var(--bp-muted);
    cursor: pointer;
    border: 0;
    background: none;
    transition: background 160ms ease, color 160ms ease;
    font-family: inherit;
  }
  .bp-tab:hover { color: var(--bp-ink); }
  .bp-tab[aria-selected="true"] {
    background: var(--bp-surface);
    color: var(--bp-ink);
    box-shadow: 0 1px 3px rgba(0,0,0,.08);
    font-weight: 600;
  }

  /* Color grid */
  .bp-color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  .bp-color-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--bp-line);
  }
  .bp-color-row:last-child { border-bottom: 0; }
  .bp-color-name {
    font-size: 12px;
    font-weight: 500;
    color: var(--bp-muted);
    width: 76px;
    flex-shrink: 0;
    text-transform: capitalize;
  }
  .bp-color-badges {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* Slot grid */
  .bp-slot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .bp-slot-card {
    background: var(--bp-surface-2);
    border: 1px solid var(--bp-line);
    border-radius: 12px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .bp-slot-label {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--bp-muted);
    text-transform: uppercase;
    letter-spacing: .05em;
  }
  .bp-slot-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Props table */
  .bp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .bp-table th {
    text-align: left;
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--bp-muted);
    background: var(--bp-surface-2);
    border-bottom: 1px solid var(--bp-line);
  }
  .bp-table td {
    padding: 11px 14px;
    border-bottom: 1px solid var(--bp-line);
    color: var(--bp-ink-2);
    vertical-align: top;
    line-height: 1.5;
  }
  .bp-table tr:last-child td { border-bottom: 0; }
  .bp-table code {
    font-family: 'DM Mono', 'Fira Code', monospace;
    font-size: 12px;
    background: var(--bp-surface-2);
    border: 1px solid var(--bp-line);
    padding: 2px 6px;
    border-radius: 5px;
    color: var(--bp-accent);
  }

  /* Code block */
  .bp-code-block {
    background: #0d1b2a;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .bp-code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  .bp-code-lang {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: rgba(255,255,255,.32);
  }
  .bp-code-copy {
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,.38);
    padding: 4px 8px;
    border-radius: 5px;
    background: rgba(255,255,255,.06);
    border: 0;
    cursor: pointer;
    font-family: inherit;
    transition: background 200ms ease, color 200ms ease;
  }
  .bp-code-copy:hover { background: rgba(255,255,255,.12); color: rgba(255,255,255,.8); }
  .bp-code-block pre {
    margin: 0;
    padding: 18px 20px;
    overflow-x: auto;
    font-family: 'DM Mono', 'Fira Code', monospace;
    font-size: 12.5px;
    line-height: 1.72;
    color: #c9d8f0;
    white-space: pre;
  }
  .bp-code-block pre .kw  { color: #7eb6f6; }
  .bp-code-block pre .str { color: #a8d9a0; }
  .bp-code-block pre .cm  { color: #586e78; font-style: italic; }
  .bp-code-block pre .tag { color: #f0b27a; }
  .bp-code-block pre .atr { color: #85c1e9; }

  /* Usage grid */
  .bp-usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 0;
  }
  @media (max-width: 640px) { .bp-usage-grid { grid-template-columns: 1fr; } }
  .bp-usage-card {
    border-radius: 12px;
    padding: 16px 18px;
  }
  .bp-usage-card.do   { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .bp-usage-card.dont { background: #fff1f2; border: 1px solid #fecdd3; }
  .bp-usage-card-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .bp-usage-card.do   .bp-usage-card-label { color: #166534; }
  .bp-usage-card.dont .bp-usage-card-label { color: #9f1239; }
  .bp-usage-card ul {
    margin: 0;
    padding-left: 18px;
    font-size: 13px;
    line-height: 1.6;
    color: var(--bp-ink-2);
  }
  .bp-usage-card li + li { margin-top: 6px; }

  /* Anatomy diagram */
  .bp-anatomy {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    background: var(--bp-surface-2);
    border-radius: 12px;
    margin-bottom: 0;
  }
  .bp-anatomy-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    background: var(--bp-accent-bg);
    border: 2px dashed #93c5fd;
    position: relative;
  }
  .bp-anatomy-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--bp-accent);
    flex-shrink: 0;
  }
  .bp-anatomy-text {
    font-size: 12px;
    font-weight: 500;
    color: var(--bp-accent);
    white-space: nowrap;
  }
  .bp-anatomy-icon {
    width: 12px; height: 12px;
    flex-shrink: 0;
    opacity: .7;
  }
  .bp-anatomy-labels {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    font-size: 11px;
    color: var(--bp-muted);
    font-weight: 500;
    padding: 0 4px;
  }
`;

const ALL_COLORS: BadgeColor[] = [
  'primary', 'secondary', 'success', 'warning', 'critical',
  'gray', 'black', 'cyan', 'indigo', 'purple', 'fuchsia', 'rose', 'teal',
];

const SLOT_CONFIGS = [
  { key: 'label-only',       label: 'Label only',        showPrefix: false, showSuffix: false },
  { key: 'prefix-label',     label: 'Prefix + Label',    showPrefix: true,  showSuffix: false },
  { key: 'label-suffix',     label: 'Label + Suffix',    showPrefix: false, showSuffix: true  },
  { key: 'full',             label: 'Prefix + Label + Suffix', showPrefix: true, showSuffix: true },
];

const PREVIEW_COLORS: BadgeColor[] = ['primary', 'success', 'warning', 'critical', 'cyan', 'purple'];

function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const pre = btn.closest('.bp-code-block')?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  }).catch(() => {});
}

export default function BadgePage() {
  const [activeVariant, setActiveVariant] = useState<BadgeVariant>('filled');

  return (
    <div className="bp-wrap">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* Overview */}
      <p className="bp-desc">
        The <strong>Badge</strong> is a compact, non-interactive labeling element used to communicate
        status, categorize content, or highlight metadata. It supports{' '}
        <strong>13 color themes</strong>, <strong>3 visual types</strong> (Filled, Bordered,
        Tertiary), and two optional slots — a prefix dot and a suffix close icon.
      </p>

      {/* Anatomy */}
      <p className="bp-section-label">Component Anatomy</p>
      <div className="bp-card">
        <div className="bp-card-body">
          <div className="bp-anatomy">
            <div style={{ width: '100%', maxWidth: '340px' }}>
              <div className="bp-anatomy-pill">
                <div className="bp-anatomy-dot" />
                <span className="bp-anatomy-text">Label Text</span>
                <svg className="bp-anatomy-icon" viewBox="0 0 12 12" fill="none">
                  <path d="M9 3L3 9M3 3l6 6" stroke="#0056b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="bp-anatomy-labels">
                <span>① Prefix (dot) — optional</span>
                <span>② Label — required</span>
                <span>③ Suffix (×) — optional</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {[
              { label: 'Container', desc: 'inline-flex pill, 24px height' },
              { label: 'Prefix dot', desc: '6×6px filled circle' },
              { label: 'Label', desc: '12px / medium / nowrap' },
              { label: 'Suffix icon', desc: '12×12px close icon' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', minWidth: '120px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#051325' }}>{item.label}</div>
                <div style={{ fontSize: '11.5px', color: '#6b7689', marginTop: '2px' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Variants */}
      <p className="bp-section-label">Variants — Type × Color</p>
      <div className="bp-card">
        <div className="bp-card-header">
          <span>All 13 colors for each visual type</span>
        </div>
        <div className="bp-card-body">
          <div className="bp-tabs" role="tablist">
            {(['filled', 'bordered', 'tertiary'] as BadgeVariant[]).map(v => (
              <button
                key={v}
                role="tab"
                aria-selected={activeVariant === v}
                className="bp-tab"
                onClick={() => setActiveVariant(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <div>
            {ALL_COLORS.map(color => (
              <div key={color} className="bp-color-row">
                <span className="bp-color-name">{color}</span>
                <div className="bp-color-badges">
                  <Badge variant={activeVariant} color={color} label={capitalize(color)} />
                  <Badge variant={activeVariant} color={color} label={capitalize(color)} showPrefix />
                  <Badge variant={activeVariant} color={color} label={capitalize(color)} showSuffix />
                  <Badge variant={activeVariant} color={color} label={capitalize(color)} showPrefix showSuffix />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slot Compositions */}
      <p className="bp-section-label">Slot Compositions</p>
      <div className="bp-card">
        <div className="bp-card-header">All 4 valid slot configurations</div>
        <div className="bp-card-body">
          <div className="bp-slot-grid">
            {SLOT_CONFIGS.map(cfg => (
              <div key={cfg.key} className="bp-slot-card">
                <span className="bp-slot-label">{cfg.label}</span>
                <div className="bp-slot-badges">
                  {PREVIEW_COLORS.map(color => (
                    <Badge
                      key={color}
                      variant="filled"
                      color={color}
                      label={capitalize(color)}
                      showPrefix={cfg.showPrefix}
                      showSuffix={cfg.showSuffix}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Type Comparison */}
      <p className="bp-section-label">Type Comparison — Same Color, 3 Types</p>
      <div className="bp-card">
        <div className="bp-card-header">Filled vs Bordered vs Tertiary at a glance</div>
        <div className="bp-card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(['primary', 'success', 'critical', 'cyan', 'purple'] as BadgeColor[]).map(color => (
              <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7689', width: '68px', textTransform: 'capitalize' }}>{color}</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge variant="filled"   color={color} label="Filled"   showPrefix />
                  <Badge variant="bordered" color={color} label="Bordered" showPrefix />
                  <Badge variant="tertiary" color={color} label="Tertiary" showPrefix />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Props Reference */}
      <p className="bp-section-label">Props Reference</p>
      <div className="bp-card">
        <table className="bp-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { prop: 'label',      type: 'string',                        def: '—',          desc: 'Badge text content. Always required — empty string is invalid.' },
              { prop: 'variant',    type: '"filled" | "bordered" | "tertiary"', def: '"filled"',  desc: 'Visual type. Controls background, border, and text color pattern.' },
              { prop: 'color',      type: 'BadgeColor (13 options)',        def: '"primary"',  desc: 'Color theme. 7 semantic (primary…black) + 6 status (cyan…teal).' },
              { prop: 'showPrefix', type: 'boolean',                        def: 'false',      desc: 'Renders a 6×6px dot before the label. Decorative — aria-hidden.' },
              { prop: 'showSuffix', type: 'boolean',                        def: 'false',      desc: 'Renders a 12×12px close icon after the label.' },
              { prop: 'onRemove',   type: '() => void',                     def: 'undefined',  desc: 'If provided, wraps suffix in a <button> with aria-label="Remove {label}".' },
              { prop: 'className',  type: 'string',                         def: 'undefined',  desc: 'Extra CSS classes merged onto the badge container.' },
            ].map(row => (
              <tr key={row.prop}>
                <td><code>{row.prop}</code></td>
                <td><code>{row.type}</code></td>
                <td><code>{row.def}</code></td>
                <td>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Token Reference */}
      <p className="bp-section-label">Token Reference — Filled Type</p>
      <div className="bp-card">
        <table className="bp-table">
          <thead>
            <tr>
              <th>Color</th>
              <th>Background Token</th>
              <th>Text / Dot / Icon</th>
            </tr>
          </thead>
          <tbody>
            {[
              { color: 'Primary',   bg: '--color-bg-brand',           text: '--color-text-white' },
              { color: 'Secondary', bg: '--color-bg-brand-secondary', text: '--color-text-white' },
              { color: 'Success',   bg: '--color-bg-success',         text: '--color-text-white' },
              { color: 'Warning',   bg: '--color-bg-warning',         text: '--color-text-white' },
              { color: 'Critical',  bg: '--color-bg-critical',        text: '--color-text-white' },
              { color: 'Gray',      bg: '--color-bg-gray-dark',       text: '--color-text-white' },
              { color: 'Black',     bg: '--color-bg-black',           text: '--color-text-white' },
              { color: 'Cyan',      bg: '--color-cyan-dark',          text: '--color-text-white' },
              { color: 'Indigo',    bg: '--color-indigo-dark',        text: '--color-text-white' },
              { color: 'Purple',    bg: '--color-purple-dark',        text: '--color-text-white' },
              { color: 'Fuchsia',   bg: '--color-fuchsia-dark',       text: '--color-text-white' },
              { color: 'Rose',      bg: '--color-rose-dark',          text: '--color-text-white' },
              { color: 'Teal',      bg: '--color-teal-dark',          text: '--color-text-white' },
            ].map(row => (
              <tr key={row.color}>
                <td><Badge variant="filled" color={row.color.toLowerCase() as BadgeColor} label={row.color} /></td>
                <td><code>{row.bg}</code></td>
                <td><code>{row.text}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
