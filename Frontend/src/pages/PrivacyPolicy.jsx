import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Mail, Phone, MapPin } from 'lucide-react';

function PrivacyPolicy() {
  const lastUpdated = "February 15, 2026";

  const sections = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Information We Collect",
      content: "We collect information to provide better services to you. This includes:",
      points: [
        "Personal information (name, email, phone number, shipping address)",
        "Payment information (processed securely through payment gateways)",
        "Order history and preferences",
        "Device and browser information",
        "Cookies and usage data"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: "Your information helps us to:",
      points: [
        "Process and deliver your orders",
        "Communicate about your orders and account",
        "Improve our website and services",
        "Send personalized recommendations (with your consent)",
        "Prevent fraud and enhance security"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security",
      content: "We take your security seriously:",
      points: [
        "256-bit SSL encryption for all transactions",
        "Secure payment processing through trusted gateways",
        "Regular security audits and updates",
        "Strict access controls for employee data access",
        "Never store complete payment information"
      ]
    },
    {
      icon: <Cookie className="h-6 w-6" />,
      title: "Cookies & Tracking",
      content: "We use cookies to:",
      points: [
        "Keep you logged in",
        "Remember your cart items",
        "Understand how you use our site",
        "Show relevant recommendations",
        "You can disable cookies in browser settings"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Information Sharing",
      content: "We do not sell your personal information. We may share with:",
      points: [
        "Delivery partners (for shipping orders)",
        "Payment processors (for transactions)",
        "Legal authorities (when required by law)",
        "Service providers (website analytics, customer support)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            At BookStore, we take your privacy seriously. This policy describes how we collect, 
            use, and protect your personal information when you use our website or services. 
            By using BookStore, you agree to the practices described in this policy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{section.content}</p>
              <ul className="list-disc list-inside space-y-2">
                {section.points.map((point, i) => (
                  <li key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-600 dark:text-gray-300 text-sm">
              Access your personal information
            </li>
            <li className="text-gray-600 dark:text-gray-300 text-sm">
              Correct inaccurate information
            </li>
            <li className="text-gray-600 dark:text-gray-300 text-sm">
              Request deletion of your data
            </li>
            <li className="text-gray-600 dark:text-gray-300 text-sm">
              Opt-out of marketing communications
            </li>
            <li className="text-gray-600 dark:text-gray-300 text-sm">
              Export your data
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="opacity-90 mb-4">
            If you have questions about this privacy policy or your data, please contact us:
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              privacy@bookstore.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              +91 12345 67890
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              123, Book Street, Mumbai - 400001
            </p>
          </div>
        </div>

        {/* Update Notice */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;