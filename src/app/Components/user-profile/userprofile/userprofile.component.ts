import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProfileservicesService } from '../../../Services/UserServices/profileservices.service';
import { currentUserModel, userProfile } from '../../../Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/UserServices/auth.service';
interface Root {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  userProfileData: FormGroup;

  /**
   *
   */
  constructor(
    private userService: ProfileservicesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  CreateUserUpdate() {
    this.userProfileData = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      image: ['asd'],
    });
  }

  // /----------------------------------------------------------

  OnSubmit() {
    if (this.userProfileData.valid) {
      this.userService
        .updateUserProfileData(this.userProfileData.value)
        .subscribe({
          next: (response: Root) => {
            if (response && response.success) {
              alert('Data Updated');
              console.log(this.userProfileData.value);
              this.getCurrentUser();
              this.userProfileData.reset();
            } else {
              alert('Update failed: ' + (response.message || 'Unknown error'));
            }
          },
          error: (err) => {
            alert('Error Happened');
            console.error(err);
          },
        });
    } else {
      alert('Form is Invalid');
    }
  }

  //Get Current User
  currentUserGet: currentUserModel;
  getCurrentUser() {
    this.userService.getUser().subscribe((result: currentUserModel) => {
      this.currentUserGet = result;
      this.userProfileData.reset({
        email: this.currentUserGet.email,
        firstName: this.currentUserGet.firstName,
        lastName: this.currentUserGet.lastName,
        age: this.currentUserGet.age,
        phoneNumber: this.currentUserGet.phoneNumber,
        image: this.currentUserGet.image,
      });
      console.log(result);
    });
  }
  // -------------------- File Uploud Handle
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadFile(file).subscribe({
        next: (response) => {
          this.userProfileData.patchValue({
            image: response.fileUrl,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
  //
  ngOnInit(): void {
    this.getCurrentUser();
    this.CreateUserUpdate();
    this.authService.getUserName();
  }

  // --------------------------------------
}
