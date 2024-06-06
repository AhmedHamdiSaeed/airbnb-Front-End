import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NotfoundComponent } from './Components/notFound/notfound/notfound.component';
import { UserprofileComponent } from './Components/user-profile/userprofile/userprofile.component';
import { BookingComponent } from './Components/booking/booking.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userprofile', component: UserprofileComponent },
  {
    path: 'Booking',
    component: BookingComponent,
    //canActivate: [AuthGuard],
    //data: { role: 'admin' },
  },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
