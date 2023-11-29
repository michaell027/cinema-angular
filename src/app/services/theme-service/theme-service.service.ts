import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  private theme = 'light';

  constructor() {}

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  get currentTheme(): string {
    return this.theme;
  }
}
