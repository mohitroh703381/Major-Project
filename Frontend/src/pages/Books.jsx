
//         {
//           _id: "1",
//           title: "The Great Gatsby",
//           author: "F. Scott Fitzgerald",
//           price: 499,
//           category: "Fiction",
//           language: "English",
//           imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
//           rating: 4.5,
//           description: "A classic novel about the American Dream"
//         },
//         {
//           _id: "2",
//           title: "The Alchemist",
//           author: "Paulo Coelho",
//           price: 399,
//           category: "Fiction",
//           language: "English",
//           imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
//           rating: 4.6,
//           description: "A journey of self-discovery"
//         },
//         {
//           _id: "3",
//           title: "1984",
//           author: "George Orwell",
//           price: 449,
//           category: "Fiction",
//           language: "English",
//           imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
//           rating: 4.7,
//           description: "Dystopian social science fiction"
//         },

//         // Self-Help Books (2)
//         {
//           _id: "4",
//           title: "Atomic Habits",
//           author: "James Clear",
//           price: 799,
//           category: "Self-Help",
//           language: "English",
//           imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
//           rating: 4.8,
//           description: "Tiny changes, remarkable results"
//         },
//         {
//           _id: "5",
//           title: "Deep Work",
//           author: "Cal Newport",
//           price: 699,
//           category: "Self-Help",
//           language: "English",
//           imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
//           rating: 4.4,
//           description: "Rules for focused success"
//         },

//         // Python Books (3)
//         {
//           _id: "6",
//           title: "Python Crash Course",
//           author: "Eric Matthes",
//           price: 899,
//           category: "Programming",
//           language: "Python",
//           imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
//           rating: 4.7,
//           description: "A hands-on introduction to programming"
//         },
//         {
//           _id: "7",
//           title: "Automate Python",
//           author: "Al Sweigart",
//           price: 699,
//           category: "Programming",
//           language: "Python",
//           imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
//           rating: 4.6,
//           description: "Automate the boring stuff with Python"
//         },
//         {
//           _id: "8",
//           title: "Fluent Python",
//           author: "Luciano Ramalho",
//           price: 1499,
//           category: "Programming",
//           language: "Python",
//           imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
//           rating: 4.8,
//           description: "Clear, concise, and effective programming"
//         },

//         // JavaScript Books (3)
//         {
//           _id: "9",
//           title: "JavaScript: The Good Parts",
//           author: "Douglas Crockford",
//           price: 599,
//           category: "Programming",
//           language: "JavaScript",
//           imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
//           rating: 4.5,
//           description: "The definitive guide to JavaScript"
//         },
//         {
//           _id: "10",
//           title: "Eloquent JavaScript",
//           author: "Marijn Haverbeke",
//           price: 799,
//           category: "Programming",
//           language: "JavaScript",
//           imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400",
//           rating: 4.6,
//           description: "A modern introduction to programming"
//         },
//         {
//           _id: "11",
//           title: "You Don't Know JS",
//           author: "Kyle Simpson",
//           price: 999,
//           category: "Programming",
//           language: "JavaScript",
//           imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
//           rating: 4.8,
//           description: "Deep dive into JavaScript"
//         },

//         // Java Books (2)
//         {
//           _id: "12",
//           title: "Effective Java",
//           author: "Joshua Bloch",
//           price: 1299,
//           category: "Programming",
//           language: "Java",
//           imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
//           rating: 4.9,
//           description: "Best practices for Java"
//         },
//         {
//           _id: "13",
//           title: "Head First Java",
//           author: "Kathy Sierra",
//           price: 899,
//           category: "Programming",
//           language: "Java",
//           imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
//           rating: 4.6,
//           description: "A brain-friendly guide"
//         },

//         // Web Development (2)
//         {
//           _id: "14",
//           title: "HTML and CSS",
//           author: "Jon Duckett",
//           price: 799,
//           category: "Programming",
//           language: "HTML/CSS",
//           imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
//           rating: 4.7,
//           description: "Design and build websites"
//         },
//         {
//           _id: "15",
//           title: "React Up and Running",
//           author: "Stoyan Stefanov",
//           price: 899,
//           category: "Programming",
//           language: "React",
//           imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
//           rating: 4.5,
//           description: "Build web applications with React"
//         }
//       ]);




// ==============================================

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { Search, Filter, X, Code } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from '../config';

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    "All Categories", "Fiction", "Non-Fiction", "Science", 
    "Technology", "History", "Biography", "Self-Help", "Business", "Programming"
  ];

  const programmingLanguages = [
    "All Languages", "Python", "JavaScript", "Java", "C++", "React", "SQL", "HTML/CSS"
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) setSearchTerm(searchQuery);
  }, [location]);

  useEffect(() => {
    filterBooks();
  }, [searchTerm, selectedCategory, selectedLanguage, priceRange, books]);

  // Book fetching
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/books`);
      console.log('Real books from DB:', response.data);
      setBooks(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = [...books];
    
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.language && book.language.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== "all" && selectedCategory !== "All Categories") {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (selectedLanguage !== "all" && selectedLanguage !== "All Languages") {
      filtered = filtered.filter(book => 
        book.language && book.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }
    
    filtered = filtered.filter(book =>
      book.price >= priceRange.min && book.price <= priceRange.max
    );
    
    setFilteredBooks(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/books?search=${searchTerm}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLanguage("all");
    setPriceRange({ min: 0, max: 5000 });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Browse Books 📚
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {books.length} books available
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or language..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Filter className="h-5 w-5" />
        </button>
      </form>

      {/* Filters Panel - UI Same Hai */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 animate-slideDown">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg dark:bg-gray-700"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border rounded-lg dark:bg-gray-700"
            >
              {programmingLanguages.map(lang => (
                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: +e.target.value})}
                className="w-1/2 px-3 py-2 border rounded-lg dark:bg-gray-700"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: +e.target.value})}
                className="w-1/2 px-3 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredBooks.length} of {books.length} books
      </div>

      {/* Books Grid - UI Bilkul Same Hai */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No books found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default Books;