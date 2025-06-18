import { Link, useNavigate } from "react-router-dom";
import "../../../Styles/signup.scss";
import Axios  from "axios";
import { useRef } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const FirstName = useRef();
  const LastName = useRef();
  const Email = useRef();
  const Password = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(FirstName.current.value === "" || LastName.current.value === "" || Email.current.value === "" || Password.current.value === "") return alert("All fields are required")
    if(Password.current.value.length < 8) return alert("Password must be at least 8 characters")
    if(!Email.current.value.includes("@")) return alert("Invalid Email")


    Axios.post("http://localhost:5009/signup",
          {
              FirstName: FirstName.current.value,
              LastName: LastName.current.value, 
              Email: Email.current.value, 
              Password:  Password.current.value
          })
          .then((response) => {
            if (confirm("Signup was successful, would you like to proceed to login?")) {
                navigate("/login")
            } else {
                FirstName.current.value = ""
                LastName.current.value = ""
                Email.current.value = ""
                Password.current.value = ""
            }
            console.log(response)
          })
          .catch((error) => {
            alert(error.response.data)
            console.log(error)
          })
  };

  return (
    <div className="signup-page">
      <div className="login-container">
        <h1 className="login-title">Join Us Today</h1>
        <form onSubmit={handleSignUp} className="login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <img
                className="icon-svg"
                src="/images/user-svgrepo-com.svg"
                alt="User icon"
                />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="form-input"
                ref={FirstName}
                />
            </div>
          </div>
          
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
                ref={LastName}
                />
            </div>
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
                ref={Email}
                />
            </div>
          </div>
          <div className="form-group">
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
                ref={Password}
                />
            </div>
          </div>
          <button type="submit" className="login-button" onSubmit={handleSignUp}>Sign Up</button>
        </form>

        <p className="signup-link">
          I already have an account <Link to="/Login"> Sign In</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;