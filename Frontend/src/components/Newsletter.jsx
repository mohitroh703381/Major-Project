import React, { useState } from 'react';
import { Mail, Send, Bell, Gift, BookOpen, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }, 1000);
  };

  const benefits = [
    '10% off on your first purchase',
    'Weekly book recommendations',
    'Exclusive author interviews',
    'Early access to sales',
    'Free e-book every month'
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Floating books animation */}
      <div className="absolute inset-0 overflow-hidden">
        <BookOpen className="absolute top-10 left-10 text-white opacity-10 h-12 w-12 animate-bounce" />
        <BookOpen className="absolute bottom-10 right-10 text-white opacity-10 h-16 w-16 animate-pulse" />
        <BookOpen className="absolute top-20 right-20 text-white opacity-10 h-8 w-8 animate-spin-slow" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Header with icon */}
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm animate-pulse">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest book releases, exclusive offers, author interviews, and reading tips directly in your inbox.
          </p>

          {/* Success message */}
          {subscribed && (
            <div className="mb-6 bg-green-500/20 backdrop-blur-sm border border-green-400 rounded-lg p-4 animate-slideDown">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <p className="text-white">Thank you for subscribing! Check your email for confirmation.</p>
              </div>
            </div>
          )}

          {/* Subscription form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>

          {/* Benefits grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-1"
              >
                <Gift className="h-5 w-5 mx-auto mb-2 text-yellow-300" />
                <p className="text-xs text-white/90">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <p className="text-sm text-white/60 mt-8">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;