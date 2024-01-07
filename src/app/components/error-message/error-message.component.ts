import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  message: string = '';
  isShown: boolean = false;
  private errorSub: Subscription | undefined;

  constructor(private errorService: ErrorHandlerService) {}

  ngOnInit() {
    this.errorSub = this.errorService.errorOccurred.subscribe(
      (errorMessage) => {
        this.message = errorMessage;
        this.isShown = !!errorMessage;
      },
    );
  }

  ngOnDestroy() {
    this.errorSub?.unsubscribe();
  }

  close() {
    this.isShown = false;
  }
}
