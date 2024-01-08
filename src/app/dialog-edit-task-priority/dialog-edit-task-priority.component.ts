import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-task-priority',
  templateUrl: './dialog-edit-task-priority.component.html',
  styleUrl: './dialog-edit-task-priority.component.scss'
})
export class DialogEditTaskPriorityComponent implements OnInit {

  loading = false;
  task = new Tasks();
  taskId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditTaskPriorityComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTaskPriority() {
    this.loading = true;
    this.firestore.collection('tasks')
    .doc(this.taskId)
    .update(this.task.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
    .catch((error) => {
      this.loading = false;
      console.log('Error updating task', error);
    });
  }
}
