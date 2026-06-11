import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import spacingRadiusMd from '../figma_prompt/spacing_radius.md?raw';
import MarkdownViewer from '../MarkdownViewer';
import '../component_pages.css';

const SPACING_TOKENS = [
  { key: 'none',  name: 'spacing-none',  defaultValue: 0 },
  { key: 'xxs',   name: 'spacing-xxs',   defaultValue: 2 },
  { key: 'xs',    name: 'spacing-xs',    defaultValue: 4 },
  { key: 'sm',    name: 'spacing-sm',    defaultValue: 6 },
  { key: 'md',    name: 'spacing-md',    defaultValue: 8 },
  { key: 'lg',    name: 'spacing-lg',    defaultValue: 10 },
  { key: 'xl',    name: 'spacing-xl',    defaultValue: 12 },
  { key: '2xl',   name: 'spacing-2xl',   defaultValue: 14 },
  { key: '3xl',   name: 'spacing-3xl',   defaultValue: 16 },
  { key: '4xl',   name: 'spacing-4xl',   defaultValue: 20 },
  { key: '5xl',   name: 'spacing-5xl',   defaultValue: 24 },
  { key: '6xl',   name: 'spacing-6xl',   defaultValue: 32 },
  { key: '7xl',   name: 'spacing-7xl',   defaultValue: 40 },
  { key: '8xl',   name: 'spacing-8xl',   defaultValue: 48 },
  { key: '9xl',   name: 'spacing-9xl',   defaultValue: 64 },
  { key: '10xl',  name: 'spacing-10xl',  defaultValue: 80 },
  { key: '11xl',  name: 'spacing-11xl',  defaultValue: 96 },
  { key: '12xl',  name: 'spacing-12xl',  defaultValue: 128 },
];

const RADIUS_TOKENS = [
  { key: 'none',  name: 'radius-none',  defaultValue: 0 },
  { key: 'xxs',   name: 'radius-xxs',   defaultValue: 2 },
  { key: 'xs',    name: 'radius-xs',    defaultValue: 4 },
  { key: 'sm',    name: 'radius-sm',    defaultValue: 6 },
  { key: 'md',    name: 'radius-md',    defaultValue: 8 },
  { key: 'lg',    name: 'radius-lg',    defaultValue: 10 },
  { key: 'xl',    name: 'radius-xl',    defaultValue: 12 },
  { key: '2xl',   name: 'radius-2xl',   defaultValue: 16 },
  { key: '3xl',   name: 'radius-3xl',   defaultValue: 20 },
  { key: '4xl',   name: 'radius-4xl',   defaultValue: 24 },
  { key: '5xl',   name: 'radius-5xl',   defaultValue: 32 },
  { key: 'full',  name: 'radius-full',  defaultValue: 9999 },
];

interface TokenState {
  enabled: boolean;
  value: number;
}

type TokensState = Record<string, TokenState>;

const buildDefaultState = (tokens: typeof SPACING_TOKENS): TokensState =>
  Object.fromEntries(tokens.map(t => [t.key, { enabled: true, value: t.defaultValue }]));

function transformMd(
  raw: string,
  spacingState: TokensState,
  radiusState: TokensState,
): string {
  const lines = raw.split('\n');
  const out: string[] = [];

  for (const line of lines) {
    const spacingMatch = line.match(/^(spacing-([a-z0-9]+))(\s+→\s+)\d+\s*$/);
    if (spacingMatch) {
      const key = spacingMatch[2];
      const state = spacingState[key];
      if (!state?.enabled) continue;
      out.push(`${spacingMatch[1]}${spacingMatch[3]}${state.value}`);
      continue;
    }

    const radiusMatch = line.match(/^(radius-([a-z0-9]+))(\s+→\s+)\d+\s*$/);
    if (radiusMatch) {
      const key = radiusMatch[2];
      const state = radiusState[key];
      if (!state?.enabled) continue;
      out.push(`${radiusMatch[1]}${radiusMatch[3]}${state.value}`);
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

export default function SpacingRadiusPage() {
  const [spacingState, setSpacingState] = useState<TokensState>(() =>
    buildDefaultState(SPACING_TOKENS),
  );
  const [radiusState, setRadiusState] = useState<TokensState>(() =>
    buildDefaultState(RADIUS_TOKENS),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy Figma Prompt');
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const liveMd = useMemo(
    () => transformMd(spacingRadiusMd, spacingState, radiusState),
    [spacingState, radiusState],
  );

  const handleSpacingToggle = useCallback((key: string, enabled: boolean) => {
    setSpacingState(prev => ({ ...prev, [key]: { ...prev[key], enabled } }));
  }, []);

  const handleSpacingValue = useCallback((key: string, value: number) => {
    setSpacingState(prev => ({ ...prev, [key]: { ...prev[key], value } }));
  }, []);

  const handleRadiusToggle = useCallback((key: string, enabled: boolean) => {
    setRadiusState(prev => ({ ...prev, [key]: { ...prev[key], enabled } }));
  }, []);

  const handleRadiusValue = useCallback((key: string, value: number) => {
    setRadiusState(prev => ({ ...prev, [key]: { ...prev[key], value } }));
  }, []);

  const handleReset = useCallback(() => {
    setSpacingState(buildDefaultState(SPACING_TOKENS));
    setRadiusState(buildDefaultState(RADIUS_TOKENS));
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(liveMd).then(() => {
      setCopyLabel('Copied!');
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyLabel('Copy Figma Prompt'), 1800);
    }).catch(() => {});
  }, [liveMd]);

  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
  }, []);

  const enabledSpacing = SPACING_TOKENS.filter(t => spacingState[t.key]?.enabled);
  const enabledRadius = RADIUS_TOKENS.filter(t => radiusState[t.key]?.enabled);

  const maxSpacingVal = Math.max(
    ...SPACING_TOKENS.map(t => spacingState[t.key]?.value ?? t.defaultValue),
    1,
  );

  return (
    <>
      <style>{LOCAL_CSS}</style>
      <div className="cp-page">
        <div className="cp-bottom-panel">

          {/* Header */}
          <div className="cp-panel-hd">
            <span className="cp-panel-title">Component Details</span>
            <div className="cp-panel-actions">
              <button className="cp-preview-btn" onClick={() => setDrawerOpen(true)}>
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Preview
              </button>
              <button className="cp-figma-btn" onClick={handleCopy}>
                <img src="/figma-icon.svg" alt="" aria-hidden="true" width={16} height={16} />
                {copyLabel}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="cp-bottom-body">

            {/* Left — Preview */}
            <div className="cp-bottom-left">
              <div className="sr-preview-wrap">
                <div className="cp-variant-hd">Variants</div>
                <div className="sr-preview-body">

                  {/* Spacing */}
                  {enabledSpacing.length > 0 && (
                    <div className="sr-group">
                      <div className="sr-group-title">Spacing</div>
                      {enabledSpacing.map(t => {
                        const val = spacingState[t.key]?.value ?? t.defaultValue;
                        const pct = maxSpacingVal > 0 ? (val / maxSpacingVal) * 100 : 0;
                        return (
                          <div key={t.key} className="sr-row">
                            <div className="sr-row-meta">
                              <span className="sr-row-name">{t.name}</span>
                              <span className="sr-row-val">{val}px</span>
                            </div>
                            <div className="sr-bar-track">
                              <div
                                className="sr-bar"
                                style={{ width: `${Math.max(pct, val === 0 ? 0 : 1)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Radius */}
                  {enabledRadius.length > 0 && (
                    <div className="sr-group">
                      <div className="sr-group-title">Radius</div>
                      <div className="sr-radius-grid">
                        {enabledRadius.map(t => {
                          const val = radiusState[t.key]?.value ?? t.defaultValue;
                          const clampedRadius = Math.min(val, 32);
                          return (
                            <div key={t.key} className="sr-radius-item">
                              <div
                                className="sr-radius-box"
                                style={{ borderRadius: `${clampedRadius}px` }}
                              />
                              <span className="sr-radius-name">{t.name}</span>
                              <span className="sr-radius-val">{val === 9999 ? '∞' : `${val}px`}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {enabledSpacing.length === 0 && enabledRadius.length === 0 && (
                    <div className="sr-empty">No tokens enabled.</div>
                  )}

                </div>
              </div>
            </div>

            {/* Right — Customise */}
            <div className="cp-bottom-right">
              <div className="cp-input-panel">
                <div className="cp-ip-header">Customise</div>
                <div className="cp-ip-body">

                  {/* Spacing */}
                  <div className="cp-field-divider">
                    <span className="cp-field-divider-label">Spacing</span>
                  </div>
                  {SPACING_TOKENS.map(t => {
                    const state = spacingState[t.key];
                    return (
                      <div key={t.key} className="sr-token-control">
                        <div className="sr-token-row">
                          <label className="cp-toggle">
                            <input
                              type="checkbox"
                              checked={state.enabled}
                              onChange={e => handleSpacingToggle(t.key, e.target.checked)}
                            />
                            <span className="cp-toggle-track" />
                            <span className="cp-toggle-thumb" />
                          </label>
                          <span className={`sr-token-name${!state.enabled ? ' sr-token-name--off' : ''}`}>
                            {t.name}
                          </span>
                        </div>
                        {state.enabled && (
                          <input
                            className="sr-value-input"
                            type="number"
                            value={state.value}
                            min={0}
                            max={9999}
                            step={1}
                            onChange={e => handleSpacingValue(t.key, Number(e.target.value))}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Radius */}
                  <div className="cp-field-divider">
                    <span className="cp-field-divider-label">Radius</span>
                  </div>
                  {RADIUS_TOKENS.map(t => {
                    const state = radiusState[t.key];
                    return (
                      <div key={t.key} className="sr-token-control">
                        <div className="sr-token-row">
                          <label className="cp-toggle">
                            <input
                              type="checkbox"
                              checked={state.enabled}
                              onChange={e => handleRadiusToggle(t.key, e.target.checked)}
                            />
                            <span className="cp-toggle-track" />
                            <span className="cp-toggle-thumb" />
                          </label>
                          <span className={`sr-token-name${!state.enabled ? ' sr-token-name--off' : ''}`}>
                            {t.name}
                          </span>
                        </div>
                        {state.enabled && (
                          <input
                            className="sr-value-input"
                            type="number"
                            value={state.value}
                            min={0}
                            max={9999}
                            step={1}
                            onChange={e => handleRadiusValue(t.key, Number(e.target.value))}
                          />
                        )}
                      </div>
                    );
                  })}

                </div>

                <div className="cp-ip-footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="cp-btn cp-btn-ghost" onClick={handleReset}>
                    Reset Component
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Preview Drawer — Figma only, no VS Code tab */}
        {drawerOpen && (
          <div className="cp-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        )}
        <div className={`cp-drawer${drawerOpen ? ' cp-drawer--open' : ''}`}>
          <div className="cp-drawer-hd">
            <span className="cp-drawer-title">Preview</span>
            <div className="cp-drawer-actions">
              <button
                className="cp-close-btn"
                aria-label="Close preview"
                onClick={() => setDrawerOpen(false)}
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="cp-drawer-tabs" role="tablist">
            <button
              role="tab"
              aria-selected
              className="cp-drawer-tab cp-drawer-tab--active"
            >
              <img src="/figma-icon.svg" alt="" aria-hidden="true" width={14} height={14} />
              Figma Prompt
            </button>
          </div>
          <div className="cp-drawer-body">
            <MarkdownViewer
              fileName="spacing-radius-figma"
              rawContent={liveMd}
              tokens={{}}
              isStale={false}
            />
          </div>
        </div>

      </div>
    </>
  );
}

const LOCAL_CSS = `
  .sr-preview-wrap {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sr-preview-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .sr-group + .sr-group {
    border-top: 1px solid #eef0f4;
    padding-top: 24px;
  }

  .sr-group-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6b7689;
    margin-bottom: 14px;
  }

  /* Spacing rows */
  .sr-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 7px 0;
  }

  .sr-row-meta {
    flex: 0 0 150px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .sr-row-name {
    font-size: 14px;
    font-weight: 500;
    color: #051325;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .sr-row-val {
    font-size: 13px;
    color: #6b7689;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  .sr-bar-track {
    flex: 1;
    height: 10px;
    background: #f0f1f4;
    border-radius: 5px;
    overflow: hidden;
  }
  .sr-bar {
    height: 100%;
    background: #6089c2;
    border-radius: 5px;
    transition: width 200ms ease;
    min-width: 2px;
  }

  /* Radius grid */
  .sr-radius-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px 16px;
  }
  .sr-radius-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
  .sr-radius-box {
    width: 100px;
    height: 44px;
    background: #6089c2;
    flex-shrink: 0;
    margin-bottom: 6px;
  }
  .sr-radius-name {
    font-size: 14px;
    font-weight: 500;
    color: #051325;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    word-break: break-all;
    line-height: 1.3;
  }
  .sr-radius-val {
    font-size: 13px;
    color: #6b7689;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    margin-top: 2px;
  }

  .sr-empty {
    font-size: 13px;
    color: #6b7689;
    text-align: center;
    padding: 40px 0;
  }

  /* Control panel */
  .sr-token-control {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sr-token-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sr-token-name {
    font-size: 14px;
    font-weight: 400;
    color: #051325;
    font-family: 'DM Sans', system-ui, sans-serif;
    transition: color 180ms;
  }
  .sr-token-name--off {
    color: #a8b0be;
  }

  .sr-value-input {
    height: 32px;
    padding: 0 10px;
    border: 1px solid #e8eaef;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #051325;
    background: #ffffff;
    outline: none;
    width: 100%;
    transition: border-color 150ms;
  }
  .sr-value-input:focus { border-color: #A4C8FF; }
`;
