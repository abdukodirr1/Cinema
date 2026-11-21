import React, { useRef } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieReelProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onExploreMore?: () => void;
}

export const MovieReel: React.FC<MovieReelProps> = ({
  title,
  subtitle,
  movies,
  onSelectMovie,
  onExploreMore,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <section className="relative py-6 sm:py-8">
      {/* Reel Header */}
      <div className="flex items-end justify-between mb-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2 py-0.5 rounded-full">
              {movies.length}
            </span>
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {onExploreMore && (
            <button
              onClick={onExploreMore}
              className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors mr-2 hidden sm:inline-block"
            >
              See all
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label={`Scroll ${title} left`}
              className="p-2 rounded-lg bg-[#141220] border border-white/10 hover:border-purple-500/50 hover:bg-[#1f1b32] text-zinc-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label={`Scroll ${title} right`}
              className="p-2 rounded-lg bg-[#141220] border border-white/10 hover:border-purple-500/50 hover:bg-[#1f1b32] text-zinc-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 pb-3 max-w-7xl mx-auto"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[180px] sm:w-[210px] md:w-[230px] shrink-0 transform transition-transform"
          >
            <MovieCard movie={movie} onSelect={onSelectMovie} />
          </div>
        ))}
      </div>
    </section>
  );
};
