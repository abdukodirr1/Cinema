import React from 'react';
import { Movie } from '../types/movie';
import { X, ExternalLink } from 'lucide-react';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#100e1b] rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#141223]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{movie.title}</span>
              <span className="text-xs text-purple-400 font-normal">Official Trailer</span>
            </h3>
            <p className="text-xs text-zinc-400">Release Year: {movie.releaseYear}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${movie.trailerYoutubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 flex items-center gap-1 transition-colors"
              title="Open in YouTube"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">YouTube</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
