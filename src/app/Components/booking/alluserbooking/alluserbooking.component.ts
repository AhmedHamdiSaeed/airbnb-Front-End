import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import { getAllBookingModel } from '../../../Models/Booking/bookingModels';

@Component({
  selector: 'app-alluserbooking',
  templateUrl: './alluserbooking.component.html',
  styleUrl: './alluserbooking.component.css',
})
export class AlluserbookingComponent implements OnInit {
  allBooking: getAllBookingModel[];

  /**
   *
   */
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  // ---------------------------------- GetAllUserBooking

  GetAllUserBooking() {
    this.bookingService
      .GetAllUserBooking()
      .subscribe((result: getAllBookingModel[]) => {
        console.log(result);
        this.allBooking = result;
      });
  }

  // ----------------------------------------
  ngOnInit(): void {
    this.GetAllUserBooking();
  }
}
