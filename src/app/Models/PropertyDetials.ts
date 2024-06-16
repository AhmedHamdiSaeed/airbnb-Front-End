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
