import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit3
} from 'lucide-react';
import toast from 'react-hot-toast';

function UserDashboard() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profile, setProfile] = useState({
    name: authUser?.name || '',
    email: authUser?.email || '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadOrders();
    loadWishlist();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = savedOrders.filter(order => order.userId === authUser?.id);
    setOrders(userOrders);
  };

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...authUser, ...profile };
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    setAuthUser(updatedUser);
    toast.success('Profile updated successfully!');
  };

  const handleRemoveFromWishlist = (bookId) => {
    const updated = wishlist.filter(book => book._id !== bookId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success('Removed from wishlist');
  };

 
  const handleLogout = () => {
    
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');

    setAuthUser(null);

    toast.success('Logged out successfully!');

    navigate('/', { replace: true });

    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  if (!authUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <User className="h-8 w-8 text-blue-600" />
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {authUser?.name || 'User'}!
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="text-center mb-4 pb-4 border-b dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {authUser?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  {authUser?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {authUser?.email}
                </p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.name}
                    </button>
                  );
                })}

            
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  My Orders
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${order.status === 'Delivered'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-yellow-100 text-yellow-600'
                            }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="font-semibold">Total: ₹{order.total}</p>
                        <p className="text-sm text-gray-600">{order.items?.length || 0} items</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No orders yet</p>
                    <Link to="/books" className="text-blue-600 hover:underline mt-2 inline-block">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}

            {activeTab === 'wishlist' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  My Wishlist
                </h2>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((book) => (
                      <div key={book._id} className="flex gap-3 border dark:border-gray-700 rounded-lg p-3">
                        <img src={book.imageUrl} alt={book.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 dark:text-white">{book.title}</h3>
                          <p className="text-sm text-gray-600">₹{book.price}</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                // Add to cart logic
                                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                                cart.push({ ...book, quantity: 1 });
                                localStorage.setItem('cart', JSON.stringify(cart));
                                window.dispatchEvent(new Event('cartUpdated'));
                                toast.success('Added to cart!');
                              }}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(book._id)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <Link to="/books" className="text-blue-600 hover:underline mt-2 inline-block">
                      Browse Books
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Settings
                </h2>

                <div className="space-y-4">
                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Email me about new arrivals</span>
                    </label>
                    <label className="flex items-center gap-2 mt-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Email me about order updates</span>
                    </label>
                  </div>

                  <div className="border dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Password</h3>
                    <button className="text-blue-600 hover:underline">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;