import React, { useState, useEffect } from 'react';
import { Movie, ViewTab } from './types/movie';
import { MOVIES_DATABASE } from './data/movies';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { TrailerModal } from './components/TrailerModal';
import { SurpriseMeModal } from './components/SurpriseMeModal';

// Views
import { HomeView } from './views/HomeView';
import { DiscoverView } from './views/DiscoverView';
import { GenresView } from './views/GenresView';
import { FavoritesView } from './views/FavoritesView';
import { QuizView } from './views/QuizView';
import { AboutView } from './views/AboutView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [surpriseMeOpen, setSurpriseMeOpen] = useState(false);
  const [genreFilterForDiscover, setGenreFilterForDiscover] = useState<string>('All');

  // Handle hash navigation for direct links (e.g., #interstellar or #discover)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (['home', 'discover', 'genres', 'favorites', 'quiz', 'about'].includes(hash)) {
        setCurrentTab(hash as ViewTab);
      } else {
        const found = MOVIES_DATABASE.find((m) => m.id === hash);
        if (found) {
          setSelectedMovie(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTab = (tab: ViewTab) => {
    setCurrentTab(tab);
    window.history.pushState(null, '', `#${tab}`);
  };

  const handleOpenMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    window.history.pushState(null, '', `#${movie.id}`);
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
    window.history.pushState(null, '', `#${currentTab}`);
  };

  const handleFilterByGenre = (genre: string) => {
    setGenreFilterForDiscover(genre);
    setCurrentTab('discover');
    window.history.pushState(null, '', '#discover');
  };

  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col bg-[#09080e] text-[#f4f4f5]">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onSurpriseMe={() => setSurpriseMeOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomeView
              movies={MOVIES_DATABASE}
              onSelectMovie={handleOpenMovie}
              onSelectTab={handleSelectTab}
              onFilterByGenre={handleFilterByGenre}
              onOpenTrailer={(m) => setTrailerMovie(m)}
            />
          )}

          {currentTab === 'discover' && (
            <DiscoverView
              key={genreFilterForDiscover}
              movies={MOVIES_DATABASE}
              onSelectMovie={handleOpenMovie}
              initialGenre={genreFilterForDiscover}
            />
          )}

          {currentTab === 'genres' && (
            <GenresView
              movies={MOVIES_DATABASE}
              onSelectGenre={handleFilterByGenre}
              onSelectTab={handleSelectTab}
            />
          )}

          {currentTab === 'favorites' && (
            <FavoritesView
              onSelectMovie={handleOpenMovie}
              onSelectTab={handleSelectTab}
            />
          )}

          {currentTab === 'quiz' && (
            <QuizView
              movies={MOVIES_DATABASE}
              onSelectMovie={handleOpenMovie}
            />
          )}

          {currentTab === 'about' && (
            <AboutView onSelectTab={handleSelectTab} />
          )}

          {!['home', 'discover', 'genres', 'favorites', 'quiz', 'about'].includes(currentTab) && (
            <NotFoundView onSelectTab={handleSelectTab} />
          )}
        </main>

        {/* Footer */}
        <Footer
          onSelectTab={handleSelectTab}
          onFilterByGenre={handleFilterByGenre}
        />

        {/* Global Modals & Overlays */}
        <MovieDetailsModal
          movie={selectedMovie}
          allMovies={MOVIES_DATABASE}
          onClose={handleCloseMovie}
          onSelectMovie={handleOpenMovie}
          onOpenTrailer={(m) => setTrailerMovie(m)}
        />

        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />

        <SurpriseMeModal
          isOpen={surpriseMeOpen}
          onClose={() => setSurpriseMeOpen(false)}
          movies={MOVIES_DATABASE}
          onSelectMovie={handleOpenMovie}
          onOpenTrailer={(m) => setTrailerMovie(m)}
        />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </FavoritesProvider>
  );
}
