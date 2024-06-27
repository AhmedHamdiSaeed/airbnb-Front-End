import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import {
  PropertyUpdateAdminModel,
  categoryModel,
  cityModel,
  countryModel,
} from '../../Models/Amin/AdminModels';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private activeRouter: ActivatedRoute) {}

  // Get All Property For Admin -------------------------

  GetAllPropertyForAdmin(pageNumber, pageSize, cityId, cateId) {
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
    return this.http.get(`${this.baseUrl}Property/GetAllPropertyForAdmin`, {
      params,
    });
  }
  UpdateProperty(id, prop: PropertyUpdateAdminModel) {
    return this.http.put(
      `${this.baseUrl}Property/UpdatePropertyByAmin/${id}`,
      prop
    );
  }
  // ------------------------------------------------------------------ City Control
  GetAllCity() {
    return this.http.get(`${this.baseUrl}City/GetAllCities`).pipe(
      map((result) => {
        return result;
      })
    );
  }

  UpdateCity(id, city: cityModel) {
    return this.http.put(`${this.baseUrl}City/UpdateCity/${id}`, city);
  }
  DeleteCity(id) {
    return this.http.delete(`${this.baseUrl}City/DeleteCity/${id}`);
  }
  AddCity(city: cityModel) {
    return this.http.post(`${this.baseUrl}City/addCity`, city);
  }
  // ------------------------------------------------------------------ Country Control
  // ------------------------------------------------------------------ Country Control
  GetAllCountry() {
    return this.http.get(`${this.baseUrl}Country/GetAllCountry`).pipe(
      map((result) => {
        return result;
      })
    );
  }

  UpdateCountry(id, country: countryModel) {
    return this.http.put(`${this.baseUrl}Country/UpdateCountry/${id}`, country);
  }
  DeleteCountry(id) {
    return this.http.delete(`${this.baseUrl}Country/DeleteCountry/${id}`);
  }
  AddCountry(country: countryModel) {
    return this.http.post(`${this.baseUrl}Country/AddCountry`, country);
  }

  // ------------------------------------------------------------------ Category Control
  // ------------------------------------------------------------------ Category Control
  GetAllCategory() {
    return this.http.get(`${this.baseUrl}Categories/GetAll`).pipe(
      map((result) => {
        return result;
      })
    );
  }

  UpdateCategory(id, category: categoryModel) {
    return this.http.put(
      `${this.baseUrl}Categories/UpdateCategory/${id}`,
      category
    );
  }
  DeleteCategory(id) {
    return this.http.delete(`${this.baseUrl}Categories/DeleteCategory/${id}`);
  }
  AddCategory(category: categoryModel) {
    return this.http.post(`${this.baseUrl}Categories/AddCategory`, category);
  }

  // --------------------------------------------------------
  //Uploade Image
  private uploadUrl = '';
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}Files/UploadImage`, formData);
  }
}
