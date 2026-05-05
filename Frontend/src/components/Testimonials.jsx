import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Book Lover",
      content: "This is my go-to place for books! Amazing collection and great prices. Found many rare titles here. The delivery is super fast and packaging is excellent.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      purchase: "The Great Gatsby"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Student",
      content: "Great prices and excellent customer service. My go-to place for academic books. The discounts on textbooks are really helpful for students like me.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108777-766d1e5f1b3a?w=100",
      purchase: "Python Programming"
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Software Engineer",
      content: "The tech book collection is outstanding. Found all the programming books I needed. Highly recommended for professionals. Will definitely buy again!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      purchase: "Clean Code"
    },
    {
      id: 4,
      name: "Neha Gupta",
      role: "Teacher",
      content: "As a teacher, I appreciate the quality of books and fast delivery. My students also love the collection. The customer support is very helpful.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      purchase: "Sapiens"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Business Analyst",
      content: "Excellent collection of business and self-help books. The recommendations are spot-on. Saved me a lot of time finding good books.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      purchase: "Atomic Habits"
    },
    {
      id: 6,
      name: "Anjali Desai",
      role: "Fiction Reader",
      content: "Love the variety of fiction books! The ratings and reviews help me choose. The wishlist feature is great for saving books for later.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      purchase: "The Alchemist"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = () => {
    if (window.innerWidth < 768) {
      return [testimonials[currentIndex]];
    } else if (window.innerWidth < 1024) {
      return testimonials.slice(currentIndex, currentIndex + 2);
    } else {
      return testimonials.slice(currentIndex, currentIndex + 3);
    }
  };

  return (
    <div className="relative py-8">
      {/* Header */}
      <div className="text-center mb-8">
        {/* <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          What Our Readers Say
        </h2> */}
        <p className="text-gray-600 dark:text-gray-300">
          Join thousands of happy readers who found their next favorite book with us
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative group"
          >
            {/* Quote icon background */}
            <Quote className="absolute top-4 right-4 h-16 w-16 text-gray-100 dark:text-gray-700 group-hover:text-blue-50 dark:group-hover:text-gray-600 transition-colors" />

            <div className="p-6">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Testimonial content */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Purchase info */}
              <div className="mb-4">
                <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                  Purchased: {testimonial.purchase}
                </span>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Gradient border on hover */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        ))}
      </div>

      {/* Stats section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">10K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Happy Readers</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">4.8★</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">50K+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Books Sold</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Daily Reviews</div>
        </div>
      </div>

      {/* Add review button */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.href = '/reviews/add'}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Star className="h-4 w-4" />
          Write a Review
        </button>
      </div>
    </div>
  );
}

export default Testimonials;