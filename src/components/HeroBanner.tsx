import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { MovieImage } from './MovieImage';
import { useFavorites } from '../context/FavoritesContext';
import { Star, Play, Bookmark, Info, ChevronRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onExploreMovies: () => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movies,
  onSelectMovie,
  onExploreMovies,
  onOpenTrailer,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  const featured = movies.slice(0, 5);
  const currentMovie = featured[currentIndex] || movies[0];

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!currentMovie) return null;

  const favorited = isFavorite(currentMovie.id);

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hours}h ${m}m`;
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-end overflow-hidden pb-12 pt-28">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 -z-10 bg-[#09080e]">
        <MovieImage
          src={currentMovie.backdropUrl || currentMovie.posterUrl}
          alt={currentMovie.title}
          title={currentMovie.title}
          className="w-full h-full object-cover scale-105 transition-all duration-1000 ease-out"
        />

        {/* Cinematic Multi-layered Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080e] via-[#09080e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09080e] via-[#09080e]/80 to-transparent max-w-4xl" />
        <div className="absolute inset-0 bg-radial-[at_center_top] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10">
        <div className="max-w-2xl">
          {/* Tagline / Subtitle */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-orange-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Premiere
            </span>
            <span className="text-zinc-500">·</span>
            <span className="text-xs text-zinc-300 font-medium">{currentMovie.tagline}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance font-display">
            {currentMovie.title}
          </h1>

          {/* Metadata Bar (zero-pill style) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300 my-4 font-medium">
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums font-mono">{currentMovie.rating.toFixed(1)}</span>
            </div>
            <span>·</span>
            <span>{currentMovie.releaseYear}</span>
            <span>·</span>
            <span className="tabular-nums font-mono">{formatRuntime(currentMovie.runtime)}</span>
            <span>·</span>
            <span className="text-zinc-400">{currentMovie.genres.join(', ')}</span>
            <span>·</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-200">
              {currentMovie.ageRating}
            </span>
          </div>

          {/* Overview Synopsis */}
          <p className="text-sm sm:text-base text-zinc-300/90 line-clamp-3 leading-relaxed mb-6 max-w-xl">
            {currentMovie.overview}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectMovie(currentMovie)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 transition-all duration-200 active:scale-95"
            >
              <Info className="w-4 h-4" />
              <span>Explore Movie</span>
            </button>

            <button
              onClick={() => onOpenTrailer(currentMovie)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 backdrop-blur-md border border-white/15 transition-all duration-200 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={() => toggleFavorite(currentMovie)}
              className={`p-2.5 rounded-xl backdrop-blur-md border transition-all duration-200 active:scale-95 ${
                favorited
                  ? 'bg-purple-600/90 text-white border-purple-400 shadow-md shadow-purple-900/60'
                  : 'bg-black/50 text-zinc-300 border-white/15 hover:text-white hover:bg-black/70'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Bookmark className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onExploreMovies}
              className="ml-auto hidden md:flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <span>Browse Full Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {featured.length > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {featured.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show ${movie.title}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-orange-400'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
