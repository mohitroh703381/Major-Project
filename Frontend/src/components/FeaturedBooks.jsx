import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setBooks([
      {
        _id: "f1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499,
        category: "Fiction",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        rating: 4.5,
        description: "A classic novel about the American Dream"
      },
      {
        _id: "f2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 799,
        category: "Self-Help",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
        rating: 4.8,
        description: "Tiny changes, remarkable results"
      },
      {
        _id: "f3",
        title: "Python Programming",
        author: "John Zelle",
        price: 1299,
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
        rating: 4.6,
        description: "Learn Python programming"
      },
      {
        _id: "f4",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 899,
        category: "History",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        rating: 4.7,
        description: "A brief history of humankind"
      },
      {
        _id: "f5",
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 399,
        category: "Fiction",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        rating: 4.6,
        description: "A journey of self-discovery"
      }
    ]);
  }, []);

  const nextSlide = () => {
    if (currentIndex < books.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(books.length - 3, 0));
    }
  };

  if (books.length === 0) {
    return <div className="text-center py-8">Loading featured books...</div>;
  }

  return (
    <div className="relative px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.slice(currentIndex, currentIndex + 3).map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      
      {books.length > 3 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(books.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`h-2 w-2 rounded-full transition-all ${
              Math.floor(currentIndex / 3) === index
                ? 'bg-blue-600 w-6'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBooks;