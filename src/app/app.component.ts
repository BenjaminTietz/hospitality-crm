import { Component, OnInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    console.log('logout');
    this.afAuth.signOut().then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }
}
