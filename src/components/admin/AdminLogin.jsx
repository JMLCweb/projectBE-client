import React, { useState } from "react";
import AdminRegister from "./AdminRegister";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"; // Importe o arquivo CSS aqui

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
      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpiration", data.tokenExpiration);

      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <AdminRegister></AdminRegister>
      </div>
    </div>
  );
};

export default AdminLogin;
