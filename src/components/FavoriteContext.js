import React, { createContext, useState, useContext, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favoriteCount, setFavoriteCount] = useState(0);

    const incrementFavorite = () => setFavoriteCount((prev) => prev + 1);
    const decrementFavorite = () => setFavoriteCount((prev) => Math.max(prev - 1, 0));

    useEffect(() => {
        const savedCount = parseInt(localStorage.getItem("favoriteCount"), 10);
        if (!isNaN(savedCount)) setFavoriteCount(savedCount);
    }, []);

    useEffect(() => {
        localStorage.setItem("favoriteCount", favoriteCount);
    }, [favoriteCount]);


    return (
        <FavoriteContext.Provider value={{ favoriteCount, incrementFavorite, decrementFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => useContext(FavoriteContext);
