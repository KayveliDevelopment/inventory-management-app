import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
      login(res.data.token); // ✅ Save token to context + localStorage
      navigate("/inventory"); // ✅ Redirect
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-neutral-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <div className="mt-4 text-center">
        <a href="/" className="text-blue-400 hover:underline text-sm">
         ← Back to Home
         </a>
</div>
      </form>
    </div>
  );
}
