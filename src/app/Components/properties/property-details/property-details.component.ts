import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProperiesService } from '../../../Services/PropertyServices/properies.service';
import {
  ReviewsAddDto,
  RootDetails,
  Reviews,
  BookingAddDto,
  AvailabilityUpdateDto,
  BookingGetDetailsUserDtos,
} from '../../../Models/PropertyDetials';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewService } from '../../../Services/ReviewServies/review.service';
import { AuthService } from '../../../Services/UserServices/auth.service';
import { ProfileservicesService } from '../../../Services/UserServices/profileservices.service';
import { BookingService } from '../../../Services/BookingServices/booking.service';
import { switchMap } from 'rxjs';
import { AppStarRatingDirective } from './AppStarRatingDirective';
import {
  LastAmentityModel,
  LastAppoinmentAvaiableModel,
  LastImageUrlModel,
  LastPropModel,
  LastReviewModel,
} from './DetailsPropModelData';
import { addBookingModel } from '../../../Models/Booking/bookingModels';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  constructor(
    private service: ProperiesService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private reviewService: ReviewService,
    private profileService: ProfileservicesService,
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  /* Old Code


  dataDetails: RootDetails;
  IdNumber: number;
  startDate: Date;
  endDate: Date;
  canSubmitReview: boolean = false;
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
  hasReview: boolean = false;
  bookingId: number | null = null;
  userId: string;
  review: ReviewsAddDto = {
    propertyId: 0,
    rating: 0,
    comment: '',
    bookingId: 0,
  };
  canReview: boolean = false;
  userImageUrl: string; // Property to hold user image URL
  propertyIsAvalable: boolean = true;
  bookings: BookingGetDetailsUserDtos[] = [];
  minDateString: string = this.minDate.toISOString().split('T')[0];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.IdNumber = params['id'];
    });
    this.userId = this.profileService.getUserId();
    this.review.propertyId = this.IdNumber;

    this.GetPropertyDetailsById(this.IdNumber);
    this.checkReviewEligibility();
    this.GetBokingPropertyDetails(this.IdNumber);
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  GetBokingPropertyDetails(IdNumber: number): void {
    this.bookingService.GetAllBookingForProperty(IdNumber).subscribe(
      (data: BookingGetDetailsUserDtos[]) => {
        this.bookings = data;
        console.log(this.bookings);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
  GetPropertyDetailsById(IdNumber: number): void {
    this.service.GetPropertyDetailsById(IdNumber).subscribe(
      (result: RootDetails) => {
        this.dataDetails = result;
        this.checkReviewEligibility();

        console.log('Property details:', result);
        console.log('review name:', result.reviews[0].userName);
        if (result && result.appoinmentAvaiable) {
          const availableDates = result.appoinmentAvaiable.filter(
            (appointment) => appointment.isAvailable
          );

          if (availableDates.length > 0) {
            this.propertyIsAvalable = true;
            this.minCheckInDate = this.formatDate(availableDates[0].from);
            this.maxCheckInDate = this.formatDate(
              availableDates[availableDates.length - 1].to
            );
            this.minCheckOutDate = this.minCheckInDate;
            this.maxCheckOutDate = this.maxCheckInDate;
            console.log(
              `Available check-in range: ${this.minCheckInDate} to ${this.maxCheckInDate}`
            );
          } else {
            this.propertyIsAvalable = false;
            console.log('No available dates found.');
          }
        } else {
          this.propertyIsAvalable = false;
          console.log('Appointment data is not available.');
        }
      },
      (error) => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  onCheckInDateChange(event: any): void {
    this.startDate = new Date(event.target.value);
    console.log('Selected Check-in Date:', this.startDate);

    if (this.dataDetails && this.dataDetails.appoinmentAvaiable) {
      const availableDates = this.dataDetails.appoinmentAvaiable.filter(
        (appointment) => {
          const fromDate = new Date(appointment.from);
          const toDate = new Date(appointment.to);
          console.log('Comparing with:', fromDate, toDate);
          return (
            this.startDate >= fromDate &&
            this.startDate <= toDate &&
            appointment.isAvailable
          );
        }
      );

      if (availableDates.length > 0) {
        const availableFromDate = this.formatDate(availableDates[0].from);
        const availableToDate = this.formatDate(
          availableDates[availableDates.length - 1].to
        );
        console.log(
          `Available check-in dates: ${availableFromDate} to ${availableToDate}`
        );
        this.minCheckOutDate = this.formatDate(this.startDate.toISOString());
        this.maxCheckOutDate = availableToDate;
      } else {
        console.log('No available check-in dates for the selected date.');
      }
    } else {
      console.log('Appointment data is not available.');
    }
  }

  openDatePicker(id: string) {
    document.getElementById(id).focus();
  }

  onCheckOutDateChange(event: any): void {
    this.endDate = new Date(event.target.value);
    console.log('Selected Check-out Date:', this.endDate);
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);

    if (
      this.startDate &&
      this.endDate &&
      this.dataDetails &&
      this.dataDetails.appoinmentAvaiable[0].pricePerNight
    ) {
      const timeDifference = this.endDate.getTime() - this.startDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      this.totalPrice = Math.round(
        daysDifference * this.dataDetails.appoinmentAvaiable[0].pricePerNight
      );
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

  minusButton(): void {
    this.numOfGuests--;
    this.isPDisabled = false;
    if (this.numOfGuests <= 1) {
      this.isMDisabled = true;
    }
    this.updateTotalPrice();
  }

  checkReviewEligibility(): void {
    this.reviewService
      .checkReviewEligibility(this.userId, this.IdNumber)
      .subscribe(
        (result) => {
          this.hasReview = result.hasReview;
          this.bookingId = result.bookingId;
          console.log('Eligibility check result:', result);
          if (this.hasReview) {
            this.review.propertyId = this.IdNumber;
            this.review.bookingId = this.bookingId; // Set the bookingId from the status
          }
        },
        (error) => {
          console.error('Error checking eligibility:', error);
        }
      );
  }

  submitReview(): void {
    console.log(this.review);
    this.reviewService.addReview(this.userId, this.review).subscribe(
      (result) => {
        if (result === 'Added Successfully') {
          // Adjusted to check the response correctly
          console.log('Review added successfully:', result);

          this.profileService.getUserImage().subscribe(
            (imageUrl) => {
              console.log('Fetched user image URL:', imageUrl);
              this.dataDetails.reviews.push({
                userId: this.userId,
                reviewComment: this.review.comment,
                rate: this.review.rating,
                userName: this.authService.getUserName(),
                userimage: imageUrl,
              });
            },
            (error) => {
              console.error('Error fetching user image:', error);
              // Handle error fetching user image
            }
          );

          // Reset the review form after successful submission
          this.review.rating = 0;
          this.review.comment = '';
        } else {
          console.error('Failed to add review.');
        }
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

  ////
  bookProperty(): void {
    if (this.authService.getUserRole) {
      if (this.authService.getUserRole() == 'User') {
        const bookingAddDto: BookingAddDto = {
          PropertyId: this.IdNumber,
          CheckInDate: this.startDate,
          CheckOutDate: this.endDate,
          TotalPrice: this.totalPrice,
          userID: this.userId,
        };

        const userId = this.profileService.getUserId();

        this.bookingService
          .adddBooking(userId, bookingAddDto)
          .pipe(
            switchMap((bookingId: number) => {
              this.bookingId = bookingId; // Store the booking ID
              console.log('Booking ID:', bookingId);

              const newFrom = new Date(this.endDate);
              newFrom.setDate(newFrom.getDate() + 1);

              const newTo = new Date(this.dataDetails.appoinmentAvaiable[0].to);
              const isAvailable = newFrom <= newTo;
              const availabilityUpdateDto: AvailabilityUpdateDto = {
                From: newFrom,
                To: newTo,
                IsAvailable: isAvailable,
              };

              return this.bookingService.updateAvailability(
                this.IdNumber,
                availabilityUpdateDto
              );
            })
          )
          .subscribe(
            (updateResponse) => {
              console.log('Availability updated successfully:', updateResponse);
              this.router.navigate(['/alluserBooking'], {
                queryParams: { totalPrice: this.totalPrice },
              });
            },
            (error) => {
              console.error('Operation failed:', error);
              alert('Operation failed. Please try again later.');
            }
          );
      } else {
        alert('Must Sign As User');
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }
  */
  PropertyId: number;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.PropertyId = params['id'];
    });
    this.GetPropertyFullData(this.PropertyId);
    this.UserRole = this.authService.getUserRole();
    console.log(this.UserRole);
  }

  PropFullData: LastPropModel;
  PropImgsUrl: LastImageUrlModel[];
  PropAmentity: LastAmentityModel[];
  PropAppoinmentAvailable: LastAppoinmentAvaiableModel[];
  PropReviews: LastReviewModel[];

  GetPropertyFullData(id: number) {
    this.service
      .GetPropertyDetailsById(id)
      .subscribe((result: LastPropModel) => {
        this.PropFullData = result;
        this.PropImgsUrl = result.imageUrl;
        this.PropAmentity = result.amentities;
        this.PropAppoinmentAvailable = result.appoinmentAvaiable;
        this.PropReviews = result.reviews;
        console.log(this.PropFullData);
      });
  }
  updateAppoinmentAv(id) {
    this.service.UpdateAppoinmentAvailable(id).subscribe({
      next: () => {
        this.GetPropertyFullData(this.PropertyId);
      },
      error: (err) => {
        alert('Error ' + err);
      },
    });
  }
  AddBooking(booking: addBookingModel) {
    this.bookingService.AddBooking(booking).subscribe({
      next: () => {
        alert('Add Booking Successfuly');
        this.updateAppoinmentAv(booking.id);
      },
      error: (err) => {
        alert('Error In Add New Booking' + err);
      },
    });
  }
  UserRole: string;
}
