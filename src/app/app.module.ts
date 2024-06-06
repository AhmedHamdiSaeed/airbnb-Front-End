import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './Components/Header/header/header.component';

import { NotfoundComponent } from './Components/notFound/notfound/notfound.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { UserprofileComponent } from './Components/user-profile/userprofile/userprofile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Shared/Footer/footer/footer.component';
import { AuthInterceptor } from './Shared/interceptors/auth.interceptor';
import { BookingComponent } from './Components/booking/booking.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
