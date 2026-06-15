import figmaIcon from '../../../assets/figma-icon.svg';
import vscodeIcon from '../../../assets/vscodeicon.svg';
import figmaFileUrl from '../../../assets/resources/figma_file.fig?url';
import instructionsZipUrl from '../../../assets/resources/Instructions.zip?url';

/* ── Real preview MD files ──────────────────────────────────────────────────
 * The exact same Figma-prompt and VS Code markdown each component page renders
 * in its preview — loaded raw via glob, never generated. */
const FIGMA_RAW = import.meta.glob('../figma_prompt/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;
const VSCODE_RAW = import.meta.glob('../md_files/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

const byBasename = (rec: Record<string, string>): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const key in rec) out[key.slice(key.lastIndexOf('/') + 1)] = rec[key];
  return out;
};
const FIGMA = byBasename(FIGMA_RAW);
const VSCODE = byBasename(VSCODE_RAW);

/* ── Component list ──────────────────────────────────────────────────────────
 * Every component in the system, mapped to its actual preview source files. */
interface ComponentFile { id: string; title: string; figma: string | null; vscode: string | null }

const COMPONENT_FILES: ComponentFile[] = [
  { id: 'badge',            title: 'Badge',            figma: 'badge-prompt.md',            vscode: 'badge-instruction.md' },
  { id: 'breadcrumb',       title: 'Breadcrumb',       figma: 'breadcrumb-prompt.md',       vscode: 'breadcrumb-instruction.md' },
  { id: 'button',           title: 'Button',           figma: 'button-prompt.md',           vscode: 'button-instruction.md' },
  { id: 'checkbox',         title: 'Checkbox',         figma: 'checkbox-prompt.md',         vscode: 'checkbox-instruction.md' },
  { id: 'dropdown',         title: 'Dropdown',         figma: 'dropdown-prompt.md',         vscode: 'dropdown-instruction.md' },
  { id: 'file-picker',      title: 'File Picker',      figma: 'file-picker-prompt.md',      vscode: 'filePicker-instruction.md' },
  { id: 'input',            title: 'Input',            figma: 'input-prompt.md',            vscode: 'input-instruction.md' },
  { id: 'navigation',       title: 'Navigation',       figma: 'navigation-prompt.md',       vscode: 'sideNavigation-instruction.md' },
  { id: 'progress-step',    title: 'Progress Step',    figma: 'stepper-prompt.md',          vscode: 'stepper-instruction.md' },
  { id: 'radio-button',     title: 'Radio Button',     figma: 'radio-button-prompt.md',     vscode: 'radioButton-instruction.md' },
  { id: 'rich-text-editor', title: 'Rich Text Editor', figma: 'rich-text-editor-prompt.md', vscode: 'richTextEditor-instruction.md' },
  { id: 'tabs',             title: 'Tabs',             figma: 'tabs-prompt.md',             vscode: 'tabs-instruction.md' },
  { id: 'table',            title: 'Table',            figma: 'table-prompt.md',            vscode: 'table-instruction.md' },
  { id: 'text-area',        title: 'Text Area',        figma: 'textarea-prompt.md',         vscode: 'textarea-instruction.md' },
  { id: 'toast',            title: 'Toast',            figma: 'toast-prompt.md',            vscode: 'toast-instruction.md' },
  { id: 'toggle',           title: 'Toggle',           figma: 'toggle-prompt.md',           vscode: 'toggleButton-instruction.md' },
  { id: 'tooltip',          title: 'Tooltip',          figma: 'tooltip-prompt.md',          vscode: 'tooltip-intruction.md' },
];

/* ── Style Guide list ─────────────────────────────────────────────────────── */
const STYLE_FILES: ComponentFile[] = [
  { id: 'colors',          title: 'Colors',           figma: 'colorStyles.md',   vscode: 'color-instruction.md' },
  { id: 'typography',      title: 'Typography',       figma: 'typography.md',    vscode: 'typography-instruction.md' },
  { id: 'spacing-radius',  title: 'Spacing & Radius', figma: 'spacing_radius.md', vscode: null },
];

/* ── Download helpers ──────────────────────────────────────────────────────── */
function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadAsset(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const DownloadSvg = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 11.5v1A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const DocGlyphSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 L21 12 L12 21 L3 12 Z" stroke="#0056b8" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

/* Open-book glyph for Style Guide rows */
const BrushGlyphSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 6.5C10.4 5.2 8.4 4.5 6 4.5c-1.1 0-2.1.15-3 .4v13c.9-.25 1.9-.4 3-.4 2.4 0 4.4.7 6 2 1.6-1.3 3.6-2 6-2 1.1 0 2.1.15 3 .4v-13c-.9-.25-1.9-.4-3-.4-2.4 0-4.4.7-6 2Z" stroke="#0056b8" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M12 6.5v12" stroke="#0056b8" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const RES_CSS = `
.db-res {
  --line:      #e4eaf2;
  --line-soft: #edf1f7;
  --mist:      #f6f8fb;
  --ink:       #051325;
  --slate-soft:#565d6b;
  --blue-50:   #edf6ff;
  --blue-100:  #d9e9fb;
  --blue-600:  #00489a;
  --r-lg: 14px;
  --shadow-card: 0 1px 2px rgba(15,22,35,.04), 0 8px 24px -12px rgba(15,22,35,.10);
  font-family: 'DM Sans', system-ui, sans-serif;
  color: var(--ink);
  width: 100%;
}
.db-res *, .db-res *::before, .db-res *::after { box-sizing: border-box; }

.db-res .res-group { margin-top: 30px; }
.db-res .res-group:first-child { margin-top: 8px; }
.db-res .res-group + .res-group { margin-top: 40px; }
.db-res .res-group-head { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
.db-res .res-group-ico {
  width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
  display: grid; place-items: center;
  background: var(--blue-50); border: 1px solid var(--blue-100);
}
.db-res .res-group-ico img { display: block; }
.db-res .res-group h3 {
  font-family: 'DM Sans', sans-serif; font-size: 16.5px; font-weight: 700; letter-spacing: -.01em; margin: 0;
}

.db-res .res-table-wrap {
  border: 1px solid var(--line); border-radius: var(--r-lg);
  overflow: hidden; box-shadow: var(--shadow-card); background: #fff;
}
.db-res .res-scroll { width: 100%; overflow-x: auto; }
.db-res .res-table { width: 100%; border-collapse: collapse; }
.db-res .res-table-1 { min-width: 440px; }
.db-res .res-table-2 { min-width: 600px; }
.db-res .res-table th {
  text-align: left; font-family: 'DM Sans', sans-serif;
  font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--slate-soft); background: var(--mist);
  padding: 13px 20px; border-bottom: 1px solid var(--line); white-space: nowrap;
}
.db-res .res-table td {
  padding: 14px 20px; font-size: 13px; color: var(--ink);
  border-top: 1px solid var(--line-soft); vertical-align: middle;
}
.db-res .res-table tbody tr:first-child td { border-top: 0; }
.db-res .res-fname { display: flex; align-items: center; gap: 11px; }
.db-res .res-fglyph {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  background: var(--mist); border: 1px solid var(--line); display: grid; place-items: center;
}
.db-res .res-fglyph img { display: block; }
.db-res .res-fname b { display: block; font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.4; }
.db-res .res-fname code {
  font-family: 'DM Sans', monospace; font-size: 11px; color: var(--blue-600);
  background: var(--blue-50); padding: 1px 6px; border-radius: 4px; margin-top: 3px; display: inline-block;
}

/* Single bordered download button — soft-gray bg, dark icon + text, grey border */
.db-res .dl-btn {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700;
  padding: 8px 14px; border-radius: 8px; white-space: nowrap;
  background: #f4f6f9; color: #051325; border: 1px solid #d4dbe6;
  transition: background .14s, border-color .14s, transform .14s;
}
.db-res .dl-btn:hover { background: #e9eef4; border-color: #c3ccda; }
.db-res .dl-btn:active { transform: translateY(1px); }
.db-res .dl-btn svg { display: block; color: #051325; }
.db-res .res-na { color: #9aa6b6; font-weight: 600; }

@media (max-width: 620px) {
  .db-res .res-table th,
  .db-res .res-table td { padding: 12px 14px; }
  .db-res .dl-btn { padding: 8px 11px; font-size: 11.5px; }
}
`;

export default function ResourcesPage() {
  return (
    <div className="db-res">
      <style dangerouslySetInnerHTML={{ __html: RES_CSS }} />

      {/* Group 1 — Figma icon library + VS Code instruction files */}
      <div className="res-group">
        <div className="res-group-head">
          <h3>Recommended Figma Icon Library and VS Code Instruction Files</h3>
        </div>
        <div className="res-table-wrap">
          <div className="res-scroll">
            <table className="res-table res-table-1">
              <colgroup>
                <col style={{ width: '75%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr><th>File Name</th><th>Downloads</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="res-fname">
                      <span className="res-fglyph">
                        <img src={figmaIcon} alt="" aria-hidden="true" width={15} height={15} />
                      </span>
                      <div>
                        <b>Figma Recommended Icon Library and File Type Icon SVG File</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="dl-btn"
                      onClick={() => downloadAsset(figmaFileUrl, 'figma_file.fig')}
                    >
                      <DownloadSvg />
                      Figma File
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="res-fname">
                      <span className="res-fglyph">
                        <img src={vscodeIcon} alt="" aria-hidden="true" width={15} height={15} />
                      </span>
                      <div>
                        <b>VS Code Claude Instruction Files - use it in the .claude folder</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="dl-btn"
                      onClick={() => downloadAsset(instructionsZipUrl, 'instructions.zip')}
                    >
                      <DownloadSvg />
                      Instruction Files
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Group 2 — style guide markdown files */}
      <div className="res-group">
        <div className="res-group-head">
          <h3>Style Guide Files</h3>
        </div>
        <div className="res-table-wrap">
          <div className="res-scroll">
            <table className="res-table res-table-2">
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr><th>Style Name</th><th>Figma Prompt MD</th><th>VS Code MD</th></tr>
              </thead>
              <tbody>
                {STYLE_FILES.map((c) => {
                  const figmaContent = c.figma ? FIGMA[c.figma] : undefined;
                  const vscodeContent = c.vscode ? VSCODE[c.vscode] : undefined;
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="res-fname">
                          <span className="res-fglyph"><BrushGlyphSvg /></span>
                          <b>{c.title}</b>
                        </div>
                      </td>
                      <td>
                        {figmaContent ? (
                          <button
                            type="button"
                            className="dl-btn"
                            onClick={() => downloadMarkdown(`${c.id}-figma-prompt.md`, figmaContent)}
                          >
                            <DownloadSvg />
                            Figma Prompt
                          </button>
                        ) : (
                          <span className="res-na">—</span>
                        )}
                      </td>
                      <td>
                        {vscodeContent ? (
                          <button
                            type="button"
                            className="dl-btn"
                            onClick={() => downloadMarkdown(`${c.id}-vscode-instructions.md`, vscodeContent)}
                          >
                            <DownloadSvg />
                            VS Code MD
                          </button>
                        ) : (
                          <span className="res-na">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Group 3 — per-component markdown files */}
      <div className="res-group">
        <div className="res-group-head">
          <h3>Component Files</h3>
        </div>
        <div className="res-table-wrap">
          <div className="res-scroll">
            <table className="res-table res-table-2">
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr><th>Component Name</th><th>Figma Prompt MD</th><th>VS Code MD</th></tr>
              </thead>
              <tbody>
                {COMPONENT_FILES.map((c) => {
                  const figmaContent = c.figma ? FIGMA[c.figma] : undefined;
                  const vscodeContent = c.vscode ? VSCODE[c.vscode] : undefined;
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="res-fname">
                          <span className="res-fglyph"><DocGlyphSvg /></span>
                          <b>{c.title}</b>
                        </div>
                      </td>
                      <td>
                        {figmaContent ? (
                          <button
                            type="button"
                            className="dl-btn"
                            onClick={() => downloadMarkdown(`${c.id}-figma-prompt.md`, figmaContent)}
                          >
                            <DownloadSvg />
                            Figma Prompt
                          </button>
                        ) : (
                          <span className="res-na">—</span>
                        )}
                      </td>
                      <td>
                        {vscodeContent ? (
                          <button
                            type="button"
                            className="dl-btn"
                            onClick={() => downloadMarkdown(`${c.id}-vscode-instructions.md`, vscodeContent)}
                          >
                            <DownloadSvg />
                            VS Code MD
                          </button>
                        ) : (
                          <span className="res-na">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
