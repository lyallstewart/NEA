import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../../context.jsx";

// Runs as a parent to the admin only routes, and ensures auth state before rendering.

const Admin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if (user?.user?.isSuperuser) {
    return <Outlet />;
  } else {
    return <></>;
  }
};

export default Admin;
