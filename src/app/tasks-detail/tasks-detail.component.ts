import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Tasks } from '../../models/tasks.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditTaskStatusComponent } from '../dialog-edit-task-status/dialog-edit-task-status.component';
import { DialogEditTaskPriorityComponent } from '../dialog-edit-task-priority/dialog-edit-task-priority.component';
import { DialogEditTaskDescriptionComponent } from '../dialog-edit-task-description/dialog-edit-task-description.component';

@Component({
  selector: 'app-tasks-detail',
  templateUrl: './tasks-detail.component.html',
  styleUrl: './tasks-detail.component.scss'
})
export class TasksDetailComponent implements OnInit {
  taskId = '';
  task: Tasks = new Tasks();

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id') ?? '';
      this.getTask();
    });
    console.log(this.task);
  }

  getTask(): void {
    this.firestore.collection('tasks')
    .doc(this.taskId)
    .valueChanges()
    .subscribe((tasks:any) => { 
      this.task = new Tasks(tasks);
    });
  }

  editTaskStatus() {
    const dialog = this.dialog.open(DialogEditTaskStatusComponent);
    dialog.componentInstance.task = new Tasks(this.task.toJSON());
    dialog.componentInstance.taskId = this.taskId;
  }

  editTaskPriority() {
    const dialog = this.dialog.open(DialogEditTaskPriorityComponent);
    dialog.componentInstance.task = new Tasks(this.task.toJSON());
    dialog.componentInstance.taskId = this.taskId;
  }

  deleteTask() {
    this.firestore.collection('tasks').doc(this.taskId).delete().then(() => {
    }).catch((error) => {
      console.error('Error deleting task:', error);
    });
    this.router.navigate(['/tasks']);
  }

  editTaskDescription() {
    const dialog = this.dialog.open(DialogEditTaskDescriptionComponent);
    dialog.componentInstance.task = new Tasks(this.task.toJSON());
    dialog.componentInstance.taskId = this.taskId;
  }
}
