import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react';
import BookReviews from '../components/BookReviews';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function BookDetails() {
  const { id } = useParams();
  const [authUser] = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [
      {
        _id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499,
        category: "Fiction",
        language: "English",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        rating: 4.5,
        description: "A classic novel about the American Dream set in the Jazz Age. The story explores themes of wealth, class, love, and loss through the eyes of narrator Nick Carraway.",
        publisher: "Scribner",
        pages: 180,
        isbn: "978-0743273565"
      },
      {
        _id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 799,
        category: "Self-Help",
        language: "English",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
        rating: 4.8,
        description: "Tiny changes, remarkable results. An easy and proven way to build good habits and break bad ones.",
        publisher: "Avery",
        pages: 320,
        isbn: "978-0735211292"
      },
      {
        _id: "3",
        title: "Python Crash Course",
        author: "Eric Matthes",
        price: 899,
        category: "Programming",
        language: "Python",
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
        rating: 4.7,
        description: "A hands-on, project-based introduction to programming with Python. Perfect for beginners.",
        publisher: "No Starch Press",
        pages: 544,
        isbn: "978-1593279288"
      },
      {
        _id: "4",
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        price: 599,
        category: "Programming",
        language: "JavaScript",
        imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
        rating: 4.5,
        description: "A deep dive into the best parts of JavaScript, helping you write better code.",
        publisher: "O'Reilly Media",
        pages: 176,
        isbn: "978-0596517748"
      },
      {
        _id: "5",
        title: "Effective Java",
        author: "Joshua Bloch",
        price: 1299,
        category: "Programming",
        language: "Java",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        rating: 4.9,
        description: "Best practices for the Java platform, with clear explanations and examples.",
        publisher: "Addison-Wesley",
        pages: 416,
        isbn: "978-0134685991"
      }
    ];

    // Save to localStorage
    if (!localStorage.getItem('allBooks')) {
      localStorage.setItem('allBooks', JSON.stringify(allBooks));
    }

    // Find the book by id
    const foundBook = allBooks.find(b => b._id === id);
    setBook(foundBook);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.some(item => item._id === book._id);

    if (!exists) {
      cart.push({ ...book, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Added to cart!');
    } else {
      toast.error('Already in cart!');
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
        {/* Back Button */}
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        {/* Book Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Image */}
            <div className="md:col-span-1">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                by {book.author}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {book.rating} stars
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                ₹{book.price}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {book.description}
              </p>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Publisher</p>
                  <p className="text-gray-800 dark:text-white">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="text-gray-800 dark:text-white">{book.pages}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="text-gray-800 dark:text-white">{book.language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="text-gray-800 dark:text-white">{book.isbn}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <BookReviews bookId={id} bookTitle={book.title} />
      </div>
    </div>
  );
}

export default BookDetails;