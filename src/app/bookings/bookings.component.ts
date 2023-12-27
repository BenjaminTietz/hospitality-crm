import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBookingComponent } from '../dialog-add-booking/dialog-add-booking.component';
import { Bookings } from '../../models/bookings.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {

  booking:Bookings = new Bookings();  // variable user is of type User (: User in this case its any) and is a new instance of User class
  
  allBookings:any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

   }

  ngOnInit(): void {
    this.firestore
    .collection('bookings')
    .valueChanges({ idField: 'id'})
    .subscribe((changes: any) => {
      console.log('Recived changes from database:', changes);
      this.allBookings = changes;
    });
  }


  openDialog() {
    this.dialog.open(DialogAddBookingComponent);
  }
}





