import { Component, OnInit, inject } from '@angular/core';
import { Guests } from '../../models/guests.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-guest',
  templateUrl: './dialog-add-guest.component.html',
  styleUrl: './dialog-add-guest.component.scss'
})
export class DialogAddGuestComponent {

  guest = new Guests();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddGuestComponent>,private firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
  }

  saveUser() {
    console.log(this.guest);
    this.loading = true;
    (async () => {
      try {
        const result = await this.firestore.collection('guests').add(this.guest.toJSON());
        console.log('Adding guest finished', result);
      } catch (error) {
        console.error('Error adding guest', error);
      }
      this.loading = false;
      this.dialogRef.close();
    })();
  }
}

