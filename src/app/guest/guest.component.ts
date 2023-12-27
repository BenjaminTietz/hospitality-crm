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

  guest:Guests = new Guests();  // variable user is of type User (: User in this case its any) and is a new instance of User class
  
  allGuests:any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

   }

  ngOnInit(): void {
    this.firestore
    .collection('guests')
    .valueChanges({ idField: 'id'})
    .subscribe((changes: any) => {
      console.log('Recived changes from database:', changes);
      this.allGuests = changes;
    });
  }


  openDialog() {
    this.dialog.open(DialogAddGuestComponent);
  }
}
