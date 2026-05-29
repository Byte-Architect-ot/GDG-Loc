import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {

    const data = {
      email: username,
      password: password,
    };

    try {
      const res = await api.post("/api/admin/login", data);
      if (res.status === 200) {
        alert("Login successful");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      alert("Login failed: " + e);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-tight">
          GDG Admin Login
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600"
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;