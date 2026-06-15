interface HeaderProps {
  eyebrow: string;
  title: string;
  onDownload?: () => void;
}

export function Header({ eyebrow, title }: HeaderProps) {
  return (
    <header
      style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        // borderBottom: '1px solid #EDEFF2',
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

    </header>
  );
}
