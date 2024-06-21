import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProperiesService } from '../../../Services/PropertyServices/properies.service';
import { RootDetails } from '../../../Models/PropertyDetials';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})

export class PropertyDetailsComponent implements OnInit {
  /**
   *
   */
  constructor(
    private service: ProperiesService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  dataDetails: RootDetails;
  IdNumber: number;
  startDate: Date;
  endDate: Date;
  startDateString: string;
  endDateString: string;
  minDate: Date = new Date();
  minCheckInDate: string;
  maxCheckInDate: string;
  minCheckOutDate: string;
  maxCheckOutDate: string;
  numOfGuests: number = 1;
  isPDisabled: boolean = false;
  isMDisabled: boolean = false;
  totalPrice: number; 
  @Input() appStarRating: number;
  minDateString: string = this.minDate.toISOString().split('T')[0]; // Get the date string in YYYY-MM-DD format
 // Review-related properties
 rate: number = 0;
 comment: string = '';
 propReview = { hasreview: false };
 r//eviews: Reviews[] = [];
  // GetPropertyDetailsById ------------------
  GetPropertyDetailsById(IdNumber: number) {
    this.service.GetPropertyDetailsById(IdNumber).subscribe(
      (result: RootDetails) => {
        this.dataDetails = result;
        console.log('Property details:', result);

        // Check if appointments are available
        if (result && result.appoinmentAvaiable) {
          console.log('Appointment data:', result.appoinmentAvaiable);
          const availableDates = result.appoinmentAvaiable.filter(appointment => appointment.isAvailable);
          console.log('Filtered available dates:', availableDates);

          if (availableDates.length > 0) {
            this.minCheckInDate = this.formatDate(availableDates[0].from);
            this.maxCheckInDate = this.formatDate(availableDates[availableDates.length - 1].to);
            this.minCheckOutDate = this.minCheckInDate;
            this.maxCheckOutDate = this.maxCheckInDate;
            console.log(`Available check-in range: ${this.minCheckInDate} to ${this.maxCheckInDate}`);
          } else {
            console.log('No available dates found.');
          }
        } else {
          console.log('Appointment data is not available.');
        }
      },
      (error) => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.IdNumber = params['id'];
    });
    this.GetPropertyDetailsById(this.IdNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appStarRating']) {
      this.updateStarRating(this.appStarRating);
    }
  }

  updateStarRating(rating: number): void {
    const stars = '&#9733;'.repeat(rating) + '&#9734;'.repeat(5 - rating);
    this.el.nativeElement.innerHTML = stars;
    this.el.nativeElement.style.fontSize = '1.5rem';
    this.el.nativeElement.querySelectorAll('.star').forEach((star: { style: { color: string; }; }) => {
      star.style.color = 'yellow';
    });
  }
  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onCheckInDateChange(event: any): void {
    this.startDate = new Date(event.target.value);
    console.log('Selected Check-in Date:', this.startDate);

    if (this.dataDetails && this.dataDetails.appoinmentAvaiable) {
      const availableDates = this.dataDetails.appoinmentAvaiable.filter(appointment => {
        const fromDate = new Date(appointment.from);
        const toDate = new Date(appointment.to);
        console.log('Comparing with:', fromDate, toDate);
        return this.startDate >= fromDate && this.startDate <= toDate && appointment.isAvailable;
      });

      if (availableDates.length > 0) {
        const availableFromDate = this.formatDate(availableDates[0].from);
        const availableToDate = this.formatDate(availableDates[availableDates.length - 1].to);
        console.log(`Available check-in dates: ${availableFromDate} to ${availableToDate}`);
        this.minCheckOutDate = this.formatDate(this.startDate.toISOString());
        this.maxCheckOutDate = availableToDate;
      } else {
        console.log('No available check-in dates for the selected date.');
      }
    } else {
      console.log('Appointment data is not available.');
    }
  }

  onCheckOutDateChange(event: any): void {
    this.endDate = new Date(event.target.value);
    console.log('Selected Check-out Date:', this.endDate);
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);

    if (this.startDate && this.endDate && this.dataDetails && this.dataDetails.appoinmentAvaiable[0].pricePerNight) {
      const timeDifference = this.endDate.getTime() - this.startDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      this.totalPrice = Math.round(daysDifference * this.dataDetails.appoinmentAvaiable[0].pricePerNight);
      console.log('Total Price:', this.totalPrice);
    } else {
      this.totalPrice = 0;
      console.log('Price could not be calculated due to missing data.');
    }
  }
  
  plusButton() {
    this.numOfGuests++;
    this.isMDisabled = false;
    if (this.numOfGuests >= this.dataDetails.numberOfGuest) {
      this.isPDisabled = true;
    }
    this.updateTotalPrice();
  }

  minusButton() {
    this.numOfGuests--;
    this.isPDisabled = false;
    if (this.numOfGuests <= 1) {
      this.isMDisabled = true;
    }
    this.updateTotalPrice();
  }
  openPopup() {
    console.log('Reserve button clicked!');
  }
 
}
