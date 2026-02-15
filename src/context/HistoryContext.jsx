import { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export function HistoryProvider({ children }) {
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('watchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchHistory', JSON.stringify(history));
    }, [history]);

    const addToHistory = (movie) => {
        setHistory((prev) => {
            const filtered = prev.filter((m) => m.id !== movie.id);
            return [{ ...movie, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 50);
        });
    };

    const clearHistory = () => setHistory([]);

    const removeFromHistory = (movieId) => {
        setHistory((prev) => prev.filter((m) => m.id !== movieId));
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory, removeFromHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}
