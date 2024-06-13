import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.baseUrl;
  constructor(private httpclient : HttpClient) { }

  GetAllCategories(){//should be added an observable it's an interface that just define the category datatype
    return this.httpclient.get<string[]>(this.baseUrl);
  }

  GetCategoryById(categoryid:string){
    return this.httpclient.get<string>(`${this.baseUrl}/${categoryid}`)
  }

  PostCategory(category :FormData){
    return this.httpclient.post<string>(this.baseUrl ,category)
  }

}
