import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTaskPriorityComponent } from './dialog-edit-task-priority.component';

describe('DialogEditTaskPriorityComponent', () => {
  let component: DialogEditTaskPriorityComponent;
  let fixture: ComponentFixture<DialogEditTaskPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditTaskPriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditTaskPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
