import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { TrendingUp, Star, Award } from 'lucide-react';

function BestSellers() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBooks([
      {
        _id: "b1",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        price: 899,
        category: "History",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        rating: 4.7,
        soldCount: 15000,
        description: "A brief history of humankind"
      },
      {
        _id: "b2",
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 399,
        category: "Fiction",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        rating: 4.6,
        soldCount: 25000,
        description: "A journey of self-discovery"
      },
      {
        _id: "b3",
        title: "Deep Work",
        author: "Cal Newport",
        price: 699,
        category: "Self-Help",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        rating: 4.4,
        soldCount: 12000,
        description: "Rules for focused success"
      },
      {
        _id: "b4",
        title: "Clean Code",
        author: "Robert Martin",
        price: 1499,
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
        rating: 4.9,
        soldCount: 18000,
        description: "A handbook of agile software craftsmanship"
      },
      {
        _id: "b5",
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 599,
        category: "Business",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
        rating: 4.8,
        soldCount: 22000,
        description: "Timeless lessons on wealth, greed, and happiness"
      },
      {
        _id: "b6",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        price: 999,
        category: "Psychology",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
        rating: 4.5,
        soldCount: 16000,
        description: "Understanding how our minds work"
      },
      {
        _id: "b7",
        title: "The 5 AM Club",
        author: "Robin Sharma",
        price: 499,
        category: "Self-Help",
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
        rating: 4.3,
        soldCount: 14000,
        description: "Own your morning, elevate your life"
      },
      {
        _id: "b8",
        title: "Dune",
        author: "Frank Herbert",
        price: 799,
        category: "Science Fiction",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        rating: 4.7,
        soldCount: 19000,
        description: "The epic science fiction novel"
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Most popular books this month
            </p>
          </div>
        </div>
        
        {/* Trending badge */}
        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            Trending
          </span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.slice(0, 4).map((book) => (
          <div key={book._id} className="relative group">
            {/* Best seller badge */}
            <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>#{book.soldCount}</span>
            </div>
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-6">
        <button 
          onClick={() => window.location.href = '/books?sort=bestsellers'}
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg"
        >
          <span>View All Best Sellers</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Books Sold</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.5★</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Categories</div>
        </div>
      </div>
    </div>
  );
}

export default BestSellers;