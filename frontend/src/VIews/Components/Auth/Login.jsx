import { Link,useNavigate, } from "react-router-dom";
import "../../../Styles/Login.scss";
import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = (e) => {
    e.preventDefault();
    if(email === "" || password === "") return alert("Email or Password cannot be empty")
    if(!email.includes("@")) return alert("Invalid Email")

    Axios.post("http://localhost:5009/login", {
      Email: email,
      Password: password,
    })
    .then((response) =>{
          sessionStorage.setItem("_user_data", JSON.stringify({authorized: true, data: response.data}))
          alert("Login Successful")
          localStorage.setItem("token", response.data);
          navigate("/")
        })
        .catch((error) => {
          alert("Invalid Email or Password");
          console.log(error);
    });
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
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>

        <p className="signup-link">
          I don't have an account yet <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
