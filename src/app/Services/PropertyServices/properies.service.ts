import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProperiesService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl = environment.baseUrl;
  //

  // GetAllPropertyForAllUsers -------------------------

  GetAllPropertyForAllUsers(pageNumber, pageSize, cityId, cateId) {
    let params = new HttpParams();

    if (pageNumber) {
      params = params.append('pageNumber', pageNumber.toString());
    }

    if (pageSize) {
      params = params.append('pageSize', pageSize.toString());
    }

    if (cityId) {
      params = params.append('cityId', cityId.toString());
    }

    if (cateId) {
      params = params.append('cateId', cateId.toString());
    }
    return this.http.get(`${this.baseUrl}Property/GetAllPropertyForAllUsers`, {
      params,
    });
  }

  // GetPropertyDetailsById
  GetPropertyDetailsById(id: number) {
    return this.http.get(
      `${this.baseUrl}Property/GetPropertyDetailsById/${id}`
    );
  }
  // GetAllCity
  GetAllCity() {
    return this.http.get(`${this.baseUrl}City/GetAllCities`);
  }
  // GetAllCategory
  GetAllCategory() {
    return this.http.get(`${this.baseUrl}Categories/GetAll`);
  }
  UpdateAppoinmentAvailable(id) {
    return this.http.put(
      `${this.baseUrl}AppointmentAvailable/UpdateAppoinmentAvail/${id}`,
      {
        isAvailable: false,
      }
    );
  }
}
