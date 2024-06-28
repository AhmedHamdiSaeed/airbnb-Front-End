import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AmentityAdd,
  AppoinmentAvailableAdd,
  PropertyData,
  propertyImageAdd,
} from '../../../Models/PropertyControlModels/AllPropertyControlModels';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Property } from '../../../Models/PropertyModels';

@Injectable({
  providedIn: 'root',
})
// ---------------------------------------------------------------------------------------------
export class PropControlService {
  baseUrl: string = environment.baseUrl;
  selectedProperty: Property;
  selectedPropertyId: number;
  constructor(private http: HttpClient) {}

  //Add New Property
  AddNewProperty(property: PropertyData) {
    return this.http.post(`${this.baseUrl}Property/AddNewProperty`, property);
  }
  //update Property
  UpdateCurrentProperty(id, property: PropertyData) {
    return this.http.put(
      `${this.baseUrl}Property/UpdatePropertyByHoster/${id}`,
      property
    );
  }

  // Get Hoster Properties

  GetAllHosterProperties() {
    return this.http.get(`${this.baseUrl}Property/GetHosterProperties`);
  }

  DeletePropertyByHoster(id: number) {
    return this.http.delete(`${this.baseUrl}Property/DeletePropertyById/${id}`);
  }
  //------------------------------------------------------- PropertyImage
  // Add Property Image
  addNewPropImage(newImage: propertyImageAdd) {
    return this.http.post(`${this.baseUrl}PropertyImages/AddImage`, newImage);
  }

  updatePropImage(id, UpdateCurrentProperty: propertyImageAdd) {
    return this.http.put(
      `${this.baseUrl}PropertyImages/UpdateImage/${id}`,
      UpdateCurrentProperty
    );
  }
  deletePropImage(id) {
    return this.http.delete(`${this.baseUrl}PropertyImages/DeleteImage/${id}`);
  }
  getAllPropertyImage(id) {
    return this.http.get(
      `${this.baseUrl}PropertyImages/GetAllPropertyImagesForProperty/${id}`
    );
  }

  //------------------------------------------------------- Amentity----------------------------
  addNewAmentity(amentity: AmentityAdd) {
    return this.http.post(`${this.baseUrl}Amenity/AddAmentity`, amentity);
  }

  getAllAmentityForProperty(id) {
    return this.http.get(`${this.baseUrl}Amenity/GetAllPropAmentity/${id}`);
  }
  updateAmentity(id, updateAmentity: AmentityAdd) {
    return this.http.put(
      `${this.baseUrl}Amenity/UpdateAmentity/${id}`,
      updateAmentity
    );
  }
  deleteAmentity(id) {
    return this.http.delete(`${this.baseUrl}Amenity/DeleteAmentity/${id}`);
  }
  //------------------------------------------------------- AppoinmentAvaiable--------------------------------------
  addAppoinmentAvaiable(appoinment: AppoinmentAvailableAdd) {
    return this.http.post(
      `${this.baseUrl}AppointmentAvailable/addAppoinmentAvail`,
      appoinment
    );
  }

  getAllAppoinmentAvaiableForProperty(id) {
    return this.http
      .get(
        `${this.baseUrl}AppointmentAvailable/GetAllAppoinmentAvailable/${id}`
      )
      .pipe(
        map((response) => {
          // Process the response if needed
          return response;
        }),
        catchError(this.handleError)
      );
  }
  updateAppoinmentAvaiable(id, updateAppoinment: AppoinmentAvailableAdd) {
    return this.http.put(
      `${this.baseUrl}AppointmentAvailable/UpdateAppoinmentAvail/${id}`,
      updateAppoinment
    );
  }
  deleteAppoinmentAvaiable(id) {
    return this.http.delete(
      `${this.baseUrl}AppointmentAvailable/DeleteAppoinmentAvail/${id}`
    );
  }
  //Uploade Image
  private uploadUrl = '';
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}Files/UploadImage`, formData);
  }
  // ---------------
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log error in a real-world app
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
