import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './component_pages.css';
import InputPanel, { type InputConfig, type InputValues } from './InputPanel';
import VariantSection, { type VariantGroup } from './VariantSection';
import MarkdownViewer from './MarkdownViewer';

export type { InputConfig, InputValues, InputType, SelectOption } from './InputPanel';
export type { VariantGroup, VariantStyleGroup, VariantRow, VariantCell } from './VariantSection';

export interface ComponentPageLayoutProps {
  title?: string;
  description?: string;
  inputConfig: InputConfig[];
  defaultInputValues: InputValues;
  buildVariants: (values: InputValues) => VariantGroup[];
  variantTitle?: string;
  markdownContent: string;
  markdownFileName: string;
  resolveTokens: (values: InputValues) => Record<string, string>;
  transformMarkdown?: (raw: string, values: InputValues) => string;
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
}: ComponentPageLayoutProps) {
  const [values, setValues] = useState<InputValues>({ ...defaultInputValues });
  const [copyLabel, setCopyLabel] = useState('Copy MD File');
  const [drawerCopyLabel, setDrawerCopyLabel] = useState('Copy MD File');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const drawerCopyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(liveMd).then(() => {
      setCopyLabel('Copied!');
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyLabel('Copy MD File'), 1800);
    }).catch(() => {});
  }, [liveMd]);

  const handleDrawerCopy = useCallback(() => {
    navigator.clipboard.writeText(liveMd).then(() => {
      setDrawerCopyLabel('Copied!');
      if (drawerCopyTimerRef.current) clearTimeout(drawerCopyTimerRef.current);
      drawerCopyTimerRef.current = setTimeout(() => setDrawerCopyLabel('Copy MD File'), 1800);
    }).catch(() => {});
  }, [liveMd]);

  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    if (drawerCopyTimerRef.current) clearTimeout(drawerCopyTimerRef.current);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const handleUpdateMd = useCallback(() => {
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 2400);
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
              Preview File
            </button>
            <button className="cp-copy-btn" onClick={handleCopy}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
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
              config={inputConfig}
              values={values}
              onChange={handleChange}
              onReset={handleReset}
              onUpdateMd={handleUpdateMd}
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
          <span className="cp-drawer-title">Preview File</span>
          <div className="cp-drawer-actions">
            <button className="cp-copy-btn" onClick={handleDrawerCopy}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {drawerCopyLabel}
            </button>
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
        <div className="cp-drawer-body">
          <MarkdownViewer
            fileName={markdownFileName}
            rawContent={liveMd}
            tokens={{}}
            isStale={false}
          />
        </div>
      </div>

      {/* ── Toast ──────────────────────────────────────────────── */}
      <div className={`cp-toast${showToast ? ' cp-toast--visible' : ''}`}>
        <span className="cp-toast-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" focusable="false">
            <circle cx="10" cy="10" r="10" />
            <path d="M5.8 10.3 8.4 12.9 14.4 7" />
          </svg>
        </span>
        MD file updated successfully.
      </div>
    </div>
  );
}
