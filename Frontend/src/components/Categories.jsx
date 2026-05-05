import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  History, 
  Code, 
  Heart, 
  Briefcase,
  Baby,
  Globe,
  Sparkles,
  Microscope,
  Palette,
  Music
} from 'lucide-react';

function Categories() {
  const categories = [
    { name: 'Fiction', icon: BookOpen, color: 'bg-blue-500', count: 245, bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { name: 'Self-Help', icon: Brain, color: 'bg-green-500', count: 189, bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { name: 'History', icon: History, color: 'bg-yellow-500', count: 156, bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' },
    { name: 'Technology', icon: Code, color: 'bg-purple-500', count: 203, bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
    { name: 'Romance', icon: Heart, color: 'bg-pink-500', count: 178, bgColor: 'bg-pink-100 dark:bg-pink-900/20' },
    { name: 'Business', icon: Briefcase, color: 'bg-indigo-500', count: 145, bgColor: 'bg-indigo-100 dark:bg-indigo-900/20' },
    { name: 'Children', icon: Baby, color: 'bg-orange-500', count: 167, bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
    { name: 'Science', icon: Microscope, color: 'bg-red-500', count: 134, bgColor: 'bg-red-100 dark:bg-red-900/20' },
    { name: 'Fantasy', icon: Sparkles, color: 'bg-cyan-500', count: 198, bgColor: 'bg-cyan-100 dark:bg-cyan-900/20' },
    { name: 'Art', icon: Palette, color: 'bg-amber-500', count: 112, bgColor: 'bg-amber-100 dark:bg-amber-900/20' },
    { name: 'Music', icon: Music, color: 'bg-emerald-500', count: 89, bgColor: 'bg-emerald-100 dark:bg-emerald-900/20' },
    { name: 'Travel', icon: Globe, color: 'bg-violet-500', count: 123, bgColor: 'bg-violet-100 dark:bg-violet-900/20' }
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              to={`/books?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${category.color} opacity-10 rounded-bl-full`} />
              
              <div className="relative">
                {/* Icon with colored background */}
                <div className={`inline-flex p-2.5 rounded-lg ${category.bgColor} mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${category.color.replace('bg-', 'text-')}`} />
                </div>
                
                {/* Category name */}
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-0.5">
                  {category.name}
                </h3>
                
                {/* Book count */}
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {category.count} books
                </p>
              </div>

              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 w-full h-0.5 ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </Link>
          );
        })}
      </div>

      {/* View all categories link */}
      <div className="text-center mt-8">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
        >
          <span>View All Categories</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Categories;