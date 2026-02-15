import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { LoadingSpinner, EmptyState, ErrorState } from '../components/LoadingSpinner';
import { searchMovies } from '../services/api';
import './Search.css';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [input, setInput] = useState(query);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearch = useCallback(async () => {
        if (!query) return;
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(query, page);
            setResults(data.results);
            setTotalPages(Math.min(data.total_pages, 500));
            setTotalResults(data.total_results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [query, page]);

    useEffect(() => {
        fetchSearch();
    }, [fetchSearch]);

    useEffect(() => {
        setInput(query);
        setPage(1);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setSearchParams({ q: input.trim() });
        }
    };

    return (
        <div className="search-page">
            <div className="search-page-header">
                <h1>Search Movies</h1>
                <form className="search-form" onSubmit={handleSubmit}>
                    <FiSearch className="search-form-icon" />
                    <input
                        type="text"
                        placeholder="Type a movie name..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>

            <div className="search-results">
                {query && !loading && !error && (
                    <p className="search-results-count">
                        Found <strong>{totalResults.toLocaleString()}</strong> results for "<strong>{query}</strong>"
                    </p>
                )}

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorState message={error} onRetry={fetchSearch} />
                ) : results.length > 0 ? (
                    <>
                        <div className="movie-grid">
                            {results.map((movie, i) => (
                                <MovieCard key={movie.id} movie={movie} index={i} />
                            ))}
                        </div>
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                ) : query ? (
                    <EmptyState
                        icon={<FiSearch />}
                        title="No results found"
                        subtitle={`We couldn't find any movies matching "${query}". Try a different search term.`}
                    />
                ) : (
                    <EmptyState
                        icon={<FiSearch />}
                        title="Search for movies"
                        subtitle="Enter a movie title to start searching."
                    />
                )}
            </div>
        </div>
    );
}
