
import React, { useState } from 'react';
import { Movie } from '../types';

interface UploadFormProps {
  onUpload: (movie: Movie) => void;
  onCancel: () => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onUpload, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    quality: '1080p BluRay',
    size: '',
    genres: '',
    rating: 8.0,
    synopsis: '',
    posterUrl: '',
    backdropUrl: '',
    downloadUrl: '#'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = {
      id: Date.now().toString(),
      ...formData,
      year: Number(formData.year),
      rating: Number(formData.rating),
      genre: formData.genres.split(',').map(g => g.trim()),
      latest: true
    };
    onUpload(newMovie);
  };

  const inputClass = "w-full bg-[#1a1a1a] border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors";
  const labelClass = "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">Upload New Movie</h2>
            <p className="text-gray-500 text-sm mt-1">Add a new title to the CineFlow directory.</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Movie Title</label>
            <input 
              required
              className={inputClass} 
              placeholder="e.g. Gladiator II"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className={labelClass}>Release Year</label>
            <input 
              type="number"
              className={inputClass} 
              value={formData.year}
              onChange={e => setFormData({...formData, year: Number(e.target.value)})}
            />
          </div>

          <div>
            <label className={labelClass}>Quality</label>
            <select 
              className={inputClass}
              value={formData.quality}
              onChange={e => setFormData({...formData, quality: e.target.value})}
            >
              <option>4K Ultra HD</option>
              <option>1080p BluRay</option>
              <option>720p WEB-DL</option>
              <option>CAMRip</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>File Size</label>
            <input 
              className={inputClass} 
              placeholder="e.g. 2.4 GB"
              value={formData.size}
              onChange={e => setFormData({...formData, size: e.target.value})}
            />
          </div>

          <div>
            <label className={labelClass}>Rating (0-10)</label>
            <input 
              type="number" step="0.1"
              className={inputClass} 
              value={formData.rating}
              onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Genres (Comma separated)</label>
            <input 
              className={inputClass} 
              placeholder="Action, Sci-Fi, Drama"
              value={formData.genres}
              onChange={e => setFormData({...formData, genres: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Poster Image URL</label>
            <input 
              className={inputClass} 
              placeholder="https://images.unsplash.com/..."
              value={formData.posterUrl}
              onChange={e => setFormData({...formData, posterUrl: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Backdrop Image URL</label>
            <input 
              className={inputClass} 
              placeholder="https://images.unsplash.com/..."
              value={formData.backdropUrl}
              onChange={e => setFormData({...formData, backdropUrl: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Synopsis</label>
            <textarea 
              rows={4}
              className={`${inputClass} resize-none`} 
              placeholder="Brief description of the movie..."
              value={formData.synopsis}
              onChange={e => setFormData({...formData, synopsis: e.target.value})}
            ></textarea>
          </div>

          <div className="md:col-span-2 flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-[#E50914] hover:bg-[#b20710] text-white font-black py-4 rounded-lg uppercase tracking-widest transition-all"
            >
              Add Movie to Portal
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
