import React, { useState } from 'react';
import { ViewTab } from '../types/movie';
import { useFavorites } from '../context/FavoritesContext';
import { Film, Dices, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onSurpriseMe: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onSurpriseMe,
}) => {
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewTab; label: string; badge?: number }[] = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'genres', label: 'Genres' },
    { id: 'favorites', label: 'Favorites', badge: favorites.length },
    { id: 'quiz', label: 'Movie Quiz' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: ViewTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#09080e]/85 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-700 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-950/50 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white font-display">
            Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Match</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-purple-600 text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-2.5 inset-x-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSurpriseMe}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-950/60 active:scale-95 transition-all whitespace-nowrap shrink-0"
            title="Pick a random movie"
          >
            <Dices className="w-4 h-4" />
            <span>Surprise Me</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0c18] border-b border-purple-900/30 px-6 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between text-sm ${
                currentTab === item.id
                  ? 'bg-purple-900/30 text-white font-semibold border border-purple-500/20'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-600 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              Movie Discovery Platform
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
