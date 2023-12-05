import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent implements OnInit {
    sliderBgClasses: string = ''

    constructor(private router: Router, private activated: ActivatedRoute) {
      // get the day from the route paramsmap
      this.activated.params.subscribe(params => {
        const day = params['day'];
        this.sliderBgClasses = `ml-${day}`;
      });
    }

    ngOnInit() {
      const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayNum = new Date().getDay();
      const day = daysOfWeek[dayNum];

      this.router.navigate(['/movies', day]).then();
    }
}
