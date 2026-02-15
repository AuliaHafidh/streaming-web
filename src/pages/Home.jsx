import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiStar, FiTrendingUp } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import GenreBadge from '../components/GenreBadge';
import { ErrorState } from '../components/LoadingSpinner';
import SkeletonHome from '../components/SkeletonHome';
import SkeletonCard from '../components/SkeletonCard';
import { IMAGE_SIZES } from '../services/api';
import { useHomeData } from '../hooks/useHomeData';
import './Home.css';

export default function Home() {
    const {
        trending,
        popular,
        genres,
        featured,
        setPage,
        loading,
        loadingMore,
        error,
        hasMore,
    } = useHomeData();

    // Infinite Scroll Observer
    const observer = useRef();
    const lastMovieRef = useCallback(
        (node) => {
            if (loadingMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loadingMore, hasMore, setPage]
    );

    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

    // Initial Skeleton Load
    if (loading) return <SkeletonHome />;

    return (
        <div className="home-page">
            {/* Hero Section */}
            {featured && (
                <motion.section
                    className="hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div
                        className="hero-backdrop"
                        style={{
                            backgroundImage: `url(${IMAGE_SIZES.backdrop}${featured.backdrop_path})`,
                        }}
                    />
                    <div className="hero-gradient" />
                    <div className="hero-content">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {featured.title}
                        </motion.h1>
                        <motion.div
                            className="hero-meta"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="hero-rating">
                                <FiStar /> {featured.vote_average?.toFixed(1)}
                            </span>
                            <span>{featured.release_date?.split('-')[0]}</span>
                        </motion.div>
                        <motion.p
                            className="hero-overview"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {featured.overview?.slice(0, 200)}...
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link to={`/movie/${featured.id}`} className="btn btn-primary hero-btn">
                                <FiPlay /> View Details
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            <div className="home-content">
                {/* Genre Chips */}
                {genres.length > 0 && (
                    <section className="genre-section">
                        <h2 className="section-title">Browse by Genre</h2>
                        <div className="genre-chips">
                            {genres.map((g) => (
                                <GenreBadge key={g.id} genre={g} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending */}
                <section>
                    <div className="section-header">
                        <h2 className="section-title">
                            <FiTrendingUp style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                            Trending This Week
                        </h2>
                    </div>
                    <div className="trending-scroll">
                        {trending.map((movie, i) => (
                            <div className="trending-item" key={movie.id}>
                                <MovieCard movie={movie} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular - Infinite Scroll */}
                <section>
                    <div className="section-header">
                        <h2 className="section-title">Popular Movies</h2>
                    </div>

                    <div className="movie-grid">
                        {popular.map((movie, i) => {
                            if (popular.length === i + 1) {
                                return (
                                    <div ref={lastMovieRef} key={movie.id}>
                                        <MovieCard movie={movie} index={i} />
                                    </div>
                                );
                            } else {
                                return <MovieCard key={movie.id} movie={movie} index={i} />;
                            }
                        })}

                        {/* Loading More Skeletons */}
                        {loadingMore && [...Array(5)].map((_, i) => (
                            <SkeletonCard key={`skel-${i}`} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
