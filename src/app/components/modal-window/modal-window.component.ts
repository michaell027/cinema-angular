import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionTime} from "../../models/session-time.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieSessionService} from "../../services/movie-session-service/movie-session.service";

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css'
})
export class ModalWindowComponent {
  @Input() title = '';
  @Input() id = 0;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  newSessionTime: SessionTime = {
    startTime : new Date(),
    endTime : new Date(),
    price : 0
  }

  constructor(private movieSessionService: MovieSessionService) {
  }

  closeModalWindow() {
    this.closeModalEvent.emit(false);
  }

  addMovieSession() {
    this.movieSessionService.addMovieSession(this.id, this.newSessionTime).subscribe(response => console.log(response))
  }
}
