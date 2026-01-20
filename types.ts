
export interface Movie {
  id: string;
  title: string;
  year: number;
  quality: string;
  size: string;
  genre: string[];
  rating: number;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  downloadUrl: string;
  latest?: boolean;
}

export type ViewState = {
  type: 'home' | 'details' | 'search' | 'upload';
  selectedMovieId?: string;
};
