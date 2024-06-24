import { Data } from "@angular/router";

export interface RootDetails {
  name: string;
  description: string;
  adress: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  displayedImage: string;
  beds: number;
  userName: string;
  categoryName: string;
  cityName: string;
  checkIn: string;
  checkOut: string;
  numberOfGuest: number;
  pets: boolean;
  takePhotos: boolean;
  imageUrl: ImageUrl[];
  amentities: Amentity[];
  appoinmentAvaiable: AppoinmentAvaiable[];
  reviews:Reviews[];
  ratingOverroll:number;
  numOfReview:number;
  userImage:string;
  bookingDates:Booking[];
}
export interface Booking{
  CheckInDate:Data;
  CheckOutDate:Data;
}
export interface Reviews {
  id: number;
  reviewComment: string;
  Rate: number;
  UserName: string;
  Userimage: string;
}
export interface ImageUrl {
  id: number;
  propertyId: number;
  imageUrl: string;
}

export interface Amentity {
  id: number;
  name: string;
  description: string;
}

export interface AppoinmentAvaiable {
  id: number;
  from: string;
  to: string;
  pricePerNight: number;
  isAvailable: boolean;
}
export interface ReviewsAddDto {
  propertyId: number;
  rating: number;
  comment: string;
}
export interface BookingAddDto {
  PropertyId: number;
  CheckInDate: Date;
  CheckOutDate: Date;
  TotalPrice: number;
 
}
export interface AvailabilityUpdateDto {
  From: Date;
  To: Date;
  IsAvailable: boolean;
}
