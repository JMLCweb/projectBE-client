import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer, Ul, Button } from "./headerStyle";

const Header = () => {
  const navigate = useNavigate();

  const HandleHome = () => {
    navigate("/");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  const handleProducts = () => {
    navigate("/products");
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleRegister = () => {
    navigate("admin/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleAdmins = () => {
    navigate("/admins");
  };

  return (
    <HeaderContainer>
      <Ul>
        <li>
          <Button onClick={HandleHome}>Home</Button>{" "}
        </li>
        <li>
          <Button onClick={handleAdmins}>Admins</Button>{" "}
        </li>
        <li>
          <Button onClick={handleUsers}>Users</Button>
        </li>
        <li>
          <Button onClick={handleProducts}>Products</Button>{" "}
        </li>
        <li>
          <Button onClick={handleRegister}>Register</Button>
        </li>
        <li>
          <Button onClick={handleLogin}>Login</Button>
        </li>
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </Ul>
    </HeaderContainer>
  );
};

export default Header;
