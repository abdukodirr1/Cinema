import React, { useState } from 'react';
import { ViewTab } from '../types/movie';
import { Film, Sparkles, Compass, ShieldCheck, Heart, ChevronDown, ChevronUp, ArrowRight, Zap, Database } from 'lucide-react';

interface AboutViewProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onSelectTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is CineMatch?',
      a: 'CineMatch is a modern movie discovery and recommendation platform designed with the aesthetic and responsiveness of premium streaming services. It allows you to explore curated cinema, filter by nuanced parameters, take our recommendation quiz, and save your watchlist locally.',
    },
    {
      q: 'How does the Movie Quiz work?',
      a: 'The quiz evaluates your immediate mood, preferred genres, era appetite, and available runtime through a multi-factor matching algorithm to calculate your personalized compatibility percentage.',
    },
    {
      q: 'Is my Favorites list saved between sessions?',
      a: 'Yes! Your favorites and watchlist are saved directly in your browser using HTML5 LocalStorage. No account or login is required; your private film list persists whenever you return on the same device.',
    },
    {
      q: 'Can I watch trailers inside CineMatch?',
      a: 'Yes. CineMatch features direct official trailer previews with high-definition video playback and quick links to YouTube for seamless viewing.',
    },
    {
      q: 'Does CineMatch require external API keys to function?',
      a: 'No. CineMatch comes equipped with a comprehensive local database of acclaimed cinema, complete with high-definition artwork, cast details, runtimes, and synopses, operating completely autonomously with zero external downtime risks.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>The CineMatch Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
          Elevating How You Discover Great Cinema
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed">
          Built for film lovers who crave intentional curation over endless scrolling algorithms. Fast, beautiful, and distraction-free.
        </p>
      </div>

      {/* Quantitative Rigor Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: 'Curated Masterpieces', value: '35+', detail: 'Blockbusters & indie icons' },
          { label: 'Distinct Genres', value: '11', detail: 'From Sci-Fi to Film Noir' },
          { label: 'Client-Side Speed', value: '100%', detail: 'Zero external latency lag' },
          { label: 'Private Storage', value: 'Local', detail: 'Persistent in your browser' },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#121020] border border-white/5 text-center shadow-lg"
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-purple-400 block mt-1">{stat.label}</span>
            <span className="text-[11px] text-zinc-500 block mt-0.5">{stat.detail}</span>
          </div>
        ))}
      </div>

      {/* Core Features Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[#121020] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-600/30 flex items-center justify-center text-purple-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Smart Movie Matchmaker
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our 4-question quiz diagnoses your psychological mood, genre cravings, era preference, and available schedule to calculate the perfect match.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('quiz')}
            className="mt-6 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            <span>Try the Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#121020] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Curated Discovery Catalog
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Explore films with real-time multi-filter queries across genres, release decades, and community ratings without sluggish page reloads.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('discover')}
            className="mt-6 text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#121020] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Zero-Friction Favorites
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Save films to your personal library with one click. Automatic local persistence ensures your movie marathon list is always ready.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('favorites')}
            className="mt-6 text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
          >
            <span>Open Favorites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6 font-display">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-[#121020] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-purple-900/60 via-[#191330] to-orange-950/40 border border-purple-500/30 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
          Ready to discover your next favorite movie?
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto mb-6">
          Step into our cinema library and let CineMatch uncover stories that stay with you long after the credits roll.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onSelectTab('discover')}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-950/60 transition-all active:scale-95"
          >
            Start Exploring Now
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/10 transition-colors"
          >
            Take 2-Min Match Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
