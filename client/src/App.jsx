import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router";

import "./assets/css/buttons.css";
import "./assets/css/forms.css";
import "./assets/css/tabs.css";

import { useContext, useEffect } from "react";
import { UserContext } from "./context.jsx";
import axios from "axios";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /* As App is rendered parent to all routes (except login/signup), the auth check takes place on all routes that require authentication to view.  */
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/users/getCurrentUser`,
    }).then((res) => {
      if (!res.data.isAuthenticated) {
        setUser({ isAuthenticated: false, user: null });
        navigate("/login");
      } else {
        setUser({ isAuthenticated: true, user: res.data.user });
      }
    });
  }, []);

  return (
    <>
      <Sidebar />
      <main>
        {/* Actual site content is rendered into the Outlet by Router */}
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default App;
