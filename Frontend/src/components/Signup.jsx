
// =======================================

import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from '../config';
import { X, UserPlus } from 'lucide-react';

function Signup({ modalId = "signup_modal" }) {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminCode: formData.adminCode
      });

      localStorage.setItem('authUser', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);

      setAuthUser(response.data);
      toast.success('Registration successful!');
      document.getElementById(modalId).close();

      navigate(response.data.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-white dark:bg-gray-900 rounded-2xl p-0 max-w-md">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
          <button onClick={() => document.getElementById(modalId).close()}
            className="absolute right-4 top-4 text-white">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-white" />
            <h3 className="text-2xl font-bold text-white">Sign Up</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            placeholder="Confirm Password"
            required
          />
          <input
            type="text"
            value={formData.adminCode}
            onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            placeholder="Admin Code (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Hint: Enter <span className="font-bold">ADMIN123</span> for admin access
          </p>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Signup;