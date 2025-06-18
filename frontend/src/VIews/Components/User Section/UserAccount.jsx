import { Security } from "../Auth/UpdatePassword";
import Account from "../../../VIews/Components/Auth/Account";

const UserProfile = () => {
  return (
    <div className="user-profile" style={{ paddingLeft: "1rem" }}>
        <div className="profile-image"/>
        <section action="">
            <Account/>
            <Security/>
        </section>
    </div>
  )
}

export default UserProfile