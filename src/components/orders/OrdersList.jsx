import React, { useEffect, useState } from "react";
import EditOrderForm from "./EditOrderForm";
import api from "../../services/api";
import "./ordersList.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);

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
      const updatedData = { status, notes };

      await api.updateOrderStatus(orderId, updatedData);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`http://localhost:3000/orders/delete/${orderId}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        setError("Failed to delete order. Please try again.");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-list-container">
      <h2>Orders List</h2>
      <p className="intro">
        Welcome to the Orders Management Page.
        <br></br>
        Here, you can view all the orders placed by users, update their status,
        add notes, and even move completed orders to the history.
        <br></br>
        Use the "Edit" button to modify the order details or the "Delete" button
        to remove an order from the system.
      </p>
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
              <h2>Status: {order.status}</h2>
              <h3>Order Date: {new Date(order.orderDate).toLocaleString()}</h3>
              <h5>Items:</h5>
              <ul>
                {order.items.map((item, index) => (
                  <li key={`${item.productId}-${index}`}>
                    Product ID: {item.productId}
                    <br></br>
                    Name: {item.name}
                    <br></br>
                    Price: {item.price} $<br></br>
                    Quantity: {item.quantity} items
                    <br></br>
                  </li>
                ))}
              </ul>
              <h4>
                Send To:
                <p>{order.country}</p>
              </h4>
              <h4>
                Adress:
                <p>{order.address}</p>
              </h4>
              <h4>
                Zip-Code:
                <p>{order.zipcode}</p>
              </h4>
              <h4>
                Payment Method:
                <p>{order.paymentMethod}</p>
              </h4>
              <h4>Notes: {order.notes}</h4>
              <h3>
                Total Price:
                <br></br>
                {order.totalPrice}$
              </h3>
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
