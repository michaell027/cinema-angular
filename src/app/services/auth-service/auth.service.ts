import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

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

  login(user: User): Observable<ResponseProps> {
    return this.http.post<ResponseProps>(this.userUrl + 'login', user).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return throwError(error);
      }),
    );
  }
}
