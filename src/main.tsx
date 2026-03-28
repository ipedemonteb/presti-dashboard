import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "@/app/router";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="presti-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);