
//=====================================

import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from '../config';
import { X, Mail, Lock, LogIn } from 'lucide-react';

function Login({ modalId = "login_modal" }) {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      
      localStorage.setItem('authUser', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      
      setAuthUser(response.data);
      toast.success('Login successful!');
      document.getElementById(modalId).close();
      
      navigate(response.data.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-white dark:bg-gray-900 rounded-2xl p-0 max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <button onClick={() => document.getElementById(modalId).close()} 
            className="absolute right-4 top-4 text-white">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <LogIn className="h-6 w-6 text-white" />
            <h3 className="text-2xl font-bold text-white">Login</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Login;