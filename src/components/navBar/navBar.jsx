import React from "react";
import { useNavigate } from "react-router-dom";
import "./navBar.css";

const navBar = () => {
  const navigate = useNavigate();

  const handleUsers = () => {
    navigate("/users");
  };
  const handleOrders = () => {
    navigate("/orders");
  };
  const handleProducts = () => {
    navigate("/products");
  };

  return (
    <div className="navBar">
      <ul>
        <li>
          <button onClick={handleUsers}>Users</button>
        </li>
        <li>
          <button onClick={handleOrders}>Orders</button>
        </li>
        <li>
          <button onClick={handleProducts}>Products</button>
        </li>
      </ul>
    </div>
  );
};

export default navBar;
