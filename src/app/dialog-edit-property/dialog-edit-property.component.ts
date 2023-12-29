import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dialog-edit-property',
  templateUrl: './dialog-edit-property.component.html',
  styleUrl: './dialog-edit-property.component.scss'
})
export class DialogEditPropertyComponent implements OnInit  {

  loading = false;
  property = new Properties();
  propertyId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditPropertyComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveProperty() {
    this.loading = true;
    this.firestore.collection('properties')
    .doc(this.propertyId)
    .update(this.property.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
    .catch((error) => {
      this.loading = false;
      console.log('Error updating property', error);
    });
  }

}
