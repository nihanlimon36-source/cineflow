
import React, { useState, useMemo, useEffect } from 'react';
import { MOVIES as INITIAL_MOVIES } from './data/movies';
import { ViewState, Movie } from './types';

// --- Components ---

const AdSlot: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <div className={`bg-[#1a1a1a] border border-dashed border-gray-700 flex flex-col items-center justify-center p-4 min-h-[100px] text-gray-500 rounded-md overflow-hidden ${className}`}>
    <span className="text-xs font-bold uppercase tracking-widest mb-1 opacity-50">Advertisement</span>
    <p className="text-sm font-medium italic">{label}</p>
    <div className="mt-2 w-full h-1 bg-[#222] animate-pulse rounded"></div>
  </div>
);

const Navbar: React.FC<{
  onSearch: (term: string) => void;
  onGoHome: () => void;
  onGoUpload: () => void;
  genres: string[];
  activeGenre: string;
  onSelectGenre: (genre: string) => void;
}> = ({ onSearch, onGoHome, onGoUpload, genres, activeGenre, onSelectGenre }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 md:px-12 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* FIX: Removed 'target="_self"' which is not a valid attribute for a div element */}
        <div onClick={onGoHome} className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-[#E50914] p-1.5 rounded-md group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-play text-white text-xl"></i>
          </div>
          <span className="text-[#E50914] text-2xl font-black tracking-tighter uppercase">CineFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-6 flex-1 ml-8">
          <button onClick={onGoHome} className={`text-sm font-semibold transition-colors ${activeGenre === 'All' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Home</button>
          <div className="relative group">
            <button className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-1">Genres <i className="fa-solid fa-chevron-down text-[10px]"></i></button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all py-2">
              {['All', ...genres].map(genre => (
                <button key={genre} onClick={() => onSelectGenre(genre)} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#E50914] hover:text-white transition-colors ${activeGenre === genre ? 'text-[#E50914]' : 'text-gray-300'}`}>{genre}</button>
              ))}
            </div>
          </div>
          <button onClick={onGoUpload} className="text-sm font-bold text-white bg-white/10 hover:bg-[#E50914] px-4 py-1.5 rounded-full transition-all flex items-center gap-2"><i className="fa-solid fa-cloud-arrow-up"></i> Upload</button>
        </div>
        <div className="flex-1 max-w-sm relative">
          <input type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-full px-10 py-2 focus:outline-none focus:border-[#E50914] transition-all" />
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
        </div>
        <button className="md:hidden text-white text-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}><i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i></button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-white/10 mt-3 p-4 flex flex-col gap-4 animate-fadeIn">
          <button onClick={() => { onGoHome(); setIsMenuOpen(false); }} className="text-left font-bold text-white">Home</button>
          <button onClick={() => { onGoUpload(); setIsMenuOpen(false); }} className="text-left font-bold text-[#E50914]">Upload Movie</button>
        </div>
      )}
    </nav>
  );
};

const MovieCard: React.FC<{ movie: Movie; onClick: () => void }> = ({ movie, onClick }) => (
  <div onClick={onClick} className="group relative aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]">
    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
      <span className="bg-[#E50914] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">{movie.quality}</span>
    </div>
    <div className="absolute inset-0 movie-card-overlay opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
      <h3 className="text-white font-bold text-sm leading-tight mb-1">{movie.title}</h3>
      <div className="flex items-center justify-between text-[10px] text-gray-300">
        <span>{movie.year}</span>
        <span className="text-[#E50914] font-bold">★ {movie.rating}</span>
      </div>
    </div>
  </div>
);

const Hero: React.FC<{ movie: Movie; onViewDetails: (id: string) => void }> = ({ movie, onViewDetails }) => (
  <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
      <div className="absolute inset-0 hero-gradient"></div>
    </div>
    <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{movie.title}</h1>
      <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-3">{movie.synopsis}</p>
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={() => onViewDetails(movie.id)} className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-white/80 transition-colors">Details</button>
        <button className="bg-[#E50914] text-white font-bold px-8 py-3 rounded hover:bg-[#b20710] transition-colors">Download</button>
      </div>
    </div>
  </div>
);

const MovieDetails: React.FC<{ movie: Movie; onBack: () => void }> = ({ movie, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), [movie]);
  return (
    <div className="min-h-screen bg-black pb-12">
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        <button onClick={onBack} className="absolute top-6 left-6 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-[#E50914] transition-colors"><i className="fa-solid fa-arrow-left"></i></button>
      </div>
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <img src={movie.posterUrl} className="w-full rounded-xl shadow-2xl border border-white/10" />
            <AdSlot label="Sidebar Ad 300x600" className="h-[400px]" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-black text-white">{movie.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="text-[#E50914] font-bold">★ {movie.rating} / 10</span>
              <span>{movie.year}</span>
              <span>{movie.quality}</span>
            </div>
            <div className="bg-[#121212] p-8 rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.synopsis}</p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-xl border-2 border-dashed border-[#E50914]/30 flex flex-col items-center gap-6">
              <AdSlot label="Above Download Ad" className="w-full" />
              <button className="w-full max-w-md bg-[#E50914] hover:bg-[#b20710] text-white font-black py-5 rounded-lg text-xl uppercase tracking-widest transition-all hover:scale-105">
                Download Now ({movie.size})
              </button>
              <AdSlot label="Below Download Ad" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadForm: React.FC<{ onUpload: (movie: Movie) => void; onCancel: () => void }> = ({ onUpload, onCancel }) => {
  const [f, setF] = useState({ title: '', year: 2024, quality: '1080p BluRay', size: '', genres: '', rating: 8, synopsis: '', posterUrl: '', backdropUrl: '' });
  const inputClass = "w-full bg-[#1a1a1a] border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors";
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-black mb-8">Upload Movie</h2>
        <form onSubmit={e => { e.preventDefault(); onUpload({ id: Date.now().toString(), ...f, genre: f.genres.split(','), downloadUrl: '#', latest: true }); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input placeholder="Title" required className={inputClass} onChange={e => setF({...f, title: e.target.value})} />
          <input placeholder="Year" type="number" className={inputClass} onChange={e => setF({...f, year: +e.target.value})} />
          <input placeholder="Genres (Action, Sci-Fi)" className={inputClass} onChange={e => setF({...f, genres: e.target.value})} />
          <input placeholder="Size (e.g. 1.5 GB)" className={inputClass} onChange={e => setF({...f, size: e.target.value})} />
          <input placeholder="Poster URL" className={inputClass} onChange={e => setF({...f, posterUrl: e.target.value})} />
          <input placeholder="Backdrop URL" className={inputClass} onChange={e => setF({...f, backdropUrl: e.target.value})} />
          <textarea placeholder="Synopsis" className={`${inputClass} md:col-span-2`} rows={4} onChange={e => setF({...f, synopsis: e.target.value})} />
          <button type="submit" className="bg-[#E50914] text-white font-black py-4 rounded-lg uppercase md:col-span-2">Add to Portal</button>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cineflow_movies');
    setMovies(stored ? JSON.parse(stored) : INITIAL_MOVIES);
  }, []);

  useEffect(() => { if (movies.length > 0) localStorage.setItem('cineflow_movies', JSON.stringify(movies)); }, [movies]);

  const filtered = useMemo(() => movies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedGenre === 'All' || m.genre.includes(selectedGenre))), [searchTerm, selectedGenre, movies]);
  const genres = useMemo(() => Array.from(new Set(movies.flatMap(m => m.genre))).sort(), [movies]);
  const featured = movies[0];

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      <Navbar onSearch={setSearchTerm} onGoHome={() => setView({type:'home'})} onGoUpload={() => setView({type:'upload'})} genres={genres} activeGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
      
      <main className="flex-grow">
        {view.type === 'home' ? (
          <>
            <div className="max-w-7xl mx-auto py-4 px-4"><AdSlot label="Top Banner 728x90" /></div>
            {!searchTerm && selectedGenre === 'All' && featured && <Hero movie={featured} onViewDetails={id => setView({type:'details', selectedMovieId: id})} />}
            <section className="max-w-7xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">Latest Uploads</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filtered.map(m => <MovieCard key={m.id} movie={m} onClick={() => setView({type:'details', selectedMovieId: m.id})} />)}
              </div>
            </section>
          </>
        ) : view.type === 'upload' ? (
          <UploadForm onUpload={m => { setMovies([m, ...movies]); setView({type:'home'}); }} onCancel={() => setView({type:'home'})} />
        ) : (
          movies.find(m => m.id === view.selectedMovieId) && <MovieDetails movie={movies.find(m => m.id === view.selectedMovieId)!} onBack={() => setView({type:'home'})} />
        )}
      </main>

      <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500 text-sm mb-4">CineFlow - High Quality Movie Portal</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-[#E50914]">DMCA</a>
            <a href="#" className="text-gray-400 hover:text-[#E50914]">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-[#E50914]">Contact</a>
          </div>
          <p className="text-gray-700 text-xs">&copy; 2024 CineFlow Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
