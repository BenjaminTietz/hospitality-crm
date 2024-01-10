import { Component, OnInit, inject } from '@angular/core';
import { Tasks } from '../../models/tasks.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrl: './dialog-add-task.component.scss'
})
export class DialogAddTaskComponent {

  task = new Tasks();
  loading = false;
  properties: Properties[] = [];

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,private firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
    this.fetchProperties();
  }

  saveTask() {
    console.log('Task', this.task);
     this.loading = true;
    (async () => {
      try {
        const result = await this.firestore.collection('tasks').add(this.task.toJSON());
        console.log('Adding task finished', result);
      } catch (error) {
        console.error('Error adding task', error);
      }
      this.loading = false;
      this.dialogRef.close();
    })();
  }

  fetchProperties() {
    this.firestore.collection<Properties>('properties').valueChanges().subscribe((properties: Properties[]) => {
      this.properties = properties as Properties[];
    });
  }
}
