import './Components.css';

export function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
}

export function SkeletonCard({ count = 8 }) {
    return (
        <div className="movie-grid">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-poster shimmer" />
                    <div className="skeleton-info">
                        <div className="skeleton-title shimmer" />
                        <div className="skeleton-year shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function EmptyState({ icon, title, subtitle }) {
    return (
        <div className="empty-state">
            {icon && <div className="empty-icon">{icon}</div>}
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}

export function ErrorState({ message, onRetry }) {
    return (
        <div className="error-state">
            <h3>Oops! Something went wrong</h3>
            <p>{message || 'Failed to load data. Please try again.'}</p>
            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}
