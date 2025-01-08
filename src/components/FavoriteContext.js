import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const [favoriteCount, setFavoriteCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Fetch the initial favorite count from the backend
        const fetchFavoriteCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/favorites/count/${userId}`);
                setFavoriteCount(response.data.count || 0);
            } catch (error) {
                console.error("Failed to fetch favorite count:", error);
            }
        };
        fetchFavoriteCount();
    }, [userId]);

    const incrementFavorite = () => setFavoriteCount((prev) => prev + 1);
    const decrementFavorite = () => setFavoriteCount((prev) => Math.max(prev - 1, 0));

    return (
        <FavoriteContext.Provider value={{ favoriteCount, incrementFavorite, decrementFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
