import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
    this.CreateLoginForm();
  }

  signUpForm: FormGroup;
  returnUrl: string;

  /**
   *
   */
  constructor(
    private service: ProfileservicesService,
    private router: Router
  ) {}

  @ViewChild('confirmpass') confirmPass;
  @ViewChild('pass') pass;
  CreateLoginForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      role: new FormControl('', Validators.required),
    });
  }

  OnSubmit() {
    if (this.confirmPass.value === this.pass.value) {
      this.service.Register(this.signUpForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
