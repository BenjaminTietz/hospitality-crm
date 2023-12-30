import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Properties } from '../../models/properties.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPropertyComponent } from '../dialog-edit-property/dialog-edit-property.component';
import { DialogEditPropertyAddressComponent } from '../dialog-edit-property-address/dialog-edit-property-address.component';
import { DialogEditPropertyAmenitiesComponent } from '../dialog-edit-property-amenities/dialog-edit-property-amenities.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit  {

  propertyId = '';
  property: Properties = new Properties();

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id') ?? '';
      this.getProperty();
    });
  }

  getProperty(): void {
    this.firestore.collection('properties')
    .doc(this.propertyId)
    .valueChanges()
    .subscribe((properties:any) => { 
      this.property = new Properties(properties);
    });
  }

  editProperty() {
    const dialog = this.dialog.open(DialogEditPropertyComponent);
    dialog.componentInstance.property = new Properties(this.property.toJSON());
    dialog.componentInstance.propertyId = this.propertyId;
  }

  editPropertyAddress() {
    const dialog = this.dialog.open(DialogEditPropertyAddressComponent);
    dialog.componentInstance.property = new Properties(this.property.toJSON());
    dialog.componentInstance.propertyId = this.propertyId;
  }

  editPropertyAmenities() {
    const dialog = this.dialog.open(DialogEditPropertyAmenitiesComponent);
    dialog.componentInstance.property = new Properties(this.property.toJSON());
    dialog.componentInstance.propertyId = this.propertyId;
  }

  deleteProperty(event: Event, property: Properties) {
    event.stopPropagation();  
    if (property) {
      this.firestore.collection('properties').doc(this.propertyId).delete().then(() => {
        this.router.navigate(['/properties']);
      }).catch((error) => {
        console.error('Error deleting property:', error);
      });
    } else {
      console.error('Property ID is missing.');
    }
  }
}
