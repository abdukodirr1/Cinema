# CineMatch — Movie Discovery Platform

> A modern, cinematic web platform for discovering, exploring, and saving films with dark streaming aesthetics, interactive movie recommendation quiz, and instant client-side favorites persistence.

![CineMatch Preview](https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- 🎬 **Premium Streaming UI**: Dark obsidian and deep violet aesthetic inspired by top streaming services, with vibrant violet & warm amber accents.
- 🌟 **Marquee Hero Banner**: Rotating spotlights featuring blockbuster premieres, quick trailer previews, specs, and instant watchlist toggling.
- 🔍 **Real-Time Discover Engine**:
  - Live search across titles, directors, and cast members.
  - Multi-category genre filtering (Sci-Fi, Action, Drama, Thriller, Animation, Comedy, Crime, Horror, Romance, Mystery, Adventure).
  - Era filtering (2020–Present, 2010–2019, 2000–2009, Classics <2000).
  - Minimum rating threshold filters (7.5+, 8.0+, 8.5+).
  - Dynamic multi-option sorting (Popularity, Rating, Release Year, Title).
- 🧩 **Interactive Movie Quiz**:
  - 4-step recommendation matchmaker based on immediate mood, genre cravings, era preference, and available runtime.
  - Calculated compatibility score with personalized rationale and celebratory confetti.
- 🎲 **"Surprise Me" Roulette**:
  - Randomized film picker with animated reel roll and optional genre constraint.
- 📌 **Persistent Favorites Library**:
  - Add and remove movies with instant toast notifications.
  - LocalStorage persistence across browser reloads.
  - Filter favorites by genre and sort by date, rating, or year.
- 🎥 **Rich Movie Details Modal**:
  - High-res posters, backdrop artwork, and synopsis.
  - Release year, runtime, age rating, and director.
  - Full cast breakdowns with character names.
  - Embedded official YouTube trailers.
  - "More Movies Like This" recommendation row.
- 🛡️ **Zero-Broken-Image Policy**: Resilient CSS/SVG fallback containers so every image loads smoothly or falls back gracefully.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile with dedicated navigation drawer.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6 / 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Data Persistence**: HTML5 `localStorage`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/cinematch.git
   cd cinematch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or the port output by Vite) in your browser.

---

## 📦 Building for Production & Deployment

### Build

```bash
npm run build
```

This compiles optimized assets into the `dist` directory.

### Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your CineMatch repository.
4. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your app will be live within seconds with HTTPS and CDN distribution!

### Deploying to GitHub Pages

1. In `vite.config.ts`, add the base repository path if needed:
   ```typescript
   base: '/<repository-name>/',
   ```
2. Run `npm run build` and deploy the `dist/` directory via the `gh-pages` branch or GitHub Actions.

---

## 📂 Project Structure

```
├── index.html                   # HTML entry point with CineMatch SVG favicon & fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies & scripts
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── tsconfig.json                # TypeScript configuration
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global styles, fonts, and dark theme utilities
    ├── App.tsx                  # Main application orchestrator & routing
    ├── types/
    │   └── movie.ts             # TypeScript definitions for movies, filters, quiz, toasts
    ├── data/
    │   └── movies.ts            # Curated catalog of 35+ acclaimed films & genres
    ├── context/
    │   └── FavoritesContext.tsx # Persistent state & toast notification engine
    ├── components/
    │   ├── Navbar.tsx           # 3-Zone top navigation bar & mobile drawer
    │   ├── HeroBanner.tsx       # Rotating cinematic premiere showcases
    │   ├── MovieCard.tsx        # Poster card with hover effects and quick actions
    │   ├── MovieReel.tsx        # Horizontal scrolling carousel reels
    │   ├── MovieImage.tsx       # Zero-broken-image resilient image component
    │   ├── MovieDetailsModal.tsx# Comprehensive movie details dialog
    │   ├── TrailerModal.tsx     # Official YouTube trailer modal
    │   ├── SurpriseMeModal.tsx  # Roulette movie picker with confetti
    │   ├── SkeletonCard.tsx     # Skeleton loading state
    │   ├── ToastContainer.tsx   # Real-time toast notifications
    │   └── Footer.tsx           # Streaming platform footer
    └── views/
        ├── HomeView.tsx         # Marquee hero, fast genre strip, curated reels
        ├── DiscoverView.tsx     # Multi-filter catalog search & sorting
        ├── GenresView.tsx       # Visual genre exploration cards
        ├── FavoritesView.tsx    # Watchlist management with clear confirmation
        ├── QuizView.tsx         # 4-step movie matchmaker quiz
        ├── AboutView.tsx        # Story, features bento, and FAQ
        └── NotFoundView.tsx     # 404 scene cut page
```

---

## 📄 License

This project is open-source and available under the [Apache-2.0 License](LICENSE).
