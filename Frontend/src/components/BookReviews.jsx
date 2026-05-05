import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Send, Calendar, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function BookReviews({ bookId, bookTitle }) {
  const [authUser] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [bookId]);

  const loadReviews = () => {
    try {
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${bookId}`)) || [];
      setReviews(savedReviews);
    } catch (error) {
      console.log("Error loading reviews:", error);
      setReviews([]);
    }
  };

  const saveReviews = (updatedReviews) => {
    try {
      localStorage.setItem(`reviews_${bookId}`, JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
      window.dispatchEvent(new Event('reviewsUpdated'));
    } catch (error) {
      console.log("Error saving reviews:", error);
      toast.error("Failed to save review");
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!authUser) {
      toast.error('Please login to write a review');
      document.getElementById('login_modal')?.showModal();
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error('Please write your review');
      return;
    }

    setLoading(true);

    const review = {
      id: Date.now(),
      bookId: bookId,
      userId: authUser.id || authUser.email,
      userName: authUser.name || authUser.email?.split('@')[0] || 'Anonymous',
      userEmail: authUser.email,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };

    const updatedReviews = [review, ...reviews];
    saveReviews(updatedReviews);
    
    setNewReview({ rating: 5, comment: '' });
    setLoading(false);
    toast.success('Review posted successfully!');
  };

  const handleEditReview = (review) => {
    setEditingId(review.id);
    setNewReview({ rating: review.rating, comment: review.comment });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    
    if (!newReview.comment.trim()) {
      toast.error('Please write your review');
      return;
    }

    setLoading(true);

    const updatedReviews = reviews.map(review =>
      review.id === editingId
        ? { 
            ...review, 
            rating: newReview.rating, 
            comment: newReview.comment.trim(),
            editedAt: new Date().toISOString()
          }
        : review
    );

    saveReviews(updatedReviews);
    setEditingId(null);
    setNewReview({ rating: 5, comment: '' });
    setLoading(false);
    toast.success('Review updated!');
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== id);
      saveReviews(updatedReviews);
      toast.success('Review deleted');
    }
  };

  const handleLikeReview = (id) => {
    if (!authUser) {
      toast.error('Login to like reviews');
      return;
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === id) {
        const liked = review.likedBy?.includes(authUser.id || authUser.email);
        return {
          ...review,
          likes: liked ? review.likes - 1 : review.likes + 1,
          likedBy: liked
            ? review.likedBy.filter(uid => uid !== (authUser.id || authUser.email))
            : [...(review.likedBy || []), authUser.id || authUser.email]
        };
      }
      return review;
    });

    saveReviews(updatedReviews);
  };

  // Calculate average rating
  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Customer Reviews
        </h2>
        
        {/* Rating Summary */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {averageRating}
            </div>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {editingId ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        
        {authUser ? (
          <form onSubmit={editingId ? handleUpdateReview : handleSubmitReview}>
            {/* Rating Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= newReview.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="What did you think about this book?"
                required
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{editingId ? 'Updating...' : 'Posting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{editingId ? 'Update Review' : 'Post Review'}</span>
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewReview({ rating: 5, comment: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please login to write a review
            </p>
            <button
              onClick={() => document.getElementById('login_modal').showModal()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login to Review
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {/* Review Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {authUser?.id === review.userId || authUser?.email === review.userEmail ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-gray-500 hover:text-blue-600 transition"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-gray-500 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {review.comment}
              </p>

              {/* Like Button */}
              <button
                onClick={() => handleLikeReview(review.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
              >
                <ThumbsUp className={`h-4 w-4 ${review.likedBy?.includes(authUser?.id || authUser?.email) ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span className="text-sm">{review.likes || 0} helpful</span>
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to review this book!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookReviews;