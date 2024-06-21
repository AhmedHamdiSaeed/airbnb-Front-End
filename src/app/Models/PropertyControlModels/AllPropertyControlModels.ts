export interface PropertyData {
  name: string;
  description: string;
  adress: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  displayedImage: string;
  beds: number;
  categoryId: number;
  cityId: number;
  checkIn: number;
  checkOut: number;
  numberOfGuest: number;
  pets: boolean;
  takePhotos: boolean;
}

export interface propertyImageAdd {
  propertyId: number;
  imageUrl: string;
}
export interface propertyImageGet {
  id: number;
  propertyId: number;
  imageUrl: string;
}
export interface AmentityAdd {
  name: string;
  description: string;
  propertyId: number;
}
export interface AmentityGet {
  id: number;
  name: string;
  description: string;
  propertyId: number;
}
export interface AppoinmentAvailableGet {
  id: number;
  propertyId: number;
  from: string;
  to: string;
  pricePerNight: number;
  totalProice: number;
  isAvailable: boolean;
}
export interface AppoinmentAvailableAdd {
  propertyId: number;
  from: string;
  to: string;
  pricePerNight: number;
  isAvailable: boolean;
}
