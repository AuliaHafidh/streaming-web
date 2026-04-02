import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to English ('en-US') or read from localStorage
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('appLanguage');
        return savedLanguage ? savedLanguage : 'en-US';
    });

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en-US' ? 'id-ID' : 'en-US'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
