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
};

export default api;
