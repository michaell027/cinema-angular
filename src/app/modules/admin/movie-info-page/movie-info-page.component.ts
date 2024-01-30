import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler-service/error-handler.service';
import { MovieService } from '../../../services/movie-service/movie.service';
import { Movie } from '../../../models/movie.model';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-movie-info-page',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './movie-info-page.component.html',
  styleUrl: './movie-info-page.component.css',
})
export class MovieInfoPageComponent implements OnInit {
  id: number | undefined;
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private movieService: MovieService,
  ) {
    this.route.params.subscribe((params) => {
      if (params['movieId']) {
        this.id = params['movieId'];
      }
    });
  }

  ngOnInit() {
    if (!this.id) {
      this.errorHandler.handleErrorMessage({ message: 'Movie not found' });
    } else {
      this.movieService.getMovieById(this.id.toString()).subscribe((movie) => {
        this.movie = movie;
      });
    }
  }
}
