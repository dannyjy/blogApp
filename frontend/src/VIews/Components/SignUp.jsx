import { Link } from "react-router-dom";
import "../../Styles/signup.scss";
import "../../Styles/signup.scss";
const SignUp = () => {
  return (
    <div className="login-container">
      <h1 className="login-title">Join Us Today</h1>
      <form noValidate="" action="" className="login-form">
        <div className="form-group">
          <div className="input-with-icon">
            <img
              className="icon-svg"
              src="/images/user-svgrepo-com.svg"
              alt=""
            />
            <input
              type="text"
              name="username "
              id="username"
              placeholder="Last Name"
              className="form-input"
            />
          </div>
        </div>

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
        <button className="login-button">Sign Up</button>
      </form>
      <p className="signup-link">
      I already have an account  
        <Link to="/Login"> Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
