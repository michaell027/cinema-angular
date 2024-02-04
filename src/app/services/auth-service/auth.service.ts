import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { BehaviorSubject, EMPTY, map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { of } from 'rxjs';

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
  private loggedUserSubject = new BehaviorSubject(this.username);

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  login(user: User): Observable<Boolean> {
    return this.http.post<ResponseProps>(this.userUrl + 'login', user).pipe(
      map((response) => {
        localStorage.setItem('role', response.role);
        this.token = response.token;
        this.username = response.username;
        this.isAdmin().subscribe((isAdmin) => {
          if (isAdmin) {
            console.log('admin');
          } else {
            console.log('not admin');
          }
        });

        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return throwError(error);
      }),
    );
  }

  private get role(): Promise<string> {
    return new Promise((resolve) => {
      this.isAdmin().subscribe((isAdmin) => {
        if (isAdmin) {
          resolve('ADMIN');
        } else {
          resolve('USER');
        }
      });
    });
  }

  private set role(value: string) {
    if (value) {
      localStorage.setItem('role', value);
    } else {
      localStorage.removeItem('role');
    }
  }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  getToken(): string {
    return this.token;
  }

  private set token(value: string) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  private get username(): string {
    return localStorage.getItem('username') || '';
  }

  private set username(value: string) {
    if (value) {
      localStorage.setItem('username', value);
    } else {
      localStorage.removeItem('username');
    }

    this.loggedUserSubject.next(value);
  }

  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }

  logout(): Observable<boolean> {
    return this.http
      .post<boolean>(
        this.userUrl + 'logout',
        {},
        {
          headers: {
            Authorization: `${this.token}`,
          },
        },
      )
      .pipe(
        map((response) => {
          localStorage.removeItem('role');
          this.token = '';
          this.username = '';

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return throwError(error);
        }),
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http
      .post<boolean>(
        this.userUrl + 'check',
        {},
        {
          headers: {
            Authorization: `${this.token}`,
          },
        },
      )
      .pipe(
        map((response) => {
          console.log(response);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return of(false);
        }),
      );
  }

  isAdmin(): Observable<boolean> {
    return this.http
      .get<string>(this.userUrl + 'get-role', {
        headers: {
          Authorization: `${this.token}`,
        },
      })
      .pipe(
        map((response) => {
          return response === 'ADMIN';
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          return of(false);
        }),
      );
  }

  disableLogin(): void {
    localStorage.removeItem('role');
    this.loggedUserSubject.next('');
    this.username = '';
    this.token = '';
  }
}
