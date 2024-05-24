import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data || "We dont have any users");
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };
  const handleAdd = () => {
    alert("Not implemented yet");
  };

  const handleEdit = (user) => {
    alert("Not implemented yet");
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleAdd}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h3>{user.name || "No Name Provided"}</h3>
            <p>Email: {user.email}</p>
            <h4>Cart</h4>
            <ul>
              <li key={user._id}>
                {user.email} ({user.role})
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </li>
              {user.cart.length > 0 ? (
                user.cart.map((item, index) => (
                  <li key={index}>
                    Product ID: {item.productId}, Quantity: {item.quantity}
                  </li>
                ))
              ) : (
                <li>Cart is empty</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
