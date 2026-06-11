import { type NavSection } from './appnavigation';

const NAV_CSS = `
  * {
    box-sizing: border-box;
  }

  .dsn-side {
    position: sticky;
    top: 0;
    align-self: start;

    /* Better viewport handling */
    height: 100dvh;
    max-height: 100dvh;

    background: #051325;
    padding: 18px 14px 0;
    display: flex;
    flex-direction: column;

    /* Prevent stretch / bounce */
    overflow: hidden;
    overscroll-behavior: none;
    overscroll-behavior-y: none;
    touch-action: pan-y;
    -webkit-overflow-scrolling: auto;

    color: #fff;
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;

    border-right: 1px solid rgba(255,255,255,.06);
  }

  .dsn-side *,
  .dsn-side *::before,
  .dsn-side *::after {
    box-sizing: border-box;
  }

  .dsn-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px 22px;
    flex-shrink: 0;
  }


  .dsn-brand-mark {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: block;
    object-fit: contain;
    flex: none;
  }

  .dsn-brand-name {
    font-weight: 600;
    font-size: 17px;
    letter-spacing: -0.01em;
    color: #fff;
    white-space: nowrap;
    line-height: 1.1;
  }

  .dsn-brand-sub {
    font-size: 10.5px;
    color: #7a8191;
    letter-spacing: .02em;
    margin-top: 2px;
  }

  .dsn-search-wrap {
    padding: 0 6px 8px;
    flex-shrink: 0;
  }

  .dsn-search {
    display: flex;
    align-items: center;
    gap: 8px;

    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 10px;

    padding: 8px 12px;

    transition:
      background 220ms cubic-bezier(.2,.7,.2,1),
      border-color 220ms cubic-bezier(.2,.7,.2,1);
  }

  .dsn-search:focus-within {
    background: rgba(255,255,255,.11);
    border-color: rgba(255,255,255,.22);
  }

  .dsn-search input {
    background: none;
    border: 0;
    outline: 0;

    color: #fff;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;

    flex: 1;
    min-width: 0;
  }

  .dsn-search input::placeholder {
    color: #7a8191;
  }

  .dsn-search svg {
    display: block;
    flex: none;
  }

  /* Scrollable navigation body */
  .dsn-body {
    flex: 1;
    min-height: 0;

    overflow-y: auto;
    overflow-x: hidden;

    /* Prevent stretch/bounce */
    overscroll-behavior: none;
    overscroll-behavior-y: none;
    touch-action: pan-y;
    -webkit-overflow-scrolling: auto;
  }

  .dsn-body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .dsn-section {
    padding: 14px 6px;
  }

  .dsn-section-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #7a8191;
    padding: 6px 10px;
    letter-spacing: .08em;
    font-weight: 500;
  }

  .dsn-list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dsn-item {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 8.5px 12px;
    border-radius: 10px;

    color: #d0d5dd;
    cursor: pointer;

    transition:
      background 220ms cubic-bezier(.2,.7,.2,1),
      color 220ms cubic-bezier(.2,.7,.2,1);

    font-size: 14px;
    font-weight: 500;

    white-space: nowrap;
    user-select: none;
    outline: none;
  }

  .dsn-item:hover {
    background: rgba(255,255,255,.08);
    color: #fff;
  }

  .dsn-item:focus-visible {
    background: rgba(255,255,255,.08);
    color: #fff;
  }

  .dsn-item[aria-current="page"] {
    background: #fff;
    color: #051325;
  }

  .dsn-divider {
    height: 1px;
    background: rgba(255,255,255,.08);
    margin: 4px 4px;
  }

  .dsn-foot {
    flex-shrink: 0;
    margin-top: auto;
  }

  .dsn-profile {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px;
    border-radius: 12px;

    transition: background 220ms cubic-bezier(.2,.7,.2,1);

    cursor: pointer;
  }

  .dsn-profile:hover {
    background: rgba(255,255,255,.08);
  }

  .dsn-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;

    display: grid;
    place-items: center;

    font-weight: 600;
    font-size: 13px;

    flex: none;

    background: #0e2440;
    color: #fff;
  }

  .dsn-name {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    line-height: 1.2;
  }

  .dsn-role {
    font-size: 11px;
    color: #8b92a0;
    margin-top: 1px;
  }

  @media (max-width: 860px) {
    .dsn-side {
      display: none;
    }
  }
`;

interface NavItemProps {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

function NavItem({
  id,
  label,
  active,
  onClick,
}: NavItemProps) {
  return (
    <li
      className="dsn-item"
      aria-current={active ? 'page' : undefined}
      role="menuitem"
      tabIndex={0}
      onClick={() => onClick(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      {label}
    </li>
  );
}

interface NavigationProps {
  navSections: NavSection[];
  activePage: string;
  sideSearch: string;
  onSideSearchChange: (value: string) => void;
  onNavigate: (id: string) => void;
}

export function Navigation({
  navSections,
  activePage,
  sideSearch,
  onSideSearchChange,
  onNavigate,
}: NavigationProps) {
  const allItems = navSections.flatMap((s) => s.items);

  const renderNav = () => {
    if (sideSearch.trim()) {
      const q = sideSearch.toLowerCase();

      const filtered = allItems.filter((item) =>
        item.label.toLowerCase().includes(q)
      );

      return (
        <div className="dsn-section">
          <ul className="dsn-list" role="menu">
            {filtered.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                active={activePage === item.id}
                onClick={onNavigate}
              />
            ))}
          </ul>
        </div>
      );
    }

    return navSections.map((section, idx) => (
      <div key={section.label}>
        {idx > 0 && <div className="dsn-divider" />}

        <div className="dsn-section">
          <div className="dsn-section-label">
            {section.label}
          </div>

          <ul className="dsn-list" role="menu">
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                active={activePage === item.id}
                onClick={onNavigate}
              />
            ))}
          </ul>
        </div>
      </div>
    ));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />

      <aside
        className="dsn-side"
        aria-label="Documentation navigation"
      >
        {/* Brand */}
        <div className="dsn-brand">
          <img
            className="dsn-brand-mark"
            src="/designbridge-logo.svg"
            alt="DesignBridge"
            width={36}
            height={36}
          />

          <div className="dsn-brand-text">
            <div className="dsn-brand-name">DesignBridge</div>
            <div className="dsn-brand-sub">Product Component Docs</div>
          </div>
        </div>

        {/* Search */}
        <div className="dsn-search-wrap">
          <label className="dsn-search" aria-label="Search">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7a8191"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              placeholder="Search styles & components"
              value={sideSearch}
              onChange={(e) =>
                onSideSearchChange(e.target.value)
              }
            />
          </label>
        </div>

        {/* Navigation */}
        <div className="dsn-body">
          {renderNav()}
        </div>

      </aside>
    </>
  );
}
