import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../services/jwtUtils";
import NavBar from "../navBar/navBar";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const decodedToken = decodeToken();
    setIsLoggedIn(!!decodedToken);
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleDash = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin");
    window.location.reload();
  };

  return (
    <div className="header-container">
      <div className="header">
        <ul>
          {!isLoggedIn && (
            <li>
              <button onClick={handleLogin}>SignIn/Up</button>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <button onClick={handleDash}>AdminDash</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
      {isLoggedIn && <NavBar />}
    </div>
  );
};

export default Header;
