import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { SessionTime } from '../../models/session-time.model';

@Component({
  selector: 'app-delete-modal-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal-window.component.html',
  styleUrl: './delete-modal-window.component.css',
})
export class DeleteModalWindowComponent {
  @Input() showModal!: boolean;
  @Input() movie!: Movie;
  @Input() isSessionTimeDelete!: boolean;
  @Input() sessionTime?: SessionTime;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() deleteMovie = new EventEmitter<void>();

  constructor() {}

  close() {
    this.closeModal.emit(false);
  }

  delete() {
    this.deleteMovie.emit();
  }

  dateToString(date: Date) {
    const dateString = date
      .toString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('.');
    const timeString = date.toString().split('T')[1];
    return dateString + ' ' + timeString.split('.')[0].slice(0, 5);
  }
}
