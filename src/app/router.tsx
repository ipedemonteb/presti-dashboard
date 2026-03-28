import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard-page";
import NotFoundPage from "@/pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);