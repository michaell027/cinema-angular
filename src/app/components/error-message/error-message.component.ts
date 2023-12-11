import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { filter, Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  isShown: boolean = false;
  message: string = '';
  private errorSubscription: Subscription = new Subscription();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isShown = false;
        this.message = '';
      });

    this.errorSubscription =
      this.errorHandlerService.currentErrorMessage.subscribe((message) => {
        this.isShown = message !== '';
        this.message = message;
      });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
