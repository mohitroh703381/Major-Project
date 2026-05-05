import React from 'react';
import { BookOpen, Users, Award, Heart, Target, Globe, Mail, Phone, MapPin } from 'lucide-react';

function About() {
  const stats = [
    { icon: BookOpen, value: '1000+', label: 'Books Available' },
    { icon: Users, value: '600+', label: 'Happy Readers' },
    { icon: Award, value: '8+', label: 'Awards Won' },
    { icon: Heart, value: '96%', label: 'Satisfaction' }
  ];

  const team = [
    {
      name: 'Mr Mohit Kumar',
      role: 'Founder & CEO',
      image: 'https://github.com/mohitroh703381/Apex-Internship-Task-4/blob/main/PHOTO.jpg?raw=true',
      bio: 'Book lover with 3+ years of experience in publishing industry.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      bio: 'Former editor at Penguin Random House. Passionate about quality literature.'
    },
    {
      name: 'Amit Kumar',
      role: 'Tech Lead',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
      bio: 'Full-stack developer who built our amazing platform.'
    },
    {
      name: 'Neha Gupta',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
      bio: 'Ensuring every reader has the best experience with us.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make quality books accessible to every reader, anywhere in India.'
    },
    {
      icon: Globe,
      title: 'Our Vision',
      description: 'Create a world where everyone can discover the joy of reading.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Quality, Integrity, Customer First, Innovation, and Love for Books.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BookStore</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in the journey of reading and learning since 2026
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              BookStore started in 2026 with a simple idea: make books accessible to everyone. 
              What began as a small online bookstore has grown into one of India's most loved 
              destinations for book lovers.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We believe that books have the power to transform lives, educate, entertain, 
              and inspire. Our team works tirelessly to curate the best collection of books 
              across all genres – from timeless classics to the latest bestsellers.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Today, we serve thousands of happy readers across the country, delivering not 
              just books, but joy, knowledge, and inspiration right to their doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400" 
              alt="Bookshelf" 
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" 
              alt="Reading corner" 
              className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400" 
              alt="Library" 
              className="rounded-lg shadow-lg h-48 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400" 
              alt="Book store" 
              className="rounded-lg shadow-lg h-48 w-full object-cover mt-8"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          What Drives Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate book lovers working hard to bring you the best reading experience
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top ring-4 ring-blue-100 dark:ring-blue-900"
                  
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;