import "../../assets/css/auth_pages.css";
import emsLogoFull from "../../assets/img/ems-logo-full.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../../context.jsx";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/users/getCurrentUser`,
    }).then((res) => {
      if (res.data.isAuthenticated) {
        setUser({ isAuthenticated: true, user: res.data.user });
        navigate("/");
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/users/login`,
      withCredentials: true,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          setUser({ isAuthenticated: true, user: res.data.user });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setError("Incorrect username or password!");
        } else {
          setError("Oh no! Something went wrong");
        }
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-content-brand">
          <img src={emsLogoFull} alt="EMS Logo" className="auth-logo" />
        </div>
        <hr />
        <div className="auth-content-main">
          <h1>Welcome Back!</h1>
          <NavLink className="auth-toggle" to="/signup">
            Don&apos;t have an account? Sign up instead.
          </NavLink>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                required
                type="email"
                name="username"
                placeholder="me@exe-coll.ac.uk"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                name="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input className="btn-primary" type="submit" value="Login" />
          </form>
          <p className="form-error">{error ? error : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
