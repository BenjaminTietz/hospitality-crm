import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Bookings } from '../../models/bookings.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditBookingComponent } from '../dialog-edit-booking/dialog-edit-booking.component';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent implements OnInit {
  bookingId = '';
  booking: Bookings = new Bookings();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookingId = params.get('id') ?? '';
      console.log('Booking ID: ' + this.bookingId);
      this.getBooking();
    });
  }

  getBooking(): void {
    this.firestore
      .collection('bookings')
      .doc(this.bookingId)
      .valueChanges()
      .subscribe((bookings: any) => {
        this.booking = new Bookings(bookings);
        console.log('Got Booking', this.booking);
      });
  }

  editBooking() {
    const dialog = this.dialog.open(DialogEditBookingComponent);
    dialog.componentInstance.booking = new Bookings(this.booking.toJSON());
    dialog.componentInstance.bookingId = this.bookingId;
  }
}
