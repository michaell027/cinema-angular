import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MovieService } from '../../services/movie-service/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent implements OnInit {
  sliderBgClasses: string = '';
  day: string;
  movies: MovieWithSessionsModel[];
  date: string;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private movieService: MovieService,
  ) {
    const today = new Date();
    this.date = today.toISOString().split('T')[0];

    this.day = this.getDay();
    this.router.navigate(['/movies', this.day]).then();
    this.movies = this.getMoviesByDay(this.date);
  }

  ngOnInit() {
    this.activated.params.subscribe((params) => {
      this.movies = [];
      if (params['day']) {
        this.day = params['day'];
        this.movies = this.getMoviesByDay(this.date);
      } else {
        this.router.navigate(['/movies', this.day]).then();
      }
      this.updateSliderBgClasses();
    });
  }

  updateSliderBgClasses() {
    this.sliderBgClasses = `ml-${this.day}`;
  }

  getDay(): string {
    const daysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const dayNum = new Date(this.date).getDay();
    return daysOfWeek[dayNum];
  }

  getTodayMovies(): MovieWithSessionsModel[] {
    this.movieService.getTodayMovies().subscribe((movies) => {
      this.movies = movies;
    });
    return this.movies;
  }

  getMoviesByDay(date: string): MovieWithSessionsModel[] {
    this.movieService.getMoviesByDay(date).subscribe((movies) => {
      this.movies = movies;
    });
    return this.movies;
  }

  extractTime(dateTimeString: Date) {
    const dateTime = new Date(dateTimeString);
    let hours: number = dateTime.getHours();
    let minutes: number = dateTime.getMinutes();

    const hoursString: string = hours < 10 ? '0' + hours : hours.toString();
    const minutesString: string =
      minutes < 10 ? '0' + minutes : minutes.toString();

    return hoursString + ':' + minutesString;
  }

  handleChangeDate() {
    this.day = this.getDay();
    this.router.navigate(['/movies', this.day]).then();
  }

  handleDayClick(dayIndex: number) {
    const todayIndex = new Date(this.date).getDay();
    const delta = dayIndex - todayIndex;
    const targetDate = new Date(this.date);
    targetDate.setDate(targetDate.getDate() + delta);
    this.date = targetDate.toISOString().split('T')[0];
    this.handleChangeDate();
  }
}
