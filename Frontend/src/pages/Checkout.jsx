import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { API_URL } from '../config';
import toast from 'react-hot-toast';

function Checkout() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: authUser?.phone || ''
  });

  // Load cart items
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
    setCartItems(cart);
    console.log('Cart loaded:', cart);
  }, [navigate]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  // Order place function
  const handlePlaceOrder = async () => {
  // Validation
  if (!address.street || !address.city || !address.state || !address.pincode || !address.phone) {
    toast.error('Please fill all address fields');
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem('token');
    
    // validation of book id in mongoDB
    const invalidItems = cartItems.filter(item => 
      !item._id || item._id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(item._id)
    );
    
    if (invalidItems.length > 0) {
      console.log('Invalid items:', invalidItems);
      toast.error('Some books have invalid IDs. Please refresh and try again.');
      setLoading(false);
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        book: item._id,  // ------ Book id 24 hex char ka -------
        quantity: item.quantity || 1,
        price: item.price
      })),
      shippingAddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode
      },
      paymentMethod: 'COD'
    };

    console.log('Sending order:', orderData);

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    console.log('Response:', data);

    if (response.ok) {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Order placed successfully!');
      setStep(3);
    } else {
      toast.error(data.message || 'Order failed');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Network error');
  } finally {
    setLoading(false);
  }
};

  // If not logged in
  useEffect(() => {
    if (!authUser) {
      toast.error('Please login to checkout');
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (!authUser) return null;

  // Success page
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/books"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
              <Link
                to="/dashboard"
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Checkout
          </h1>
          <Link
            to="/cart"
            className="text-blue-600 hover:text-blue-700 transition"
          >
            ← Back to Cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Shipping Address
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  placeholder="Street Address *"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City *"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State *"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="Pincode *"
                    maxLength="6"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number *"
                    maxLength="10"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Payment Method
              </h2>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={true}
                    readOnly
                    className="h-4 w-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-medium">₹{item.price * (item.quantity || 1)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mt-6 disabled:opacity-50 text-lg font-semibold"
              >
                {loading ? 'Processing...' : 'Place Order · ' + total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;