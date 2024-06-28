export interface LastPropModel {
  ratingOverroll: number;
  numOfReview: number;
  name: string;
  description: string;
  adress: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  displayedImage: string;
  beds: number;
  userName: string;
  userImage: string;
  categoryName: string;
  cityName: string;
  numberOfGuest: number;
  pets: boolean;
  takePhotos: boolean;
  imageUrl: LastImageUrlModel[];
  amentities: LastAmentityModel[];
  appoinmentAvaiable: LastAppoinmentAvaiableModel[];
  reviews: LastReviewModel[];
  bookingDates: LastBookingDateModel[];
  checkIn: string;
  checkOut: string;
}

export interface LastImageUrlModel {
  id: number;
  propertyId: number;
  imageUrl: string;
}

export interface LastAmentityModel {
  id: number;
  name: string;
  description: string;
}

export interface LastAppoinmentAvaiableModel {
  id: number;
  propertyId: number;
  from: string;
  to: string;
  pricePerNight: number;
  totalProice: number;
  isAvailable: boolean;
}

export interface LastReviewModel {
  reviewId: number;
  reviewUserName: string;
  reviewUserImage: string;
  reviewComment: string;
}

export interface LastBookingDateModel {
  checkInDate: string;
  checkOutDate: string;
}
