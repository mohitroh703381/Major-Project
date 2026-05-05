import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();

    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);

    setCartItems(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    window.dispatchEvent(new Event('storage'));

    toast.success('Item removed from cart');
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
    toast.success('Cart cleared');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            Shopping Cart
          </h1>
          <Link
            to="/books"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <ShoppingBag className="h-20 w-20 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-xl transition"
                >
                  {/* Book Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Book Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          by {item.author}
                        </p>
                        {item.language && (
                          <span className="inline-block mt-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded">
                            {item.language}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-600 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                          className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                          className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ₹{item.price} each
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ₹{item.price * (item.quantity || 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 transition flex items-center gap-1 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t dark:border-gray-700 pt-4 mb-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span className="text-blue-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                    Proceed to Checkout
                  </button>
                </Link>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    We accept:
                  </p>
                  <div className="flex justify-center gap-2">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" alt="Visa" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" alt="Mastercard" />
                    <img src="https://img.icons8.com/color/48/000000/rupay.png" className="h-6" alt="RuPay" />
                    <img src="https://img.icons8.com/color/48/000000/paytm.png" className="h-6" alt="Paytm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;