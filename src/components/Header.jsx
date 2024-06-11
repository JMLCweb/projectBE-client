import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer, Ul, Button } from "./headerStyle";

const Header = () => {
  const navigate = useNavigate();

  const HandleHome = () => {
    navigate("/admin");
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    navigate("/admin");
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <Ul>
        <li>
          <Button onClick={HandleHome}>Dashboard</Button>
        </li>

        <li>
          <Button onClick={handleLogin}>SignIn/Up</Button>
        </li>
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </Ul>
    </HeaderContainer>
  );
};

export default Header;
