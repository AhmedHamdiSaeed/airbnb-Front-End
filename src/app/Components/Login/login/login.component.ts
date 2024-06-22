import { Component, OnInit } from '@angular/core';
import { ProfileservicesService } from '../../../Services/UserServices/profileservices.service';
import { userLogin, userRegister } from '../../../Models/User';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  //-------------------------- Login Form
  loginForm: FormGroup;
  returnUrl: string;

  /**
   *
   */
  constructor(
    private service: ProfileservicesService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/Home';
    this.CreateLoginForm();
  }
  //--------------------------
  CreateLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  userLogin(userLoginData: userLogin) {
    this.service.Login(userLoginData).subscribe((result) => {
      console.log(result);
    });
  }
  get _email() {
    return this.loginForm.get('email');
  }
  get _password() {
    return this.loginForm.get('password');
  }
  OnSubmit() {
    this.service.Login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
