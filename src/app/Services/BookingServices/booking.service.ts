import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import {
  addBookingModel,
  updateBookingModel,
} from '../../Models/Booking/bookingModels';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements OnInit {
  baseUrl = `${environment.baseUrl}Booking/`;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // --------------------------------------- GetAllBookingForProperty
  GetAllBookingForProperty(propertyId: number) {
    return this.http
      .get(`${this.baseUrl}GetAllBookingForProperty/${propertyId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // --------------------------------------- GetPropertyBookingDetails
  GetPropertyBookingDetails(bookingId: number) {
    return this.http
      .get(`${this.baseUrl}GetPropertyBookingDetails/${bookingId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- UpdateBooking
  UpdateBooking(bookingId: number, selectedBooking: updateBookingModel) {
    return this.http
      .put(`${this.baseUrl}UpdateBooking/${bookingId}`, selectedBooking)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- GetAllUserBooking
  GetAllUserBooking() {
    return this.http.get(`${this.baseUrl}GetAllUserBooking`).pipe(
      map((result) => {
        return result;
      })
    );
  }
  // --------------------------------------- GetUserBookingetails
  GetUserBookingetails(bookingId: number) {
    return this.http
      .get(`${this.baseUrl}GetUserBookingetails/${bookingId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- AddBooking
  AddBooking(booking: addBookingModel) {
    return this.http.post(`${this.baseUrl}AddBooking`, { booking }).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
