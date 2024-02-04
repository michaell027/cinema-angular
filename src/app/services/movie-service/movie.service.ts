import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { Movie } from '../../models/movie.model';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  sessionUrl: string = 'http://localhost:8080/api/movies-sessions/';
  movieUrl: string = 'http://localhost:8080/api/movies/';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
  ) {}

  getMovies(): Observable<Movie[]> {
    const token = this.authService.getToken();
    return this.http
      .get<Movie[]>(this.movieUrl + 'all', {
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
    const token = this.authService.getToken();
    return this.http
      .get<MovieWithSessionsModel[]>(this.sessionUrl + day, {
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

  getMovieById(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(this.movieUrl + movieId).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return throwError(error);
      }),
    );
  }

  addMovie(movie: Movie, token: string): Observable<Movie> {
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

  updateMovie(movie: Movie, movieId: number): Observable<Movie> {
    const token = this.authService.getToken();
    return this.http
      .put<Movie>(this.movieUrl + 'update/' + movieId, movie, {
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

  deleteMovie(movieId: number): Observable<Movie> {
    const token = this.authService.getToken();
    return this.http
      .delete<Movie>(this.movieUrl + 'delete/' + movieId, {
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
