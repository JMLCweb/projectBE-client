import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import ProductList from "./components/product/ProductList";
import UserList from "./components/users/UserList";
import Dasboard from "./components/Dasboard";
import Header from "./components/header/Header";
import Client from "./components/client/Client";
import ProductsClient from "./components/client/ProductsClient";
import OrdersList from "./components/orders/OrdersList";
import Cart from "./components/client/Cart";
import HomePage from "./components/HomePage";
import Footer from "./components/footer/Footer";
import "./app.css";

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Dasboard />} />
        <Route path="/orders" element={<OrdersList />} />
        {/*  <Route path="/shop" element={<ProductsClient />} />
        <Route path="/login" element={<Client />} />
        <Route path="/cart" element={<Cart />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <div className="app-footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default App;
