import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BottomNavigationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cinema';
}
