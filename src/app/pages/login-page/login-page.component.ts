import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  user: User = {email: "", password: ""};

  constructor(private authService: AuthService) {
  }

  handleLogin() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('role', response.role);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
