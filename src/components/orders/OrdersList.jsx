import React, { useEffect, useState } from "react";
import EditOrderForm from "./EditOrderForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import "./ordersList.css"; // Import the CSS file here

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await api.fetchOrders();
      setOrders(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    console.log("Order", order);
  };

  const handleSaveEditOrder = async (userId, orderId, { status, notes }) => {
    try {
      await api.updateOrderStatus(userId, orderId, { status, notes });
      if (status === "completed") {
        await moveOrderToHistory(userId, orderId);
      }
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await api.deleteOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete order. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const moveOrderToHistory = async (userId, orderId) => {
    try {
      const order = orders.find((order) => order._id === orderId);
      await api.moveOrderToHistory(userId, order, orderId);
      await api.deleteOrder(orderId);
    } catch (error) {
      console.error("Error moving order to history:", error);
    }
  };

  const handleCancelEditOrder = () => {
    setEditingOrder(null);
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
  const handleDashboard = () => {
    navigate("/admin");
  };

  return (
    <div className="orders-list-container">
      <button onClick={HandleUsers}>Users</button>
      <button onClick={handleOrders}>Orders</button>
      <button onClick={handleProducts}>Products</button>
      <button onClick={handleDashboard}>Dashboard</button>
      <h2>Orders List</h2>
      {error && <p className="error-message">{error}</p>}
      {editingOrder && (
        <EditOrderForm
          order={editingOrder}
          onSave={handleSaveEditOrder}
          onCancel={handleCancelEditOrder}
        />
      )}
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order._id}>
            <div>
              <h3>Order ID: {order._id}</h3>
              <h4>Status: {order.status}</h4>
              <h4>Notes: {order.notes}</h4>
              <h5>Items:</h5>
              <ul>
                {order.items.map((item, index) => (
                  <li key={`${item.productId}-${index}`}>
                    Product ID: {item.productId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <button
                className="edit-button"
                onClick={() => handleEditOrder(order)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteOrder(order._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
