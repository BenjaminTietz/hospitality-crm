import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGuestAddressComponent } from './dialog-edit-guest-address.component';

describe('DialogEditGuestAddressComponent', () => {
  let component: DialogEditGuestAddressComponent;
  let fixture: ComponentFixture<DialogEditGuestAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditGuestAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditGuestAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
