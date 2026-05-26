import { lazy, Suspense, type ComponentType } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { PageLoader, PageNotFound } from "@/components/shared";

const PrivateLayout = lazy(() => import("@/pages/private/privateLayout"));
const IntroductionPage = lazy(() => import("@/pages/component_pages/comp_pages/introduction_page"));
const BadgePage = lazy(() => import("@/pages/component_pages/comp_pages/badge_page"));
const BreadcrumbPage = lazy(() => import("@/pages/component_pages/comp_pages/breadcrumb_page"));
const ButtonPage = lazy(() => import("@/pages/component_pages/comp_pages/button_page"));
const CheckboxPage = lazy(() => import("@/pages/component_pages/comp_pages/checkbox_page"));
const DropdownPage = lazy(() => import("@/pages/component_pages/comp_pages/dropdown_page"));
const SideNavigationPage = lazy(() => import("@/pages/component_pages/comp_pages/sideNavigation_page"));
const StepperPage = lazy(() => import("@/pages/component_pages/comp_pages/stepper_page"));
const RichTextEditorPage = lazy(() => import("@/pages/component_pages/comp_pages/richTextEditor_page"));
const TabsPage = lazy(() => import("@/pages/component_pages/comp_pages/tabs_page"));
const TextAreaPage = lazy(() => import("@/pages/component_pages/comp_pages/textArea_page"));
const ToastPage = lazy(() => import("@/pages/component_pages/comp_pages/toast_page"));
const FilePickerPage = lazy(() => import("@/pages/component_pages/comp_pages/filePicker_page"));
const InputPage = lazy(() => import("@/pages/component_pages/comp_pages/input_page"));
const RadioButtonPage = lazy(() => import("@/pages/component_pages/comp_pages/radioButton_page"));
const TablePage = lazy(() => import("@/pages/component_pages/comp_pages/table_page"));
const ToggleButtonPage = lazy(() => import("@/pages/component_pages/comp_pages/toggleButton_page"));
const TooltipPage = lazy(() => import("@/pages/component_pages/comp_pages/tooltip_page"));

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
      { path: "navigation", element: lazyLoad(SideNavigationPage) },
      { path: "progress-step", element: lazyLoad(StepperPage) },
      { path: "radio-button", element: lazyLoad(RadioButtonPage) },
      { path: "rich-text-editor", element: lazyLoad(RichTextEditorPage) },
      { path: "table", element: lazyLoad(TablePage) },
      { path: "tabs", element: lazyLoad(TabsPage) },
      { path: "text-area", element: lazyLoad(TextAreaPage) },
      { path: "toast", element: lazyLoad(ToastPage) },
      { path: "toggle", element: lazyLoad(ToggleButtonPage) },
      { path: "tooltip", element: lazyLoad(TooltipPage) },
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
