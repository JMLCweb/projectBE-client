import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminList from "./admin/AdminList";
import "./dashboard.css";
import "./spinner.css";

const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        setError("No token provided. Please log in.");
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const user = JSON.parse(atob(token.split(".")[1]));
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
      <p className="intro">
        Welcome to the Admin Dashboard.
        <br></br>Here, you can manage users, view orders, and handle all
        administrative tasks to ensure the smooth operation of our platform.
      </p>
      <AdminList />
    </div>
  );
};

export default DashboardAdmin;
