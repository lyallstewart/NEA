import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* LAYOUT AND DATA PROVIDING / AUTH CHECKING COMPONENTS */
import App from "./App.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import ContextProvider from "./ContextProvider.jsx";

/* PAGES */
import Home from "./routes/Home/Home.jsx";
import RequestClub from "./routes/RequestClub/RequestClub.jsx";
import Login from "./routes/Authentication/Login.jsx";
import Signup from "./routes/Authentication/Signup.jsx";
import ClubApprovals from "./routes/Admin/Approvals/ClubApprovals.jsx";
import AuditLogs from "./routes/Admin/Audit/AuditLogs.jsx";
import UserManagement from "./routes/Admin/UserManagement/UserManagement.jsx";
import AllClubs from "./routes/AllClubs/AllClubs.jsx";
import Club from "./routes/Club/Club.jsx";
import Scheduling from "./routes/Admin/Scheduling/Scheduling.jsx";

import "./assets/css/index.css";
import AllEvents from "./routes/AllEvents/AllEvents.jsx";
import Settings from "./routes/Settings/Settings.jsx";

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
      { path: "/events", element: <AllEvents /> },
      { path: "/settings", element: <Settings /> },
      {
        path: "/admin",
        /* <Admin /> component provides auth checking. Routes children to this display a blank page if navigated to without proper auth. */
        element: <Admin />,
        children: [
          { path: "/admin/approvals", element: <ClubApprovals /> },
          { path: "/admin/logs", element: <AuditLogs /> },
          { path: "/admin/users", element: <UserManagement /> },
          { path: "/admin/scheduling", element: <Scheduling /> },
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
