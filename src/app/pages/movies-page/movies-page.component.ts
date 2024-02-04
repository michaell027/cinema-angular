import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MovieService } from '../../services/movie-service/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieWithSessionsModel } from '../../models/movie-with-sessions.model';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

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
  day: string = '';
  movies: MovieWithSessionsModel[] = [];
  date: string = '';
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  ngOnInit() {
    this.activated.params.subscribe((params) => {
      this.movies = [];
      if (params['date']) {
        this.date = params['date'];
        this.day = this.getDay();
        this.movies = this.getMoviesByDay(this.date);
      } else {
        const today = new Date().toISOString().split('T')[0];
        this.date = today;
        this.day = this.getDay();
        console.log(this.day);
        this.movies = this.getTodayMovies();
        this.router.navigate(['/movies', today]).then();
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
      console.log(movies);
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

  handleDayClick(dayIndex: number) {
    const todayIndex = new Date(this.date).getDay();
    const delta = dayIndex - todayIndex;
    const targetDate = new Date(this.date);
    targetDate.setDate(targetDate.getDate() + delta);
    this.date = targetDate.toISOString().split('T')[0];
    this.router.navigate(['/movies', this.date]).then();
    this.day = this.getDay();
    this.updateSliderBgClasses();
  }

  getDateForDayIndex(dayIndex: number): string {
    const todayIndex = new Date().getDay();
    const delta = dayIndex - todayIndex;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + delta);
    return targetDate.toISOString().split('T')[0];
  }

  selectedDayIndex(dayIndex: number): boolean {
    const dayNumber = new Date(this.date).getDay();
    return dayIndex === dayNumber;
  }

  handleChangeDate() {
    this.router.navigate(['/movies', this.date]).then();
    this.day = this.getDay();
    this.updateSliderBgClasses();
  }
}
