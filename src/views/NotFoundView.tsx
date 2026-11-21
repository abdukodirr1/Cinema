import React from 'react';
import { ViewTab } from '../types/movie';
import { Film, Home, Compass } from 'lucide-react';

interface NotFoundViewProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onSelectTab }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center max-w-md mx-auto p-8 rounded-3xl bg-[#121020] border border-purple-500/30 shadow-2xl shadow-purple-950/80">
        <div className="w-20 h-20 rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mx-auto mb-6 text-purple-400">
          <Film className="w-10 h-10" />
        </div>

        <span className="text-xs font-mono font-bold text-orange-400 tracking-widest uppercase">
          Scene Cut — Error 404
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 mb-3 font-display">
          Film Reel Missing
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed mb-8">
          The cinematic sequence you are looking for has been left on the cutting room floor or moved to another premiere.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onSelectTab('home')}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => onSelectTab('discover')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
