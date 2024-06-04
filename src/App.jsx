import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import ProductList from "./components/product/ProductList";
import UserList from "./components/users/UserList";
import Home from "./components/Home";
import Header from "./components/Header";
import AdminList from "./components/admin/AdminList";
import "./app.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admins" element={<AdminList />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
