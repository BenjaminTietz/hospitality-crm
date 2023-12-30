import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Properties } from '../../models/properties.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-property-amenities',
  templateUrl: './dialog-edit-property-amenities.component.html',
  styleUrl: './dialog-edit-property-amenities.component.scss'
})
export class DialogEditPropertyAmenitiesComponent implements OnInit  {
  amenities = new FormControl('');

  amenitiesList: string[] = ['Aircon', 'King-size Bed', 'Fireplace', 'TV', 'Netflix', 'Wifi'];
 
  loading = false;
  property = new Properties();
  propertyId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogEditPropertyAmenitiesComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveProperty() {
    console.log(this.property);
    this.loading = true;
    (async () => {
      try {
        // Füge die ausgewählten Annehmlichkeiten zum Eigenschaftenobjekt hinzu
        this.property.amenities = (this.amenities.value as string[] | null) ?? [] as unknown as string[];
  
        // Aktualisiere das vorhandene Eigenschaftsobjekt in der Firestore-Sammlung
        if (this.propertyId) {
          await this.firestore.collection('properties').doc(this.propertyId).update(this.property.toJSON());
          console.log('Updating property finished');
        } else {
          console.error('Property ID is not defined');
        }
      } catch (error) {
        console.error('Error updating property', error);
      }
      this.loading = false;
      this.dialogRef.close();
    })();
  }
  

}
