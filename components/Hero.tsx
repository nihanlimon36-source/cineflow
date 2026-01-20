
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onViewDetails: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onViewDetails }) => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 md:pb-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#E50914] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider animate-pulse">
            Featured Release
          </span>
          <span className="text-white/80 text-xs md:text-sm font-medium">
            <i className="fa-solid fa-star text-yellow-500 mr-1"></i> {movie.rating} Rating
          </span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          {movie.title}
        </h1>
        
        <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-none max-w-2xl drop-shadow">
          {movie.synopsis}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => onViewDetails(movie.id)}
            className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-white/80 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-circle-info"></i> More Details
          </button>
          <button 
            className="bg-[#333]/80 backdrop-blur-sm text-white font-bold px-8 py-3 rounded hover:bg-[#444] transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-download"></i> Fast Download
          </button>
        </div>
      </div>
    </div>
  );
};
