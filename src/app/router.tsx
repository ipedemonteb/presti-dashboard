import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import DashboardPage from "@/pages/dashboard-page";
import NotFoundPage from "@/pages/not-found-page";

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
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);