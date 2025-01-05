import React, { createContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favoriteCount, setFavoriteCount] = useState(0);

    const incrementFavorite = () => setFavoriteCount((prevCount) => prevCount + 1);
    const decrementFavorite = () => setFavoriteCount((prevCount) => prevCount - 1);

    return (
        <FavoritesContext.Provider value={{ favoriteCount, incrementFavorite, decrementFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
