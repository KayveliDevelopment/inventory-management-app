import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Inventory() {
  const { token, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "", description: "", image: null });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      setError("Failed to load inventory.");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("quantity", form.quantity);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await axios.post("${import.meta.env.VITE_API_URL}/api/inventory", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setItems((prev) => [...prev, res.data]);
      setForm({ name: "", quantity: "", price: "", description: "", image: null });
      setPreviewUrl(null);
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/inventory/${editingId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? res.data : item))
      );
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">📦 Inventory</h1>
          <button
            onClick={logout}
            className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="mb-6 bg-neutral-800 p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="name"
              type="text"
              placeholder="Item Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-neutral-600 bg-neutral-900 text-white p-2 rounded"
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="border border-neutral-600 bg-neutral-900 text-white p-2 rounded"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-neutral-600 bg-neutral-900 text-white p-2 rounded"
              required
            />
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border border-neutral-600 bg-neutral-900 text-white p-2 rounded col-span-2"
            />

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <div className="flex items-center gap-4">
                <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
                {previewUrl && (
            <div className="relative w-16 h-16">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
           <button
            type="button"
            onClick={() => {
            setPreviewUrl(null);
            setForm((prev) => ({ ...prev, image: null }));
          }}
           className="absolute -top-2 -right-2 bg-neutral-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-700"
          title="Remove image"
        >
      ×
    </button>
  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
          >
            Add Item
          </button>
        </form>

        {/* Inventory List */}
        <ul className="space-y-4">
          {items.map((item) =>
            editingId === item.id ? (
              <li
                key={item.id}
                className="bg-yellow-100 text-black p-4 rounded shadow space-y-2"
              >
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  name="quantity"
                  value={editForm.quantity}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li
                key={item.id}
                className="bg-neutral-800 p-4 rounded shadow flex gap-4 items-start"
              >
                {item.imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-neutral-300">{item.description}</p>
                  <p className="text-sm text-neutral-400">
                    Qty: {item.quantity} — ${item.price}
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <button
                    onClick={() => startEdit(item)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
