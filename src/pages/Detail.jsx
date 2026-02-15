import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiStar, FiCalendar, FiPlay } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection';
import GenreBadge from '../components/GenreBadge';
import { LoadingSpinner, ErrorState } from '../components/LoadingSpinner';
import { useWatchlist } from '../context/WatchlistContext';
import { useRating } from '../context/RatingContext';
import { useHistory } from '../context/HistoryContext';
import { getMovieDetail, getMovieTrailers, getSimilarMovies, IMAGE_SIZES } from '../services/api';
import './Detail.css';

export default function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const { getMovieRating, setMovieRating } = useRating();
    const { addToHistory } = useHistory();

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            setError(null);
            try {
                const [detail, vids, sim] = await Promise.all([
                    getMovieDetail(id),
                    getMovieTrailers(id),
                    getSimilarMovies(id),
                ]);
                setMovie(detail);
                setTrailers(vids);
                setSimilar(sim.results?.slice(0, 10) || []);
                addToHistory({
                    id: detail.id,
                    title: detail.title,
                    poster_path: detail.poster_path,
                    vote_average: detail.vote_average,
                    release_date: detail.release_date,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorState message={error} />;
    if (!movie) return null;

    const inList = isInWatchlist(movie.id);
    const userRating = getMovieRating(movie.id);
    const year = movie.release_date?.split('-')[0];
    const hours = Math.floor(movie.runtime / 60);
    const mins = movie.runtime % 60;
    const trailer = trailers[0];

    const handleWatchlist = () => {
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

    return (
        <div className="detail-page">
            {/* Backdrop */}
            <div className="detail-backdrop">
                {movie.backdrop_path && (
                    <img src={`${IMAGE_SIZES.backdrop}${movie.backdrop_path}`} alt="" />
                )}
                <div className="detail-backdrop-overlay" />
            </div>

            <motion.div
                className="detail-main"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Poster */}
                <div className="detail-poster">
                    {movie.poster_path ? (
                        <img src={`${IMAGE_SIZES.poster}${movie.poster_path}`} alt={movie.title} />
                    ) : (
                        <div className="detail-no-poster">No Image</div>
                    )}
                </div>

                {/* Info */}
                <div className="detail-info">
                    <h1 className="detail-title">{movie.title}</h1>

                    {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

                    <div className="detail-meta">
                        <span className="detail-rating-badge">
                            <FiStar /> {movie.vote_average?.toFixed(1)}
                        </span>
                        <span><FiCalendar /> {year}</span>
                        {movie.runtime > 0 && <span><FiClock /> {hours}h {mins}m</span>}
                    </div>

                    <div className="detail-genres">
                        {movie.genres?.map((g) => (
                            <GenreBadge key={g.id} genre={g} />
                        ))}
                    </div>

                    <div className="detail-actions">
                        <button
                            className={`btn ${inList ? 'btn-danger' : 'btn-primary'}`}
                            onClick={handleWatchlist}
                        >
                            {inList ? <><FaHeart /> Remove from Watchlist</> : <><FiHeart /> Add to Watchlist</>}
                        </button>
                    </div>

                    <div className="detail-user-rating">
                        <span className="detail-user-rating-label">Your Rating:</span>
                        <StarRating
                            rating={userRating}
                            onRate={(r) => setMovieRating(movie.id, r)}
                        />
                    </div>

                    <div className="detail-overview">
                        <h3>Overview</h3>
                        <p>{movie.overview || 'No overview available.'}</p>
                    </div>

                    <div className="detail-extra">
                        {movie.budget > 0 && (
                            <div className="detail-extra-item">
                                <strong>Budget</strong>
                                <span>${movie.budget.toLocaleString()}</span>
                            </div>
                        )}
                        {movie.revenue > 0 && (
                            <div className="detail-extra-item">
                                <strong>Revenue</strong>
                                <span>${movie.revenue.toLocaleString()}</span>
                            </div>
                        )}
                        {movie.production_companies?.length > 0 && (
                            <div className="detail-extra-item">
                                <strong>Production</strong>
                                <span>{movie.production_companies.map((c) => c.name).join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="detail-content">
                {/* Trailer */}
                {trailer && (
                    <section className="detail-section">
                        <h3 className="section-title"><FiPlay style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} /> Trailer</h3>
                        <div className="trailer-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </section>
                )}

                {/* Reviews */}
                <section className="detail-section">
                    <ReviewSection movieId={movie.id} />
                </section>

                {/* Similar Movies */}
                {similar.length > 0 && (
                    <section className="detail-section">
                        <h3 className="section-title">Similar Movies</h3>
                        <div className="movie-grid">
                            {similar.map((m, i) => (
                                <MovieCard key={m.id} movie={m} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
