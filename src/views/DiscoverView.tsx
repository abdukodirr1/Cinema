import React, { useState, useMemo } from 'react';
import { Movie, FilterOptions } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { ALL_GENRES } from '../data/movies';
import { Search, X, SlidersHorizontal, Film, RotateCcw, ArrowUpDown } from 'lucide-react';

interface DiscoverViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  initialGenre?: string;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  movies,
  onSelectMovie,
  initialGenre = 'All',
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    selectedGenre: initialGenre,
    yearRange: 'all',
    minRating: 0,
    sortBy: 'popularity',
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter logic
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Search query (title, director, cast)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = movie.title.toLowerCase().includes(q);
          const matchDirector = movie.director.toLowerCase().includes(q);
          const matchCast = movie.cast.some((c) => c.name.toLowerCase().includes(q));
          if (!matchTitle && !matchDirector && !matchCast) return false;
        }

        // Genre filter
        if (filters.selectedGenre !== 'All') {
          if (!movie.genres.includes(filters.selectedGenre)) return false;
        }

        // Year range filter
        if (filters.yearRange === '2020-now' && movie.releaseYear < 2020) return false;
        if (
          filters.yearRange === '2010-2019' &&
          (movie.releaseYear < 2010 || movie.releaseYear > 2019)
        )
          return false;
        if (
          filters.yearRange === '2000-2009' &&
          (movie.releaseYear < 2000 || movie.releaseYear > 2009)
        )
          return false;
        if (filters.yearRange === 'classic' && movie.releaseYear >= 2000) return false;

        // Min rating
        if (filters.minRating > 0 && movie.rating < filters.minRating) return false;

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'rating-desc':
            return b.rating - a.rating;
          case 'year-desc':
            return b.releaseYear - a.releaseYear;
          case 'year-asc':
            return a.releaseYear - b.releaseYear;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'popularity':
          default:
            return b.voteCount - a.voteCount;
        }
      });
  }, [movies, filters]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedGenre: 'All',
      yearRange: 'all',
      minRating: 0,
      sortBy: 'popularity',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedGenre !== 'All' ||
    filters.yearRange !== 'all' ||
    filters.minRating !== 0 ||
    filters.sortBy !== 'popularity';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">
            Catalogue & Exploration
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
            Discover Movies
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Browse through our curated collection of acclaimed cinematic releases.
          </p>
        </div>

        {/* Counter and Active Filter Pill */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">
            Showing <strong className="text-white font-mono">{filteredMovies.length}</strong> of{' '}
            <span className="font-mono">{movies.length}</span> titles
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Main Controls Bar */}
      <div className="bg-[#121020] rounded-2xl border border-white/10 p-4 mb-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search by title, director, or actor..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#18152b] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
                }
                className="appearance-none bg-[#18152b] border border-white/10 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-purple-500 cursor-pointer"
                aria-label="Sort movies"
              >
                <option value="popularity" className="bg-[#121020]">Sort: Most Popular</option>
                <option value="rating-desc" className="bg-[#121020]">Sort: Highest Rating</option>
                <option value="year-desc" className="bg-[#121020]">Sort: Newest First</option>
                <option value="year-asc" className="bg-[#121020]">Sort: Oldest First</option>
                <option value="title-asc" className="bg-[#121020]">Sort: Title (A-Z)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Toggle for Year / Min Rating */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors ${
                showAdvancedFilters || filters.yearRange !== 'all' || filters.minRating > 0
                  ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                  : 'bg-[#18152b] border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Genre Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {ALL_GENRES.map((genre) => {
            const isSelected = filters.selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setFilters({ ...filters, selectedGenre: genre })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50 border border-purple-400'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Collapsible Advanced Filters (Year & Rating) */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
            {/* Year Range */}
            <div>
              <span className="text-xs font-semibold text-zinc-400 block mb-2">Release Period:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Years' },
                  { id: '2020-now', label: '2020 – Present' },
                  { id: '2010-2019', label: '2010 – 2019' },
                  { id: '2000-2009', label: '2000 – 2009' },
                  { id: 'classic', label: 'Classics (<2000)' },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setFilters({ ...filters, yearRange: range.id })}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      filters.yearRange === range.id
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                        : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <span className="text-xs font-semibold text-zinc-400 block mb-2">Minimum Rating:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 0, label: 'All Ratings' },
                  { value: 7.5, label: '★ 7.5+' },
                  { value: 8.0, label: '★ 8.0+' },
                  { value: 8.5, label: '★ 8.5+ Top Tier' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilters({ ...filters, minRating: item.value })}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      filters.minRating === item.value
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                        : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-white/10 bg-[#121020] p-12 text-center max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center mx-auto mb-4 text-purple-400">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Movies Found</h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
            We couldn't find any films matching your search query or filter combination.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-950/50 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
