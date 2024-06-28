import React, { useEffect, useState } from "react";
import EditUserForm from "./EditUserForm";
import api from "../../services/api";

import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`http://localhost:3000/users/delete/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user", error.message);
      }
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <p className="intro">
        Welcome to the User Management Page.
        <br></br>
        Here, you can view, edit, and delete users. You can also see the details
        of their carts and orders.
        <br></br>
        Use the "Edit" button to modify user information or the "Delete" button
        to remove a user from the system.
      </p>

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
                        Product ID: {cartItem.productId} - Quantity:
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
                <button
                  className="edit-button"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
