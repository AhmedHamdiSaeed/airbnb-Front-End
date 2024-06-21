import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { timer, switchMap, of, map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [ProfileservicesService],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

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
    this.CreateLoginForm();
  }

  CreateLoginForm() {
    this.signUpForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
          ],
          this.ValidateEmailNotToken(),
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"
            ),
          ],
        ],
        confirmpassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"
            ),
          ],
        ],
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        role: ['', [Validators.required]],
      },
      { validators: [this.ConfirmPassowrd] }
    );
  }
  //
  get _email() {
    return this.signUpForm.get('email');
  }
  get _firstname() {
    return this.signUpForm.get('firstName');
  }
  get _lastname() {
    return this.signUpForm.get('lastName');
  }
  get _pass() {
    return this.signUpForm.get('password');
  }

  get _confirmpass() {
    return this.signUpForm.get('confirmpassword');
  }
  //
  OnSubmit() {
    if (this.signUpForm.valid) {
      this.service.Register(this.signUpForm.value).subscribe({
        next: () => {
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          this.router.navigate(['/signin']);
          console.log(err.message);
        },
      });
    } else {
      alert('Form is invalid');
      console.log('Form is invalid');
      this.signUpForm.markAllAsTouched(); // Optionally mark all fields as touched to trigger validation messages
    }
  }

  // Confirm Password
  ConfirmPassowrd(
    contorls: AbstractControl
  ): { [key: string]: boolean } | null {
    var password = contorls.get('password');
    var confirmPassword = contorls.get('confirmpassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { misMatch: true }
      : null;
  }

  // Check Email Exist
  ValidateEmailNotToken(): AsyncValidatorFn {
    return (contorls) => {
      return timer(1000).pipe(
        switchMap(() => {
          if (!contorls.value) {
            return of(null);
          }
          return this.service.checkEmailExist(contorls.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
