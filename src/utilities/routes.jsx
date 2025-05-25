import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "../pages/auth/forgotPassword";
import LoginPage from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Dashboard from "../pages/dashboard";
import Customers from "../pages/customers";
import Projects from "@/pages/projects";
import CustomerManagementHome from "../pages/customers/customerManagement/home";
import CXSkillArchitecture from "@/pages/customers/customerManagement/CXSkillArchitecture";
import CXSkillArchitectureAssign from "@/pages/customers/customerManagement/CXSkillArchitecture/assign";
import Inventory from "@/pages/customers/customerManagement/inventory"; // Add this import
import User from "@/pages/customers/customerManagement/user";
import CustomerProject from "@/pages/customers/customerManagement/project";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard isAdmin />,
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
    path: "/customers/home",
    element: <Customers isAdmin />,
  },
  {
    path: "/customers/:customerId/home",
    element: <CustomerManagementHome isAdmin />,
  },
  {
    path: "/customers/:customerId/cx-skills-architecture",
    element: <CXSkillArchitecture isAdmin />,
  },
  {
    path: "/customers/:customerId/cx-skills-architecture/:id/assign",
    element: <CXSkillArchitectureAssign isAdmin />,
  },
  {
    path: "/customers/:customerId/inventory",
    element: <Inventory isAdmin />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/admin/projects",
    element: <Projects />,
  },
  {
    path: "/home",
    element: <CustomerManagementHome />,
  },
  {
    path: "/cx-skills-architecture",
    element: <CXSkillArchitecture />,
  },
  {
    path: "/cx-skills-architecture/:id/assign",
    element: <CXSkillArchitectureAssign />,
  },
  {
    path: "/customers/:customerId/users",
    element: <User isAdmin />,
  },
  {
    path: "/customers/:customerId/projects",
    element: <CustomerProject isAdmin />,
  },
  {
    path: "/users",
    element: <User />,
  },
  {
    path: "/projects",
    element: <CustomerProject />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
