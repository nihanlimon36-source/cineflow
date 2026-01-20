
import React, { useEffect } from 'react';
import { Movie } from '../types';
import { AdSlot } from './AdSlot';

interface MovieDetailsProps {
  movie: Movie;
  onBack: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie]);

  return (
    <div className="min-h-screen bg-black pb-12">
      {/* Backdrop Section */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-[#E50914] transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar / Poster & Meta */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src={movie.posterUrl} alt={movie.title} className="w-full" />
            </div>
            
            <div className="bg-[#121212] rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-[#E50914]"></i> Metadata
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white font-medium">{movie.quality}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">File Size:</span>
                  <span className="text-white font-medium">{movie.size}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Release Year:</span>
                  <span className="text-white font-medium">{movie.year}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white font-medium">English (Multi)</span>
                </li>
              </ul>
            </div>

            <AdSlot label="Sidebar Banner - 300x600" className="h-[300px]" />
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {movie.genre.map(g => (
                  <span key={g} className="bg-[#1a1a1a] text-xs px-3 py-1 rounded-full text-white/80 border border-white/10">
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white">{movie.title}</h1>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>{movie.year}</span>
                <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
                <span className="text-[#E50914] font-bold"><i className="fa-solid fa-star"></i> {movie.rating} / 10</span>
                <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
                <span>2h 24m</span>
              </div>
            </div>

            <AdSlot label="Top Content Banner - 728x90" />

            <div className="bg-[#121212] rounded-xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.synopsis}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center p-8 bg-[#1a1a1a] rounded-xl border-2 border-dashed border-[#E50914]/30">
              <h2 className="text-xl font-bold text-white">Download Links</h2>
              <p className="text-sm text-gray-400 text-center mb-2 italic">
                Wait 5 seconds for the download button to appear below the ad.
              </p>
              
              <AdSlot label="Direct Above Button - 468x60" className="w-full" />
              
              <button className="w-full max-w-md bg-[#E50914] hover:bg-[#b20710] text-white font-black py-5 rounded-lg text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(229,9,20,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-3">
                <i className="fa-solid fa-cloud-arrow-down text-2xl"></i> Download Now
              </button>

              <AdSlot label="Direct Below Button - 468x60" className="w-full" />
            </div>

            {/* Screenshots / Trailer Placeholders */}
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-video bg-[#121212] rounded-lg overflow-hidden border border-white/5">
                 <img src={movie.backdropUrl} className="w-full h-full object-cover opacity-50" />
               </div>
               <div className="aspect-video bg-[#121212] rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                 <i className="fa-brands fa-youtube text-4xl text-gray-700"></i>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
