import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPropertyComponent } from '../dialog-add-property/dialog-add-property.component';
import { Properties } from '../../models/properties.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent {

  property:Properties = new Properties();  // variable user is of type User (: User in this case its any) and is a new instance of User class
  
  allProperties:any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
    .collection('properties')
    .valueChanges({ idField: 'id'})
    .subscribe((changes: any) => {
      this.allProperties = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddPropertyComponent);
  }
}
