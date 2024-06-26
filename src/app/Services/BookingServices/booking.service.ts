import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AvailabilityUpdateDto, BookingAddDto } from '../../Models/PropertyDetials';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { addBookingModel, updateBookingModel } from '../../Models/Booking/bookingModels';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = environment.baseUrl;

  adddBooking(userId: string, bookingDto: BookingAddDto): Observable<number> {
    const url = `${this.baseUrl}Booking/AdddBooking`; 

    return this.http.post<number>(url, { userId, ...bookingDto });
  }

  updateAvailability(propertyId: number, updateDto: AvailabilityUpdateDto): Observable<AvailabilityUpdateDto> {
    const dtoToSend = {
      ...updateDto,
      From: updateDto.From.toISOString(), // Convert Date to ISO string
      To: updateDto.To.toISOString() // Convert Date to ISO string
    };
    return this.http.put<AvailabilityUpdateDto>(`${this.baseUrl}AppointmentAvailable/UpdateAppoinmentAvail/${propertyId}`, dtoToSend);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // --------------------------------------- GetAllBookingForProperty
  GetAllBookingForProperty(propertyId: number) {
    return this.http
      .get(`${this.baseUrl}Booking/GetAllBookingForProperty/${propertyId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // --------------------------------------- GetPropertyBookingDetails
  GetPropertyBookingDetails(bookingId: number) {
    return this.http
      .get(`${this.baseUrl}Booking/GetPropertyBookingDetails/${bookingId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- UpdateBooking
  UpdateBooking(bookingId: number, selectedBooking: updateBookingModel) {
    return this.http
      .put(`${this.baseUrl}Booking/UpdateBooking/${bookingId}`, selectedBooking)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  // --------------------------------------- GetAllUserBooking
  GetAllUserBooking() {
    return this.http.get(`${this.baseUrl}Booking/GetAllUserBooking`).pipe(
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
    return this.http.post(`${this.baseUrl}Booking/AddBooking`, { booking }).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
