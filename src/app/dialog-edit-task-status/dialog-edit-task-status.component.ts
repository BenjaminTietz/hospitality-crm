import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-task-status',
  templateUrl: './dialog-edit-task-status.component.html',
  styleUrl: './dialog-edit-task-status.component.scss'
})
export class DialogEditTaskStatusComponent implements OnInit {

  loading = false;
  task = new Tasks();
  taskId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditTaskStatusComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTaskStatus() {
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
