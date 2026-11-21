import React, { useEffect } from 'react';
import { Movie } from '../types/movie';
import { MovieImage } from './MovieImage';
import { useFavorites } from '../context/FavoritesContext';
import { Star, Bookmark, Play, Share2, X, Clock, Calendar, ShieldAlert } from 'lucide-react';

interface MovieDetailsModalProps {
  movie: Movie | null;
  allMovies: Movie[];
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  allMovies,
  onClose,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const { isFavorite, toggleFavorite, addToast } = useFavorites();

  // Handle escape key and scroll lock
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const favorited = isFavorite(movie.id);

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hours}h ${m}m (${mins} min)`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#' + movie.id);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: `Share link for "${movie.title}" copied to clipboard.`,
      });
    }
  };

  // Similar movies: same genre, excluding current
  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#100e1b] rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/80 my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Banner Area */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-950">
          <MovieImage
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            title={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100e1b] via-[#100e1b]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100e1b]/90 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body with Negative Margin to overlap poster */}
        <div className="relative px-6 sm:px-8 pb-8 pt-0 -mt-28 z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Poster Card */}
            <div className="w-36 sm:w-48 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-zinc-900 mx-auto md:mx-0">
              <MovieImage
                src={movie.posterUrl}
                alt={movie.title}
                title={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Column */}
            <div className="flex-1 min-w-0 w-full">
              {/* Tagline */}
              {movie.tagline && (
                <p className="text-xs sm:text-sm font-medium text-orange-400 mb-1 italic">
                  "{movie.tagline}"
                </p>
              )}

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display">
                {movie.title}
              </h2>

              {/* Specs Bar (Zero-Pill formatting) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300 my-3 font-medium">
                <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums font-mono">{movie.rating.toFixed(1)}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{movie.releaseYear}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="tabular-nums font-mono">{formatRuntime(movie.runtime)}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-zinc-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{movie.ageRating}</span>
                </div>
              </div>

              {/* Genres list */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/20 text-purple-300 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => onOpenTrailer(movie)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all duration-200 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all duration-200 active:scale-95 ${
                    favorited
                      ? 'bg-purple-600/90 text-white border-purple-400 shadow-lg shadow-purple-900/60'
                      : 'bg-white/10 text-zinc-200 border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                  <span>{favorited ? 'In Favorites' : 'Add to Favorites'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Share movie"
                  aria-label="Share movie link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Synopsis
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{movie.overview}</p>
              </div>

              {/* Crew & Cast Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-zinc-500 block mb-1">Director</span>
                  <span className="text-white font-semibold text-sm">{movie.director}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Community Score</span>
                  <span className="text-white font-semibold text-sm">
                    {movie.rating.toFixed(1)} / 10 ({movie.voteCount.toLocaleString()} votes)
                  </span>
                </div>
              </div>

              {/* Cast List */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Starring Cast
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((member, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-[#161324] border border-white/5 text-xs"
                    >
                      <span className="text-white font-medium">{member.name}</span>
                      <span className="text-zinc-500 text-[11px] block">{member.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          {similarMovies.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                More Movies Like This
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similarMovies.map((similar) => (
                  <div
                    key={similar.id}
                    onClick={() => onSelectMovie(similar)}
                    className="group cursor-pointer rounded-lg overflow-hidden bg-[#141220] border border-white/5 hover:border-purple-500/40 transition-all p-2"
                  >
                    <div className="aspect-[2/3] rounded overflow-hidden mb-2">
                      <MovieImage
                        src={similar.posterUrl}
                        alt={similar.title}
                        title={similar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-purple-300">
                      {similar.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-0.5">
                      <span>{similar.releaseYear}</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{similar.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
