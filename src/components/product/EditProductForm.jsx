import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./EditProductForm.css";

const EditProductForm = ({ product, onSave, onCancel, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      });
    }
  }, [product]);

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
        `http://localhost:3000/products/update/${product._id}`,
        formData
      );
      fetchProducts();
      onSave();
    } catch (error) {
      console.error("Failed to update product", error.message);
    }
  };

  return (
    <div className="edit-product-form-container">
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <h3>Edit Product</h3>
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
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
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

export default EditProductForm;
