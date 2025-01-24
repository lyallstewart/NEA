import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router";

import "./assets/css/buttons.css";
import "./assets/css/forms.css";
import "./assets/css/tabs.css";

import { useContext, useEffect } from "react";
import { ClubsContext, UserContext } from "./context.jsx";
import axios from "axios";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { setUser } = useContext(UserContext);
  const { setClubs, setClubMemberships } = useContext(ClubsContext);
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

        // If authenticated, proceed with fetching
        axios({
          method: "GET",
          url: `${import.meta.env.VITE_BASE_URL}/clubs/getAll`,
          withCredentials: true,
        })
          .then((res) => {
            setClubs(res.data.clubs);
            setClubMemberships(res.data.memberships);
            console.log(res.data.memberships);
          })
          .catch((error) => {
            console.log(error);
          });
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
