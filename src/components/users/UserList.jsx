import React, { useEffect, useState } from "react";
import EditUserForm from "./EditUserForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await api.get("http://localhost:3000/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`http://localhost:3000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error.message);
    }
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
    <div className="user-list-container">
      <button onClick={HandleUsers}>Users</button>
      <button onClick={handleOrders}>Orders</button>
      <button onClick={handleProducts}>Products</button>
      <button onClick={handleDashboard}>Dashboard</button>
      <h2>User List</h2>
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          fetchUsers={fetchUsers}
        />
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id}>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <h4>Cart:</h4>
                {user.cart && user.cart.length > 0 ? (
                  <ul>
                    {user.cart.map((cartItem, cartIndex) => (
                      <li key={`${cartItem.productId}-${cartIndex}`}>
                        Product ID: {cartItem.productId}, Quantity:
                        {cartItem.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Cart is empty</p>
                )}
                <h4>Orders:</h4>
                {user.orders && user.orders.length > 0 ? (
                  <ul>
                    {user.orders.map((order, orderIndex) => (
                      <li key={order._id || orderIndex}>
                        <p>
                          Order Date:
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p>Status: {order.status}</p>
                        <h5>Items:</h5>
                        <ul>
                          {order.items.map((item, itemIndex) => (
                            <li key={`${item.productId}-${itemIndex}`}>
                              Product ID: {item.productId}, Quantity:
                              {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No orders</p>
                )}
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
