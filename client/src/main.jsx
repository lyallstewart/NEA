import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'

import "./assets/css/index.css";

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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
