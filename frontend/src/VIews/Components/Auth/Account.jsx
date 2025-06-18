import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/security.scss";
import Axios from "axios";


function Account() {
  const navigate = useNavigate()
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const [user, setUser] = useState({
    authorized: false,
    data: { id: "", firstName: "", lastName: "", email: "" ,image: "",createdAt: ""},
  });
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
      if (user.data) {
        setFirstName(user?.data.firstName)
        setLastName(user?.data.lastName)
        setEmail(user?.data.email)
      }
    }, [user, setUser])


  useEffect(() => {
    let storedData = sessionStorage.getItem("_user_data");

    if (storedData == null) {
      storedData = {};
    } else {
      storedData = JSON.parse(storedData);
    }

    setUser(storedData);
  }, []);

  const updateData = () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;

    Axios({
      method: "PUT",
      url: `http://localhost:5009/user/${user.data.id}`,
      data: {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
      }
    }).then((response) => {
      alert("Profile updated successfully!");      
      sessionStorage.setItem("_user_data", JSON.stringify({ authorized: true, data: response.data }))
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      Axios({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        url: `http://localhost:5009/user/${user.data.id}` 
      }).then(() => {
        sessionStorage.setItem("_user_data", JSON.stringify({authorized: false, data: { id: "", firstName: "", lastName: "", email: "", image: "" }}))
        navigate("/")
      });
    }
  };

  const profileImage =
    user.data && user.data.image
      ? user.data.image
      : "/images/profile1.jpg"; // fallback image

  const profileStyle = {
    backgroundImage: `url(${profileImage})`
  };

  return (
    <div id="account">
      <div className="account-info">
        <div className="account-profile" style={profileStyle}></div>
        <div className="account-names">
          <h2>{(firstName + " " + lastName).toUpperCase()}</h2>
          <p style={{ color: "#333" }}>{email}</p>
          <p style={{ color: "grey" }}>
            {user.data.createdAt ? user.data.createdAt.slice(0, 10) : ""}
          </p>
        </div>
      </div>
      <form className="group">
        <div className="form-g">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            ref={firstNameRef}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-g">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            ref={lastNameRef}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-g">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={updateData}>
          Update Profile
        </button>
        <p style={{ padding: "10px 0" }}>
          I want to delete my account
          <span
            onClick={handleDelete}
            style={{ cursor: "pointer", color: "red" }}
          >
            {" "}
            Delete
          </span>
        </p>
      </form>
    </div>
  );
}

export default Account;