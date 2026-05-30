import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../components/ui/header";
import { Navigation } from "../../components/ui/navigation";
import { NAV_SECTIONS, PAGE_INFO } from "../../components/ui/appnavigation";

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
    background: #ffffff;
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

  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="pl-root">
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
          <div className="pl-content">
            <h1 className="pl-page-title">
              {selectedSection}
            </h1>

            {page.desc && (
              <p className="pl-page-desc">
                {page.desc}
              </p>
            )}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
