import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useAuth } from "../context/AuthProvider";
import {
  BookOpen,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Library,
  Info,
  Phone,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Heart,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Theme effect
  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Sticky navbar effect
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Real-time cart count update
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === 'cart') {
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    };

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${searchQuery}`);
      setSearchQuery("");
      setIsOpen(false);
    }
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

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Books", path: "/books", icon: Library },
    { name: "Tuition", path: "/teachers", icon: GraduationCap },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  // For wishlist
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 group"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-8 w-8 text-blue-600 group-hover:rotate-12 transition-transform" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                  BookStore
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center space-x-6 lg:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:block relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-48 xl:w-64 px-4 py-2 pl-10 pr-12 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                >
                  Go
                </button>
              </div>
            </form>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {/* Desktop User Menu */}
              {authUser ? (
                <div className="hidden md:flex items-center space-x-2">
                  {/* 👑 ADMIN BUTTON - Purple color for admin */}
                  {authUser?.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors whitespace-nowrap"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="text-sm font-medium">Admin Panel</span>
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => document.getElementById("login_modal").showModal()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => document.getElementById("signup_modal").showModal()}
                    className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t dark:border-gray-700 animate-slideDown">
              <div className="flex flex-col space-y-2">
                {/* Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Menu for Logged In Users */}
                {authUser && (
                  <>
                    {/* Admin gets purple button, User gets blue button */}
                    {authUser?.role === 'admin' ? (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>👑 Admin Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>📊 My Dashboard</span>
                      </Link>
                    )}

                    {/* Mobile Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium mt-1"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>🚪 Logout</span>
                    </button>
                  </>
                )}

                {/* Mobile Login/Signup for Non-Logged In Users */}
                {!authUser && (
                  <>
                    <button
                      onClick={() => {
                        document.getElementById("login_modal").showModal();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
                    >
                      <User className="h-5 w-5" />
                      <span>🔐 Login</span>
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("signup_modal").showModal();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transition-colors font-medium mt-1"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>✨ Sign Up</span>
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4 px-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Login modalId="login_modal" />
      <Signup modalId="signup_modal" />

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;