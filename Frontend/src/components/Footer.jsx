
//==================== New footer style ===================
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-800 dark:text-white">BookStore</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your one-stop destination for all book lovers. Discover, read, and enjoy!
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Home</Link></li>
              <li><Link to="/books" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Books</Link></li>
              <li><Link to="/cart" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Cart</Link></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@bookstore.com
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 12345 67890
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Moradabad, India
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t dark:border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2025 BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;