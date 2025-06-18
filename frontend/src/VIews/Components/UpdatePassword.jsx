import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";``
import Axios from "axios";


export function Security() {
  const location = useLocation();
  const newPasswordRef = useRef();

  const [user, setUser] = useState({
    authorized: false,
    data: { id: "", firstName: "", lastName: "", email: "" },
  });

  useEffect(() => {
    let storedData = sessionStorage.getItem("_user_data");

    if (storedData !== null) {
      storedData = JSON.parse(storedData);
      setUser(storedData);
    }
  }, [location]);

  const updateData = () => {
    Axios({
      method: "PUT",
      url: `http://localhost:5009/user/${user.data.id}/password`,
      data: {
        NewPassword: newPasswordRef.current.value,
      },
    }).then((response) => {
      alert(response.data);
      window.location.reload();
    });
  };

  return (
    <div id="account">
      <div className="form-input2">
        <form action="">
          <h2>Change password</h2>
          <div className="group">
            <div className="form-group">
              <label htmlFor="old password">New Password</label>
              <input
                type="password"
                id="password"
                ref={newPasswordRef}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" />
          </div>
          <button type="button" onClick={updateData}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}