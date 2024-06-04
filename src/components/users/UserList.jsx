import React, { useEffect, useState } from "react";
import EditUserForm from "./EditUserForm";
import api from "../../services/api";

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
    try {
      await api.delete(`http://localhost:3000/users/${userId}`);
      fetchUsers(); // Refresh the user list after deleting
    } catch (error) {
      console.error("Failed to delete user", error.message);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          fetchUsers={fetchUsers}
        />
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <h4>Cart:</h4>
                {user.cart && user.cart.length > 0 ? (
                  <ul>
                    {user.cart.map((cartItem) => (
                      <li key={cartItem._id}>
                        Product ID: {cartItem.productId}, Quantity:{" "}
                        {cartItem.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Cart is empty</p>
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
