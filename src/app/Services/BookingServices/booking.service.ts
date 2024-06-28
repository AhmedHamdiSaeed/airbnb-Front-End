import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import {
  AvailabilityUpdateDto,
  BookingAddDto,
} from '../../Models/PropertyDetials';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map } from 'rxjs';

import {
  AddReviewModel,
  PaymentBookingModel,
  addBookingModel,
  updateBookingModel,
} from '../../Models/Booking/bookingModels';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseUrl = `${environment.baseUrl}Booking/`;
  baseUrl2 = environment.baseUrl;
  constructor(private http: HttpClient) {}

  // ---------------------------------------------------------

  adddBooking(userId: string, bookingDto: BookingAddDto): Observable<number> {
    const url = `${this.baseUrl2}Booking/AdddBooking`;

    return this.http.post<number>(url, { userId, ...bookingDto });
  }

  updateAvailability(
    propertyId: number,
    updateDto: AvailabilityUpdateDto
  ): Observable<AvailabilityUpdateDto> {
    const dtoToSend = {
      ...updateDto,
      From: updateDto.From.toISOString(), // Convert Date to ISO string
      To: updateDto.To.toISOString(), // Convert Date to ISO string
    };
    return this.http.put<AvailabilityUpdateDto>(
      `${this.baseUrl2}AppointmentAvailable/UpdateAppoinmentAvail/${propertyId}`,
      dtoToSend
    );
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
      .get(`${this.baseUrl}BookingGetUserBookingetails/${bookingId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- AddBooking
  AddBooking(booking: addBookingModel) {
    return this.http.post(`${this.baseUrl}AddBooking`, booking).pipe(
      map((result) => {
        return result;
      })
    );
  }
  private BookingSource = new BehaviorSubject<PaymentBookingModel>(null);
  basket$ = this.BookingSource.asObservable();
  // ---------------------------------------------- Payment
  createOrUpdatePaymentIntent(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl2}Payment/Payment/${id}`, {});
  }

  getBookingForPayment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}Payment/getBookingForPayment/${id}`);
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}DeleteBooking/${bookingId}`);
  }

  // ------------------------------------------ Add Review
  AddReview(id: number, Obj: AddReviewModel) {
    return this.http.post(`${this.baseUrl2}Review/AddReview?id=${id}`, Obj);
  }
}
