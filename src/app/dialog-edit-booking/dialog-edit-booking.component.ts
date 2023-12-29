import { Component, OnInit } from '@angular/core';
import { Bookings } from '../../models/bookings.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-booking',
  templateUrl: './dialog-edit-booking.component.html',
  styleUrl: './dialog-edit-booking.component.scss'
})
export class DialogEditBookingComponent implements OnInit {

  range = new FormGroup({
    checkIn: new FormControl<Date | null>(null),
    checkOut: new FormControl<Date | null>(null),
    pricePerNight: new FormControl<number>(0),
  });

  apartmentPrices: { [key: string]: number } = {
    one: 100,
    two: 150,
    three: 120,
  };

  loading = false;
  booking = new Bookings();
  bookingId:  string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditBookingComponent>, private firestore: AngularFirestore) { }

  
  ngOnInit(): void {

  }
  
  private formatDate(date: Date): string {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  saveBooking() {
    this.loading = true;
    
    // Übernehme die Werte aus dem FormGroup ins booking-Objekt
    this.booking.checkIn = this.formatDate(this.range.controls.checkIn.value!);
    this.booking.checkOut = this.formatDate(this.range.controls.checkOut.value!);
    
    // Berechne die Dauer des Aufenthalts in Nächten
    let checkInDate = new Date(this.booking.checkIn);
    let checkOutDate = new Date(this.booking.checkOut);
    let duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Bestimme den Preis pro Nacht basierend auf der ausgewählten Wohnung
    let apartmentPrice = this.apartmentPrices[this.booking.apartment];
  
    // Berechne den Gesamtpreis
    let totalPrice = duration * apartmentPrice;
  
    // Aktualisiere die Werte im booking-Objekt
    this.booking.duration = duration;
    this.booking.totalPrice = totalPrice;
  
    // Füge weitere Werte hinzu, die du aktualisieren möchtest
  
    this.firestore.collection('bookings')
      .doc(this.bookingId)
      .update(this.booking.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch((error) => {
        this.loading = false;
        console.log('Error updating booking', error);
      });
  }
}
