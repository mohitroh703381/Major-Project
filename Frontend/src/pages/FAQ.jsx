import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Mail, Phone, MessageCircle } from 'lucide-react';

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const faqCategories = [
    {
      category: "Orders & Shipping",
      icon: "📦",
      questions: [
        {
          q: "How do I place an order?",
          a: "Simply browse our collection, add books to your cart, and proceed to checkout. You'll need to create an account or login to complete your purchase."
        },
        {
          q: "What are the shipping charges?",
          a: "Shipping is free on orders above ₹500. For orders below ₹500, a flat ₹40 shipping fee applies. We ship across India."
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3-5 business days. Metro cities usually get delivery in 2-3 days. Remote areas may take 5-7 days."
        },
        {
          q: "Can I track my order?",
          a: "Yes! Once your order is shipped, you'll receive a tracking link via email and SMS to track your package in real-time."
        }
      ]
    },
    {
      category: "Payments",
      icon: "💳",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major payment methods: Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD)."
        },
        {
          q: "Is COD available?",
          a: "Yes, Cash on Delivery is available for orders up to ₹2000. A small convenience fee of ₹30 may apply."
        },
        {
          q: "Is it safe to pay online?",
          a: "Absolutely! We use industry-standard encryption and secure payment gateways. Your payment information is never stored with us."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      icon: "🔄",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer 7-day easy returns. If you're not satisfied with your purchase, you can request a return within 7 days of delivery."
        },
        {
          q: "How do I return a book?",
          a: "Go to 'My Orders' section, select the item you want to return, and click 'Return'. We'll arrange a pickup and process your refund."
        },
        {
          q: "When will I get my refund?",
          a: "Refunds are processed within 3-5 business days after we receive the returned item. The amount will be credited to your original payment method."
        }
      ]
    },
    {
      category: "Books & Content",
      icon: "📚",
      questions: [
        {
          q: "Do you sell second-hand books?",
          a: "Currently, we only sell new, brand-new books directly from publishers and authorized distributors."
        },
        {
          q: "Can I read a sample before buying?",
          a: "Yes! Many books have 'Look Inside' feature where you can read the first few pages before purchasing."
        },
        {
          q: "Do you have eBooks?",
          a: "We primarily deal in physical books. However, we're working on adding eBooks and audiobooks soon!"
        }
      ]
    },
    {
      category: "Account & Support",
      icon: "👤",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Login' button and select 'Sign Up'. Fill in your details and you're ready to start shopping!"
        },
        {
          q: "I forgot my password. What should I do?",
          a: "Click on 'Login', then 'Forgot Password'. Enter your email, and we'll send you a link to reset your password."
        },
        {
          q: "How can I contact customer support?",
          a: "You can reach us via email at support@bookstore.com, call us at +91 12345 67890, or use the live chat feature."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers to common questions about ordering, shipping, returns, and more
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-y dark:divide-gray-700">
                {category.questions.map((item, qIndex) => {
                  const isOpen = openItems[`${catIndex}-${qIndex}`];
                  return (
                    <div key={qIndex} className="p-4">
                      <button
                        onClick={() => toggleItem(catIndex, qIndex)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="font-medium text-gray-800 dark:text-white pr-8">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                No FAQs found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="mb-6 opacity-90">
            Can't find the answer you're looking for? Please reach out to our friendly support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@bookstore.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <Phone className="h-5 w-5" />
              Call Us
            </a>
            <button
              onClick={() => toast.success('Live chat coming soon!')}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <MessageCircle className="h-5 w-5" />
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;