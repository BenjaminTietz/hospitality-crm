import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPropertyAddressComponent } from './dialog-edit-property-address.component';

describe('DialogEditPropertyAddressComponent', () => {
  let component: DialogEditPropertyAddressComponent;
  let fixture: ComponentFixture<DialogEditPropertyAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditPropertyAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditPropertyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
