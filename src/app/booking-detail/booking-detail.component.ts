import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookingId = params.get('id') ?? '';
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
      });
  }

  editBooking() {
    const dialog = this.dialog.open(DialogEditBookingComponent);
    dialog.componentInstance.booking = new Bookings(this.booking.toJSON());
    dialog.componentInstance.bookingId = this.bookingId;
  }

  deleteBooking(event: Event, booking: Bookings) {
    event.stopPropagation();  
    if (booking) {
      this.firestore.collection('bookings').doc(this.bookingId).delete().then(() => {
      this.router.navigate(['/bookings']);
      }).catch((error) => {
        console.error('Error deleting booking:', error);
      });
    } else {
      console.error('Booking ID is missing.');
    }
  }
}
