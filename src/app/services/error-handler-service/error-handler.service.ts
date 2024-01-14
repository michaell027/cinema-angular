import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface ErrorMessage {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorOccurred = new Subject<string>();
  private errorTimeout: any;

  handleError(error: HttpErrorResponse): void {
    console.error(error);
    clearTimeout(this.errorTimeout);

    if (error.status === 0) {
      this.errorOccurred.next('Could not connect to server');
    } else {
      let errorMessage = error.message || 'Unknown error occurred';
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
      this.errorOccurred.next(errorMessage);
    }

    this.errorTimeout = setTimeout(() => {
      this.errorOccurred.next('');
    }, 5000);
  }

  handleErrorMessage(error: ErrorMessage): void {
    console.error(error);
    clearTimeout(this.errorTimeout);
    this.errorOccurred.next(error.message);
    this.errorTimeout = setTimeout(() => {
      this.errorOccurred.next('');
    }, 5000);
  }
}
