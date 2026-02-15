import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './Components.css';

export default function StarRating({ rating = 0, onRate, size = 'md' }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={`star-rating star-rating--${size}`}>
            {stars.map((star) => (
                <button
                    key={star}
                    className={`star-btn ${star <= rating ? 'filled' : ''}`}
                    onClick={() => onRate && onRate(star)}
                    aria-label={`Rate ${star} stars`}
                >
                    {star <= rating ? <FaStar /> : <FiStar />}
                </button>
            ))}
            {rating > 0 && <span className="star-label">{rating}/5</span>}
        </div>
    );
}
