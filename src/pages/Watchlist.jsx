import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useWatchlist } from '../context/WatchlistContext';
import { EmptyState } from '../components/LoadingSpinner';
import { IMAGE_SIZES } from '../services/api';
import './Watchlist.css';

export default function Watchlist() {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <div className="watchlist-page">
            <div className="watchlist-header">
                <h1>My Watchlist</h1>
                {watchlist.length > 0 && (
                    <span className="watchlist-count">{watchlist.length} movies</span>
                )}
            </div>

            {watchlist.length === 0 ? (
                <EmptyState
                    icon={<FiHeart />}
                    title="Your watchlist is empty"
                    subtitle="Start adding movies to your watchlist by clicking the heart icon on any movie card."
                />
            ) : (
                <div className="watchlist-grid">
                    <AnimatePresence>
                        {watchlist.map((movie) => (
                            <motion.div
                                key={movie.id}
                                className="watchlist-item"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link to={`/movie/${movie.id}`} className="watchlist-item-link">
                                    <div className="watchlist-poster">
                                        {movie.poster_path ? (
                                            <img
                                                src={`${IMAGE_SIZES.posterSmall}${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                        ) : (
                                            <div className="watchlist-no-poster">No Image</div>
                                        )}
                                    </div>
                                    <div className="watchlist-info">
                                        <h3>{movie.title}</h3>
                                        <div className="watchlist-meta">
                                            <span className="watchlist-rating">
                                                <FiStar /> {movie.vote_average?.toFixed(1)}
                                            </span>
                                            <span>{movie.release_date?.split('-')[0]}</span>
                                        </div>
                                        <p className="watchlist-overview">
                                            {movie.overview?.slice(0, 120)}...
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    className="watchlist-remove"
                                    onClick={() => removeFromWatchlist(movie.id)}
                                    aria-label="Remove from watchlist"
                                >
                                    <FiTrash2 />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
