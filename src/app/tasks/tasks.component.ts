import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasks } from '../../models/tasks.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  task:Tasks = new Tasks();  
  allTasks:any = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

   }

  ngOnInit(): void {
    this.firestore
    .collection('tasks')
    .valueChanges({ idField: 'id'})
    .subscribe((changes: any) => {
      this.allTasks = changes;
    });
  }


  openDialog() {
    this.dialog.open(DialogAddTaskComponent);
    console.log('Task', this.task);
  }

  deleteTask(event: Event, task: Tasks, taskId: string) {
    event.stopPropagation();  
    if (task) {
      this.firestore.collection('tasks').doc(taskId).delete().then(() => {
      }).catch((error) => {
        console.error('Error deleting task:', error);
      });
    } else {
      console.error('Task ID is missing.');
    }
  }  
}


