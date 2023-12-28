import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Guests } from '../../models/guests.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-guest',
  templateUrl: './dialog-edit-guest.component.html',
  styleUrl: './dialog-edit-guest.component.scss'
})
export class DialogEditGuestComponent implements OnInit {

  loading = false;
  guest = new Guests();
  guestId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditGuestComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.firestore.collection('guests')
    .doc(this.guestId)
    .update(this.guest.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
    .catch((error) => {
      this.loading = false;
      console.log('Error updating guest', error);
    });
  }
}
