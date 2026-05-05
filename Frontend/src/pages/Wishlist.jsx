import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    loadWishlist();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(savedWishlist);
    setLoading(false);
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = (bookId) => {
    const updated = wishlistItems.filter(item => item._id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlistItems(updated);
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.success('Removed from wishlist');
  };

  // Move to cart
  const handleMoveToCart = (book) => {
    // Add to cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.some(item => item._id === book._id);
    
    if (!exists) {
      cart.push({ ...book, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Remove from wishlist
      handleRemoveFromWishlist(book._id);
      
      toast.success('Moved to cart!');
    } else {
      toast.error('Book already in cart!');
    }
  };

  // Clear all wishlist
  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) return;
    
    if (window.confirm('Clear all items from wishlist?')) {
      localStorage.removeItem('wishlist');
      setWishlistItems([]);
      window.dispatchEvent(new Event('wishlistUpdated'));
      toast.success('Wishlist cleared');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            My Wishlist
          </h1>
          <Link
            to="/books"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          // Empty Wishlist
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <Heart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save your favorite books here by clicking the ❤️ button on any book.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Total Items: <span className="font-bold text-gray-800 dark:text-white">{wishlistItems.length}</span>
                </p>
                <button
                  onClick={handleClearWishlist}
                  className="text-red-500 hover:text-red-600 transition flex items-center gap-1 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((book) => (
                <div key={book._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
                  {/* Book Image */}
                  <div className="relative h-48">
                    <img
                      src={book.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(book._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Book Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      by {book.author}
                    </p>
                    
                    {/* Category Badge */}
                    <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-3">
                      {book.category}
                    </span>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        ₹{book.price}
                      </span>
                      <button
                        onClick={() => handleMoveToCart(book)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition flex items-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;