import { useState } from 'react';
import { FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import StarRating from './StarRating';
import './Components.css';

export default function ReviewSection({ movieId }) {
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem(`reviews_${movieId}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [text, setText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const saveReviews = (newReviews) => {
        setReviews(newReviews);
        localStorage.setItem(`reviews_${movieId}`, JSON.stringify(newReviews));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newReview = {
            id: Date.now(),
            text: text.trim(),
            rating: reviewRating,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            author: 'You',
        };

        saveReviews([newReview, ...reviews]);
        setText('');
        setReviewRating(0);
    };

    const handleDelete = (id) => {
        saveReviews(reviews.filter((r) => r.id !== id));
    };

    return (
        <div className="review-section">
            <h3 className="review-title">Reviews</h3>

            <form className="review-form" onSubmit={handleSubmit}>
                <StarRating rating={reviewRating} onRate={setReviewRating} size="sm" />
                <div className="review-input-group">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your review..."
                        rows={3}
                    />
                    <button type="submit" className="review-submit" disabled={!text.trim()}>
                        <FiSend /> Post
                    </button>
                </div>
            </form>

            <div className="review-list">
                {reviews.length === 0 ? (
                    <p className="review-empty">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-item">
                            <div className="review-header">
                                <div className="review-author">
                                    <FiUser />
                                    <span>{review.author}</span>
                                </div>
                                <div className="review-meta">
                                    {review.rating > 0 && (
                                        <StarRating rating={review.rating} size="xs" />
                                    )}
                                    <span className="review-date">{review.date}</span>
                                    <button className="review-delete" onClick={() => handleDelete(review.id)}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
