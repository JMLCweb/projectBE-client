const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { token: token }),
  };
};

const api = {
  get: async (url) => {
    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    return data;
  },
  post: async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to post data");
    }
    return data;
  },
  put: async (url, body) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update data");
    }
    return data;
  },
  delete: async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete data");
    }
    return data;
  },

  fetchOrders: async () => {
    try {
      const response = await api.get("http://localhost:3000/orders");
      return response;
    } catch (error) {
      throw new Error("Failed to fetch orders. Please try again.");
    }
  },

  updateOrderStatus: async (orderId, updatedData) => {
    try {
      const response = await api.put(
        `http://localhost:3000/orders/update/${orderId}`,
        updatedData
      );
      return response;
    } catch (error) {
      throw new Error("Failed to update order status. Please try again.");
    }
  },

  moveOrderToHistory: async (userId, order, orderId) => {
    const response = await api.post(
      `http://localhost:3000/orders/${userId}/${orderId}`,
      order
    );
    return response;
  },

  addToCart: async (userId, product) => {
    const response = await api.post(`http://localhost:3000/cart/${userId}`, {
      product,
    });
    return response;
  },
};

export default api;
