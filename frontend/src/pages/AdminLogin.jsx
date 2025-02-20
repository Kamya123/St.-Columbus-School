// src/pages/AdminLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { username, password }
      );
      localStorage.setItem("adminToken", res.data.token);
      setLoginMessage("Logged in successfully!");
      // Redirect to the admin panel route
      navigate("/admin");
    } catch (error) {
      setLoginMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-login-page">
      {/* Hero Section */}
      <div className="w-full pt-12 pb-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-customRed1 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-georgia text-6xl max-[920px]:text-[3rem] max-[544px]:text-4xl leading-snug mb-8">
            Admin Login
          </h1>
          <div className="w-24 border-b-2 border-white" />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="py-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-white">
        <div className="max-w-md mx-auto">
          {loginMessage && (
            <p className="text-center text-lg text-customRed1 mb-4">
              {loginMessage}
            </p>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
