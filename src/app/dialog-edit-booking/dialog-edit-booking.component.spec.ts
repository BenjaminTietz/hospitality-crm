import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBookingComponent } from './dialog-edit-booking.component';

describe('DialogEditBookingComponent', () => {
  let component: DialogEditBookingComponent;
  let fixture: ComponentFixture<DialogEditBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
