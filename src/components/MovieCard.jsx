import { Link } from 'react-router-dom';
import { FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useWatchlist } from '../context/WatchlistContext';
import { IMAGE_SIZES } from '../services/api';
import './MovieCard.css';

export default function MovieCard({ movie, index = 0 }) {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const inList = isInWatchlist(movie.id);

    const handleWatchlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inList) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                overview: movie.overview,
            });
        }
    };

    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <motion.div
            className="movie-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
                <div className="movie-card-poster">
                    {movie.poster_path ? (
                        <img
                            src={`${IMAGE_SIZES.poster}${movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy"
                        />
                    ) : (
                        <div className="no-poster">
                            <FiStar />
                            <span>No Image</span>
                        </div>
                    )}
                    <div className="movie-card-overlay">
                        <button
                            className={`watchlist-btn ${inList ? 'active' : ''}`}
                            onClick={handleWatchlist}
                            aria-label={inList ? 'Remove from watchlist' : 'Add to watchlist'}
                        >
                            {inList ? <FaHeart /> : <FiHeart />}
                        </button>
                    </div>
                    <div className="movie-card-rating">
                        <FiStar />
                        <span>{rating}</span>
                    </div>
                </div>
                <div className="movie-card-info">
                    <h3 className="movie-card-title">{movie.title}</h3>
                    <span className="movie-card-year">{year}</span>
                </div>
            </Link>
        </motion.div>
    );
}
