import "../assets/css/auth_pages.css";
import emsLogoFull from "../assets/img/ems-logo-full.jpg";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {UserContext} from "../context.jsx";
import {useNavigate} from "react-router";

const Signup = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/users/getCurrentUser`
    }).then(res => {
      if (res.data.isAuthenticated) {
        setUser({isAuthenticated: true, user: res.data.user})
        navigate('/')
      }
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/users/signup`,
      withCredentials: true,
      data: {
        email,
        password,
        firstName,
        lastName,
      }
    }).then(res => {
      if(res.status === 200) {
        navigate('/login');
      }
    }).catch(err => {
      if(err.response.status === 403) {
        setError("A user with that email exists.")
      } else {
        setError("Something went wrong!")
      }
    })
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-content-brand">
          <img src={emsLogoFull} alt="EMS Logo" className="auth-logo" />
        </div>
        <hr />
        <div className="auth-content-main">
          <h1>Welcome!</h1>
          <NavLink className="auth-toggle" to="/login">Already have an account? Log in instead.</NavLink>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                required
                type="email"
                name="username"
                placeholder="janedoe@exe-coll.ac.uk"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group input-group-horizontal">
              <div className="input-group-horizontal-field">
                <label htmlFor="firstname">First Name</label>
                <input
                  required
                  type="text"
                  name="firstname"
                  placeholder="Jane"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group-horizontal-field">
                <label htmlFor="lastname">Last Name</label>
                <input
                  required
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                name="password"
                placeholder="***********"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                required
                type="password"
                name="confirm-password"
                placeholder="***********"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <input className="btn-primary" type="submit" value="Sign Up"/>
          </form>
          <p className="form-error">{error ? error : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
