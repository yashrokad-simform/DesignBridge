import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import { routes } from "./routes";
import { ThemeProvider } from "./lib/theme-provider";

// Router configuration
const router = createBrowserRouter(routes);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Analytics />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
