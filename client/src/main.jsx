import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'

import "./assets/css/index.css";
import RequestClub from "./pages/RequestClub.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ClubApprovals from "./pages/admin/ClubApprovals.jsx";
import ContextProvider from "./contextProvider.jsx";
import AuditLogs from "./pages/admin/AuditLogs.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import Admin from "./pages/admin/Admin.jsx";

/* Define which app routes should be directed to which components */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/clubs',
        element: <></>
      },
      {
        path: '/request',
        element: <RequestClub />
      },
      {
        path: '/events',
        element: <></>
      },
      {
        path: '/settings',
        element: <></>
      },
      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: '/admin/approvals',
            element: <ClubApprovals />
          },
          {
            path: '/admin/logs',
            element: <AuditLogs />
          },
          {
            path: '/admin/users',
            element: <UserManagement />
          }
        ]
      }

    ]
  },
  /* Routes that are not children are rendered outside the Outlet, hence no Sidebar */
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  }
])

// Main entry point, this actually renders the app.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
