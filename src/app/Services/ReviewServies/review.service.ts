import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ReviewsAddDto } from '../../Models/PropertyDetials';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = environment.baseUrl;
  
  checkReviewEligibility(userId: string, propertyId: number){
    return this.http.get<boolean>(`${this.baseUrl}Review/check-eligibility/${userId}/${propertyId}`);
  }

  addReview(userId: string, review: ReviewsAddDto) {
    return this.http.post<boolean>(`${this.baseUrl}/Review/AddReview`, { userId, ...review });
  }
 
}
