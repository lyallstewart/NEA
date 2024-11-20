import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router";

import "./assets/css/buttons.css";
import "./assets/css/forms.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context.jsx";
import axios from "axios";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
      </main>
    </>
  );
};

export default App;
