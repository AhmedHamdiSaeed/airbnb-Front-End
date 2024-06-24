import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/Header/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NotfoundComponent } from './Components/notFound/notfound/notfound.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { UserprofileComponent } from './Components/user-profile/userprofile/userprofile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';

import { FooterComponent } from './Shared/Footer/footer/footer.component';
import { AuthInterceptor } from './Shared/interceptors/auth.interceptor';
import { BookingComponent } from './Components/booking/booking.component';
import { LoadingInterceptor } from './Shared/interceptors/loading.interceptor';
import { PropertiesComponent } from './Components/properties/properties.component';
import { PropertyDetailsComponent } from './Components/properties/property-details/property-details.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './Components/home/home.component';
import { adminModule } from './Components/admin/admin.module';
import { CategoryComponent } from './Components/category/category.component';

import { PropertyControlComponent } from './Components/properties/property-control/property-control.component';
import { AddPropertyComponent } from './Components/properties/property-control/add-property/add-property.component';
import { AddPropimagesComponent } from './Components/properties/property-control/add-propimages/add-propimages.component';
import { AddAppoinmentavailableComponent } from './Components/properties/property-control/add-appoinmentavailable/add-appoinmentavailable.component';
import { AddAmentityComponent } from './Components/properties/property-control/add-amentity/add-amentity.component';
import { HosterPropertyComponent } from './Components/properties/property-control/hoster-property/hoster-property.component';
import { AlluserbookingComponent } from './Components/booking/alluserbooking/alluserbooking.component';
import { UserBookingDetailsComponent } from './Components/booking/user-booking-details/user-booking-details.component';
import { HosterBookingDetailsComponent } from './Components/booking/hoster-booking-details/hoster-booking-details.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent,
    NotfoundComponent,
    LoginComponent,
    UserprofileComponent,
    NavbarComponent,
    BookingComponent,
    PropertiesComponent,
    PropertyDetailsComponent,
    HomeComponent,
    CategoryComponent,
    PropertyControlComponent,
    AddPropertyComponent,
    AddPropimagesComponent,
    AddAppoinmentavailableComponent,
    AddAmentityComponent,
    HosterPropertyComponent,
    AlluserbookingComponent,
    UserBookingDetailsComponent,
    HosterBookingDetailsComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    adminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:7116/'], // Replace with your API domain
        disallowedRoutes: [
          'https://localhost:7116/api/User/Register',
          'https://localhost:7116/api/User/login',

          'https://localhost:7116/api/User/get-current-user',
        ], // Replace with your auth route
      },
    }),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
