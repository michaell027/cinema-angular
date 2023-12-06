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

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, RouterLinkActive],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent implements OnInit {
  sliderBgClasses: string = '';
  day: string;
  movies: MovieWithSessionsModel[];

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private movieService: MovieService,
  ) {
    this.day = this.getDay();
    this.movies = this.getTodayMovies();
  }

  ngOnInit() {
    this.activated.params.subscribe((params) => {
      if (params['day']) {
        this.day = params['day'];
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
    const dayNum = new Date().getDay();
    return daysOfWeek[dayNum];
  }

  getTodayMovies(): MovieWithSessionsModel[] {
    this.movieService.getTodayMovies().subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
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
}
