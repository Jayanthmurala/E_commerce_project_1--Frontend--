import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../Auth";
import Login from "../Auth/login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import Email from "../Auth/ForgotPassword/Email";
import Otp from "../Auth/ForgotPassword/Otp";
import ResetPassword from "../Auth/ForgotPassword/ResetPassword";
import DashBoard from "../Vendor";
import VendorOrders from "../Vendor/Layout/components/VendorOrders";
import VendorProducts from "../Vendor/Layout/components/VendorProducts";
import EditProduct from "../Vendor/Layout/components/EditProduct";
import Home from "../Components/pages/Home";
import Cart from "../Components/User/cart";
import Orders from "../Components/User/Orders";
import Profile from "../Components/User/Profile";
import SubCategory from "../Components/SubCategory";
import Search from "../Components/User/Search";
import ProtectedRoute from "../util/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "search", element: <Search /> },
      {
        path: "auth",
        element: <Auth />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          {
            path: "forgotPassword",
            element: <ForgotPassword />,
            children: [
              { path: "", element: <Email /> },
              { path: "otp", element: <Otp /> },
              { path: "resetpassword", element: <ResetPassword /> },
            ],
          },
        ],
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:id",
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <SubCategory />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/vendor",
    element: (
      <ProtectedRoute allowedRoles={["Vendor", "admin"]}>
        <DashBoard />
      </ProtectedRoute>
    ),
    children: [
      { path: "orders", element: <VendorOrders /> },
      { path: "products", element: <VendorProducts /> },
      { path: "edit/:id", element: <EditProduct /> },
    ],
  },
]);

export default router;
