import "../assets/css/auth_pages.css";
import emsLogoFull from "../assets/img/ems-logo-full.jpg";
import {useState} from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-content-brand">
          <img src={emsLogoFull} alt="EMS Logo" className="auth-logo" />
        </div>
        <hr />
        <div className="auth-content-main">
          <h1>Welcome!</h1>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                required
                type="email"
                name="username"
                placeholder="me@exe-coll.ac.uk"
                value={username}
                onChange={e => setUsername(e.value)}
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
                onChange={e => setPassword(e.value)}
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
                onChange={e => setConfirmPassword(e.value)}
              />
            </div>
            <input className="btn-primary" type="submit" value="Login"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
