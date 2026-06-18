import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
        <SpeedInsights />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
