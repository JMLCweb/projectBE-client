import React, { useState } from "react";
import api from "../../services/api";

const AddUserForm = ({ onSave, onCancel, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:3000/users", formData);
      fetchUsers();
      onSave();
    } catch (error) {
      console.error("Failed to add user", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add User</h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add User</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddUserForm;
