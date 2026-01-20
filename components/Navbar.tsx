
import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (term: string) => void;
  onGoHome: () => void;
  onGoUpload: () => void;
  genres: string[];
  activeGenre: string;
  onSelectGenre: (genre: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onGoHome, onGoUpload, genres, activeGenre, onSelectGenre }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 md:px-12 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onGoHome} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-[#E50914] p-1.5 rounded-md group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-play text-white text-xl"></i>
          </div>
          <span className="text-[#E50914] text-2xl font-black tracking-tighter uppercase">CineFlow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 flex-1 ml-8">
          <button 
            onClick={onGoHome}
            className={`text-sm font-semibold transition-colors ${activeGenre === 'All' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </button>
          
          <div className="relative group">
            <button className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-1">
              Genres <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all py-2 overflow-hidden">
              {['All', ...genres].map(genre => (
                <button
                  key={genre}
                  onClick={() => onSelectGenre(genre)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#E50914] hover:text-white transition-colors ${activeGenre === genre ? 'text-[#E50914]' : 'text-gray-300'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={onGoUpload}
            className="text-sm font-bold text-white bg-white/10 hover:bg-[#E50914] px-4 py-1.5 rounded-full transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-full px-10 py-2 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
          />
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-white/10 mt-3 p-4 flex flex-col gap-4 animate-fadeIn">
          <button onClick={() => { onGoHome(); setIsMenuOpen(false); }} className="text-left font-bold text-white">Home</button>
          <button onClick={() => { onGoUpload(); setIsMenuOpen(false); }} className="text-left font-bold text-[#E50914]">Upload Movie</button>
          <div className="flex flex-wrap gap-2">
            {['All', ...genres].map(genre => (
              <button 
                key={genre}
                onClick={() => { onSelectGenre(genre); setIsMenuOpen(false); }}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${activeGenre === genre ? 'bg-[#E50914] border-[#E50914] text-white' : 'border-white/10 text-gray-400'}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
