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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userprofile', component: UserprofileComponent },

  { path: 'property', component: PropertiesComponent },
  { path: 'hosterPropereties', component: HosterPropertyComponent },
  { path: 'addProperty', component: AddPropertyComponent },
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
  {
    path: 'Booking',
    component: BookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'Header',
    component: HeaderComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Host'] },
  },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
