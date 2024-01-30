import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { ErrorHandlerService } from '../../../services/error-handler-service/error-handler.service';
import { MovieService } from '../../../services/movie-service/movie.service';
import { FormsModule } from '@angular/forms';
import {ModalWindowComponent} from "../../../components/modal-window/modal-window.component";

@Component({
  selector: 'app-edit-movie-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ModalWindowComponent],
  templateUrl: './edit-movie-page.component.html',
  styleUrl: './edit-movie-page.component.css',
})
export class EditMoviePageComponent implements OnInit {
  id: number | undefined;
  movie?: Movie;
  currentItem: string = "aaa"
  isModalWindowOpen: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private movieService: MovieService,
    private router: Router,
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
        console.log(this.movie);
      });
    }
  }

  editMovie() {
    if (this.movie && this.id) {
      this.movieService.updateMovie(this.movie, this.id).subscribe((status) => {
        console.log(status);
        this.router.navigate(['/admin']);
      });
    }
  }

  dateAndTimeToString(date: Date): string {
    return date.toString().split('T')[0].split('-').reverse().join('.') + " - " + date.toString().split('T')[1].split(':').slice(0,-1).join(':')
  }

  addSessionTime():void {
    this.isModalWindowOpen = true;
  }

  closeModalWindow(value: boolean) {
    this.isModalWindowOpen = value;
  }
}
