import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = '';

  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';

    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
  }

  setTheme(theme: string): void {
    this.theme = theme;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', this.theme);
  }

  get currentTheme(): string {
    return this.theme;
  }
}
