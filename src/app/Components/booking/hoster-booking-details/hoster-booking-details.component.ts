import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import {
  getPropertyBookingDetailsModel,
  updateBookingModel,
} from '../../../Models/Booking/bookingModels';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hoster-booking-details',
  templateUrl: './hoster-booking-details.component.html',
  styleUrl: './hoster-booking-details.component.css',
})
export class HosterBookingDetailsComponent implements OnInit {
  /**
   *
   */
  constructor(
    private bookingServie: BookingService,
    private activeRouter: ActivatedRoute
  ) {}
  id: number;
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.GetPropertyBookingDetails(this.id);
  }

  bookingDetails: getPropertyBookingDetailsModel[];
  GetPropertyBookingDetails(id) {
    this.bookingServie
      .GetPropertyBookingDetails(id)
      .subscribe((result: getPropertyBookingDetailsModel[]) => {
        this.bookingDetails = result;
        console.log(result);
      });
  }

  UpdateBooking(response: string, bookingId: number) {
    if (response == 'confirm') {
      this.bookingServie
        .UpdateBooking(bookingId, { bookingStatus: 2 })
        .subscribe({
          next: () => {
            this.GetPropertyBookingDetails(bookingId);
            alert('Booking Confirmed');
          },
          error: (err) => {
            alert('Cannot Change Canceled Booking Status');
            console.log(err);
          },
        });
    } else if (response == 'cancel') {
      this.bookingServie
        .UpdateBooking(bookingId, { bookingStatus: 3 })
        .subscribe({
          next: () => {
            this.GetPropertyBookingDetails(bookingId);
            alert('Booking Cnaceld');
          },
          error: (err) => {
            alert('Cannot Change Canceled Booking Status');
            console.log(err);
          },
        });
    } else if (response == 'waitForPayment') {
      this.bookingServie
        .UpdateBooking(bookingId, { bookingStatus: 1 })
        .subscribe({
          next: () => {
            alert('Booking Confirm To Payment');
          },
          error: (err) => {
            alert('Cannot Change Canceled Booking Status');
            console.log(err);
          },
        });
    }
  }
}
