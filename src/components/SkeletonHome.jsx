import SkeletonCard from './SkeletonCard';
import './Skeleton.css';

const SkeletonHome = () => {
    return (
        <div className="home-page">
            {/* Hero Skeleton */}
            <div className="skeleton skeleton-hero">
                <div className="skeleton-hero-content">
                    <div className="skeleton skeleton-text title" style={{ height: '3rem', width: '60%', marginBottom: '1rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '20%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '80%', height: '4rem', marginTop: '1rem' }}></div>
                </div>
            </div>

            <div className="home-content">
                {/* Trending Skeleton */}
                <section>
                    <div className="skeleton skeleton-text title" style={{ width: '200px', marginBottom: '1.5rem' }}></div>
                    <div className="skeleton-row">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </section>

                {/* Popular Skeleton */}
                <section style={{ marginTop: '3rem' }}>
                    <div className="skeleton skeleton-text title" style={{ width: '200px', marginBottom: '1.5rem' }}></div>
                    <div className="movie-grid">
                        {[...Array(10)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SkeletonHome;
