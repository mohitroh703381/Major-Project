import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthProvider';
import { API_URL } from '../config';
import { 
  MessageCircle, 
  X, 
  Send, 
  Trash2, 
  Loader,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';
import toast from 'react-hot-toast';

function Chatbot() {
  const [authUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "👋 Hi there! I'm BookBuddy, your AI assistant. I can help you find books, check order status, or answer any questions about BookStore. What can I help you with today? 📚",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input,
          userId: authUser?._id || null,
          conversationId: conversationId || null
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        
        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }
      } else {
        toast.error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "👋 Hi there! I'm BookBuddy, your AI assistant. I can help you find books, check order status, or answer any questions about BookStore. What can I help you with today? 📚",
        timestamp: new Date()
      }
    ]);
    setConversationId(null);
    toast.success('Chat cleared');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Suggested questions
  const suggestedQuestions = [
    "Recommend a fiction book",
    "Tell me about your return policy",
    "Show me programming books",
    "How to place an order?"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 group"
        >
          <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-14' : 'w-80 sm:w-96 h-[500px]'
      } flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">BookBuddy AI</span>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">GPT-4</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-sm'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                    <div className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-sm">
                    <Loader className="h-5 w-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (when no messages) */}
            {messages.length === 1 && !loading && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-2">Suggested:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full border hover:border-blue-500 hover:text-blue-600 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about books..."
                  rows={1}
                  className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                  style={{ minHeight: '40px', maxHeight: '80px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
                <button
                  onClick={clearChat}
                  className="text-gray-500 hover:text-red-500 p-2 rounded-xl transition"
                  title="Clear chat"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Powered by BookStore • AI responses may vary
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chatbot;