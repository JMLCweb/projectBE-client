import React, { useState } from "react";
import "./editOrderForm.css";

const EditOrderForm = ({ order, onSave, onCancel, error }) => {
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes || "");

  const handleSave = () => {
    onSave(order.userId, order._id, { status, notes });
  };

  return (
    <div className="fullscreen-form-overlay">
      <div className="fullscreen-form">
        <h2>Edit Order</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea
            className="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditOrderForm;
