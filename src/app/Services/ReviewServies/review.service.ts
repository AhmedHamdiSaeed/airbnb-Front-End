import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ReviewsAddDto ,ReviewStatus} from '../../Models/PropertyDetials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = environment.baseUrl;
  
  checkReviewEligibility(userId: string, propertyId: number){
    return this.http.get<ReviewStatus>(`${this.baseUrl}Review/check-eligibility/${propertyId}/${userId}`);
  }

  addReview(userId: string, review: ReviewsAddDto): Observable<string> {
    return this.http.post(`${this.baseUrl}Review/AddReview`, { userId, ...review }, { responseType: 'text' });
  }
 
}
