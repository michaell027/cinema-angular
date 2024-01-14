import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { Movie } from '../../models/movie.model';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  sessionUrl: string = 'http://localhost:8080/api/movies-sessions/';
  movieUrl: string = 'http://localhost:8080/api/movies/';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieUrl + 'all').pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return throwError(error);
      }),
    );
  }

  getTodayMovies(): Observable<MovieWithSessionsModel[]> {
    return this.http
      .get<MovieWithSessionsModel[]>(this.sessionUrl + 'today')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }

  getMoviesByDay(day: string): Observable<MovieWithSessionsModel[]> {
    return this.http.get<MovieWithSessionsModel[]>(this.sessionUrl + day).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return throwError(error);
      }),
    );
  }

  addMovie(movie: Movie, token: string): Observable<Movie> {
    console.log(movie);
    console.log(token);
    return this.http
      .post<Movie>(this.movieUrl + 'add', movie, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }
}
