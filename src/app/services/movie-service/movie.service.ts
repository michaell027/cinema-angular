import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { catchError } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  sessionUrl: string = 'http://localhost:8080/api/movies-sessions/';
  movieUrl: string = 'http://localhost:8080/api/movies/';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieUrl + 'all').pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
    );
  }

  getTodayMovies(): Observable<MovieWithSessionsModel[]> {
    return this.http
      .get<MovieWithSessionsModel[]>(this.sessionUrl + 'today')
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  getMoviesByDay(day: string): Observable<MovieWithSessionsModel[]> {
    return this.http.get<MovieWithSessionsModel[]>(this.sessionUrl + day).pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
    );
  }
}
