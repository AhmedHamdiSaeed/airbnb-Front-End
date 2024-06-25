import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import {
  userLogin,
  userProfile,
  userRegister,
  userToken,
} from '../../Models/User';
import { BehaviorSubject, Observable, ReplaySubject, map, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileservicesService {
  get token() {
    return localStorage.getItem('token');
  }
  baseUrl = environment.baseUrl;
  private currentUser = new ReplaySubject<userToken>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.CurrentUser();
  }

  // ------------------------------------------------

  // Load Current User
  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUser.next(null);

      return of(null);
    }

    return this.http.get(`${this.baseUrl}User/get-current-user`).pipe(
      map((user: userToken) => {
        localStorage.setItem('token', token);
        this.currentUser.next(user);
      })
    );
  }
  // Load Current User
  sendCurrentUser: userToken;
  getCurrentUser() {
    
    return this.sendCurrentUser;
  }

  isAuthenticated(): boolean {
    return !!this.sendCurrentUser;
  }
  // Load Current User
  CurrentUser() {
    return this.http.get(`${this.baseUrl}User/get-current-user`).pipe(
      map((user: userToken) => {
        this.sendCurrentUser = user;
      })
    );
  }
  // Load Current User
  Register(userInfo: userRegister) {
    return this.http.post(`${this.baseUrl}User/Register`, userInfo);
  }

  Login(userInfo: userLogin) {
    return this.http.post(`${this.baseUrl}User/login`, userInfo).pipe(
      map((user: userToken) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('username', user.userName);
        localStorage.setItem('userId', user.userId);
        this.currentUser.next(user);
        this.router.navigateByUrl('/home'); 
      })
    );
  }
  
  getUserId(): string {
    return localStorage.getItem('userId');
  }
  getUserImage(): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}User/get-current-user`).pipe(
      map(response => {
        console.log('Server response:', response);
        return response.imageUrl as string;
      })
    );
  }
  
  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.currentUser.next(null);
    this.router.navigateByUrl('/signin');
  }

  checkEmailExist(email: string) {
    return this.http.get(
      `${this.baseUrl}User/check-email-exist?email=${email}`
    );
  }

  // ------------------- uPDATE uSER dATA

  updateUserProfileData(user: userProfile) {
    return this.http.put(`${this.baseUrl}User/UpdateUser`, user);
  }

  //Uploade Image
  private uploadUrl = '';
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}Files/UploadImage`, formData);
  }
  //getCurrentUser
  getUser() {
    return this.http.get(`${this.baseUrl}User/get-current-user`);
  }
}
