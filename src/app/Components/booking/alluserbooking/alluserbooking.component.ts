import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import {
  AddReviewModel,
  getAllBookingModel,
} from '../../../Models/Booking/bookingModels';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
//import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
@Component({
  selector: 'app-alluserbooking',
  templateUrl: './alluserbooking.component.html',
  styleUrl: './alluserbooking.component.css',
})
export class AlluserbookingComponent implements OnInit, AfterViewInit {
  allBooking: getAllBookingModel[];
  showConfirmationDialog: boolean = false;
  bookingIdToDelete: number;

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  async ngOnInit() {
    this.GetAllUserBooking();
    // Initialize dataSource with your data
    this.GetAllUserBooking();
    this.filteredData = this.dataSource;
    this.route.queryParams.subscribe((params) => {
      const totalPrice = params['totalPrice'];
      console.log('Total Price:', totalPrice);
    });
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
  openConfirmationDialog(bookingId: number): void {
    this.bookingIdToDelete = bookingId;
    this.showConfirmationDialog = true;
  }

  deleteBooking(confirmed: boolean): void {
    this.showConfirmationDialog = false;
    if (confirmed) {
      this.bookingService.deleteBooking(this.bookingIdToDelete).subscribe({
        next: () => {
          this.toastr.success('Booking deleted successfully');
          this.GetAllUserBooking();
        },
        error: (err) => {
          console.error('Error deleting booking:', err);
          this.toastr.error(
            'Failed to delete booking. Please try again later.'
          );
        },
      });
    }
  }
  // ----------------------------------------

  dataSource: any[] = [];
  filteredData: any[] = [];
  displayedColumns: string[] = [
    'propertyName',
    'hostName',
    'checkInDate',
    'checkOutDate',
    'totalPrice',
    'status',
    'Action',
  ];
  p: number = 1;

  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter(
      (item) =>
        item.propertyName.toLowerCase().includes(filterValue) ||
        item.hostName.toLowerCase().includes(filterValue)
    );
  }

  sortData(column: string): void {
    const sortedData = this.filteredData.sort((a, b) => {
      const isAsc = true;
      return this.compare(a[column], b[column], isAsc);
    });
    this.filteredData = sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
  AddReview(id: number, obj: AddReviewModel) {
    this.bookingService.AddReview(id, obj).subscribe({
      next: () => {
        alert('Review Added Successfuly');
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  ItemId: number;
  propId: string;
  popUpStatus: boolean = false;
  ShowPopUp(id, prid) {
    this.popUpStatus = true;
    this.itemId = id;
    this.propId = prid;
  }
}
