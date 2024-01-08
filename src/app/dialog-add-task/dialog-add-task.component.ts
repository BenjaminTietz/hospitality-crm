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
    console.log(this.task);
    this.loading = true;
    // Konvertiere das Datum ins gewünschte Format (Tag/Monat/Jahr)
    if (this.task.date) {
      this.task.date = new Date(this.task.date); // Convert string date to Date object
    }
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
  
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  fetchProperties() {
    this.firestore.collection<Properties>('properties').valueChanges().subscribe((properties: Properties[]) => {
      this.properties = properties as Properties[];
    });
  }
}
