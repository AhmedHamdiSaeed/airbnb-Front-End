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
}
export interface getBookingUserDetailsModel {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  propertyId: number;
  propertyName: string;
}
