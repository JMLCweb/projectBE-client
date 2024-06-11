import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      await api.addToCart(userId, product);
      console.log("Product added to cart:", product);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
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
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
