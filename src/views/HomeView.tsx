import React from 'react';
import { Movie, ViewTab } from '../types/movie';
import { HeroBanner } from '../components/HeroBanner';
import { MovieReel } from '../components/MovieReel';
import { ALL_GENRES } from '../data/movies';
import { Sparkles, Compass, Flame, Award, Film, PlayCircle, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onSelectTab: (tab: ViewTab) => void;
  onFilterByGenre: (genre: string) => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  movies,
  onSelectMovie,
  onSelectTab,
  onFilterByGenre,
  onOpenTrailer,
}) => {
  const trendingMovies = movies.filter((m) => m.isTrending);
  const popularMovies = movies.filter((m) => m.isPopular);
  const topRatedMovies = movies
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
  const newReleases = movies.filter((m) => m.isNewRelease || m.releaseYear >= 2023);

  const handleGenreClick = (genre: string) => {
    onFilterByGenre(genre);
    onSelectTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-16">
      {/* 1. Cinematic Hero Banner */}
      <HeroBanner
        movies={movies}
        onSelectMovie={onSelectMovie}
        onExploreMovies={() => onSelectTab('discover')}
        onOpenTrailer={onOpenTrailer}
      />

      {/* Genre Fast-Access Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-20 mb-8">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#121020]/90 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-2 whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            Explore:
          </span>
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all bg-white/5 hover:bg-purple-600/30 text-zinc-300 hover:text-white border border-white/5 hover:border-purple-500/30"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Trending Now Reel */}
      <div className="border-t border-white/5 pt-4">
        <MovieReel
          title="Trending Now"
          subtitle="The most talked about films across global cinema right now"
          movies={trendingMovies.length > 0 ? trendingMovies : movies.slice(0, 8)}
          onSelectMovie={onSelectMovie}
          onExploreMore={() => onSelectTab('discover')}
        />
      </div>

      {/* Interactive Quiz Promo Teaser Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 my-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-950 via-[#18112c] to-[#120f24] border border-purple-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_right,rgba(249,115,22,0.15),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Not sure what to watch?
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-display">
              Find Your Perfect Match with Movie Quiz
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              Answer 4 quick questions about your mood, genre cravings, and available time. Our recommendation engine will calculate your cinematic match instantly.
            </p>
            <button
              onClick={() => {
                onSelectTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-950/60 transition-all active:scale-95"
            >
              <span>Start Movie Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Popular Movies Reel */}
      <MovieReel
        title="Popular Movies"
        subtitle="Audience favorites with timeless acclaim"
        movies={popularMovies}
        onSelectMovie={onSelectMovie}
        onExploreMore={() => onSelectTab('discover')}
      />

      {/* 4. Top Rated Reel */}
      <MovieReel
        title="Top Rated Masterpieces"
        subtitle="Critically acclaimed cinema scoring 8.5+ worldwide"
        movies={topRatedMovies}
        onSelectMovie={onSelectMovie}
        onExploreMore={() => onSelectTab('discover')}
      />

      {/* 5. New Releases Reel */}
      <MovieReel
        title="New Releases & Recent Premieres"
        subtitle="Latest additions to the international film circuit"
        movies={newReleases}
        onSelectMovie={onSelectMovie}
        onExploreMore={() => onSelectTab('discover')}
      />
    </div>
  );
};
