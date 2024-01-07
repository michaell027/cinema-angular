import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  private handleError(error: HttpErrorResponse | TypeError) {
    let errorMessage = '';
    if (!navigator.onLine) {
      errorMessage = 'No internet connection';
    } else if (error.message === 'Failed to fetch') {
      errorMessage = "Server isn't available or there's a CORS issue";
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = "Server isn't available";
      } else if (error.status === 404) {
        errorMessage = 'Resource not found (404)';
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    this.errorHandler.changeErrorMessage(errorMessage);
    return throwError(errorMessage);
  }

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.movieUrl + 'all')
      .pipe(catchError(this.handleError.bind(this)));
  }

  getTodayMovies(): Observable<MovieWithSessionsModel[]> {
    return this.http
      .get<MovieWithSessionsModel[]>(this.sessionUrl + 'today')
      .pipe(catchError(this.handleError.bind(this)));
  }

  getMoviesByDay(day: string): Observable<MovieWithSessionsModel[]> {
    return this.http
      .get<MovieWithSessionsModel[]>(this.sessionUrl + day)
      .pipe(catchError(this.handleError.bind(this)));
  }
}
