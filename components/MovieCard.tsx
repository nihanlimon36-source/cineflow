
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]"
    >
      {/* Poster Image */}
      <img 
        src={movie.posterUrl} 
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        <span className="bg-[#E50914] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          {movie.quality}
        </span>
        {movie.latest && (
          <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 movie-card-overlay opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-[10px] text-gray-300">
          <span>{movie.year}</span>
          <span>{movie.size}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 flex gap-1">
          {movie.genre.slice(0, 2).map(g => (
            <span key={g} className="text-[8px] border border-white/20 px-1 rounded-sm text-white/70">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
