import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input() rating!: number;
  fullStars!: number;
  halfStar!: boolean;
  emptyStars!: number;

  ngOnInit() {
    this.fullStars = Math.floor(this.rating);
    this.halfStar = this.rating % 1 !== 0;
    this.emptyStars = Math.floor(5 - this.rating);
  }

  getArray(length: number): any[] {
    return new Array(length);
  }
}
