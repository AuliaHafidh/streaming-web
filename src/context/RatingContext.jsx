import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const RatingContext = createContext();

export const useRating = () => useContext(RatingContext);

export function RatingProvider({ children }) {
    const { user } = useAuth();
    const [ratings, setRatings] = useState({});
    const isFirstRender = useRef(true);

    const getKey = (uid) => uid ? `ratings_${uid}` : 'ratings_guest';

    // Load ratings when user changes
    useEffect(() => {
        const key = getKey(user?.id);
        const saved = localStorage.getItem(key);
        setRatings(saved ? JSON.parse(saved) : {});
    }, [user?.id]);

    // Save ratings when changed
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const key = getKey(user?.id);
        localStorage.setItem(key, JSON.stringify(ratings));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ratings]);

    const setMovieRating = (movieId, rating) => {
        setRatings((prev) => ({ ...prev, [movieId]: rating }));
    };

    const getMovieRating = (movieId) => {
        return ratings[movieId] || 0;
    };

    return (
        <RatingContext.Provider value={{ ratings, setMovieRating, getMovieRating }}>
            {children}
        </RatingContext.Provider>
    );
}
