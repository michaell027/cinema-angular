import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { SessionTime } from '../../models/session-time.model';
import { Movie } from '../../models/movie.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieSessionService {
  movieSessionUrl: string = 'http://localhost:8080/api/movies-sessions/';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
  ) {}

  addMovieSession(id: number, session: SessionTime) {
    const token = this.authService.getToken();
    return this.http
      .put<Movie>(this.movieSessionUrl + 'add/' + id, session, {
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

  deleteMovieSession(id: number, session: SessionTime) {
    const token = this.authService.getToken();
    return this.http
      .delete<Movie>(this.movieSessionUrl + 'delete/' + id, {
        headers: {
          Authorization: `${token}`,
        },
        body: session,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }
}
