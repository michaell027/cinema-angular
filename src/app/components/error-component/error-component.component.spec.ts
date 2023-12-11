import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErorComponentComponent } from './error-component.component';

describe('ErorComponentComponent', () => {
  let component: ErorComponentComponent;
  let fixture: ComponentFixture<ErorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErorComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
