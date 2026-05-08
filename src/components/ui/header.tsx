interface HeaderProps {
  eyebrow: string;
  title: string;
  onDownload?: () => void;
}

export function Header({ eyebrow, title, onDownload }: HeaderProps) {
  return (
    <header
      style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        borderBottom: '1px solid #EDEFF2',
        background: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flex: 'none',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
        <span style={{ color: '#4F5C6D' }}>{eyebrow}</span>
        <span style={{ color: '#4F5C6D' }}>/</span>
        <span style={{ fontWeight: 600, color: '#051325' }}>{title}</span>
      </div>

      <button
        onClick={onDownload}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          height: '40px',
          padding: '0 20px',
          background: '#F4F5F7',
          color: '#00244D',
          border: '1px solid #DDE3EB',
          fontSize: '14px',
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxSizing: 'border-box',
          borderRadius: '8px',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block', flexShrink: 0 }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Master MD File
      </button>
    </header>
  );
}
