import './Skeleton.css';

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-poster"></div>
            <div className="skeleton skeleton-text title"></div>
            <div className="skeleton skeleton-text subtitle"></div>
        </div>
    );
};

export default SkeletonCard;
