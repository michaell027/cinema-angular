import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { ErrorHandlerService } from '../../../services/error-handler-service/error-handler.service';
import { MovieService } from '../../../services/movie-service/movie.service';
import { FormsModule } from '@angular/forms';
import { ModalWindowComponent } from '../../../components/modal-window/modal-window.component';
import { RatingComponent } from '../../../components/rating/rating.component';
import { SessionTime } from '../../../models/session-time.model';
import { MovieSessionService } from '../../../services/movie-session-service/movie-session.service';
import { DeleteModalWindowComponent } from '../../../components/delete-modal-window/delete-modal-window.component';

@Component({
  selector: 'app-edit-movie-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ModalWindowComponent,
    RatingComponent,
    DeleteModalWindowComponent,
  ],
  templateUrl: './edit-movie-page.component.html',
  styleUrl: './edit-movie-page.component.css',
})
export class EditMoviePageComponent implements OnInit {
  id: number | undefined;
  movie?: Movie;
  isModalWindowOpen: boolean = false;
  showDeleteModal: boolean = false;
  selectedSession?: SessionTime;
  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private movieService: MovieService,
    private router: Router,
    private movieSessionService: MovieSessionService,
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
        this.router.navigate(['/admin/all']);
      });
    }
  }

  dateAndTimeToString(date: Date): string {
    return (
      date.toString().split('T')[0].split('-').reverse().join('.') +
      ' - ' +
      date.toString().split('T')[1].split(':').slice(0, -1).join(':')
    );
  }

  addSessionTime(): void {
    this.isModalWindowOpen = true;
  }

  closeModalWindow(eventData: { isOpen: boolean; isAdded: boolean }) {
    if (eventData.isAdded) {
      this.ngOnInit();
    }
    this.isModalWindowOpen = eventData.isOpen;
  }

  deleteSessionTime(session: SessionTime): void {
    // if (this.movie && this.id) {
    //   this.movieSessionService
    //     .deleteMovieSession(this.id, session)
    //     .subscribe((status) => {
    //       console.log(status);
    //       this.ngOnInit();
    //     });
    // }
    this.selectedSession = session;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
  }

  deleteSessionTimeConfirmed($event: void) {
    if (this.movie && this.id) {
      if (this.movie && this.id) {
        this.movieSessionService
          .deleteMovieSession(this.id, this.selectedSession!)
          .subscribe((status) => {
            console.log(status);
            this.ngOnInit();
          });
      }
    }
    this.showDeleteModal = false;
  }
}
