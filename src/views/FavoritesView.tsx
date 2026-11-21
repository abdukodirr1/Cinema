import React, { useState, useMemo } from 'react';
import { Movie, ViewTab } from '../types/movie';
import { useFavorites } from '../context/FavoritesContext';
import { MovieCard } from '../components/MovieCard';
import { Bookmark, Trash2, Compass, ArrowUpDown, Filter } from 'lucide-react';

interface FavoritesViewProps {
  onSelectMovie: (movie: Movie) => void;
  onSelectTab: (tab: ViewTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectMovie,
  onSelectTab,
}) => {
  const { favorites, clearAllFavorites } = useFavorites();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'year' | 'title'>('date');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Extract available genres in favorites
  const favoriteGenres = useMemo(() => {
    const set = new Set<string>();
    favorites.forEach((m) => m.genres.forEach((g) => set.add(g)));
    return ['All', ...Array.from(set)];
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    let list = [...favorites];
    if (selectedGenre !== 'All') {
      list = list.filter((m) => m.genres.includes(selectedGenre));
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      list.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [favorites, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
            Your Private Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
            Favorites & Watchlist
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Saved movies stored securely in your browser's local memory.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">
              <strong className="text-white font-mono">{favorites.length}</strong> saved
            </span>
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length > 0 ? (
        <>
          {/* Controls bar */}
          <div className="bg-[#121020] rounded-xl border border-white/10 p-3 mb-6 flex flex-wrap items-center justify-between gap-3">
            {/* Genre filter chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs text-zinc-500 font-medium px-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Genre:
              </span>
              {favoriteGenres.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedGenre === g
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#18152b] border border-white/10 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="date" className="bg-[#121020]">Recently Added</option>
                <option value="rating" className="bg-[#121020]">Highest Rating</option>
                <option value="year" className="bg-[#121020]">Release Year</option>
                <option value="title" className="bg-[#121020]">Title (A-Z)</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Cards Grid */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {filteredFavorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#121020] p-8 text-center text-zinc-400 text-sm">
              No favorites found in "{selectedGenre}" genre.
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-white/10 bg-[#121020] p-12 text-center max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center mx-auto mb-4 text-purple-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-display">Your Library is Empty</h3>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            Click the bookmark icon on any movie card or detail view to save movies you want to watch later.
          </p>
          <button
            onClick={() => {
              onSelectTab('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-950/50 transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Great Movies</span>
          </button>
        </div>
      )}

      {/* Confirmation Modal for Clear All */}
      {confirmClearOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setConfirmClearOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#141220] rounded-2xl border border-white/10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-2">Clear all favorites?</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              This action will remove all {favorites.length} movies from your stored favorites. You won't be able to undo this.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllFavorites();
                  setConfirmClearOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors"
              >
                Yes, Clear Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
