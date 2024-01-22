import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  user: User = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  handleLogin() {
    this.authService.login(this.user).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/home']);
        }
      },
      () => {
        return EMPTY;
      },
    );
  }
}
