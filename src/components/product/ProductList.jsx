import React, { useEffect, useState } from "react";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../services/jwtUtils";
import "./productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      fetchProducts();
    };

    checkAuth();
  }, [navigate]);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`http://localhost:3000/products/delete/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product", error.message);
      }
    }
  };

  if (errorMessage) {
    return (
      <div>
        <h2>Products List</h2>
        <h2 className="error-message">{errorMessage}</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="product-list-container">
        <h2>Product List</h2>
        <p className="intro">
          Welcome to the Product Management Page.
          <br></br>
          Here, you can view all the products available in the store, update
          their details, add new products, and delete existing ones.
          <br></br>
          Use the "Add Product" button to create a new product, the "Edit"
          button to modify a product, or the "Delete" button to remove them from
          the Database.
        </p>
        <button className="addProduct" onClick={handleAdd}>
          Add Product
        </button>
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
          <ul className="product-list">
            {products.map((product) => (
              <li key={product._id}>
                <div>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <p>{product.description}</p>
                  <p className="price">Price: ${product.price}</p>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
