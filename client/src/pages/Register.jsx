import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("http://localhost:4000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
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
