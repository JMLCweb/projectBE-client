import React, { useEffect, useState } from "react";
import EditUserForm from "./EditUserForm";
import api from "../../services/api";
import { decodeToken } from "../../services/jwtUtils";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to access this page.");
        return;
      }

      const decodedToken = decodeToken(token);
      if (!decodedToken || decodedToken.role !== "admin") {
        setErrorMessage("You do not have permission to access this page.");
        return;
      }

      setErrorMessage("");
      fetchUsers();
    };

    checkAuth();
  }, [navigate]);

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
      "Are you sure you want to delete this User?"
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

  if (errorMessage) {
    return (
      <div>
        <h2>User List</h2>
        <h2 className="error-message">{errorMessage}</h2>;
      </div>
    );
  }

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
                <h3>Name: {user.name}</h3>
                <p>Email: {user.email}</p>
                <h4>User Cart:</h4>
                {user.cart && user.cart.length > 0 ? (
                  <ul>
                    {user.cart.map((item, index) => (
                      <li key={`${item.productId}-${index}`}>
                        <p>Product ID: {item.productId}</p>
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price} $</p>
                        <p>Quantity: {item.quantity} items.</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Cart is empty</p>
                )}
                <h4>Completed Orders:</h4>
                {user.ordersHistory && user.ordersHistory.length > 0 ? (
                  <ul>
                    {user.ordersHistory.map((order, index) => (
                      <li key={order._id || index}>
                        <p>
                          Order Date:
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p>Total Price: {order.totalPrice} $</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No orders</p>
                )}
                <div className="user-buttons">
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
