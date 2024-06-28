import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NotfoundComponent } from './Components/notFound/notfound/notfound.component';
import { UserprofileComponent } from './Components/user-profile/userprofile/userprofile.component';
import { BookingComponent } from './Components/booking/booking.component';
import { AuthGuard } from './Guard/auth.guard';
import { HeaderComponent } from './Components/Header/header/header.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { PropertyDetailsComponent } from './Components/properties/property-details/property-details.component';

import { CategoryComponent } from './Components/category/category.component';
import { HomeComponent } from './Components/home/home.component';

import { AddAmentityComponent } from './Components/properties/property-control/add-amentity/add-amentity.component';
import { AddAppoinmentavailableComponent } from './Components/properties/property-control/add-appoinmentavailable/add-appoinmentavailable.component';
import { AddPropertyComponent } from './Components/properties/property-control/add-property/add-property.component';
import { AddPropimagesComponent } from './Components/properties/property-control/add-propimages/add-propimages.component';
import { HosterPropertyComponent } from './Components/properties/property-control/hoster-property/hoster-property.component';
import { PropertyControlComponent } from './Components/properties/property-control/property-control.component';
import { AlluserbookingComponent } from './Components/booking/alluserbooking/alluserbooking.component';
import { UserBookingDetailsComponent } from './Components/booking/user-booking-details/user-booking-details.component';
import { HosterBookingDetailsComponent } from './Components/booking/hoster-booking-details/hoster-booking-details.component';
import { AdminDashbaordComponent } from './Components/admin-dashbaord/admin-dashbaord.component';
import { CityControlComponent } from './Components/admin-dashbaord/city-control/city-control.component';
import { CategoryControlComponent } from './Components/admin-dashbaord/category-control/category-control.component';
import { CountryControlComponent } from './Components/admin-dashbaord/country-control/country-control.component';
import { UserControlComponent } from './Components/admin-dashbaord/user-control/user-control.component';
import { AdminProprtycontrolComponent } from './Components/admin-dashbaord/admin-proprtycontrol/admin-proprtycontrol.component';
import { NoAuthGuard } from './Guard/noauth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signin', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  {
    path: 'userprofile',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'property', component: PropertiesComponent },
  {
    path: 'hosterPropereties',
    component: HosterPropertyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Host'] },
  },
  { path: 'addProperty', component: AddPropertyComponent },
  { path: 'profile', component: UserprofileComponent },
  {
    path: 'propertyControl',
    component: PropertyControlComponent,
    children: [
      { path: 'amentity', component: AddAmentityComponent },
      { path: 'propImage', component: AddPropimagesComponent },
      { path: 'updateProperty', component: AddPropertyComponent },
      {
        path: 'appoinmentAvailable',
        component: AddAppoinmentavailableComponent,
      },
    ],
  },

  { path: 'PropDetails/:id', component: PropertyDetailsComponent },
  // ------------------------------------------------ Start Booking
  {
    path: 'Booking',
    component: BookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'BookingDetails/:id',
    component: UserBookingDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'hosterBookingDetails/:id',
    component: HosterBookingDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Host'] },
  },
  // ------------------------------------------------ End Booking

  {
    path: 'admin',
    loadChildren: () =>
      import('./Components/admin/admin.module').then((e) => e.adminModule),
  },
  {
    path: 'Header',
    component: HeaderComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Host'] },
  },
  { path: 'alluserBooking', component: AlluserbookingComponent },
  { path: 'userBookingDetails/:id', component: UserBookingDetailsComponent },
  {
    path: 'AdminDashbaord',
    component: AdminDashbaordComponent,

    children: [
      { path: 'cityControl', component: CityControlComponent },
      { path: 'categoryControl', component: CategoryControlComponent },
      { path: 'countryControl', component: CountryControlComponent },
      {
        path: 'userControl',
        component: UserControlComponent,
      },
      {
        path: 'adminPropControl',
        component: AdminProprtycontrolComponent,
      },
    ],
  },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
