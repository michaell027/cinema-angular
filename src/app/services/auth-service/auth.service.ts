import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../models/user.model";
import {BehaviorSubject, map, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ErrorHandlerService} from "../error-handler-service/error-handler.service";

export interface ResponseProps {
  role: string;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUrl: string = 'http://localhost:8080/api/users/';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  login(user: User): Observable<Boolean> {
    return this.http
      .post<ResponseProps>(this.userUrl + 'login', user)
      .pipe(map((response) => {
          console.log(response);
          localStorage.setItem('role', response.role);
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }
  private get token(): string {
    return localStorage.getItem('token') || ''
  }

  private set token(value: string) {
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
    }
  }

  private loggedUserSubject = new BehaviorSubject(this.username)
  private get username(): string {
    return localStorage.getItem('username') || ''
  }

  private set username(value: string) {
    if (value) {
      localStorage.setItem('username', value)
    } else {
      localStorage.removeItem('username')
    }

    this.loggedUserSubject.next(value)
  }

  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable()
  }

  public logout(): void {
    this.token = ''
    this.username = ''
  }

  isLoggedIn(): boolean {
    return !!this.token
  }
}
