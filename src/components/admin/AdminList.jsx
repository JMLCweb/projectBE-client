import React, { useEffect, useState } from "react";
import EditAdminForm from "./EditAdminForm";
import api from "../../services/api";
import "./adminList.css";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const fetchAdmins = async () => {
    try {
      const data = await api.get("http://localhost:3000/godmode");
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
  };

  const handleSaveEdit = () => {
    setEditingAdmin(null);
    fetchAdmins();
  };

  const handleDelete = async (adminId) => {
    try {
      await api.delete(`http://localhost:3000/godmode/delete/${adminId}`);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to delete admin", error.message);
    }
  };

  return (
    <div className="admin-list-container">
      <h2>Admin List</h2>
      {editingAdmin ? (
        <EditAdminForm
          admin={editingAdmin}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          fetchAdmins={fetchAdmins}
        />
      ) : (
        <ul className="admin-list">
          {admins.map((admin) => (
            <li key={admin._id}>
              <div>
                <h3>{admin.name}</h3>
                <p>{admin.email}</p>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(admin)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(admin._id)}
                >
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

export default AdminList;
