import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';

@Component({
  selector: 'app-dialog-add-property',
  templateUrl: './dialog-add-property.component.html',
  styleUrl: './dialog-add-property.component.scss'
})
export class DialogAddPropertyComponent {

  property = new Properties();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddPropertyComponent>,private firestore: AngularFirestore) {

  }

  saveProperty() {
    console.log(this.property);
    this.loading = true;
    (async () => {
      try {
        const result = await this.firestore.collection('properties').add(this.property.toJSON());
        console.log('Adding property finished', result);
      } catch (error) {
        console.error('Error adding property', error);
      }
      this.loading = false;
      this.dialogRef.close();
    })();
  }

}
