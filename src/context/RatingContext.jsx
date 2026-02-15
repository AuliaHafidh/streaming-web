import { createContext, useContext, useState, useEffect } from 'react';

const RatingContext = createContext();

export const useRating = () => useContext(RatingContext);

export function RatingProvider({ children }) {
    const [ratings, setRatings] = useState(() => {
        const saved = localStorage.getItem('ratings');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings));
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
