import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./EditUserForm.css";

const EditUserForm = ({ user, onSave, onCancel, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // A senha não é carregada por razões de segurança, o admin deve inserir uma nova se quiser mudar
      });
    }
  }, [user]);

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
        `http://localhost:3000/users/update/admin/${user._id}`,
        formData
      );
      fetchUsers();
      onSave();
    } catch (error) {
      console.error("Failed to update user", error.message);
    }
  };

  return (
    <div className="edit-user-form-container">
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <h3>Edit User</h3>
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
    </div>
  );
};

export default EditUserForm;
