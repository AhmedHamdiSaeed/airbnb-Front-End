import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';
import { BookingService } from '../../Services/BookingServices/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getAllBookingModel,
  getPropertyBookingDetailsModel,
  getBookingUserDetailsModel,
  updateBookingModel,
  addBookingModel,
} from '../../Models/Booking/bookingModels';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  // --------------------------------------\
  allBooking: getAllBookingModel[];
  propertyBookingDetailsForHoster: getPropertyBookingDetailsModel;
  bookingDetialsForUser: getBookingUserDetailsModel;

  // --------------------------------------------------------------
  // ---------------------------------- GetAllBookingForProperty
  GetAllBookingForProperty(propertyId: number) {
    this.bookingService
      .GetAllBookingForProperty(propertyId)
      .subscribe((result: getAllBookingModel[]) => {
        this.allBooking = result;
      });
  }

  // ---------------------------------- GetPropertyBookingDetails
  GetPropertyBookingDetailsForHoster(bookingId: number) {
    this.bookingService
      .GetPropertyBookingDetails(bookingId)
      .subscribe((result: getPropertyBookingDetailsModel) => {
        this.propertyBookingDetailsForHoster = result;
      });
  }
  // ---------------------------------- UpdateBooking
  UpdateBooking(bookingId: number, selectedBooking: updateBookingModel) {
    this.bookingService.UpdateBooking(bookingId, selectedBooking).subscribe({
      next: () => {
        alert('Booking Updated Successfully');
      },
      error: () => {
        alert('Error In Update Booking');
      },
    });
  }

  // ---------------------------------- AddBooking
  AddBooking(booking: addBookingModel) {
    this.bookingService.AddBooking(booking).subscribe({
      next: () => {
        alert('Add Booking Successfuly');
      },
      error: (err) => {
        alert('Error In Add New Booking' + err);
      },
    });
  }
}
