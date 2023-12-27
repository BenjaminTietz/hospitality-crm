import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBookingComponent } from './dialog-add-booking.component';

describe('DialogAddBookingComponent', () => {
  let component: DialogAddBookingComponent;
  let fixture: ComponentFixture<DialogAddBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
