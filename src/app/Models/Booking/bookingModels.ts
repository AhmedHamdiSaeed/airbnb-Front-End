export interface addBookingModel {
  id: number;
  propertyId: number;
  from: string;
  to: string;
  pricePerNight: number;
  totalProice: number;
  isAvailable: boolean;
}
export interface updateBookingModel {
  bookingStatus: number;
}
export interface getAllBookingModel {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  bookingStatus: number;
  propImage: string;
  propTitle: string;
  propertyId: number;
}
export interface getPropertyBookingDetailsModel {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  propertyName: string;
  userName: string;
  userAge: number;
  userImage: string;
  userPhone: any;
  status: number;
}
export interface getBookingUserDetailsModel {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  propertyId: number;
  propertyName: string;
}
export interface PaymentBookingModel {
  id: number;
  userName: string;
  totalPrice: number;
  clientSecret: string;
  paymentIntentId: string;
}
export interface AddReviewModel {
  rating: string;
  propertyId: string;
  comment: string;
}
