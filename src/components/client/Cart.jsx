import React, { useState, useEffect } from "react";
import api from "../../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("User not logged in or userId missing");
      return;
    }

    try {
      const response = await api.get(`/cart/${userId}`);
      console.log(response.data);
      console.log(response);

      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      console.error("User not logged in or userId missing");
      return;
    }

    try {
      await api.delete(
        `http://localhost:3000/users/${userId}/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza a lista de itens do carrinho após a remoção bem-sucedida
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <div>
              <h3>{item.name}</h3>
              <img
                style={{ height: "80px" }}
                src={item.image}
                alt={item.name}
              />
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
