import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../Services/BookingServices/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  /**
   *
   */
  constructor(private bookingService: BookingService) {}
  ngOnInit(): void {}
  createPaymentIntent(id) {
    return this.bookingService.createOrUpdatePaymentIntent(id).subscribe({
      next: () => {
        alert('Payment Success');
      },
      error: (err) => {
        alert('Payment Failed');
      },
    });
  }
}
