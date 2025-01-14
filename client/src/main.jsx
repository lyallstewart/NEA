import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* LAYOUT AND DATA PROVIDING / AUTH CHECKING COMPONENTS */
import App from "./App.jsx";
import Admin from "./pages/admin/Admin.jsx";
import ContextProvider from "./contextProvider.jsx";

/* PAGES */
import Home from "./pages/Home.jsx";
import RequestClub from "./pages/RequestClub.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ClubApprovals from "./pages/admin/ClubApprovals.jsx";
import AuditLogs from "./pages/admin/AuditLogs.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import AllClubs from "./pages/AllClubs.jsx";
import Club from "./pages/Club.jsx";
import MainScheduling from "./pages/admin/rooming/MainScheduling.jsx";

import "./assets/css/index.css";

/* Define routing schema to be provided to @react-router */
const router = createBrowserRouter([
  {
    path: "/",
    /* Routes that are children to the <App /> are rendered in the <Outlet /> and inside the main layout, i.e. with a Footer and Sidebar */
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/clubs", element: <AllClubs /> },
      { path: "/clubs/:id", element: <Club /> },
      { path: "/request", element: <RequestClub /> },
      { path: "/events", element: <></> },
      { path: "/settings", element: <></> },
      {
        path: "/admin",
        /* <Admin /> component provides auth checking. Routes children to this display a blank page if navigated to without proper auth. */
        element: <Admin />,
        children: [
          { path: "/admin/approvals", element: <ClubApprovals /> },
          { path: "/admin/logs", element: <AuditLogs /> },
          { path: "/admin/users", element: <UserManagement /> },
          { path: "/admin/scheduling", element: <MainScheduling /> },
        ],
      },
    ],
  },
  /* Routes that are not children of the layout provided in App are rendered outside said layout, hence no Sidebar or Footer */
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

// Main entry point, this actually renders the app.
createRoot(document.getElementById("root")).render(
  // Strict mode provides improved error traces and stricter HTML validation when in development mode. Irrelevant in production.
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);
