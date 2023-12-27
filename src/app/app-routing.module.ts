import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './services/auth.guard';
import { GuestComponent } from './guest/guest.component';
import { BookingsComponent } from './bookings/bookings.component';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'guests', component: GuestComponent },
    { path: 'guests/:id', component: GuestDetailComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: 'bookings/:id', component: BookingDetailComponent },

    { path: '**', component: HomeComponent },                       // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
