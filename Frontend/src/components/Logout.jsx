import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    setAuthUser(null);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition flex items-center gap-1"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
}

export default Logout;