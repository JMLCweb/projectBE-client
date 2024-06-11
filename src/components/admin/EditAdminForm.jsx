import React, { useState, useEffect } from "react";
import api from "../../services/api";

const EditAdminForm = ({ admin, onSave, onCancel, fetchAdmins }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
      });
    }
  }, [admin]);

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
      await api.put(
        `http://localhost:3000/godmode/update/${admin._id}`,
        formData
      );
      fetchAdmins();
      onSave();
    } catch (error) {
      console.error("Failed to update admin", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Admin</h3>
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
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditAdminForm;
