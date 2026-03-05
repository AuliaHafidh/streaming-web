import { useState, useEffect } from 'react';
import { FiSend, FiTrash2, FiUser, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import StarRating from './StarRating';
import './Components.css';

export default function ReviewSection({ movieId }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('movie_id', String(movieId))
                .order('created_at', { ascending: false });

            if (!error && data) {
                const formatted = data.map(r => ({
                    id: r.id,
                    text: r.text,
                    rating: r.rating,
                    date: new Date(r.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }),
                    author: r.author_email,
                    userId: r.user_id
                }));
                setReviews(formatted);
            }
            setLoading(false);
        };

        if (movieId) {
            fetchReviews();
        }
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || !user) return;

        const newReview = {
            movie_id: String(movieId),
            user_id: user.id,
            author_email: user.email || 'Anonymous',
            rating: reviewRating,
            text: text.trim(),
        };

        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([newReview])
                .select();

            if (error) {
                console.error("Supabase insert error:", error);
                alert("Failed to post review: " + error.message);
                return;
            }

            if (data && data.length > 0) {
                const inserted = data[0];
                const formattedNew = {
                    id: inserted.id,
                    text: inserted.text,
                    rating: inserted.rating,
                    date: new Date(inserted.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }),
                    author: inserted.author_email,
                    userId: inserted.user_id
                };
                setReviews([formattedNew, ...reviews]);
                setText('');
                setReviewRating(0);
            }
        } catch (err) {
            console.error("Unexpected error submitting review:", err);
            alert("An unexpected error occurred while posting your review.");
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

        if (!error) {
            setReviews(reviews.filter((r) => r.id !== id));
        }
    };

    return (
        <div className="review-section">
            <h3 className="review-title">Reviews</h3>

            {user ? (
                <form className="review-form" onSubmit={handleSubmit}>
                    <div className="review-user-info">
                        <span className="review-as">Reviewing as:</span>
                        <span className="review-email">
                            <FiUser style={{ marginRight: '5px' }} />
                            {user.email}
                        </span>
                    </div>
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
            ) : (
                <div className="review-login-prompt" style={{
                    padding: '2rem',
                    background: 'var(--card-bg)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid var(--border-color)',
                    marginBottom: '2rem'
                }}>
                    <FiAlertCircle style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <p style={{ marginBottom: '1rem' }}>Please login to leave a review.</p>
                    <Link to="/login" className="btn btn-primary">Login Now</Link>
                </div>
            )}

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
                                    {/* Only allow deleting own reviews */}
                                    {user && user.id === review.userId && (
                                        <button className="review-delete" onClick={() => handleDelete(review.id)}>
                                            <FiTrash2 />
                                        </button>
                                    )}
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
