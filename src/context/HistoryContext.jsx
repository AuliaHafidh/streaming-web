import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export function HistoryProvider({ children }) {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const isFirstRender = useRef(true);

    const getKey = (uid) => uid ? `watchHistory_${uid}` : 'watchHistory_guest';

    // Load history when user changes
    useEffect(() => {
        const key = getKey(user?.id);
        const saved = localStorage.getItem(key);
        setHistory(saved ? JSON.parse(saved) : []);
    }, [user?.id]);

    // Save history when it changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const key = getKey(user?.id);
        localStorage.setItem(key, JSON.stringify(history));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
