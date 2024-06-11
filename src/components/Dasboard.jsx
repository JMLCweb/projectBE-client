import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminList from "./admin/AdminList";
import "./dashboard.css";
import "./spinner.css";

const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        setError("No token provided. Please log in.");
        setLoading(false);
      }, 1000); // Delay of 1 second
      return;
    }

    try {
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      if (user.role !== "admin") {
        setError("You are not authorized to view this page.");
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
    } catch (e) {
      setError("Invalid token. Please log in again.");
    }
    setLoading(false);
  };

  const HandleUsers = () => {
    navigate("/users");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return (
      <div className="error">
        <h1>Access Denied</h1>
        <p>{error}</p>
        <button onClick={() => navigate("/admin/login")}>Go to Login</button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={HandleUsers}>Users</button>
      <button onClick={handleOrders}>Orders</button>
      <button onClick={handleProducts}>Products</button>

      <AdminList />
    </div>
  );
};

export default DashboardAdmin;
