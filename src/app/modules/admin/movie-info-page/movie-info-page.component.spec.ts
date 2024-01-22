import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoPageComponent } from './movie-info-page.component';

describe('MovieInfoPageComponent', () => {
  let component: MovieInfoPageComponent;
  let fixture: ComponentFixture<MovieInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieInfoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
