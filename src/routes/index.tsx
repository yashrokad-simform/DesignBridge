import { lazy, Suspense, type ComponentType } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { PageLoader, PageNotFound } from "@/components/shared";

const PrivateLayout = lazy(() => import("@/pages/private/privateLayout"));
const IntroductionPage = lazy(() => import("@/pages/component_pages/introduction_page"));
const BadgePage = lazy(() => import("@/pages/component_pages/badge_page"));
const BreadcrumbPage = lazy(() => import("@/pages/component_pages/breadcrumb_page"));
const ButtonPage = lazy(() => import("@/pages/component_pages/button_page"));
const CheckboxPage = lazy(() => import("@/pages/component_pages/checkbox_page"));
const DropdownPage = lazy(() => import("@/pages/component_pages/dropdown_page"));
const ToastPage = lazy(() => import("@/pages/component_pages/toast_page"));
const FilePickerPage = lazy(() => import("@/pages/component_pages/filePicker_page"));
const InputPage = lazy(() => import("@/pages/component_pages/input_page"));

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
      { path: "breadcrumb", element: lazyLoad(BreadcrumbPage) },
      { path: "button", element: lazyLoad(ButtonPage) },
      { path: "checkbox", element: lazyLoad(CheckboxPage) },
      { path: "dropdown", element: lazyLoad(DropdownPage) },
      { path: "file-picker", element: lazyLoad(FilePickerPage) },
      { path: "input", element: lazyLoad(InputPage) },
      { path: "navigation", element: lazyLoad(IntroductionPage) },
      { path: "progress-step", element: lazyLoad(IntroductionPage) },
      { path: "radio-button", element: lazyLoad(IntroductionPage) },
      { path: "rich-text-editor", element: lazyLoad(IntroductionPage) },
      { path: "tabs", element: lazyLoad(IntroductionPage) },
      { path: "text-area", element: lazyLoad(IntroductionPage) },
      { path: "toast", element: lazyLoad(ToastPage) },
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
