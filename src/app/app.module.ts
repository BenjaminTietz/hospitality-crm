import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GuestComponent } from './guest/guest.component';
import { DialogAddGuestComponent } from './dialog-add-guest/dialog-add-guest.component';
import { DialogAddBookingComponent } from './dialog-add-booking/dialog-add-booking.component';
import { BookingsComponent } from './bookings/bookings.component';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { NgChartsModule } from 'ng2-charts';
import { DialogEditGuestComponent } from './dialog-edit-guest/dialog-edit-guest.component';
import { DialogEditGuestAddressComponent } from './dialog-edit-guest-address/dialog-edit-guest-address.component';
import { DialogEditBookingComponent } from './dialog-edit-booking/dialog-edit-booking.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PropertyComponent } from './property/property.component';
import { DialogAddPropertyComponent } from './dialog-add-property/dialog-add-property.component';
import { DialogEditPropertyComponent } from './dialog-edit-property/dialog-edit-property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { InfoComponent } from './info/info.component';
import { DialogEditPropertyAddressComponent } from './dialog-edit-property-address/dialog-edit-property-address.component';
import { DialogEditPropertyAmenitiesComponent } from './dialog-edit-property-amenities/dialog-edit-property-amenities.component';
import { TasksComponent } from './tasks/tasks.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { TasksDetailComponent } from './tasks-detail/tasks-detail.component';
import { DialogEditTaskStatusComponent } from './dialog-edit-task-status/dialog-edit-task-status.component';
import { DialogEditTaskPriorityComponent } from './dialog-edit-task-priority/dialog-edit-task-priority.component';
import { DialogEditTaskDescriptionComponent } from './dialog-edit-task-description/dialog-edit-task-description.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    GuestComponent,
    DialogAddGuestComponent,
    DialogAddBookingComponent,
    BookingsComponent,
    GuestDetailComponent,
    BookingDetailComponent,
    DialogEditGuestComponent,
    DialogEditGuestAddressComponent,
    DialogEditBookingComponent,
    ImprintComponent,
    PrivacyPolicyComponent,
    PropertyComponent,
    DialogAddPropertyComponent,
    DialogEditPropertyComponent,
    PropertyDetailComponent,
    InfoComponent,
    DialogEditPropertyAddressComponent,
    DialogEditPropertyAmenitiesComponent,
    TasksComponent,
    DialogAddTaskComponent,
    TasksDetailComponent,
    DialogEditTaskStatusComponent,
    DialogEditTaskPriorityComponent,
    DialogEditTaskDescriptionComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    NgChartsModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
