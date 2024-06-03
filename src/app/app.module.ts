import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/Footer/footer/footer.component';
import { HeaderComponent } from './Components/Header/header/header.component';

import { NotfoundComponent } from './Components/notFound/notfound/notfound.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { UserprofileComponent } from './Components/user-profile/userprofile/userprofile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
