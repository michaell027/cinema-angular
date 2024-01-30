import { TestBed } from '@angular/core/testing';

import { MovieSessionService } from './movie-session.service';

describe('MovieSessionService', () => {
  let service: MovieSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
