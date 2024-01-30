import { SessionTime } from './session-time.model';

export interface Movie {
  id?: number;
  title: string;
  description: string;
  duration: number;
  rating?: number;
  genre: string;
  releaseDate: string;
  movieSessions?: SessionTime[];
}
