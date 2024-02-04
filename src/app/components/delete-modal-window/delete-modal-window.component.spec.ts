import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalWindowComponent } from './delete-modal-window.component';

describe('DeleteModalWindowComponent', () => {
  let component: DeleteModalWindowComponent;
  let fixture: ComponentFixture<DeleteModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
