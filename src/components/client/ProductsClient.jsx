import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./productList.css"; // Importar o arquivo CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const addToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      await api.post(
        `http://localhost:3000/cart/add`,
        { userId, product },
        {
          headers: {
            token,
          },
        }
      );
      console.log("Product added to cart:", product);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const addToFavorites = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not logged in");
      return;
    }

    try {
      await api.post(`http://localhost:3000/favorites`, { product });
      console.log("Product added to favorites:", product);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <div>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              {isLoggedIn ? (
                <div className="product-actions">
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                  <button onClick={() => addToFavorites(product)}>
                    Add to Favorites
                  </button>
                </div>
              ) : (
                <p className="login-message">
                  Please log in to add to cart or favorites
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
