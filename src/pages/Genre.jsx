import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { LoadingSpinner, ErrorState } from '../components/LoadingSpinner';
import { getMoviesByGenre, getGenres } from '../services/api';
import './Search.css';

export default function Genre() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [data, genres] = await Promise.all([
                getMoviesByGenre(id, page),
                getGenres(),
            ]);
            setMovies(data.results);
            setTotalPages(Math.min(data.total_pages, 500));
            const genre = genres.find((g) => g.id === Number(id));
            if (genre) setGenreName(genre.name);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [id, page]);

    if (error) return <ErrorState message={error} onRetry={fetchData} />;

    return (
        <div className="search-page">
            <div className="search-page-header">
                <h1>{genreName || 'Genre'} Movies</h1>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="search-results">
                    <div className="movie-grid">
                        {movies.map((movie, i) => (
                            <MovieCard key={movie.id} movie={movie} index={i} />
                        ))}
                    </div>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}
        </div>
    );
}
