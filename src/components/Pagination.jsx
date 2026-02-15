import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Components.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const maxVisible = 5;
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <FiChevronLeft />
            </button>

            {start > 1 && (
                <>
                    <button className="pagination-btn" onClick={() => onPageChange(1)}>1</button>
                    {start > 2 && <span className="pagination-dots">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="pagination-dots">...</span>}
                    <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <FiChevronRight />
            </button>
        </div>
    );
}
