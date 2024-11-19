import {useContext, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {UserContext} from "../context.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  useEffect(() => {
    if(!user?.user?.isSuperuser){
      navigate("/");
    }
  }, []);

  if(user?.user?.isSuperuser) return (
    <h1>Admin</h1>
  )
}

export default Admin;