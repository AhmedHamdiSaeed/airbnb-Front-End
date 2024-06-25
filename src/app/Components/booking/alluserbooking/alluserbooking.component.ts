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
    private route: ActivatedRoute,
    private activateRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Initialize dataSource with your data
    this.GetAllUserBooking();
    this.filteredData = this.dataSource;
    this.route.queryParams.subscribe(params => {
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
  removeUserBooking() {
    this.bookingService
     
  }
  // ----------------------------------------
 
  dataSource: any[] = []; // Populate this with your data
  filteredData: any[] = [];
  displayedColumns: string[] = ['propertyName', 'hostName', 'checkInDate', 'checkOutDate', 'totalPrice', 'status', 'Action'];
  p: number = 1; // Current page number for pagination



  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter(item => 
      item.propertyName.toLowerCase().includes(filterValue) ||
      item.hostName.toLowerCase().includes(filterValue)
    );
  }

  sortData(column: string): void {
    const sortedData = this.filteredData.sort((a, b) => {
      const isAsc = true; // Change this to handle ascending/descending order
      return this.compare(a[column], b[column], isAsc);
    });
    this.filteredData = sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  deleteBooking(bookId: number): void {
   console.log("hello");
  }
}
