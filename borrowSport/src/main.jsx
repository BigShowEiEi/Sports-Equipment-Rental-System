import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "flowbite";
import LoginAdmin from "./page/adminPages/loginAdmin";
import HomeAdmin from "./page/adminPages/HomeAdmin";
import HistoryAdmin from "./page/adminPages/HistoryAdmin";
import PlaceAdmin from "./page/adminPages/PlaceAdmin";
import { ProtectedRouteEmployee } from "./components/Protect/ProtectedRoute";
import EquipmentAdmin from "./page/adminPages/EquipmentAdmin";
import ManageUserAdmin from "./page/adminPages/ManageUserAdmin";

import Login from './Login';
import Welcome from './Welcome';
import BorrowEquipment from './BorrowEquipment';
import BorrowingList from './BorrowingList';

const router = createBrowserRouter([
  {
    path: "admin/login",
    element: <LoginAdmin /> 
  },
  {
    path: "/admin/home",
    element: <ProtectedRouteEmployee element={<HomeAdmin />} />,
  },
  {
    path: "/admin/history",
    element: <ProtectedRouteEmployee element={<HistoryAdmin />} />
  },
  {
    path: "/admin/place",
    element: <ProtectedRouteEmployee element={<PlaceAdmin />} />,
  },
  {
    path: "/admin/equipment",
    element: <ProtectedRouteEmployee element={<EquipmentAdmin />} />
  },
  {
    path: "/admin/manageUsers",
    element: <ProtectedRouteEmployee element={<ManageUserAdmin />} />
  },
  {
    path: "/",
    element: <Login /> 
  },
  {
    path: "/login",
    element: <Login /> 
  },
  {
    path: "/welcome",
    element: <Welcome /> 
  },
  {
    path: "/borrow",
    element: <BorrowEquipment /> 
  },

  {
    path: "/borrow-list",
    element: <BorrowingList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
