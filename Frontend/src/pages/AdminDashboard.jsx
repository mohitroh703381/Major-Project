import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../config';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingBag,
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Menu,
  ChevronRight
} from 'lucide-react';

function AdminDashboard() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState('books');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    price: '',
    category: 'Fiction',
    language: 'English',
    description: '',
    imageUrl: '',
    stock: '',
    pages: '',
    publisher: ''
  });

  // Stats
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  // Categories list
  const categories = [
    'Fiction', 'Non-Fiction', 'Programming', 'Self-Help',
    'Science', 'History', 'Biography', 'Business', 'Children'
  ];

  // Languages list
  const languages = [
    'English', 'Hindi', 'Python', 'JavaScript', 'Java',
    'C++', 'React', 'SQL', 'HTML/CSS'
  ];

  // Check if user is admin
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else if (authUser.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/');
    }
  }, [authUser]);

  // Load data
  useEffect(() => {
    if (authUser?.role === 'admin') {
      fetchBooks();
      fetchUsers();
      fetchOrders();
    }
  }, [authUser]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
      setStats(prev => ({ ...prev, totalBooks: response.data.length }));
    } catch (error) {
      toast.error('Failed to fetch books');
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeaders()
      });
      setUsers(response.data);
      setStats(prev => ({ ...prev, totalUsers: response.data.length }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: getAuthHeaders()
      });
      setOrders(response.data);
      const revenue = response.data.reduce((sum, order) => sum + order.totalAmount, 0);
      setStats(prev => ({
        ...prev,
        totalOrders: response.data.length,
        totalRevenue: revenue
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle book form input
  const handleBookInput = (e) => {
    setBookForm({
      ...bookForm,
      [e.target.name]: e.target.value
    });
  };

  // Book create
  const openCreateModal = () => {
    setEditingBook(null);
    setBookForm({
      title: '',
      author: '',
      price: '',
      category: 'Fiction',
      language: 'English',
      description: '',
      imageUrl: '',
      stock: '',
      pages: '',
      publisher: ''
    });
    setShowBookModal(true);
  };

  // edit book details
  const openEditModal = (book) => {
    setEditingBook(book);
    setBookForm({
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      category: book.category || 'Fiction',
      language: book.language || 'English',
      description: book.description || '',
      imageUrl: book.imageUrl || '',
      stock: book.stock || '',
      pages: book.pages || '',
      publisher: book.publisher || ''
    });
    setShowBookModal(true);
  };

  //  Save book (Create or Update)
  const handleSaveBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBook) {
        // Update book
        await axios.put(
          `${API_URL}/books/${editingBook._id}`,
          bookForm,
          { headers: getAuthHeaders() }
        );
        toast.success('Book updated successfully!');
      } else {
        // Create new book
        await axios.post(
          `${API_URL}/books`,
          bookForm,
          { headers: getAuthHeaders() }
        );
        toast.success('Book created successfully!');
      }
      fetchBooks(); // Refresh list
      setShowBookModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  //  Delete book
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await axios.delete(`${API_URL}/books/${bookId}`, {
        headers: getAuthHeaders()
      });
      toast.success('Book deleted successfully!');
      fetchBooks(); // Refresh list
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  //  Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: getAuthHeaders()
      });
      toast.success('User deleted successfully!');
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  // User profile image 
  const imageUrl = "https://github.com/mohitroh703381/Apex-Internship-Task-4/blob/main/PHOTO.jpg?raw=true";

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    setAuthUser(null);
    toast.success('Logged out!');
    navigate('/');
  };

  // If not admin, don't render
  if (!authUser || authUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 px-4 py-3 flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
          {authUser?.name?.charAt(0)}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50
          transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}>
          {/* Admin Profile */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center text-white font-bold">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt="Profile"
      className="w-full h-full object-cover object-top"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  ) : (
    <span>{authUser?.name?.charAt(0).toUpperCase()}</span>
  )}
</div>
              <div>
                <p className="font-semibold">{authUser?.name}</p>
                <p className="text-xs text-green-600">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3">
            <button
              onClick={() => { setActiveTab('books'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition
               ${activeTab === 'books' ? 'bg-blue-600 text-white' : 'hover:bg-[#DDDAD0] hover:text-black'
                }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="flex-1 text-left">Books</span>
              {activeTab === 'books' && <ChevronRight className="h-4 w-4" />}
            </button>

            <button
              onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition
                ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'hover:bg-[#DDDAD0] hover:text-black'}`}
            >
              <Users className="h-5 w-5" />
              <span className="flex-1 text-left">Users</span>
              {activeTab === 'users' && <ChevronRight className="h-4 w-4" />}
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition
                ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'hover:bg-[#DDDAD0] hover:text-black'}`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="flex-1 text-left">Orders</span>
              {activeTab === 'orders' && <ChevronRight className="h-4 w-4" />}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-4"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Books Tab */}
          {activeTab === 'books' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manage Books</h2>
                <button
                  onClick={openCreateModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Book
                </button>
              </div>

              {/* Books Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Author</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Stock</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(book => (
                      <tr key={book._id} className="border-t hover:bg-[#DDDAD0] hover:text-black">
                        <td className="px-4 py-2">{book.title}</td>
                        <td className="px-4 py-2">{book.author}</td>
                        <td className="px-4 py-2">₹{book.price}</td>
                        <td className="px-4 py-2">{book.category}</td>
                        <td className="px-4 py-2">{book.stock || 'N/A'}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => openEditModal(book)}
                            className="text-blue-600 hover:text-blue-700 mr-2"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Joined</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-t hover:bg-[#DDDAD0] hover:text-black">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${user.role === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-orange-100 text-orange-600'
                              }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Order ID</th>
                      <th className="px-4 py-2 text-left">Customer</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-t hover:bg-[#DDDAD0] hover:text-black">
                        <td className="px-4 py-2">#{order._id.slice(-6)}</td>
                        <td className="px-4 py-2">{order.user?.name || 'N/A'}</td>
                        <td className="px-4 py-2">₹{order.totalAmount}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${order.orderStatus === 'Delivered'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                            }`}>
                            {order.orderStatus || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Modal (Create/Edit) */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </h3>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBook} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={bookForm.title}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Author *</label>
                    <input
                      type="text"
                      name="author"
                      value={bookForm.author}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={bookForm.price}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={bookForm.stock}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Category</label>
                    <select
                      name="category"
                      value={bookForm.category}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Language</label>
                    <select
                      name="language"
                      value={bookForm.language}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    name="description"
                    value={bookForm.description}
                    onChange={handleBookInput}
                    rows="3"
                    className="w-full px-3 py-2 border rounded"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm mb-1">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={bookForm.imageUrl}
                    onChange={handleBookInput}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Publisher</label>
                    <input
                      type="text"
                      name="publisher"
                      value={bookForm.publisher}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Pages</label>
                    <input
                      type="number"
                      name="pages"
                      value={bookForm.pages}
                      onChange={handleBookInput}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {editingBook ? 'Update Book' : 'Save Book'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;