import React from "react";
import "./Header.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../loader/loading";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const logoutFunction = () => {
    dispatch(logout());
    alert.success("logged out");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <nav>
              <div className="leftNav">
                <div className="logo">
                  <h1>
                    <Link to="/">GwapoShop</Link>
                  </h1>
                </div>
              </div>

              <div className="rightNav">
                <Link to="/cart">
                  <div className="cart">
                    <FaShoppingCart color="white" />
                    <p>cart</p>
                  </div>
                </Link>

                {isAuthenticated ? (
                  <div className="user">
                    <div className="dropDownTitle">
                      <FaUser color="white" />
                      <p>{isAuthenticated ? user.name : "login"}</p>
                    </div>
                    {isAuthenticated && (
                      <div className="dropDownList">
                        <p>
                          <Link to="/account">profile</Link>
                        </p>
                        <p>
                          <Link to="/orders">orders</Link>
                        </p>

                        {user.role === "admin" && (
                          <p>
                            <Link to="/admin/dashboard">dashboard</Link>
                          </p>
                        )}
                        <p onClick={logoutFunction}>logout</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={"/login"}>
                    <div className="dropDownTitle">
                      <FaUser color="white" />
                      <p>{isAuthenticated ? user.name : "login"}</p>
                    </div>
                  </Link>
                )}

                {/* <Link to={isAuthenticated ? "/account" : "/login"}>
                  <div className="user">
                    <div className="dropDownTitle">
                      <FaUser color="white" />
                      <p>{isAuthenticated ? user.name : "login"}</p>
                    </div>
                    {isAuthenticated && (
                      <div className="dropDownList">
                        <p>
                          <Link to="/account">profile</Link>
                        </p>
                        <p>
                          <Link to="/orders">orders</Link>
                        </p>

                        {user.role === "admin" && (
                          <p>
                            <Link to="/dashboard">dashboard</Link>
                          </p>
                        )}
                        <p onClick={logoutFunction}>logout</p>
                      </div>
                    )}
                  </div>
                </Link> */}
              </div>
            </nav>
          </>
        </>
      )}
    </>
  );
};

export default Header;
