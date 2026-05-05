import React from 'react';
import { Search } from 'lucide-react';

function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Thousands of books waiting to be explored. From bestsellers to classics.
        </p>
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {/* <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search
          </button> */}
<button
  aria-label="Search"
  className="bg-white text-blue-600 
  w-14 h-14 md:w-auto md:h-auto
  md:px-8 md:py-3
  rounded-full font-semibold 
  hover:bg-gray-100 transition 
  flex items-center justify-center gap-2"
>
  <Search className="h-5 w-5" />

  <span className="hidden md:inline">
    Search
  </span>
</button>



        </div>
      </div>
    </div>
  );
}

export default Hero;