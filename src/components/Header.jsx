import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../services/jwtUtils";

import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const decodedToken = decodeToken();
    setIsLoggedIn(!!decodedToken);
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleShop = () => {
    navigate("/shop");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/shop");
    window.location.reload();
  };

  return (
    <div className="header">
      <ul>
        <li>
          <button onClick={handleShop}>Shop</button>
        </li>
        {!isLoggedIn && (
          <li>
            <button onClick={handleLogin}>SignIn/Up</button>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <button onClick={handleCart}>Cart</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
