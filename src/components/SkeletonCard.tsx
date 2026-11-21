import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-[#100e1b] border border-white/5 animate-pulse">
      <div className="relative aspect-[2/3] w-full bg-zinc-800/40" />
      <div className="p-3.5 space-y-2.5">
        <div className="h-4 bg-zinc-800/60 rounded w-3/4" />
        <div className="h-3 bg-zinc-800/40 rounded w-1/2" />
        <div className="h-2.5 bg-zinc-800/30 rounded w-2/3 pt-1" />
      </div>
    </div>
  );
};
