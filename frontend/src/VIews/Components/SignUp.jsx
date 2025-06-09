import { Link } from "react-router-dom";
import "../../Styles/signup.scss";

import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");

  const validateUsername = (username) => {
    if (!username.trim()) {
      return "Last Name is required.";
    }

    return "";
  };

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setSignupError("");

    const usernameErrMsg = validateUsername(username);
    const emailErrMsg = validateEmail(email);
    const passwordErrMsg = validatePassword(password);

    setUsernameError(usernameErrMsg);
    setEmailError(emailErrMsg);
    setPasswordError(passwordErrMsg);

    if (usernameErrMsg || emailErrMsg || passwordErrMsg) {
      return;
    }

    console.log("Attempting to sign up with:", { username, email, password });

    try {
      if (email === "existing@example.com") {
        setSignupError("This email is already registered.");
        return;
      }

      console.log("Signup successful!");
      alert("Account created successfully! You can now sign in.");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupError("Signup failed. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Join Us Today</h1>
      <form noValidate onSubmit={handleSignUp} className="login-form">
        <div className="form-group">
          <div className="input-with-icon">
            <img
              className="icon-svg"
              src="/images/user-svgrepo-com.svg"
              alt="User icon"
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Last Name"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>

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
        </div>

        <div className="form-group">
          {" "}
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

        {signupError && <p className="error-message">{signupError}</p>}

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>

      <p className="signup-link">
        I already have an account <Link to="/Login"> Sign In</Link>{" "}
      </p>
    </div>
  );
};

export default SignUp;
