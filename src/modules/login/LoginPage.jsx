// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"; // centralized axios instance
import { apiAdminLoginUrl } from "../../api/apiRoutes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ start loading

    try {
      const response = await api.post(apiAdminLoginUrl, { email, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        if (response.data.data) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        navigate("/");
      } else {
        setError("Invalid credentials!");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-80vh bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome to Manager Portal
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          To Access Your Account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* User ID */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              User ID
            </label>
            <input
              type="text"
              placeholder="Enter User Id"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={loading}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-red-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={loading}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-bold rounded-md transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
