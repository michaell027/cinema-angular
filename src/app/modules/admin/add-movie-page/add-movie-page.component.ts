import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { MovieService } from '../../../services/movie-service/movie.service';
import { ErrorHandlerService } from '../../../services/error-handler-service/error-handler.service';

@Component({
  selector: 'app-add-movie-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie-page.component.html',
  styleUrl: './add-movie-page.component.css',
})
export class AddMoviePageComponent {
  movie = {
    title: '',
    description: '',
    duration: 0,
    genre: '',
    releaseDate: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private movieService: MovieService,
    private errorService: ErrorHandlerService,
  ) {}

  onSubmit() {
    console.log(this.movie);
    if (this.movie.title === '') {
      this.errorService.handleErrorMessage({ message: 'Title is required' });
      return;
    }
    if (this.movie.description === '') {
      this.errorService.handleErrorMessage({
        message: 'Description is required',
      });
      return;
    }
    if (this.movie.duration === 0) {
      this.errorService.handleErrorMessage({ message: 'Duration is required' });
      return;
    }
    if (this.movie.genre === '') {
      this.errorService.handleErrorMessage({ message: 'Genre is required' });
      return;
    }
    if (this.movie.releaseDate === '') {
      this.errorService.handleErrorMessage({
        message: 'Release date is required',
      });
      return;
    }

    this.movie.releaseDate = this.formatDate(this.movie.releaseDate);
    const token = localStorage.getItem('token') || '';
    this.movieService.addMovie(this.movie, token).subscribe(
      (_) => {
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
