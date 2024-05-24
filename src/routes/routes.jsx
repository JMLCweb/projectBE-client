import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Products from "../api/fetchProducts";
import Users from "../api/fetchUsers";
import Header from "../components/Header";

const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </Router>
);

export default AppRoutes;
