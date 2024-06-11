import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import ProductList from "./components/product/ProductList";
import UserList from "./components/users/UserList";
import Dasboard from "./components/Dasboard";
import Header from "./components/Header";
import Client from "./components/client/Client";
import ProductsClient from "./components/client/ProductsClient";
import OrdersList from "./components/orders/OrdersList";
import "./app.css";

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/admin" element={<Dasboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/shop/products" element={<ProductsClient />} />
        <Route path="/shop" element={<Client />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
};

export default App;
