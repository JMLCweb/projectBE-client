import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/godmode/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      console.log("Data received from server:", data);

      localStorage.setItem("token", data.token);

      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <p className="intro">
          Welcome to the Admin Panel. Please log in with your credentials to
          access the admin features and manage the system. If you don't have an
          account, please contact Administration.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
