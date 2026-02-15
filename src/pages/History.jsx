import { Link } from 'react-router-dom';
import { FiClock, FiTrash2, FiStar, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { EmptyState } from '../components/LoadingSpinner';
import { IMAGE_SIZES } from '../services/api';
import './Watchlist.css'; /* reuse watchlist styles */

export default function History() {
    const { history, clearHistory, removeFromHistory } = useHistory();

    return (
        <div className="watchlist-page">
            <div className="watchlist-header">
                <h1>Watch History</h1>
                {history.length > 0 && (
                    <>
                        <span className="watchlist-count">{history.length} movies</span>
                        <button className="btn btn-secondary" onClick={clearHistory} style={{ marginLeft: 'auto' }}>
                            <FiTrash2 /> Clear All
                        </button>
                    </>
                )}
            </div>

            {history.length === 0 ? (
                <EmptyState
                    icon={<FiClock />}
                    title="No watch history"
                    subtitle="Movies you visit will appear here."
                />
            ) : (
                <div className="watchlist-grid">
                    <AnimatePresence>
                        {history.map((movie) => (
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
                                        {movie.viewedAt && (
                                            <p className="watchlist-overview" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                                Viewed: {new Date(movie.viewedAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                                <button
                                    className="watchlist-remove"
                                    onClick={() => removeFromHistory(movie.id)}
                                    aria-label="Remove from history"
                                >
                                    <FiX />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
