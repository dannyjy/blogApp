import { Link } from "react-router-dom";
import "../../Styles/Login.scss";
import React from "react";

const Login = () => {
  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>
      <form noValidate="" action="" className="login-form">
        <div className="form-group">
          <div className="input-with-icon">
            <img
              className="icon-svg"
              src="/images/email-svgrepo-com.svg"
              alt=""
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="input-with-icon">
            <img
              className="icon-svg"
              src="/images/key-4-svgrepo-com.svg"
              alt=""
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              className="form-input"
            />
          </div>
        </div>

        <button className="login-button">Sign In</button>
      </form>

      <p className="signup-link"> 
        I don't have an account yet <Link to="/signup"> Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;