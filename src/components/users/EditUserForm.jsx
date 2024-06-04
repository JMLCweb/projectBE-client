import React, { useState, useEffect } from "react";
import api from "../../services/api";

const EditUserForm = ({ user, onSave, onCancel, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cart: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        cart: user.cart,
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

  const handleCartChange = (index, field, value) => {
    const updatedCart = formData.cart.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      cart: updatedCart,
    }));
  };

  const handleAddCartItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      cart: [...prevData.cart, { productId: "", quantity: 1 }],
    }));
  };

  const handleRemoveCartItem = (index) => {
    const updatedCart = formData.cart.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      cart: updatedCart,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`http://localhost:3000/users/update/${user._id}`, formData);
      fetchUsers();
      onSave();
    } catch (error) {
      console.error("Failed to update user", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <h3>Cart</h3>
      {formData.cart.map((item, index) => (
        <div key={index}>
          <label>
            Product ID:
            <input
              type="text"
              value={item.productId}
              onChange={(e) =>
                handleCartChange(index, "productId", e.target.value)
              }
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleCartChange(index, "quantity", e.target.value)
              }
            />
          </label>
          <button type="button" onClick={() => handleRemoveCartItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddCartItem}>
        Add Cart Item
      </button>

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
