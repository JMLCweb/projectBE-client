import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../services/jwtUtils";
import NavBar from "../navBar/navBar";
import logo from "../../assets/logo.png";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const decodedToken = decodeToken();
    setIsLoggedIn(!!decodedToken);
  }, []);

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
    <header className="header-container">
      <div className="header">
        <img src={logo} alt="Logo" className="header-logo" />
        <ul className="header-menu">
          {!isLoggedIn ? (
            <li>
              <button onClick={handleLogin}>Admin Login</button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={handleDash}>Admin Dashboard</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
      {isLoggedIn && <NavBar />}
    </header>
  );
};

export default Header;
