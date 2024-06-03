import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from '../../../Services/UserServices/profileservices.service';
import { userLogin, userRegister } from '../../../Models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.CreateLoginForm();
  }
  //-------------------------- Login Form
  loginForm: FormGroup;
  returnUrl: string;
  /**
   *
   */
  constructor(
    private service: ProfileservicesService,
    private router: Router
  ) {}
  //--------------------------
  CreateLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  userLogin(userLoginData: userLogin) {
    this.service.Login(userLoginData).subscribe((result) => {
      console.log(result);
    });
  }

  OnSubmit() {
    this.service.Login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
