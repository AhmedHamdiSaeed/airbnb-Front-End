import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropControlService } from '../prop-control.service';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { Ceties } from '../../../../Models/CetiesModel';
import { Categories } from '../../../../Models/CategoryModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent implements OnInit {
  /**
   *
   */
  AddNewPropertyForm: FormGroup;
  constructor(
    private propertyService: ProperiesService,
    private fb: FormBuilder,
    private propertyControlService: PropControlService,
    private activeRouter: ActivatedRoute
  ) {}

  // ------------------------------ Form Group
  CreateNewProperty() {
    this.AddNewPropertyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      numberOfBedrooms: ['', [Validators.required]],
      numberOfBathrooms: ['', [Validators.required]],
      displayedImage: [''],
      beds: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      numberOfGuest: ['', [Validators.required]],
      pets: ['', [Validators.required]],
      takePhotos: ['', [Validators.required]],
    });
  }

  // -------------------- File Uploud Handle
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.propertyControlService.uploadFile(file).subscribe({
        next: (response) => {
          this.AddNewPropertyForm.patchValue({
            displayedImage: response.fileUrl,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  // ----------------- Submit
  OnSubmit() {
    if (this.AddNewPropertyForm.valid) {
      this.propertyControlService
        .AddNewProperty(this.AddNewPropertyForm.value)
        .subscribe({
          next: () => {
            console.log(this.AddNewPropertyForm.value);
            this.AddNewPropertyForm.reset({
              name: '',
              description: '',
              adress: '',
              numberOfBedrooms: '',
              numberOfBathrooms: '',
              displayedImage: '',
              beds: '',
              categoryId: '',
              cityId: '',
              checkIn: '',
              checkOut: '',
              numberOfGuest: '',
              pets: '',
              takePhotos: '',
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      alert('Form is invalid');
      console.log('Form is invalid');
      this.AddNewPropertyForm.markAllAsTouched();
    }
  }

  // Get All Cities And Categories
  allCeties: Ceties[];

  getAllCeties() {
    this.propertyService.GetAllCity().subscribe((result: Ceties[]) => {
      this.allCeties = result;
    });
  }

  //Hooks

  ngOnInit(): void {
    this.CreateNewProperty();
    this.getAllCeties();
    console.log(this.activeRouter.snapshot.url.toString());
  }
}
