import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import NotFoundPage from "@/pages/not-found-page";

import { DashboardLayout } from "@/components/dashboard-layout";
import AnalyticsPage from "@/pages/dashboard/analytics-page";
import ParametersPage from "@/pages/dashboard/parameters-page";
import ProductsPage from "@/pages/dashboard/products-page";
import PortfolioPage from "@/pages/dashboard/portfolio-page";
import SettingsPage from "@/pages/dashboard/settings-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AnalyticsPage />,
      },
      {
        path: "parameters",
        element: <ParametersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);