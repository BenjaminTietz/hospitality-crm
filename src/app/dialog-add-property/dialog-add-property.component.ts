import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-property',
  templateUrl: './dialog-add-property.component.html',
  styleUrl: './dialog-add-property.component.scss',
})
export class DialogAddPropertyComponent {
  amenities = new FormControl('');

  amenitiesList: string[] = ['Aircon', 'King-size Bed', 'Fireplace', 'TV', 'Netflix', 'Wifi'];
  property = new Properties();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddPropertyComponent>,private firestore: AngularFirestore) {

  }

  saveProperty() {
    console.log(this.property);
    this.loading = true;
    (async () => {
      try {
        // Füge die ausgewählten Annehmlichkeiten zum Eigenschaftenobjekt hinzu
        this.property.amenities = (this.amenities.value as string[] | null) ?? [] as unknown as string[];
  
        // Füge das Eigenschaftsobjekt zur Firestore-Sammlung hinzu
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
