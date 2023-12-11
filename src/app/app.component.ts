import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BottomNavigationComponent,
    RouterOutlet,
    ErrorMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  http = inject(HttpClient);
  title = 'cinema';
}
