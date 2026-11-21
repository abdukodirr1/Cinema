import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { BookmarkCheck, BookmarkX, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useFavorites();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl bg-[#141220]/95 border border-purple-500/30 shadow-2xl shadow-purple-950/60 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in"
        >
          {toast.moviePoster ? (
            <img
              src={toast.moviePoster}
              alt=""
              className="w-10 h-14 object-cover rounded-md border border-white/10 shrink-0"
              onError={(e) => {
                // hide on error
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-500/20 flex items-center justify-center shrink-0">
              {toast.type === 'favorite-add' ? (
                <BookmarkCheck className="w-5 h-5 text-purple-400" />
              ) : toast.type === 'favorite-remove' ? (
                <BookmarkX className="w-5 h-5 text-amber-400" />
              ) : (
                <Info className="w-5 h-5 text-purple-400" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-zinc-400 line-clamp-1">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
