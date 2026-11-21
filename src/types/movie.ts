export interface CastMember {
  name: string;
  character: string;
  avatarUrl?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  tagline: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: number;
  releaseDate: string;
  runtime: number; // in minutes
  rating: number; // 0.0 - 10.0
  voteCount: number;
  genres: string[];
  director: string;
  cast: CastMember[];
  trailerYoutubeId: string;
  isTrending?: boolean;
  isPopular?: boolean;
  isTopRated?: boolean;
  isNewRelease?: boolean;
  ageRating: string;
  moods: string[]; // e.g., 'mind-bending', 'adrenaline', 'cozy', 'heartwarming', 'dark', 'epic'
}

export type ViewTab = 'home' | 'discover' | 'genres' | 'favorites' | 'quiz' | 'about';

export interface FilterOptions {
  searchQuery: string;
  selectedGenre: string;
  yearRange: string; // 'all' | '2020-now' | '2010-2019' | '2000-2009' | 'classic'
  minRating: number; // 0, 7.0, 8.0, 8.5
  sortBy: 'popularity' | 'rating-desc' | 'year-desc' | 'year-asc' | 'title-asc';
}

export interface QuizAnswer {
  mood?: string;
  genre?: string;
  era?: string;
  runtime?: string;
}

export interface QuizQuestion {
  id: keyof QuizAnswer;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    icon?: string;
  }[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'favorite-add' | 'favorite-remove';
  title: string;
  message?: string;
  moviePoster?: string;
}
