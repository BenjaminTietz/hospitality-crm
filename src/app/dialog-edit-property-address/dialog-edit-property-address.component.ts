import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-property-address',
  templateUrl: './dialog-edit-property-address.component.html',
  styleUrl: './dialog-edit-property-address.component.scss'
})
export class DialogEditPropertyAddressComponent implements OnInit {
  loading = false;
  property = new Properties();
  propertyId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditPropertyAddressComponent>, private firestore: AngularFirestore) { }

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
