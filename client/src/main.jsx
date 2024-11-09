import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createTheme } from '@mui/material/styles';

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import "./assets/index.css";
import { ThemeProvider } from '@emotion/react';

/* MUI Palette */
const theme = createTheme({
  palette: {
    primary: {
      main: 'hsla(176, 100%, 19%, 1)', // Caribbean Current
    },
    secondary: {
      main: 'hsla(224, 36%, 56%, 1)', // Glaucous
    },
    text: {
      primary: 'hsla(39, 52%, 6%, 1)', // Smoky Black
    },
    background: {
      default: 'hsla(323, 31%, 85%, 1)', // Thistle
    },
  },
});

export default theme;
/* Define which app routes should be directed to which components */
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <App />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
