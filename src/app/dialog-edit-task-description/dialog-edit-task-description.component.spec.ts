import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTaskDescriptionComponent } from './dialog-edit-task-description.component';

describe('DialogEditTaskDescriptionComponent', () => {
  let component: DialogEditTaskDescriptionComponent;
  let fixture: ComponentFixture<DialogEditTaskDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditTaskDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditTaskDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
