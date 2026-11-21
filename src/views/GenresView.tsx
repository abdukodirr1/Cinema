import React from 'react';
import { Movie, ViewTab } from '../types/movie';
import { ALL_GENRES, GENRE_DESCRIPTIONS } from '../data/movies';
import { Compass, Film, ChevronRight } from 'lucide-react';

interface GenresViewProps {
  movies: Movie[];
  onSelectGenre: (genre: string) => void;
  onSelectTab: (tab: ViewTab) => void;
}

export const GenresView: React.FC<GenresViewProps> = ({
  movies,
  onSelectGenre,
  onSelectTab,
}) => {
  const genresList = ALL_GENRES.filter((g) => g !== 'All');

  const handlePickGenre = (genre: string) => {
    onSelectGenre(genre);
    onSelectTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">
          Categories & Styles
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
          Explore Genres
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Dive into distinct cinematic worlds, from futuristic sci-fi to gripping noir thrillers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {genresList.map((genre) => {
          const count = movies.filter((m) => m.genres.includes(genre)).length;
          const info = GENRE_DESCRIPTIONS[genre] || {
            tag: 'Cinema Showcase',
            description: 'Compelling stories curated for discerning viewers.',
            gradient: 'from-purple-950/80 via-zinc-900/90 to-black',
          };

          return (
            <div
              key={genre}
              onClick={() => handlePickGenre(genre)}
              className={`group relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br ${info.gradient} border border-white/10 hover:border-purple-500/50 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[180px]`}
            >
              <div className="absolute inset-0 bg-radial-[at_top_right] from-white/5 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-300 tracking-wider">
                    {info.tag}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                    {count} {count === 1 ? 'film' : 'films'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors font-display">
                  {genre}
                </h3>

                <p className="text-xs text-zinc-300/80 mt-2 line-clamp-2 leading-relaxed">
                  {info.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                <span>View {genre} Catalog</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
