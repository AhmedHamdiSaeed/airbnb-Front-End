import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category, CategoryFielsModel } from '../../Models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseUrl;

  constructor(private httpclient: HttpClient) {}

  GetAllCategories(
    pageNumber: number,
    pageSize: number
  ): Observable<Category[]> {
    return this.httpclient.get<Category[]>(
      `${this.baseUrl}Categories/GetAllCategories`,
      {
        params: {
          PageNumber: pageNumber.toString(),
          PageSize: pageSize.toString(),
        },
      }
    );
  }

  GetAllCategs(): Observable<CategoryFielsModel[]> {
    return this.httpclient.get<CategoryFielsModel[]>(
      `${this.baseUrl}Categories/GetAll`
    );
  }

  GetCategoryById(categoryId: string): Observable<Category> {
    return this.httpclient.get<Category>(
      `${this.baseUrl}Categories/GetCategoryById/${categoryId}`
    );
  }

  CreateCategory(category: FormData): Observable<Category> {
    return this.httpclient.post<Category>(this.baseUrl, category);
  }

  UpdateCategory(categoryId: string, category: FormData): Observable<Category> {
    return this.httpclient.patch<Category>(
      `${this.baseUrl}/${categoryId}`,
      category
    );
  }

  DeleteCategory(categoryId: string): Observable<Object> {
    return this.httpclient.delete<Object>(`${this.baseUrl}/${categoryId}`);
  }
}
