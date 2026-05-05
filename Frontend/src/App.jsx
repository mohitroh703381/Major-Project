import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

import Home from "./home/Home";
import Books from "./pages/Books";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookReviews from "./components/BookReviews";
import BookDetails from "./pages/BookDetails";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Chatbot from './components/Chatbot';
import FindTeachers from "./pages/FindTeachers";
import Tuition from "./pages/Tuition";

// import BookDetails from "./pages/BookDetails";
// import Cart from "./pages/Cart";
import Login from "./components/Login";
import Register from "./components/Signup";
// import Dashboard from "./pages/Dashboard";
// import Checkout from "./pages/Checkout";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ComingSoon = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Coming Soon!</h2>
    <p className="text-gray-600 dark:text-gray-300">This page is under construction.</p>
  </div>
);

function App() {
  const [authUser] = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar - visible on all pages */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes - Working */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/book/:id/reviews" element={<BookReviews />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/tuition" element={<Tuition />} />
          <Route path="/teachers" element={<FindTeachers />} />
          {/* <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} /> */}

          {/* Book Details - Working with dummy component */}
          <Route path="/book/:id" element={<ComingSoon />} />

          {/* Protected Routes - Working with condition */}
          <Route
            path="/cart"
            element={authUser ? <ComingSoon /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={authUser ? <ComingSoon /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={authUser ? <ComingSoon /> : <Navigate to="/login" />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={authUser?.role === 'admin' ? <ComingSoon /> : <Navigate to="/" />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      <Chatbot />
    </div>
  );
}

export default App;