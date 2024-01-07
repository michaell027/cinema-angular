import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    duration: '',
    rating: 0,
    genre: '',
    releaseDate: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onSubmit() {
    this.movie.releaseDate = this.formatDate(this.movie.releaseDate);

    this.http
      .post('http://localhost:8080/api/movies/add', this.movie)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error(error);
        },
      );
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
