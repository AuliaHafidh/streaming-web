import { useState, useEffect, useCallback } from 'react';
import { getTrending, getPopular, getGenres } from '../services/api';

export const useHomeData = () => {
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [genres, setGenres] = useState([]);
    const [featured, setFeatured] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // Initial load
    const [loadingMore, setLoadingMore] = useState(false); // Infinite scroll load
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [trendData, popData, genreData] = await Promise.all([
                getTrending(),
                getPopular(1),
                getGenres(),
            ]);
            setTrending(trendData.results.slice(0, 10));
            setPopular(popData.results);
            setGenres(genreData);
            if (trendData.results.length > 0) {
                setFeatured(trendData.results[0]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMorePopular = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const popData = await getPopular(page);
            setPopular(prev => [...prev, ...popData.results]);
            if (page >= popData.total_pages) setHasMore(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingMore(false);
        }
    }, [page, hasMore]); // Remove loadingMore dependency to avoid closure stale issues, but handle guard inside

    // Initial Load
    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    // Infinite Scroll Load
    useEffect(() => {
        if (page > 1) {
            fetchMorePopular();
        }
    }, [page, fetchMorePopular]);

    return {
        trending,
        popular,
        genres,
        featured,
        loading,
        loadingMore,
        error,
        hasMore,
        setPage,
    };
};
