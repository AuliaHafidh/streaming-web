import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export function WatchlistProvider({ children }) {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const isFirstRender = useRef(true);

    // key helper
    const getKey = (uid) => uid ? `watchlist_${uid}` : 'watchlist_guest';

    // Load watchlist when user changes
    useEffect(() => {
        const key = getKey(user?.id);
        const saved = localStorage.getItem(key);
        setWatchlist(saved ? JSON.parse(saved) : []);
    }, [user?.id]);

    // Save watchlist when it changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const key = getKey(user?.id);
        localStorage.setItem(key, JSON.stringify(watchlist));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchlist]); // Intentionally omit 'user' to avoid saving old list to new user key

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.find((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some((m) => m.id === movieId);
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}
