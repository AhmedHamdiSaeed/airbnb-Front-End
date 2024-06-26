import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from './Services/UserServices/profileservices.service';
import { Observable } from 'rxjs';
import { userToken } from './Models/User';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private accoutService: ProfileservicesService
  ) {}
  showFooter = true;
  ngOnInit(): void {
    this.currentUser$ = this.accoutService.currentUser$;
    this.loadCurrentUser();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.showFooter = !e.url.includes('/admin');
      }
    });
  }
  /**
   *
   */
  currentUser$: Observable<userToken>;

  loadCurrentUser() {
    const tokenValue = localStorage.getItem('token');

    this.accoutService.loadCurrentUser(tokenValue).subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
