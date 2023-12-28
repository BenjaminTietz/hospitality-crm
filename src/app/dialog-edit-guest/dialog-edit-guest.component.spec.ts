import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGuestComponent } from './dialog-edit-guest.component';

describe('DialogEditGuestComponent', () => {
  let component: DialogEditGuestComponent;
  let fixture: ComponentFixture<DialogEditGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
