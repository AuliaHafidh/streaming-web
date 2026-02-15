// React imports removed as they are not used explicitly

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiStar, FiTrendingUp } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import GenreBadge from '../components/GenreBadge';
import { LoadingSpinner, ErrorState } from '../components/LoadingSpinner';
import { IMAGE_SIZES } from '../services/api';
import { useHomeData } from '../hooks/useHomeData';
import './Home.css';

export default function Home() {
    const {
        trending,
        popular,
        genres,
        featured,
        page,
        setPage,
        totalPages,
        loading,
        error,
        fetchData
    } = useHomeData();

    if (error) return <ErrorState message={error} onRetry={fetchData} />;

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
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="trending-scroll">
                            {trending.map((movie, i) => (
                                <div className="trending-item" key={movie.id}>
                                    <MovieCard movie={movie} index={i} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Popular */}
                <section>
                    <div className="section-header">
                        <h2 className="section-title">Popular Movies</h2>
                    </div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="movie-grid">
                                {popular.map((movie, i) => (
                                    <MovieCard key={movie.id} movie={movie} index={i} />
                                ))}
                            </div>
                            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
