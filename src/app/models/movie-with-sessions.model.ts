import { Movie } from './movie.model';
import { SessionTime } from './session-time.model';

export interface MovieWithSessionsModel {
  movie: Movie;
  sessions: SessionTime[];
}

export const cloneMovieWithSessions = (
  movieWithSessions: MovieWithSessionsModel,
): MovieWithSessionsModel => {
  return {
    movie: { ...movieWithSessions.movie },
    sessions: [...movieWithSessions.sessions],
  };
};
