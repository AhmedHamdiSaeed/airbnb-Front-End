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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, DoCheck {
  ngOnInit(): void {
    this.currentUser$ = this.service.currentUser$;
    this.username = localStorage.getItem('username');
  }

  /**
   *
   */
  constructor(private service: ProfileservicesService) {}
  ngDoCheck(): void {
    this.username = localStorage.getItem('username');
  }

  currentUser$: Observable<userToken>;
  navBarStatus: boolean = false;
  username: string;
  showNavBar() {
    this.navBarStatus = true;
  }
  closeNavBar() {
    this.navBarStatus = false;
  }
  LogOut() {
    this.service.LogOut();
  }
}
