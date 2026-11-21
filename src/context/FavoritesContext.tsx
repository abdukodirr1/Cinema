import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Movie, ToastMessage } from '../types/movie';

interface FavoritesContextType {
  favorites: Movie[];
  isFavorite: (movieId: string) => boolean;
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
  clearAllFavorites: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY = 'cinematch_favorites_v2';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage access fallback
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore quota errors
    }
  }, [favorites]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  const isFavorite = useCallback(
    (movieId: string) => {
      return favorites.some((m) => m.id === movieId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prev) => {
        const exists = prev.some((m) => m.id === movie.id);
        if (exists) {
          addToast({
            type: 'favorite-remove',
            title: 'Removed from Favorites',
            message: `"${movie.title}" has been removed.`,
            moviePoster: movie.posterUrl,
          });
          return prev.filter((m) => m.id !== movie.id);
        } else {
          addToast({
            type: 'favorite-add',
            title: 'Added to Favorites',
            message: `"${movie.title}" is saved to your library.`,
            moviePoster: movie.posterUrl,
          });
          return [movie, ...prev];
        }
      });
    },
    [addToast]
  );

  const removeFavorite = useCallback(
    (movieId: string) => {
      setFavorites((prev) => {
        const target = prev.find((m) => m.id === movieId);
        if (target) {
          addToast({
            type: 'favorite-remove',
            title: 'Removed from Favorites',
            message: `"${target.title}" has been removed.`,
            moviePoster: target.posterUrl,
          });
        }
        return prev.filter((m) => m.id !== movieId);
      });
    },
    [addToast]
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    addToast({
      type: 'info',
      title: 'Library Cleared',
      message: 'All movies have been removed from your favorites.',
    });
  }, [addToast]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAllFavorites,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
