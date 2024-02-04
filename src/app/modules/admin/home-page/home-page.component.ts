import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie-service/movie.service';
import { Movie } from '../../../models/movie.model';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { DeleteModalWindowComponent } from '../../../components/delete-modal-window/delete-modal-window.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteModalWindowComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  movies: Movie[] = [];
  showModal: boolean = false;
  selectedMovie?: Movie;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }
  closeModal() {
    this.showModal = false;
  }

  deleteMovie(id: number) {
    this.selectedMovie = this.movies.find((movie) => movie.id === id);
    this.showModal = true;
  }

  deleteMovieConfirmed($event: void) {
    if (this.selectedMovie) {
      this.movieService.deleteMovie(this.selectedMovie.id!).subscribe(() => {
        this.movies = this.movies.filter(
          (movie) => movie.id !== this.selectedMovie?.id,
        );
      });
    }
    this.showModal = false;
  }
}
