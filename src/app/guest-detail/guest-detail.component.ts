import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Guests } from '../../models/guests.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditGuestAddressComponent } from '../dialog-edit-guest-address/dialog-edit-guest-address.component';
import { DialogEditGuestComponent } from '../dialog-edit-guest/dialog-edit-guest.component';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrl: './guest-detail.component.scss'
})
export class GuestDetailComponent implements OnInit {

  guestId = '';
  guest: Guests = new Guests();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.guestId = params.get('id') ?? '';
      this.getGuest();
    });
  }

  getGuest(): void {
    this.firestore.collection('guests')
    .doc(this.guestId)
    .valueChanges()
    .subscribe((guests:any) => { 
      this.guest = new Guests(guests);
    });
  }


  editGuest() {
    const dialog = this.dialog.open(DialogEditGuestAddressComponent);
    dialog.componentInstance.guest = new Guests(this.guest.toJSON());
    dialog.componentInstance.guestId = this.guestId;
  }

  editGuestDetail() {
    const dialog = this.dialog.open(DialogEditGuestComponent);
    dialog.componentInstance.guest = new Guests(this.guest.toJSON());
    dialog.componentInstance.guestId = this.guestId;
  }
}
