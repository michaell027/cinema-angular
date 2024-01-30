import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const errorHandlingService = inject(ErrorHandlerService);

  return authService.isLoggedIn().pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        authService.disableLogin();
        router.navigate(['/login']);
        errorHandlingService.handleErrorMessage({
          message: 'Token expired. Please login again.',
        });
        authService.isAdmin().pipe(
          tap((isAdmin: boolean) => {
            if (!isAdmin) {
              router.navigate(['/home']);
              errorHandlingService.handleErrorMessage({
                message: 'You are not authorized to access this page.',
              });
            }
          }),
        );
      }
    }),
  );
};
