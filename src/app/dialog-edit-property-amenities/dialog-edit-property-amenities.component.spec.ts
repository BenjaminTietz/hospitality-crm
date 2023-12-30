import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPropertyAmenitiesComponent } from './dialog-edit-property-amenities.component';

describe('DialogEditPropertyAmenitiesComponent', () => {
  let component: DialogEditPropertyAmenitiesComponent;
  let fixture: ComponentFixture<DialogEditPropertyAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditPropertyAmenitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditPropertyAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
