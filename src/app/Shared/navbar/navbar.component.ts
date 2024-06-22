import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';
import { Observable } from 'rxjs';
import { userToken } from '../../Models/User';
import { AuthService } from '../../Services/UserServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, DoCheck {
  userName: string;
  userRole: string;
  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;

    this.userName = this.auth.getUserName();
    this.userRole = this.auth.getUserRole();
    console.log(this.userRole);
    console.log(this.userName);
  }

  /**
   *
   */
  constructor(
    private service: ProfileservicesService,
    private auth: AuthService
  ) {}
  ngDoCheck(): void {
    this.userRole = this.auth.getUserRole();
    this.userName = this.auth.getUserName();
  }

  currentUser$: Observable<userToken>;
  navBarStatus: boolean = false;

  showNavBar() {
    this.navBarStatus = true;
  }
  closeNavBar() {
    this.navBarStatus = false;
  }
  LogOut() {
    this.service.LogOut();
    this.userName = null;
    this.userRole = null;
  }

  // ------------- Profile Status
  profileStatus: boolean = false;
  changeProfileStatus() {
    this.profileStatus = !this.profileStatus;
    console.log(this.profileStatus);
  }
}
