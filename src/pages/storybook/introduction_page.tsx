import React from 'react';

const INTRO_CSS = `
  .intro-wrap {
    --accent-info: #e3edfb;
    --accent-info-ink: #1f4ea3;
    --muted: #6b7689;
    --line-2: #eef0f4;
    --surface: #ffffff;
  }

  .intro-wrap .callout {
    display: flex; gap: 12px;
    padding: 13px 16px; border-radius: 10px;
    margin-bottom: 20px;
    font-size: 13.5px; line-height: 1.55;
  }
  .intro-wrap .callout.info {
    background: var(--accent-info);
    color: var(--accent-info-ink);
    border-left: 3px solid #4e8df5;
  }
  .intro-wrap .callout-icon { font-size: 15px; flex: none; margin-top: 1px; }

  .intro-wrap .section-title {
    font-size: 12px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px; margin-top: 32px;
  }
  .intro-wrap .section-title:first-of-type { margin-top: 0; }

  .intro-wrap .preview-card {
    background: var(--surface);
    border: 1px solid var(--line-2);
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .intro-wrap .preview-body {
    padding: 40px 32px;
    display: flex; align-items: center; justify-content: center;
    gap: 14px; flex-wrap: wrap;
    min-height: 148px;
  }
  .intro-wrap .preview-body.left { justify-content: flex-start; }

  .intro-wrap .ds-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 999px;
    font-size: 12px; font-weight: 600;
    white-space: nowrap;
  }
  .intro-wrap .ds-badge::before {
    content: ''; width: 5px; height: 5px;
    border-radius: 50%; background: currentColor; opacity: .8;
  }
  .intro-wrap .ds-badge-no-dot::before { display: none; }
  .intro-wrap .ds-badge-info    { background: #e3edfb; color: #1f4ea3; }
  .intro-wrap .ds-badge-success { background: #e7f3ec; color: #1f7a3f; }
  .intro-wrap .ds-badge-warning { background: #fbeed7; color: #8a5a14; }

  .intro-wrap .code-block {
    background: #0d1b2a;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .intro-wrap .code-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  .intro-wrap .code-lang {
    font-size: 11px; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    color: rgba(255,255,255,.32);
  }
  .intro-wrap .code-copy {
    font-size: 11.5px; font-weight: 500;
    color: rgba(255,255,255,.38);
    padding: 4px 8px; border-radius: 5px;
    background: rgba(255,255,255,.06);
    border: 0; cursor: pointer;
    font-family: inherit;
    transition: background 220ms cubic-bezier(.2,.7,.2,1),
                color 220ms cubic-bezier(.2,.7,.2,1);
  }
  .intro-wrap .code-copy:hover {
    background: rgba(255,255,255,.12);
    color: rgba(255,255,255,.8);
  }
  .intro-wrap .code-block pre {
    margin: 0; padding: 18px 20px;
    overflow-x: auto;
    font-family: 'DM Mono', 'Fira Code', monospace;
    font-size: 13px; line-height: 1.72;
    color: #c9d8f0;
    white-space: pre;
  }
  .intro-wrap .code-block pre .cm { color: #586e78; font-style: italic; }
`;

function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const pre = (btn.closest('.code-block') as HTMLElement)?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard
    .writeText(pre.innerText)
    .then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = 'Copy';
      }, 1800);
    })
    .catch(() => {});
}

const features: {
  badgeCls: string;
  label: string;
  desc: string;
  extraStyle?: React.CSSProperties;
}[] = [
  {
    badgeCls: 'ds-badge-info',
    label: 'Component Specs',
    desc: 'Props, variants, sizes, and states — all in one place.',
  },
  {
    badgeCls: 'ds-badge-success',
    label: 'Live Previews',
    desc: 'Interactive component previews rendered directly from HTML/CSS.',
  },
  {
    badgeCls: 'ds-badge-warning',
    label: 'Figma Guidance',
    desc: "Do's and don'ts tied to specific Figma frame annotations.",
  },
  {
    badgeCls: '',
    label: 'Code Snippets',
    desc: 'Ready-to-use HTML with syntax highlighting.',
    extraStyle: { background: '#f3f0ff', color: '#5b3fc4' },
  },
];

export default function IntroductionPage() {
  return (
    <div className="intro-wrap">
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />

      <div className="callout info">
        <span className="callout-icon">ℹ️</span>
        <div>
          This tool is the visual showcase layer of the Figma-to-Code workflow. Each component
          page maps directly to a{' '}
          <code style={{ fontFamily: "'DM Mono', monospace", fontSize: '12.5px' }}>.md</code>{' '}
          specification file in the project repository.
        </div>
      </div>

      <p className="section-title">What this tool provides</p>
      <div className="preview-card">
        <div
          className="preview-body left"
          style={{
            padding: '28px 32px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '18px',
            background: '#fff',
          }}
        >
          {features.map(({ badgeCls, label, desc, extraStyle }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                className={`ds-badge ds-badge-no-dot ${badgeCls}`}
                style={{ borderRadius: '7px', padding: '5px 12px', fontSize: '13px', ...extraStyle }}
              >
                {label}
              </span>
              <span style={{ fontSize: '13.5px', color: '#4a5468' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="section-title">File structure</p>
      <div className="code-block">
        <div className="code-header">
          <span className="code-lang">Directory</span>
          <button className="code-copy" onClick={handleCopy}>
            Copy
          </button>
        </div>
        <pre>
          {'ds-storybook/\n'}
          {'├── storybook.html       '}
          <span className="cm">{'# this file — the showcase UI'}</span>
          {'\n├── components/\n│   ├── badge.md\n│   ├── button.md\n│   └── ...\n└── style-guide/\n    ├── colors.md\n    └── typography.md'}
        </pre>
      </div>
    </div>
  );
}
