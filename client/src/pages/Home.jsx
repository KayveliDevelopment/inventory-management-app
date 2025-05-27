import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Kaan's Inventory Management Demo
      </h1>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg"
        >
          Register
        </Link>
      </div>

      {token && (
        <div className="mt-6">
          <Link
            to="/inventory"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-lg"
          >
            Already logged in? Go to Inventory →
          </Link>
        </div>
      )}
    </div>
  );
}
