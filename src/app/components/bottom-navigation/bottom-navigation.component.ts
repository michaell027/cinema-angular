import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme.service';
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  viewProviders: [provideIcons({ heroSun, heroMoon })],
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css'],
})
export class BottomNavigationComponent implements OnInit {
  theme = this.themeService.currentTheme;
  isAdmin = false;
  isLogged = false;

  constructor(private themeService: ThemeService, private authService: AuthService) {

  }

  ngOnInit() {
    this.theme = this.themeService.currentTheme;

    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }

    this.authService.loggedUser().subscribe(user => {
      if (user) {
        this.isLogged = true;
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.currentTheme;
  }

  handleLogout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }
}
