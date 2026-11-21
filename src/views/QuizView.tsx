import React, { useState } from 'react';
import { Movie, QuizAnswer, QuizQuestion } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Flame, Brain, Heart, Moon, Smile } from 'lucide-react';

interface QuizViewProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mood',
    title: 'What mood are you in tonight?',
    subtitle: 'Choose the emotional wavelength for your cinema experience.',
    options: [
      {
        label: 'Mind-Bending & Thoughtful',
        description: 'Complex narratives, philosophical puzzles, and perception-shifting concepts.',
        value: 'mind-bending',
      },
      {
        label: 'High-Octane Adrenaline',
        description: 'Non-stop energy, intense set pieces, and thrilling spectacle.',
        value: 'adrenaline',
      },
      {
        label: 'Cozy & Lighthearted',
        description: 'Warm comedy, visual comfort, and uplifting wit.',
        value: 'cozy',
      },
      {
        label: 'Dark, Gritty & Atmospheric',
        description: 'Tense psychological drama, moral ambiguity, and noir chills.',
        value: 'dark',
      },
      {
        label: 'Heartwarming & Emotional',
        description: 'Poignant relationships, deep empathy, and cathartic journeys.',
        value: 'heartwarming',
      },
    ],
  },
  {
    id: 'genre',
    title: 'Which genre calls to you?',
    subtitle: 'Select the universe you want to inhabit for the next two hours.',
    options: [
      {
        label: 'Sci-Fi & Futuristic Exploration',
        description: 'Cosmic scale, artificial intelligence, and visionary technology.',
        value: 'Sci-Fi',
      },
      {
        label: 'Action & Adventure',
        description: 'Heroic quests, high stakes, and physical mastercraft.',
        value: 'Action',
      },
      {
        label: 'Gripping Psychological Drama',
        description: 'Intimate human conflict, acting tour de force, and moral weight.',
        value: 'Drama',
      },
      {
        label: 'Animation & Whimsical Fantasy',
        description: 'Unbounded imagination, vibrant art, and heartwarming wonder.',
        value: 'Animation',
      },
      {
        label: 'Crime, Mystery & Thriller',
        description: 'Underworld investigations, shocking plot twists, and cat-and-mouse tension.',
        value: 'Mystery',
      },
    ],
  },
  {
    id: 'era',
    title: 'What era of cinema would you like?',
    subtitle: 'Are you looking for contemporary spectacle or time-tested classics?',
    options: [
      {
        label: 'Fresh & Modern (2020 – 2026)',
        description: 'Recent festival sensations and contemporary blockbuster craftsmanship.',
        value: 'modern',
      },
      {
        label: 'Golden Modern Era (2000 – 2019)',
        description: 'Milestone masterpieces that defined the 21st century.',
        value: '2000s',
      },
      {
        label: 'Vintage Masterpieces (Pre-2000)',
        description: 'Foundational cinema, 90s auteur films, and cinematic benchmarks.',
        value: 'vintage',
      },
      {
        label: 'Any Era (Surprise Me)',
        description: 'Great filmmaking has no expiration date.',
        value: 'any',
      },
    ],
  },
  {
    id: 'runtime',
    title: 'How much time do you have tonight?',
    subtitle: 'From a tight, focused story to a sprawling epic.',
    options: [
      {
        label: 'Tight & Focused (< 115 minutes)',
        description: 'Quick-paced, efficient storytelling that wraps up promptly.',
        value: 'short',
      },
      {
        label: 'Standard Feature (115 – 145 minutes)',
        description: 'The golden length for deep characters and complete story arcs.',
        value: 'medium',
      },
      {
        label: 'Grand Epic Odyssey (> 145 minutes)',
        description: 'Settle in for a monumental cinematic voyage.',
        value: 'long',
      },
      {
        label: 'Any Length Works',
        description: 'If the story is captivating, runtime does not matter.',
        value: 'any',
      },
    ],
  },
];

interface ScoredMovie {
  movie: Movie;
  score: number;
  matchPercentage: number;
  reasons: string[];
}

export const QuizView: React.FC<QuizViewProps> = ({ movies, onSelectMovie }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [matchedResults, setMatchedResults] = useState<ScoredMovie[]>([]);

  const handleSelectOption = (questionId: keyof QuizAnswer, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults(updated);
    }
  };

  const calculateResults = (finalAnswers: QuizAnswer) => {
    const scored: ScoredMovie[] = movies.map((movie) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Mood match (weight: 35)
      if (finalAnswers.mood && movie.moods.includes(finalAnswers.mood)) {
        score += 35;
        reasons.push(`Perfect match for your ${finalAnswers.mood} mood`);
      } else if (finalAnswers.mood && movie.moods.length > 0) {
        score += 15;
      }

      // 2. Genre match (weight: 30)
      if (finalAnswers.genre) {
        if (movie.genres.includes(finalAnswers.genre)) {
          score += 30;
          reasons.push(`Direct fit for ${finalAnswers.genre} genre lovers`);
        } else if (
          finalAnswers.genre === 'Mystery' &&
          (movie.genres.includes('Crime') || movie.genres.includes('Thriller'))
        ) {
          score += 25;
          reasons.push(`Deep mystery & suspense elements`);
        }
      }

      // 3. Era match (weight: 20)
      if (finalAnswers.era === 'modern') {
        if (movie.releaseYear >= 2020) {
          score += 20;
          reasons.push(`Contemporary masterpiece released in ${movie.releaseYear}`);
        }
      } else if (finalAnswers.era === '2000s') {
        if (movie.releaseYear >= 2000 && movie.releaseYear <= 2019) {
          score += 20;
          reasons.push(`Essential modern classic from ${movie.releaseYear}`);
        }
      } else if (finalAnswers.era === 'vintage') {
        if (movie.releaseYear < 2000) {
          score += 20;
          reasons.push(`Vintage benchmark released in ${movie.releaseYear}`);
        }
      } else {
        score += 18;
      }

      // 4. Runtime match (weight: 15)
      if (finalAnswers.runtime === 'short') {
        if (movie.runtime < 115) {
          score += 15;
          reasons.push(`Comfortable runtime of ${movie.runtime} min fits your schedule`);
        }
      } else if (finalAnswers.runtime === 'medium') {
        if (movie.runtime >= 115 && movie.runtime <= 145) {
          score += 15;
          reasons.push(`Ideal feature length of ${movie.runtime} min`);
        }
      } else if (finalAnswers.runtime === 'long') {
        if (movie.runtime > 145) {
          score += 15;
          reasons.push(`Epic immersion spanning ${movie.runtime} minutes`);
        }
      } else {
        score += 12;
      }

      // Rating bonus (up to 10 bonus)
      score += Math.round(movie.rating);

      const matchPercentage = Math.min(99, Math.max(72, Math.round((score / 110) * 100)));

      return {
        movie,
        score,
        matchPercentage,
        reasons: reasons.slice(0, 2),
      };
    });

    scored.sort((a, b) => b.score - a.score);
    setMatchedResults(scored.slice(0, 6));
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#a855f7', '#f97316', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setMatchedResults([]);
  };

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Quiz Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Movie Matchmaker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          CineMatch Movie Quiz
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Tell us about your mood and viewing preferences, and we will calculate your ideal film recommendation.
        </p>
      </div>

      {!isCompleted ? (
        /* Questionnaire Card */
        <div className="bg-[#121020] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-medium">
              <span>
                Question <strong className="text-white font-mono">{currentStep + 1}</strong> of{' '}
                <span className="font-mono">{QUIZ_QUESTIONS.length}</span>
              </span>
              <span className="font-mono text-purple-400 font-bold">
                {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-orange-400 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title & Subtitle */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              {question.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">{question.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(question.id, option.value)}
                className="group text-left p-4 rounded-xl bg-[#171428] hover:bg-purple-950/40 border border-white/5 hover:border-purple-500/50 transition-all duration-200 active:scale-[0.99] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {option.label}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Step back button */}
          {currentStep > 0 && (
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-start">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-[#121020] rounded-2xl border border-purple-500/30 p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 text-purple-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              We Found Your Perfect Matches!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl mx-auto">
              Based on your taste profile, here are the films mathematically tailored to your preferences tonight.
            </p>

            <button
              onClick={restartQuiz}
              className="mt-5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-purple-300 border border-purple-500/30 inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Matched Movies Grid with Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedResults.map((result, idx) => (
              <div
                key={result.movie.id}
                className="bg-[#121020] rounded-2xl border border-white/10 p-4 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-orange-400">
                      Match #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-md">
                      {result.matchPercentage}% Vibe Match
                    </span>
                  </div>

                  <MovieCard movie={result.movie} onSelect={onSelectMovie} />

                  {/* Reasons box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#171428] border border-white/5 text-[11px] text-zinc-300 space-y-1">
                    <span className="text-zinc-500 font-semibold block text-[10px] uppercase">
                      Why this fits you:
                    </span>
                    {result.reasons.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-1.5 text-purple-200">
                        <span className="text-purple-400">✓</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
