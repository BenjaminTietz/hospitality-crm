import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Bookings } from '../../models/bookings.class';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Properties } from '../../models/properties.class';

@Component({
  selector: 'app-dialog-add-booking',
  templateUrl: './dialog-add-booking.component.html',
  styleUrls: ['./dialog-add-booking.component.scss']
})
export class DialogAddBookingComponent {

  range = new FormGroup({
    checkIn: new FormControl<Date | null>(null),
    checkOut: new FormControl<Date | null>(null),
    pricePerNight: new FormControl<number>(0),
  });

  booking = new Bookings();
  loading = false;

  properties: Properties[] = [];

  apartmentPrices: { [key: string]: number } = {
    one: 100,
    two: 150,
    three: 120,
  };

  constructor(public dialogRef: MatDialogRef<DialogAddBookingComponent>, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.fetchProperties();
  }

  private formatDate(date: Date): string {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  saveBooking() {
    console.log(this.booking);
    this.loading = true;
  
    // Extrahiere Start- und Enddatum aus dem FormGroup
    let checkInDate = this.range.controls.checkIn.value;
    let checkOutDate = this.range.controls.checkOut.value;
  
    // Berechne die Dauer des Aufenthalts in Nächten
    let duration = checkInDate && checkOutDate ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
    // Finde das entsprechende Apartment in den Properties
    let selectedApartment = this.properties.find(property => property.name === this.booking.apartment);
  
    // Überprüfe, ob das Apartment gefunden wurde
    if (selectedApartment) {
      // Berechne den Gesamtpreis basierend auf dem Preis pro Nacht aus der Datenbank
      let totalPrice = duration * selectedApartment.price;
  
      // Weise die berechneten Daten dem booking-Objekt zu
      this.booking.checkIn = checkInDate ? this.formatDate(checkInDate) : '';
      this.booking.checkOut = checkOutDate ? this.formatDate(checkOutDate) : '';
      this.booking.duration = duration;
      this.booking.totalPrice = totalPrice;
  
      // Füge das Buchungsobjekt zur Firestore-Sammlung hinzu
      (async () => {
        try {
          let result = await this.firestore.collection('bookings').add(this.booking.toJSON());
          console.log('Adding booking finished', result);
        } catch (error) {
          console.error('Error adding booking', error);
        }
        this.loading = false;
        this.dialogRef.close();
      })();
    } else {
      console.error('Selected apartment not found in properties.');
      this.loading = false;
    }
  }

  fetchProperties() {
    this.firestore.collection<Properties>('properties').valueChanges().subscribe((properties: Properties[]) => {
      this.properties = properties as Properties[]; // Update the type of 'properties' to be an array of 'Properties' objects
    });
  }
}




