import React from 'react';
import { ViewTab } from '../types/movie';
import { Film, Heart, Github } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
  onFilterByGenre: (genre: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onFilterByGenre }) => {
  const handleNav = (tab: ViewTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenre = (g: string) => {
    onFilterByGenre(g);
    onSelectTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#07060b] text-zinc-400 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 text-left mb-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center text-white">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-tight font-display">
                Cine<span className="text-purple-400">Match</span>
              </span>
            </button>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed mb-4">
              A modern, client-side movie discovery platform featuring curated cinema, rich metadata, interactive matchmaker quizzes, and seamless personal watchlist management.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Dark Theme Streaming Experience</span>
              <span>·</span>
              <span>Local Storage Persistence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('discover')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Discover Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('genres')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Genres
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('favorites')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Favorites Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quiz')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Movie Match Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-purple-300 transition-colors"
                >
                  About CineMatch
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Genres */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Popular Genres
            </h4>
            <ul className="space-y-2 text-xs">
              {['Sci-Fi', 'Action', 'Drama', 'Thriller', 'Animation', 'Comedy'].map((genre) => (
                <li key={genre}>
                  <button
                    onClick={() => handleGenre(genre)}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} CineMatch Discovery Platform. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with React 19, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
