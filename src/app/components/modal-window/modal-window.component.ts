import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SessionTime } from '../../models/session-time.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieSessionService } from '../../services/movie-session-service/movie-session.service';
import { DatePipe } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgOptimizedImage],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css',
  providers: [DatePipe],
})
export class ModalWindowComponent implements OnChanges {
  @Input() title = '';
  @Input() id = 0;
  @Input() duration = 0;
  @Output() closeModalEvent = new EventEmitter<{
    isOpen: boolean;
    isAdded: boolean;
  }>();

  newSessionTime: SessionTime = {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + this.duration * 60000),
    price: 0,
  };

  startTimeString = this.transformDate(this.newSessionTime.startTime);
  endTimeString = this.transformDate(this.newSessionTime.endTime);
  minDate = this.transformDate(new Date());

  constructor(
    private movieSessionService: MovieSessionService,
    private datePipe: DatePipe,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  closeModalWindow() {
    this.closeModalEvent.emit({ isOpen: false, isAdded: false });
  }

  addMovieSession() {
    if (this.newSessionTime.price <= 0) {
      this.errorHandlerService.handleErrorMessage({
        message: 'Price should be greater than 0',
      });
      return;
    }
    this.movieSessionService
      .addMovieSession(this.id, this.newSessionTime)
      .subscribe((response) => {
        console.log(response);
        this.closeModalEvent.emit({ isOpen: false, isAdded: true });
      });
  }

  updateEndTime() {
    const startDateTime = new Date(this.startTimeString);
    const endDateTime = new Date(
      startDateTime.getTime() + this.duration * 60000,
    );
    this.newSessionTime.startTime = startDateTime;
    this.newSessionTime.endTime = endDateTime;
    this.endTimeString = this.transformDate(endDateTime);
  }

  transformDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm');
    if (formattedDate === null) {
      this.errorHandlerService.handleErrorMessage({
        message: 'Date is not valid',
      });
      return '';
    }
    return formattedDate;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('duration' in changes) {
      this.updateEndTime();
    }
  }
}
