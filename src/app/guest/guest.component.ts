import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddGuestComponent } from '../dialog-add-guest/dialog-add-guest.component';
import { Guests } from '../../models/guests.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

  guest:Guests = new Guests();  
  allGuests:any = [];



  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

   }

  ngOnInit(): void {
    this.firestore
    .collection('guests')
    .valueChanges({ idField: 'id'})
    .subscribe((changes: any) => {
      this.allGuests = changes;
    });
  }


  openDialog() {
    this.dialog.open(DialogAddGuestComponent);
  }

  deleteGuest(event: Event, guest: Guests, guestId: string) {
    event.stopPropagation();  
    if (guest) {
      this.firestore.collection('guests').doc(guestId).delete().then(() => {
      }).catch((error) => {
        console.error('Error deleting guest:', error);
      });
    } else {
      console.error('Guest ID is missing.');
    }
  }
}
