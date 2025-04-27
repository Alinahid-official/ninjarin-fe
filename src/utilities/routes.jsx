import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "../pages/auth/forgotPassword";
import LoginPage from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Dashboard from "../pages/dashboard";

const router = createBrowserRouter([

  {
    path: '/',
    element: <Dashboard />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },

  {
    path: '/reset-password',
    element: <ResetPassword />,
  },

]);

const AppRoutes = () => {

  return <RouterProvider router={router} />;
};

export default AppRoutes;
