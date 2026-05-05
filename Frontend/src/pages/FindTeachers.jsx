import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Clock, 
  Video, 
  Home as HomeIcon,
  Star,
  ChevronRight,
  Shield,
  BookOpen,
  TrendingUp,
  Calendar,
  MapPin,
  Sparkles,
  Heart
} from 'lucide-react';

function FindTeachers() {
  const features = [
    { icon: GraduationCap, title: 'Expert Teachers', desc: 'Qualified and experienced tutors' },
    { icon: Video, title: 'Online & Offline', desc: 'Learn from anywhere, anytime' },
    { icon: Clock, title: 'Flexible Timing', desc: 'Schedule as per your convenience' },
    { icon: Award, title: 'Verified Tutors', desc: 'Background verified teachers' },
    { icon: Users, title: '1-on-1 Sessions', desc: 'Personalized attention' },
    { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your improvement' }
  ];

  const topTeachers = [
    {
      id: 1,
      name: 'Dr. Rahul Sharma',
      subject: 'Mathematics',
      qualification: 'Ph.D. in Mathematics',
      experience: 12,
      rating: 4.9,
      reviews: 342,
      hourlyRate: 800,
      location: 'Mumbai',
      mode: 'Both',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      id: 2,
      name: 'Prof. Priya Mehta',
      subject: 'Physics',
      qualification: 'M.Sc. Physics, B.Ed',
      experience: 8,
      rating: 4.8,
      reviews: 278,
      hourlyRate: 700,
      location: 'Delhi',
      mode: 'Online',
      image: 'https://images.unsplash.com/photo-1494790108777-766d1e5f1b3a?w=150'
    },
    {
      id: 3,
      name: 'Mr. Amit Kumar',
      subject: 'Computer Science',
      qualification: 'M.Tech (IIT Delhi)',
      experience: 10,
      rating: 4.9,
      reviews: 456,
      hourlyRate: 900,
      location: 'Bangalore',
      mode: 'Both',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 4,
      name: 'Ms. Neha Gupta',
      subject: 'English',
      qualification: 'MA English, B.Ed',
      experience: 6,
      rating: 4.7,
      reviews: 189,
      hourlyRate: 600,
      location: 'Pune',
      mode: 'Offline',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'
    }
  ];

  const subjects = [
    { name: 'Mathematics', icon: '📐', color: 'bg-blue-500', count: 245 },
    { name: 'Physics', icon: '⚡', color: 'bg-green-500', count: 189 },
    { name: 'Chemistry', icon: '🧪', color: 'bg-yellow-500', count: 167 },
    { name: 'Biology', icon: '🔬', color: 'bg-red-500', count: 156 },
    { name: 'Computer Science', icon: '💻', color: 'bg-purple-500', count: 234 },
    { name: 'English', icon: '📖', color: 'bg-pink-500', count: 198 },
    { name: 'Hindi', icon: '📚', color: 'bg-orange-500', count: 145 },
    { name: 'History', icon: '🏛️', color: 'bg-indigo-500', count: 123 }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Riya Verma',
      role: 'Class 10 Student',
      content: 'Found an amazing Math teacher through this platform. My grades improved from 70% to 92%!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    {
      id: 2,
      name: 'Suresh Patel',
      role: 'Parent',
      content: 'My son struggled with Physics. The tutor here is excellent and very patient. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: 3,
      name: 'Anjali Singh',
      role: 'College Student',
      content: 'Best platform for finding tutors. Affordable rates and quality education. Love the flexibility!',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm">India's Best Tuition Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="text-yellow-300"> Teacher</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Connect with experienced tutors for personalized learning. 
              Online or offline - learn from the best!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teachers"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Find a Teacher
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                to="/register-teacher"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                Become a Teacher
                <GraduationCap className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-sm opacity-80">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm opacity-80">Expert Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-sm opacity-80">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make quality education accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition">
                  <div className="inline-flex p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Browse by Subject
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find teachers for any subject you want to learn
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                to={`/teachers?subject=${subject.name}`}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                <div className={`inline-flex p-3 ${subject.color} rounded-full mb-3`}>
                  <span className="text-2xl">{subject.icon}</span>
                </div>
                <h3 className="font-semibold">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.count}+ Tutors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Teachers Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Top Rated Teachers
              </h2>
              <p className="text-gray-500">Our most loved educators</p>
            </div>
            <Link to="/teachers" className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{teacher.name}</h3>
                      <p className="text-purple-600 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      {teacher.qualification}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      {teacher.experience} years experience
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      {teacher.location} • {teacher.mode}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{teacher.rating}</span>
                      <span className="text-gray-500 text-sm">({teacher.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-purple-600">₹{teacher.hourlyRate}</span>
                      <span className="text-gray-500 text-sm">/hr</span>
                    </div>
                  </div>
                  <Link
                    to={`/teacher/${teacher.id}`}
                    className="block text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-500">Three simple steps to start learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find a Teacher</h3>
              <p className="text-gray-500">Search by subject, location, or budget</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book a Session</h3>
              <p className="text-gray-500">Schedule at your convenient time</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-500">Connect and begin your learning journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Students Say</h2>
            <p className="text-gray-500">Trusted by thousands of learners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of students who found their perfect teacher</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/teachers"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Find a Teacher
            </Link>
            <Link
              to="/register-teacher"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Become a Teacher
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FindTeachers;