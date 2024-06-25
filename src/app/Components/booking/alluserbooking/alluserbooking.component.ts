import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import { getAllBookingModel } from '../../../Models/Booking/bookingModels';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
@Component({
  selector: 'app-alluserbooking',
  templateUrl: './alluserbooking.component.html',
  styleUrl: './alluserbooking.component.css',
})
export class AlluserbookingComponent implements OnInit, AfterViewInit {
  allBooking: getAllBookingModel[];

  /**
   *
   */
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  async ngOnInit() {
    this.GetAllUserBooking();
  }

  // ---------------------------------- GetAllUserBooking

  GetAllUserBooking() {
    this.bookingService
      .GetAllUserBooking()
      .subscribe((result: getAllBookingModel[]) => {
        console.log(result);
        this.allBooking = result;
      });
  }

  // ------------------------------------- Payment
  stripePublicKey = environment.stripePublicKey;
  itemId: number = 1;
  paymentStatus: boolean = false;
  handler: any = null;
  clientSecret: string;
  async ngAfterViewInit() {
    this.loadStripe();
  }
  pay(amount: number, bookingId: number) {
    this.bookingService
      .createOrUpdatePaymentIntent(bookingId)
      .subscribe((data: any) => {
        this.clientSecret = data.clientSecret;

        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PFwrL09IIqkgQENw9GXtMSJdwLV324mCyF8TP5XpJtUdQrbMeJKQOhc12yDXB0OiAgR3A5d9qDRoLVoLvPkrjBc00UQ48ODdT',
          locale: 'auto',
          token: (token: any) => {
            console.log(token);
            this.bookingService
              .UpdateBooking(bookingId, { bookingStatus: 2 })
              .subscribe({
                next: () => {
                  this.GetAllUserBooking();
                  alert('Payment Success!!');
                },
                error: (err) => {
                  console.log(err);
                },
              });
          },
        });

        handler.open({
          name: 'Demo Site',
          description: '2 widgets',
          amount: amount * 100,
        });
      });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PFwrL09IIqkgQENw9GXtMSJdwLV324mCyF8TP5XpJtUdQrbMeJKQOhc12yDXB0OiAgR3A5d9qDRoLVoLvPkrjBc00UQ48ODdT',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);

            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
  // ----------------------------------------
}
