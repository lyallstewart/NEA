import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'

import "./assets/css/index.css";
import RequestClub from "./pages/RequestClub.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import {UserProvider} from "./context.jsx";

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
        element: <></>
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
