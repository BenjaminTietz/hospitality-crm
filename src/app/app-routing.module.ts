import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './services/auth.guard';
import { GuestComponent } from './guest/guest.component';
import { BookingsComponent } from './bookings/bookings.component';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PropertyComponent } from './property/property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'properties', component: PropertyComponent, canActivate: [AuthGuard] },
    { path: 'properties/:id', component: PropertyDetailComponent, canActivate: [AuthGuard]  },
    { path: 'guests', component: GuestComponent, canActivate: [AuthGuard]  },
    { path: 'guests/:id', component: GuestDetailComponent, canActivate: [AuthGuard]  },
    { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]  },
    { path: 'bookings/:id', component: BookingDetailComponent, canActivate: [AuthGuard]  },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },                       // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
