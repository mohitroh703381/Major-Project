import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast.error('Please enter a valid email');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 12345 67890', '+91 98765 43210'],
      action: 'tel:+911234567890',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@bookstore.com', 'careers@bookstore.com'],
      action: 'mailto:support@bookstore.com',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123, Book Street', 'Mumbai - 400001, India'],
      action: 'https://maps.google.com/?q=Mumbai+India',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 ${item.bgColor} rounded-lg mb-4`}>
                  <Icon className={`h-6 w-6 ${item.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                    {detail}
                  </p>
                ))}
                {item.action && (
                  <a
                    href={item.action}
                    className="inline-block mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  >
                    Contact us →
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Map and Form Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Mohit Kumar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="mohit07@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us more about your query..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map and Social */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Visit Us
              </h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109965!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635958432000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                <MapPin className="inline h-4 w-4 mr-1" />
                123, Book Store Centre, Moradabad - 244001
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Connect With Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Follow us on social media for updates, book recommendations, and more!
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 ${social.color} hover:scale-110 transition-all`}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-2">Frequently Asked Questions</h3>
              <p className="mb-4 opacity-90">
                Find quick answers to common questions about ordering, shipping, returns, and more.
              </p>
              <a
                href="/faq"
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;