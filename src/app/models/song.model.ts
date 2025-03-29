export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string;
  genres: string[];
  recordLabels: string[];
  country: string;
  year: number;
} 