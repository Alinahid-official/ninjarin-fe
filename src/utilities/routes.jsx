import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "../pages/auth/forgotPassword";
import LoginPage from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Dashboard from "../pages/dashboard";
import Customers from "../pages/customers";
import Projects from "@/pages/projects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
