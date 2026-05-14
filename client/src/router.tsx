import { createBrowserRouter } from "react-router-dom"
import CustomerLayout from "./components/layout/CustomerLayout"
import StoreHome from "./pages/customer/Home"
import PublicOnlyLayout from "./components/auth/PublicOnlyLayout"
import { SignInPage } from "./pages/auth/SignInPage"
import { SignUpPage } from "./pages/auth/SignUpPage"
import ProtectedLayout from "./components/auth/ProtectedLayout"
import CustomerProfile from "./pages/customer/Profile"
import RoleGuardLayout from "./components/auth/RoleGuardLayout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminLayout from "./components/layout/AdminLayout"
import AdminCoupons from "./pages/admin/Promos"
import AdminSettings from "./pages/admin/Settings"
import AdminOrders from "./pages/admin/Orders"
import AdminProducts from "./pages/admin/Products"
import Collections from "./pages/customer/Collections"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <StoreHome />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "sign-in/*",
            element: <SignInPage />,
          },
          {
            path: "sign-up/*",
            element: <SignUpPage />,
          },
          {
            path: "collections",
            element: <Collections />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "profile",
            element: <CustomerProfile />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuardLayout allow={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "products", element: <AdminProducts /> },
              { path: "orders", element: <AdminOrders /> },
              { path: "coupons", element: <AdminCoupons /> },
              { path: "settings", element: <AdminSettings /> },
            ],
          },
        ],
      },
    ],
  },
])
