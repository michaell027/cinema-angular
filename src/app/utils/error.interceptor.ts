import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler-service/error-handler.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(ErrorHandlerService);
  return next(req).pipe(
    catchError((error) => {
      service.changeErrorMessage(error.error);
      console.log('error interceptor ' + error.error);
      return throwError(() => error.error);
    }),
  );
};
