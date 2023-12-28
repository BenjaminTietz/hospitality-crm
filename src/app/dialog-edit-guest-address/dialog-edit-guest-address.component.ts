import { Component, OnInit } from '@angular/core';
import { Guests } from '../../models/guests.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-guest-address',
  templateUrl: './dialog-edit-guest-address.component.html',
  styleUrl: './dialog-edit-guest-address.component.scss'
})
export class DialogEditGuestAddressComponent implements OnInit {

  guest = new Guests();
  guestId: string | undefined;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditGuestAddressComponent>, private firestore: AngularFirestore) { }

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
