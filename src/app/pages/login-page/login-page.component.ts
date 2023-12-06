import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {}
