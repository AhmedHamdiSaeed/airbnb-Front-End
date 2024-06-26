import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import { getBookingUserDetailsModel } from '../../../Models/Booking/bookingModels';

@Component({
  selector: 'app-user-booking-details',
  templateUrl: './user-booking-details.component.html',
  styleUrl: './user-booking-details.component.css',
})
export class UserBookingDetailsComponent implements OnInit {
  bookingDetialsForUser: getBookingUserDetailsModel;

  // -------------------------------
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}
  id: number;
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.GetUserBookingetails(this.id);
  }

  // ---------------------------------- GetUserBookingetails
  GetUserBookingetails(bookingId: number) {
    this.bookingService
      .GetUserBookingetails(bookingId)
      .subscribe((result: getBookingUserDetailsModel) => {
        console.log(result);
        this.bookingDetialsForUser = result;
      });
  }
}
