import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorHandlerService} from "../error-handler-service/error-handler.service";
import {SessionTime} from "../../models/session-time.model";
import {Movie} from "../../models/movie.model";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieSessionService {

  movieSessionUrl: string = 'http://localhost:8080/api/movies-sessions/';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  addMovieSession(id: number, session: SessionTime) {
    return this.http
      .put<Movie>(this.movieSessionUrl + 'add/' + id, session)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }
}
