import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Award, Clock, ChevronRight } from 'lucide-react';

function Tuition() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Teacher</h1>
          <p className="text-xl mb-8">Connect with experienced tutors for personalized learning</p>
          <Link
            to="/find-teachers"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center gap-2"
          >
            Find a Teacher <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600">Quality education at your fingertips</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Users, title: 'Expert Teachers', desc: 'Qualified & experienced' },
            { icon: Award, title: 'Verified Tutors', desc: 'Background checked' },
            { icon: Clock, title: 'Flexible Timing', desc: 'Learn anytime' },
            { icon: GraduationCap, title: 'All Subjects', desc: 'Math to Programming' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
                <Icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 text-white py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
        <Link to="/find-teachers" className="bg-white text-purple-600 px-6 py-2 rounded-lg inline-block">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Tuition;