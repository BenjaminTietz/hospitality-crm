import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Guests } from '../../models/guests.class';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrl: './guest-detail.component.scss'
})
export class GuestDetailComponent implements OnInit {

  guestId = '';
  guest: Guests = new Guests();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.guestId = params.get('id') ?? '';
      console.log('Guest ID: ' + this.guestId);
      this.getGuest();
    });
  }

  getGuest(): void {
    this.firestore.collection('guests')
    .doc(this.guestId)
    .valueChanges()
    .subscribe((guests:any) => { 
      this.guest = new Guests(guests);
      console.log('Got Guest',this.guest);
    });
  }
}
