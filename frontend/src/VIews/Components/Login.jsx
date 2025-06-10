import { Link } from "react-router-dom";
import "../../Styles/Login.scss";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePassword = (password) => {
    const errors = [];

    if (!password) {
      return "Password is required.";
    }

    if (password.length < 8) {
      errors.push("at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("at least one uppercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("at least one symbol (!@#$%^&*...)");
    }

    if (errors.length > 0) {
      return `Password must contain: ${errors.join(", ")}.`;
    }

    return "";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoginError("");

    const emailErrMsg = validateEmail(email);
    const passwordErrMsg = validatePassword(password);

    setEmailError(emailErrMsg);
    setPasswordError(passwordErrMsg);

    if (emailErrMsg || passwordErrMsg) {
      return;
    }
    console.log("Attempting to login with:", { email, password });
    if (email === "test@example.com" && password === "Password@1") {
      console.log("Login successful!");
      alert("Login successful!");
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome Back</h1>
        <form noValidate onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <img
                className="icon-svg"
                src="/images/email-svgrepo-com.svg"
                alt="Email icon"
                />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {emailError && <p className="error-message">{emailError}</p>}

            <div className="input-with-icon">
              <img
                className="icon-svg"
                src="/images/key-4-svgrepo-com.svg"
                alt="Password icon"
                />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          {loginError && <p className="error-message">{loginError}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="signup-link">
          I don't have an account yet <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
