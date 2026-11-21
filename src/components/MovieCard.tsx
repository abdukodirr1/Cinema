import React from 'react';
import { Movie } from '../types/movie';
import { MovieImage } from './MovieImage';
import { useFavorites } from '../context/FavoritesContext';
import { Star, Bookmark, Play } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hours}h ${m}m`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div
      onClick={() => onSelect(movie)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(movie);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie.title}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#100e1b] border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 select-none"
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        <MovieImage
          src={movie.posterUrl}
          alt={movie.title}
          title={movie.title}
          className="w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums font-mono">{movie.rating.toFixed(1)}</span>
          </div>

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorited ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
            className={`pointer-events-auto p-2 rounded-md backdrop-blur-md transition-all duration-200 border ${
              favorited
                ? 'bg-purple-600/90 text-white border-purple-400 shadow-lg shadow-purple-950/80'
                : 'bg-black/60 text-zinc-300 border-white/10 hover:text-white hover:bg-black/90'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Hover quick play gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-purple-900/60">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Age Rating tag on bottom left of poster */}
        <div className="absolute bottom-2 left-2.5 z-10">
          <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-zinc-300">
            {movie.ageRating}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#12101e] to-[#0c0b14]">
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug">
            {movie.title}
          </h3>

          {/* Clean unboxed metadata with dot separators */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 font-medium">
            <span>{movie.releaseYear}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{movie.genres[0]}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="tabular-nums font-mono text-[11px] text-zinc-400">
              {formatRuntime(movie.runtime)}
            </span>
          </div>
        </div>

        {/* Director line */}
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="truncate">Dir. {movie.director}</span>
        </div>
      </div>
    </div>
  );
};
