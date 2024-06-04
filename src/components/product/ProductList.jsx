import React, { useEffect, useState } from "react";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";
import api from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("http://localhost:3000/products");

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleAdd = () => {
    setAddingProduct(true);
  };

  const handleCancelAdd = () => {
    setAddingProduct(false);
  };

  const handleSaveAdd = () => {
    setAddingProduct(false);
    fetchProducts();
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`http://localhost:3000/products/${productId}`);
      fetchProducts(); // Refresh the product list after deleting
    } catch (error) {
      console.error("Failed to delete product", error.message);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={handleAdd}>Add Product</button>
      {addingProduct ? (
        <AddProductForm
          onSave={handleSaveAdd}
          onCancel={handleCancelAdd}
          fetchProducts={fetchProducts}
        />
      ) : editingProduct ? (
        <EditProductForm
          product={editingProduct}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          fetchProducts={fetchProducts}
        />
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <img
                  style={{ height: "80px" }}
                  src={product.image}
                  alt={product.name}
                />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>
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

export default ProductList;
