import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../Models/Category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.baseUrl;

  constructor(private httpclient : HttpClient) { }

//observables represent a stream of data in asynchronous way
  GetAllCategories():Observable<Category[]>
  {
    return this.httpclient.get<Category[]>(`${this.baseUrl}Categories/GetAllCategories`);
  }

  GetCategoryById(categoryId: string): Observable<Category> {
    return this.httpclient.get<Category>(`${this.baseUrl}Categories/GetCategoryDetails/${categoryId}`);
  }

  CreateCategory(category: FormData): Observable<Category> {
    return this.httpclient.post<Category>(`${this.baseUrl}Categories/AddCategory`, category);
  }

  UpdateCategory(categoryId: string, category: FormData): Observable<Category> {
    return this.httpclient.patch<Category>(`${this.baseUrl}Categories/UpdateCategory/${categoryId}`, category);
  }

  DeleteCategory(categoryId: string): Observable<Object> {
    return this.httpclient.delete<Object>(`${this.baseUrl}Categories/DeleteCategory/${categoryId}`);
  }

}
