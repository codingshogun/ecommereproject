import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/loading";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}`} />
          <div className="profileContainer">
            <div>
              <h1>profile</h1>
              <img src={user.profileImg.url} alt={user.name} />
              <Link to="/profile/update">edit profile</Link>
            </div>

            <div>
              <div>
                <h4>name</h4>
                <p>{user.name}</p>
              </div>

              <div>
                <h4>email</h4>
                <p>{user.email}</p>
              </div>

              <div>
                <h4>account created</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">orders</Link>
                <Link to="/password/update">update password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
