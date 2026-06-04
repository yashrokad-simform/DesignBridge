import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import vscodeIcon from '../../assets/vscodeicon.svg';
import vscodeButtonIcon from '../../assets/VS code-icon.svg';
import './component_pages.css';
import InputPanel, { type InputConfig, type InputValues } from './InputPanel';
import VariantSection, { type VariantGroup } from './VariantSection';
import MarkdownViewer from './MarkdownViewer';

export type { InputConfig, InputValues, InputType, SelectOption } from './InputPanel';
export type { VariantGroup, VariantStyleGroup, VariantRow, VariantCell } from './VariantSection';

export interface ComponentPageLayoutProps {
  title?: string;
  description?: string;
  /** Static config OR a function of current values — use the function form to conditionally show/hide fields. */
  inputConfig: InputConfig[] | ((values: InputValues) => InputConfig[]);
  defaultInputValues: InputValues;
  buildVariants: (values: InputValues) => VariantGroup[];
  variantTitle?: string;
  markdownContent: string;
  markdownFileName: string;
  resolveTokens: (values: InputValues) => Record<string, string>;
  transformMarkdown?: (raw: string, values: InputValues) => string;
  /** Optional Figma-prompt markdown for this component. Used by the
   *  "Copy Figma Prompt" action. If omitted, the button still
   *  renders but copies an empty string. */
  figmaMarkdownContent?: string;
  transformFigmaMarkdown?: (raw: string, values: InputValues) => string;
}

function applyTokens(content: string, tokens: Record<string, string>): string {
  return content.replace(/\{\{\{?([a-zA-Z0-9_]+)\}?\}\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : match,
  );
}

export default function ComponentPageLayout({
  inputConfig,
  defaultInputValues,
  buildVariants,
  variantTitle,
  markdownContent,
  markdownFileName,
  resolveTokens,
  transformMarkdown,
  figmaMarkdownContent,
  transformFigmaMarkdown,
}: ComponentPageLayoutProps) {
  const [values, setValues] = useState<InputValues>({ ...defaultInputValues });
  const [copyLabel, setCopyLabel] = useState('Copy VS Code MD');
  const [figmaLabel, setFigmaLabel] = useState('Copy Figma Prompt');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'figma' | 'vscode'>('figma');
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const figmaTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleChange = useCallback((key: string, value: string | boolean | number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues({ ...defaultInputValues });
  }, [defaultInputValues]);

  const getResolvedMd = useCallback((vals: InputValues) => {
    if (transformMarkdown) return transformMarkdown(markdownContent, vals);
    return applyTokens(markdownContent, resolveTokens(vals));
  }, [transformMarkdown, markdownContent, resolveTokens]);

  const liveMd = useMemo(() => getResolvedMd(values), [getResolvedMd, values]);

  const liveFigmaMd = useMemo(() => {
    if (!figmaMarkdownContent) return '';
    if (transformFigmaMarkdown) return transformFigmaMarkdown(figmaMarkdownContent, values);
    return figmaMarkdownContent;
  }, [figmaMarkdownContent, transformFigmaMarkdown, values]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(liveMd).then(() => {
      setCopyLabel('Copied!');
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyLabel('Copy VS Code MD'), 1800);
    }).catch(() => {});
  }, [liveMd]);

  const handleFigmaCopy = useCallback(() => {
    navigator.clipboard.writeText(liveFigmaMd).then(() => {
      setFigmaLabel('Copied!');
      if (figmaTimerRef.current) clearTimeout(figmaTimerRef.current);
      figmaTimerRef.current = setTimeout(() => setFigmaLabel('Copy Figma Prompt'), 1800);
    }).catch(() => {});
  }, [liveFigmaMd]);

  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    if (figmaTimerRef.current) clearTimeout(figmaTimerRef.current);
  }, []);


  const variantGroups = buildVariants(values);

  return (
    <div className="cp-page">
      <div className="cp-bottom-panel">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="cp-panel-hd">
          <span className="cp-panel-title">Component Details</span>
          <div className="cp-panel-actions">
            <button className="cp-preview-btn" onClick={() => setDrawerOpen(true)}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              Preview
            </button>
            <button className="cp-figma-btn" onClick={handleFigmaCopy}>
              <img src="/figma-icon.svg" alt="" aria-hidden="true" width={16} height={16} />
              {figmaLabel}
            </button>
            <button className="cp-copy-btn" onClick={handleCopy}>
              <img src={vscodeButtonIcon} alt="" aria-hidden="true" width={16} height={16} />
              {copyLabel}
            </button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="cp-bottom-body">

          {/* Left — Variants */}
          <div className="cp-bottom-left">
            <VariantSection
              title={variantTitle ?? 'All Variants'}
              groups={variantGroups}
            />
          </div>

          {/* Right — Customise */}
          <div className="cp-bottom-right">
            <InputPanel
              config={typeof inputConfig === 'function' ? inputConfig(values) : inputConfig}
              values={values}
              onChange={handleChange}
              onReset={handleReset}
            />
          </div>

        </div>
      </div>

      {/* ── Preview Drawer ─────────────────────────────────────── */}
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
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="cp-drawer-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={drawerTab === 'figma'}
            className={`cp-drawer-tab${drawerTab === 'figma' ? ' cp-drawer-tab--active' : ''}`}
            onClick={() => setDrawerTab('figma')}
          >
            <img src="/figma-icon.svg" alt="" aria-hidden="true" width={14} height={14} />
            Figma Prompt
          </button>
          <button
            role="tab"
            aria-selected={drawerTab === 'vscode'}
            className={`cp-drawer-tab${drawerTab === 'vscode' ? ' cp-drawer-tab--active' : ''}`}
            onClick={() => setDrawerTab('vscode')}
          >
            <img src={vscodeIcon} alt="" aria-hidden="true" width={14} height={14} />
            VS Code MD
          </button>
        </div>
        <div className="cp-drawer-body">
          {drawerTab === 'figma' ? (
            <MarkdownViewer
              fileName={`${markdownFileName}-figma`}
              rawContent={liveFigmaMd || '_No Figma prompt available for this component yet._'}
              tokens={{}}
              isStale={false}
            />
          ) : (
            <MarkdownViewer
              fileName={markdownFileName}
              rawContent={liveMd}
              tokens={{}}
              isStale={false}
            />
          )}
        </div>
      </div>

    </div>
  );
}
