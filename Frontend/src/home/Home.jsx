import React from "react";
import Hero from "../components/Hero";
import FeaturedBooks from "../components/FeaturedBooks";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section with Search */}
      <Hero />
      
      {/* Featured Books Carousel */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Featured Books
          </h2>
          <FeaturedBooks />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Shop by Category
          </h2>
          <Categories />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Best Sellers
          </h2>
          <BestSellers />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            What Our Readers Say
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
}

export default Home;