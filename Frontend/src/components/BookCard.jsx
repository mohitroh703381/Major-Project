import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Code } from 'lucide-react';
import toast from 'react-hot-toast';

function BookCard({ book }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setInWishlist(wishlist.some(item => item._id === book._id));
  }, [book._id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.some(item => item._id === book._id);
    
    if (!exists) {
      cart.push({ ...book, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${book.title} added to cart!`);
    } else {
      toast.error('Book already in cart!');
    }
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (inWishlist) {
      
      const updated = wishlist.filter(item => item._id !== book._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setInWishlist(false);
      toast.success('Removed from wishlist!');
    } else {
      // Add to wishlist
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setInWishlist(true);
      toast.success('Added to wishlist!');
    }
    
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 group relative">
      {/* Book Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={book.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all transform hover:scale-110 ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Language Badge */}
        {book.language && book.category === "Programming" && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Code className="h-3 w-3" />
            {book.language}
          </span>
        )}
      </div>
      
      {/* Book Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
            {book.category}
          </span>
        </div>
        
        <Link to={`/book/${book._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 hover:text-blue-600 transition-colors line-clamp-1">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          by {book.author}
        </p>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(book.rating || 4)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({book.rating || 4.0})
          </span>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ₹{book.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;