import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddGuestComponent } from './dialog-add-guest.component';

describe('DialogAddGuestComponent', () => {
  let component: DialogAddGuestComponent;
  let fixture: ComponentFixture<DialogAddGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
