import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import MealCard from '../../components/customer/MealCard';
import MessInfo from '../../components/customer/MessInfo';
import { useAuth, useNotification } from '../../hooks/shared';
import messService from '../../services/mess.service';
import ownerService from '../../services/owner.service';
import reviewService from '../../services/review.service';

const MessDetailPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('menu');
  const [mess, setMess] = useState(null);
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchMessDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch mess details, meals, and reviews
        const [messResponse, mealsResponse, reviewsResponse] = await Promise.all([
          messService.getMessById(id),
          ownerService.getMessMeals(id),
          reviewService.getReviewsByMessId(id)
        ]);
        
        setMess(messResponse.mess || messResponse.data);
        setMeals(mealsResponse.meals || mealsResponse.data || []);
        setReviews(reviewsResponse.reviews || []);
      } catch (err) {
        console.error('Error fetching mess details:', err);
        setError('Failed to load mess details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMessDetails();
    }
  }, [id]);

  const handleReviewFieldChange = (field, value) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetReviewForm = () => {
    setReviewForm({ rating: 5, comment: '' });
    setEditingReviewId(null);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id || !mess?._id) {
      showError('You must be logged in to submit a review.');
      return;
    }

    try {
      setReviewSubmitting(true);
      const payload = {
        user: user.id,
        mess: mess._id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment.trim(),
      };

      const response = editingReviewId
        ? await reviewService.updateReview(editingReviewId, {
            rating: payload.rating,
            comment: payload.comment,
          })
        : await reviewService.createReview(payload);

      const savedReview = response.review;

      setReviews((prev) => {
        if (editingReviewId) {
          return prev.map((review) =>
            review._id === editingReviewId ? savedReview : review,
          );
        }

        return [savedReview, ...prev];
      });

      showSuccess(editingReviewId ? 'Review updated.' : 'Review added.');
      resetReviewForm();
    } catch (err) {
      console.error('Error saving review:', err);
      showError(err?.message || 'Failed to save review.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleReviewEdit = (review) => {
    setEditingReviewId(review._id);
    setReviewForm({
      rating: review.rating,
      comment: review.comment || '',
    });
    setActiveTab('reviews');
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      showSuccess('Review deleted.');
      if (editingReviewId === reviewId) {
        resetReviewForm();
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      showError(err?.message || 'Failed to delete review.');
    }
  };

  const currentUserReview = reviews.find((review) => review.user?._id === user?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#8B5CF6' }}></div>
          <p style={{ color: '#6B7280' }}>Loading mess details...</p>
        </div>
      </div>
    );
  }

  if (error || !mess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center p-8">
          <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>{error || 'Mess not found'}</h3>
          <p className="mb-4" style={{ color: '#6B7280' }}>The mess you're looking for doesn't exist</p>
          <a href="/mess" className="text-blue-600 hover:underline">← Back to All Messes</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/mess" backText="← Back to All Messes" />

        {/* Header */}
        <Card className="overflow-hidden mb-6">
          <div 
            className="h-48 flex items-center justify-center text-white text-6xl font-bold"
            style={{ backgroundColor: '#8B5CF6' }}
          >
            {mess.name.substring(0, 1)}
          </div>
          
          <MessInfo mess={mess} />
        </Card>

        {/* Tabs */}
        <Card className="overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b" style={{ borderColor: '#E5E7EB' }}>
            {['menu', 'about', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 font-medium capitalize transition-colors"
                style={{
                  color: activeTab === tab ? '#8B5CF6' : '#6B7280',
                  borderBottom: activeTab === tab ? '3px solid #8B5CF6' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'menu' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#111827' }}>
                  Our Menu ({meals.length} items)
                </h2>
                {meals.length === 0 ? (
                  <p style={{ color: '#6B7280' }}>No meals available at the moment.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meals.map(meal => (
                      <MealCard key={meal._id} meal={{ ...meal, messId: mess }} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>
                  About {mess.name}
                </h2>
                <p className="mb-6" style={{ color: '#6B7280' }}>
                  {mess.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mess.ownerId && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                      <h3 className="font-bold mb-2" style={{ color: '#111827' }}>
                        Owner Information
                      </h3>
                      <p style={{ color: '#6B7280' }}>{mess.ownerId.name || 'N/A'}</p>
                      <p style={{ color: '#6B7280' }}>{mess.ownerId.phone || mess.phone}</p>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                    <h3 className="font-bold mb-2" style={{ color: '#111827' }}>
                      Contact Details
                    </h3>
                    <p style={{ color: '#6B7280' }}>Phone: {mess.phone}</p>
                    {mess.area && <p style={{ color: '#6B7280' }}>Area: {mess.area}</p>}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>
                      Reviews
                    </h2>
                    <p style={{ color: '#6B7280' }}>
                      {reviews.length === 0
                        ? 'No reviews yet. Be the first to share feedback.'
                        : `${reviews.length} review${reviews.length > 1 ? 's' : ''} for ${mess.name}`}
                    </p>
                  </div>
                  {currentUserReview && !editingReviewId && (
                    <button
                      onClick={() => handleReviewEdit(currentUserReview)}
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{ backgroundColor: '#EEF2FF', color: '#4338CA' }}
                    >
                      Edit Your Review
                    </button>
                  )}
                </div>

                {user?.role === 'CUSTOMER' && (!currentUserReview || editingReviewId) && (
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                      {editingReviewId ? 'Update Your Review' : 'Write a Review'}
                    </h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                          Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleReviewFieldChange('rating', star)}
                              className="w-10 h-10 rounded-lg font-bold transition-all"
                              style={{
                                backgroundColor: reviewForm.rating >= star ? '#F59E0B' : '#F3F4F6',
                                color: reviewForm.rating >= star ? '#FFFFFF' : '#6B7280',
                              }}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                          Comment
                        </label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(event) => handleReviewFieldChange('comment', event.target.value)}
                          rows={4}
                          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
                          style={{ borderColor: '#D1D5DB', color: '#111827' }}
                          placeholder="Share your experience with this mess"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={reviewSubmitting}
                          className="px-5 py-3 rounded-lg font-semibold disabled:opacity-50"
                          style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                        >
                          {reviewSubmitting ? 'Saving...' : editingReviewId ? 'Update Review' : 'Submit Review'}
                        </button>
                        {editingReviewId && (
                          <button
                            type="button"
                            onClick={resetReviewForm}
                            className="px-5 py-3 rounded-lg font-semibold"
                            style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </Card>
                )}

                <div className="space-y-4">
                  {reviews.map((review) => {
                    const ownsReview = review.user?._id === user?.id;

                    return (
                      <Card key={review._id} className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-bold" style={{ color: '#111827' }}>
                              {review.user?.name || 'Anonymous User'}
                            </h3>
                            <p className="text-sm" style={{ color: '#6B7280' }}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold" style={{ color: '#F59E0B' }}>
                              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </p>
                            <p className="text-sm" style={{ color: '#6B7280' }}>
                              {review.rating}/5
                            </p>
                          </div>
                        </div>

                        {review.comment && (
                          <p className="mb-3" style={{ color: '#374151' }}>
                            {review.comment}
                          </p>
                        )}

                        {ownsReview && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleReviewEdit(review)}
                              className="px-4 py-2 rounded-lg text-sm font-medium"
                              style={{ backgroundColor: '#EEF2FF', color: '#4338CA' }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleReviewDelete(review._id)}
                              className="px-4 py-2 rounded-lg text-sm font-medium"
                              style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Card>
                    );
                  })}

                  {reviews.length === 0 && (
                    <Card className="p-6">
                      <p style={{ color: '#6B7280' }}>
                        No reviews available for this mess yet.
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessDetailPage;
