import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AvailabilityUpdateDto, BookingAddDto } from '../../Models/PropertyDetials';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = environment.baseUrl;

  addBooking(userId: string, bookingDto: BookingAddDto): Observable<boolean> {
    const url = `${this.baseUrl}Booking/AddBooking`; // Adjust endpoint as per your API

    return this.http.post<boolean>(url, { userId, ...bookingDto });
  }

  updateAvailability(propertyId: number, updateDto: AvailabilityUpdateDto): Observable<AvailabilityUpdateDto> {
    const dtoToSend = {
      ...updateDto,
      From: updateDto.From.toISOString(), // Convert Date to ISO string
      To: updateDto.To.toISOString() // Convert Date to ISO string
    };
    return this.http.put<AvailabilityUpdateDto>(`${this.baseUrl}AppointmentAvailable/UpdateAppoinmentAvail/${propertyId}`, dtoToSend);
  }

}
