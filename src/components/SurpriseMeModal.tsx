import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { MovieImage } from './MovieImage';
import { ALL_GENRES } from '../data/movies';
import confetti from 'canvas-confetti';
import { Dices, Sparkles, Star, Play, Info, X, RefreshCw } from 'lucide-react';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
  onOpenTrailer,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [pickedMovie, setPickedMovie] = useState<Movie | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollMovie = () => {
    if (movies.length === 0) return;

    setIsRolling(true);
    const pool =
      selectedGenre === 'All'
        ? movies
        : movies.filter((m) => m.genres.includes(selectedGenre));

    const candidatePool = pool.length > 0 ? pool : movies;

    let iterations = 0;
    const maxIterations = 14;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidatePool.length);
      setPickedMovie(candidatePool[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsRolling(false);

        // Confetti burst
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#f97316', '#3b82f6'],
          });
        } catch {
          // ignore if canvas blocked
        }
      }
    }, 90);
  };

  useEffect(() => {
    if (isOpen) {
      rollMovie();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#121020] rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/80 p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Cinematic Roulette</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-display">
          Surprise Me With a Movie
        </h3>

        {/* Genre Selector */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
            Filter pool by genre (optional):
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
            }}
            disabled={isRolling}
            className="w-full bg-[#1b172e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          >
            {ALL_GENRES.map((g) => (
              <option key={g} value={g} className="bg-[#121020] text-white">
                {g === 'All' ? 'Any Genre (Full Catalog)' : g}
              </option>
            ))}
          </select>
        </div>

        {/* Display Winner or Rolling Card */}
        {pickedMovie && (
          <div
            className={`rounded-xl border border-white/10 bg-[#161326] p-4 flex gap-4 items-center transition-all ${
              isRolling ? 'scale-[0.98] opacity-80' : 'scale-100 shadow-xl shadow-purple-950/50'
            }`}
          >
            <div className="w-24 sm:w-28 shrink-0 aspect-[2/3] rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
              <MovieImage
                src={pickedMovie.posterUrl}
                alt={pickedMovie.title}
                title={pickedMovie.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="tabular-nums font-mono">{pickedMovie.rating.toFixed(1)}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{pickedMovie.releaseYear}</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white truncate mb-1">
                {pickedMovie.title}
              </h4>

              <div className="flex flex-wrap gap-1 text-[11px] text-purple-300 mb-2">
                {pickedMovie.genres.slice(0, 2).map((g) => (
                  <span key={g} className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2">{pickedMovie.overview}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={rollMovie}
            disabled={isRolling}
            className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 transition-all active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Spinning...' : 'Roll Again'}</span>
          </button>

          {pickedMovie && (
            <>
              <button
                onClick={() => {
                  onClose();
                  onSelectMovie(pickedMovie);
                }}
                disabled={isRolling}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>View Details</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenTrailer(pickedMovie);
                }}
                disabled={isRolling}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center border border-white/10 transition-colors"
                title="Watch Trailer"
                aria-label="Watch Trailer"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
