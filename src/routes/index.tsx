import { lazy, Suspense, type ComponentType } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { PageLoader, PageNotFound } from "@/components/shared";

const PrivateLayout = lazy(() => import("@/pages/private/privateLayout"));
const IntroductionPage = lazy(() => import("@/pages/storybook/introduction_page"));
const BadgePage = lazy(() => import("@/pages/storybook/badge_page"));

function lazyLoad(Component: ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const routes: RouteObject[] = [
  // DS Storybook — layout with nested page routes
  {
    path: "/",
    element: lazyLoad(PrivateLayout),
    children: [
      { index: true, element: <Navigate to="/introduction" replace /> },
      { path: "introduction", element: lazyLoad(IntroductionPage) },
      { path: "figma-mcp", element: lazyLoad(IntroductionPage) },
      { path: "colors", element: lazyLoad(IntroductionPage) },
      { path: "typography", element: lazyLoad(IntroductionPage) },
      { path: "spacing", element: lazyLoad(IntroductionPage) },
      { path: "badge", element: lazyLoad(BadgePage) },
      { path: "button", element: lazyLoad(IntroductionPage) },
      { path: "checkbox", element: lazyLoad(IntroductionPage) },
      { path: "dropdown", element: lazyLoad(IntroductionPage) },
      { path: "input", element: lazyLoad(IntroductionPage) },
      { path: "navigation", element: lazyLoad(IntroductionPage) },
      { path: "progress-step", element: lazyLoad(IntroductionPage) },
      { path: "radio-button", element: lazyLoad(IntroductionPage) },
      { path: "tabs", element: lazyLoad(IntroductionPage) },
      { path: "text-area", element: lazyLoad(IntroductionPage) },
      { path: "toast", element: lazyLoad(IntroductionPage) },
      { path: "toggle", element: lazyLoad(IntroductionPage) },
      { path: "tooltip", element: lazyLoad(IntroductionPage) },
    ],
  },

  // Public routes
  // {
  //   path: "/auth",
  //   element: lazyLoad(AuthLayout),
  //   children: [
  //     { path: "login", element: lazyLoad(Login) },
  //   ],
  // },

  // Private routes
  // {
  //   path: "/app",
  //   element: lazyLoad(PrivateLayout),
  //   children: [
  //     { index: true, element: lazyLoad(Dashboard) },
  //   ],
  // },

  // 404
  { path: "*", element: <PageNotFound /> },
]