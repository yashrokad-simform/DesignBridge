import { useMemo, useRef } from 'react';

interface MarkdownViewerProps {
  fileName: string;
  rawContent: string;
  tokens: Record<string, string>;
  isStale: boolean;
}

export default function MarkdownViewer({
  fileName,
  rawContent,
  tokens,
  isStale,
}: MarkdownViewerProps) {
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const resolved = useMemo(
    () => resolveTokens(rawContent, tokens),
    [rawContent, tokens],
  );
  const html = useMemo(() => parseMarkdown(resolved), [resolved]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(resolved)
      .then(() => {
        if (!copyBtnRef.current) return;
        copyBtnRef.current.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBtnRef.current) copyBtnRef.current.textContent = 'Copy';
        }, 1800);
      })
      .catch(() => {});
  };

  return (
    <div className="cp-md-viewer">
      <div className="cp-md-header">
        <div className="cp-md-title">
          {fileName}
          <span className="cp-md-tag">.md</span>
        </div>
        <button ref={copyBtnRef} className="cp-md-copy" onClick={handleCopy}>
          Copy
        </button>
      </div>

      {isStale && (
        <div className="cp-md-stale-bar">
          <span className="cp-md-stale-dot" />
          Input values changed — click "Update MD File" to refresh
        </div>
      )}

      <div className="cp-md-body">
        <div
          className="cp-md-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

function resolveTokens(content: string, tokens: Record<string, string>): string {
  return content.replace(/\{\{\{?([a-zA-Z0-9_]+)\}?\}\}/g, (match, key: string) => {
    return Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : match;
  });
}

function parseMarkdown(md: string): string {
  const escaped = escapeHtml(md);
  const lines = escaped.split('\n');
  const html: string[] = [];
  let inCode = false;
  let inTable = false;
  let listType: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const closeTable = () => {
    if (!inTable) return;
    html.push('</tbody></table>');
    inTable = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      closeList();
      closeTable();
      if (inCode) {
        html.push('</code></pre>');
        inCode = false;
      } else {
        html.push('<pre><code>');
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      html.push(`${line}\n`);
      continue;
    }

    if (!line.trim()) {
      closeList();
      closeTable();
      continue;
    }

    if (/^\|[-:\s|]+\|$/.test(line)) {
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      closeList();
      const cells = line
        .slice(1, -1)
        .split('|')
        .map(cell => inline(cell.trim()));

      if (!inTable) {
        html.push('<table><tbody>');
        inTable = true;
        html.push(`<tr>${cells.map(cell => `<th>${cell}</th>`).join('')}</tr>`);
      } else {
        html.push(`<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`);
      }
      continue;
    }

    closeTable();

    if (line.startsWith('# ')) {
      closeList();
      html.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (/^\d+\.\s+/.test(line)) {
      if (listType !== 'ol') {
        closeList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${inline(line.replace(/^\d+\.\s+/, ''))}</li>`);
    } else if (/^[-*]\s+/.test(line)) {
      if (listType !== 'ul') {
        closeList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`);
    } else if (line.startsWith('&gt; ')) {
      closeList();
      html.push(`<blockquote>${inline(line.slice(5))}</blockquote>`);
    } else if (/^-{3,}$/.test(line)) {
      closeList();
      html.push('<hr />');
    } else {
      closeList();
      html.push(`<p>${inline(line)}</p>`);
    }
  }

  closeList();
  closeTable();
  if (inCode) html.push('</code></pre>');

  return html.join('');
}

function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
