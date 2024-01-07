import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private cdr: ChangeDetectorRef // Fügen Sie ChangeDetectorRef hinzu
  ) {}

  ngOnInit(): void {}

  logout() {
    console.log('logout');
    this.afAuth.signOut().then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  ngAfterViewInit() {
    this.checkWindowWidth();
  }

  private checkWindowWidth() {
    if (this.drawer) {
      let windowWidth = window.innerWidth;

      if (windowWidth <= 1000) {
        this.drawer.close();
        this.cdr.detectChanges(); 
      }
      if (windowWidth > 1000) {
        this.drawer.open();
        this.cdr.detectChanges(); 
      }
    }
  }

  closeSidenavAfterClick() {
    this.checkWindowWidth();
  }
}
