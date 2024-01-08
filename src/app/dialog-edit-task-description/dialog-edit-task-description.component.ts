import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-task-description',
  templateUrl: './dialog-edit-task-description.component.html',
  styleUrl: './dialog-edit-task-description.component.scss'
})
export class DialogEditTaskDescriptionComponent implements OnInit {

  loading = false;
  task = new Tasks();
  taskId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditTaskDescriptionComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTaskDescription() {
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
