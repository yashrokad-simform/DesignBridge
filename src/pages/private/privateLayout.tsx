import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/ui/header";
import { Navigation } from "../../components/ui/navigation";
import { NAV_SECTIONS, PAGE_INFO } from "../../components/ui/appnavigation";
import { useLayoutEntrance, usePageTransition } from "../../hooks/useGsapAnimations";

const LAYOUT_CSS = `
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .pl-root {
    height: 100vh;
    overflow: hidden;
    background: #f3f4f6;
    color: #051325;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  .pl-shell {
    display: grid;
    grid-template-columns: 264px minmax(0, 1fr);
    height: 100vh;
    overflow: hidden;
  }

  /* Sidebar */
  .pl-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    border-right: 1px solid #e5e7eb;
    background: #ffffff;
    z-index: 30;
  }

  /* Main Layout */
  .pl-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100vh;
    overflow: hidden;
    background: #FFFFFF;
  }

  /* Sticky Header */
  .pl-header {
    position: sticky;
    top: 0;
    z-index: 40;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  /* Scrollable Content Area */
  .pl-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    padding: 16px 24px 24px;
    min-width: 0;
  }

  .pl-page-title {
    color: #051325;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 0px;
    letter-spacing: -0.01em;
  }

  .pl-page-desc {
    color: #4f5c6d;
    font-size: 13px;
    line-height: leading-4;
    margin: 0 0 24px;
    max-width: none;
  }

  .pl-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .pl-req-indicator {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: default;
  }

  .pl-req-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px 3px 7px;
    border-radius: 100px;
    background: #fff5ee;
    border: 1px solid #f4c09a;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 11.5px;
    font-weight: 600;
    color: #c65910;
    letter-spacing: 0.01em;
    line-height: 1;
    user-select: none;
    transition: background 0.15s, border-color 0.15s;
  }

  .pl-req-badge:hover {
    background: #ffeadb;
    border-color: #e8935a;
  }

  .pl-req-icon {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #c65910;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
  }

  .pl-req-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 190px;
    background: #1a2233;
    color: #f0f4fa;
    border-radius: 10px;
    padding: 12px 14px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.22);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.18s, transform 0.18s;
    z-index: 100;
    white-space: nowrap;
  }

  .pl-req-indicator:hover .pl-req-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .pl-req-tooltip-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #8fa3c0;
    margin-bottom: 7px;
  }

  .pl-req-tooltip-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pl-req-tooltip-list li {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    font-weight: 500;
    color: #e8eef7;
  }

  .pl-req-tooltip-list li::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c65910;
    flex-shrink: 0;
  }

  @media (max-width: 860px) {
    html,
    body,
    #root {
      overflow-y: auto;
    }

    .pl-root {
      height: auto;
      overflow: visible;
    }

    .pl-shell {
      grid-template-columns: 1fr;
      height: auto;
      overflow: visible;
    }

    .pl-sidebar {
      position: relative;
      height: auto;
      overflow: visible;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }

    .pl-main {
      height: auto;
      overflow: visible;
    }

    .pl-header {
      position: sticky;
      top: 0;
    }

    .pl-content {
      overflow: visible;
      padding: 20px;
    }

    .pl-page-title {
      font-size: 28px;
    }
  }
`;

const useAuth = () => {
  const [isAuthenticated] = useState(true);
  return isAuthenticated;
};

export default function PrivateLayout() {
  const isAuthenticated = useAuth();

  const [sideSearch, setSideSearch] = useState("");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEntrance(rootRef);
  usePageTransition(contentRef, location.pathname);

  const pathSegment =
    location.pathname.replace(/^\//, "") || "introduction";

  const activePage = PAGE_INFO[pathSegment]
    ? pathSegment
    : "introduction";

  const page = PAGE_INFO[activePage];
  const selectedSection = page.title;

  useEffect(() => {
    const fontsId = "pl-fonts";

    if (!document.getElementById(fontsId)) {
      const link = document.createElement("link");

      link.id = fontsId;
      link.rel = "stylesheet";

      link.href =
        "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";

      document.head.appendChild(link);
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const navigateTo = (id: string) => {
    navigate("/" + id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pl-root" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: LAYOUT_CSS }} />

      <div className="pl-shell">
        {/* Sidebar */}
        <aside className="pl-sidebar">
          <Navigation
            navSections={NAV_SECTIONS}
            activePage={activePage}
            sideSearch={sideSearch}
            onSideSearchChange={setSideSearch}
            onNavigate={navigateTo}
          />
        </aside>

        {/* Main Section */}
        <main className="pl-main">
          {/* Sticky Header */}
          <div className="pl-header">
            <Header
              eyebrow={page.eyebrow}
              title={page.title}
              onDownload={() => {}}
            />
          </div>

          {/* Scrollable Page Content */}
          <div className="pl-content" ref={contentRef}>
            {activePage !== 'introduction' && (
              <>
                <div className="pl-title-row">
                  <h1 className="pl-page-title">
                    {selectedSection}
                  </h1>

                  {page.requiredComponents && page.requiredComponents.length > 0 && (
                    <span className="pl-req-indicator">
                      <span className="pl-req-badge">
                        <i className="pl-req-icon">i</i>
                        Required Components
                      </span>
                      <span className="pl-req-tooltip" role="tooltip">
                        <div className="pl-req-tooltip-title">Required Components</div>
                        <ul className="pl-req-tooltip-list">
                          {page.requiredComponents.map(c => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </span>
                    </span>
                  )}
                </div>

                {page.desc && (
                  <p className="pl-page-desc">
                    {page.desc}
                  </p>
                )}
              </>
            )}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
