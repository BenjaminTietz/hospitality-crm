import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Properties } from '../../models/properties.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPropertyComponent } from '../dialog-edit-property/dialog-edit-property.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit  {

  propertyId = '';
  property: Properties = new Properties();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id') ?? '';
      console.log('Property ID: ' + this.propertyId);
      this.getProperty();
    });
  }

  getProperty(): void {
    this.firestore.collection('properties')
    .doc(this.propertyId)
    .valueChanges()
    .subscribe((properties:any) => { 
      this.property = new Properties(properties);
      console.log('Got property',this.property);
    });
  }

  editProperty() {
    const dialog = this.dialog.open(DialogEditPropertyComponent);
    dialog.componentInstance.property = new Properties(this.property.toJSON());
    dialog.componentInstance.propertyId = this.propertyId;
  }

  editPropertyDetail() {
 

  }
}
