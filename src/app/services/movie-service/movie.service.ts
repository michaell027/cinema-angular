import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieService {
  url: string = 'http://localhost:8080/api/movies-sessions/';
  constructor(private http: HttpClient) {}

  getTodayMovies(): Observable<MovieWithSessionsModel[]> {
    return this.http.get<MovieWithSessionsModel[]>(this.url + 'today').pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
    );
  }

  getMoviesByDay(day: string): Observable<MovieWithSessionsModel[]> {
    return this.http.get<MovieWithSessionsModel[]>(this.url + day).pipe(
      catchError((error: any) => {
        return throwError(error);
      }),
    );
  }
}
