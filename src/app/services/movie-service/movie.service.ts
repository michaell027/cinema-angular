import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  url: string = 'http://localhost:8080/api/movies/';
  constructor(private http: HttpClient) {}

  getTodayMovies(): Observable<MovieWithSessionsModel[]> {
    return this.http.get<MovieWithSessionsModel[]>(this.url + 'today');
  }
}
