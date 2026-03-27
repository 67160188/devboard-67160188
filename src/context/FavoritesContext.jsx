import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  function toggleFavorite(postId) {
    setFavorites((prev) => {
      const next = prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  }

  function isFavorite(postId) {
    return favorites.includes(postId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default FavoritesContext;
