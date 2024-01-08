import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTaskStatusComponent } from './dialog-edit-task-status.component';

describe('DialogEditTaskStatusComponent', () => {
  let component: DialogEditTaskStatusComponent;
  let fixture: ComponentFixture<DialogEditTaskStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditTaskStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditTaskStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
