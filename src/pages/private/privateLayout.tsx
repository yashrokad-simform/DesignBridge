import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../components/ui/header";
import { Navigation } from "../../components/ui/navigation";
import { NAV_SECTIONS, PAGE_INFO } from "../../components/ui/appnavigation";

const LAYOUT_CSS = `
  .pl-root {
    min-height: 100vh;
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
    min-height: 100vh;
    overflow: hidden;
  }
  .pl-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    background: #ffffff;
  }
  .pl-content {
    flex: 1;
    padding: 24px 32px 32px;
    overflow-x: hidden;
  }
  @media (max-width: 860px) {
    .pl-shell { grid-template-columns: 1fr; }
    .pl-content { padding: 20px; }
  }
`;

const useAuth = () => {
  const [isAuthenticated] = useState(true);
  return isAuthenticated;
};

export default function PrivateLayout() {
  const isAuthenticated = useAuth();
  const [sideSearch, setSideSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegment = location.pathname.replace(/^\//, '') || 'introduction';
  const activePage = PAGE_INFO[pathSegment] ? pathSegment : 'introduction';
  const page = PAGE_INFO[activePage];
  const selectedSection = page.title;

  useEffect(() => {
    const fontsId = 'pl-fonts';
    if (!document.getElementById(fontsId)) {
      const link = document.createElement('link');
      link.id = fontsId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const navigateTo = (id: string) => {
    navigate('/' + id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pl-root">
      <style dangerouslySetInnerHTML={{ __html: LAYOUT_CSS }} />
      <div className="pl-shell">
        <Navigation
          navSections={NAV_SECTIONS}
          activePage={activePage}
          sideSearch={sideSearch}
          onSideSearchChange={setSideSearch}
          onNavigate={navigateTo}
        />
        <div className="pl-main">
          <Header eyebrow={page.eyebrow} title={page.title} onDownload={() => {}} />
          <div className="pl-content">
            <h1 style={{ color: '#051325', fontSize: '32px', fontWeight: 'bold', margin: '0 0 24px' , letterSpacing: '-0.01em' }}>
              {selectedSection}
            </h1>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
