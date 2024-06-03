import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from './Services/UserServices/profileservices.service';
import { Observable } from 'rxjs';
import { userToken } from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private accoutService: ProfileservicesService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accoutService.currentUser$;
    this.loadCurrentUser();
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
