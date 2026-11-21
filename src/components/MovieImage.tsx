import React, { useState } from 'react';
import { Film } from 'lucide-react';

interface MovieImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'poster' | 'backdrop' | 'square';
  title?: string;
}

export const MovieImage: React.FC<MovieImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'poster',
  title
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#181528] via-[#100e1a] to-[#09080e] border border-purple-900/30 overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(147,51,234,0.15),transparent_70%)]" />
        <Film className="w-8 h-8 text-purple-400/60 mb-2" />
        <span className="text-xs font-medium text-zinc-300 max-w-[85%] truncate">
          {title || alt}
        </span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">CineMatch</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#12101e] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-zinc-800/20 to-purple-950/20 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
