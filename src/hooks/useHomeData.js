import { useState, useEffect } from 'react';
import { getTrending, getPopular, getGenres } from '../services/api';

export const useHomeData = () => {
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [genres, setGenres] = useState([]);
    const [featured, setFeatured] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [trendData, popData, genreData] = await Promise.all([
                getTrending(),
                getPopular(page),
                getGenres(),
            ]);
            setTrending(trendData.results.slice(0, 10));
            setPopular(popData.results);
            setTotalPages(Math.min(popData.total_pages, 500));
            setGenres(genreData);
            if (!featured && trendData.results.length > 0) {
                setFeatured(trendData.results[0]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return {
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
    };
};
