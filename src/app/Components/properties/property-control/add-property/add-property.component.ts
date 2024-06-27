import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropControlService } from '../prop-control.service';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { Ceties } from '../../../../Models/CetiesModel';
import { Categories } from '../../../../Models/CategoryModel';
import { ActivatedRoute } from '@angular/router';
import { RootDetails } from '../../../../Models/PropertyDetials';
import { Property } from '../../../../Models/PropertyModels';

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
      pets: ['0', [Validators.required]],
      takePhotos: ['0', [Validators.required]],
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
  // ---------- GetAllHosterProperties
  hosterProperties: Property[];
  GetAllHosterProperties() {
    this.propertyControlService
      .GetAllHosterProperties()
      .subscribe((result: Property[]) => {
        this.hosterProperties = result;
        console.log(this.hosterProperties);
      });
  }
  //------------------------------ Get Property With Data
  propertyStatus: string = 'Add';
  SelectedProperty: RootDetails;
  SelectedPropertyId: number;

  SelectProperty(id) {
    this.propertyStatus = 'Update';
    this.SelectedPropertyId = id;
    // Find Selected Property
    this.propertyService
      .GetPropertyDetailsById(id)
      .subscribe((result: RootDetails) => {
        this.SelectedProperty = result;
        this.AddNewPropertyForm.reset({
          name: this.SelectedProperty.name,
          description: this.SelectedProperty.description,
          adress: this.SelectedProperty.adress,
          numberOfBedrooms: this.SelectedProperty.numberOfBedrooms,
          numberOfBathrooms: this.SelectedProperty.numberOfBathrooms,
          displayedImage: this.SelectedProperty.displayedImage,
          beds: this.SelectedProperty.beds,
          categoryId: '',
          cityId: '',
          checkIn: this.SelectedProperty.checkIn,
          checkOut: this.SelectedProperty.checkOut,
          numberOfGuest: this.SelectedProperty.numberOfGuest,
          pets: +this.SelectedProperty.pets,
          takePhotos: +this.SelectedProperty.takePhotos,
        });
      });
    console.log(this.SelectedProperty);
    // --------------------------------------
  }
  // ----------------- Submit
  OnSubmit() {
    if (this.AddNewPropertyForm.valid) {
      if (this.propertyStatus === 'Add') {
        this.propertyControlService
          .AddNewProperty(this.AddNewPropertyForm.value)
          .subscribe({
            next: () => {
              console.log(this.AddNewPropertyForm.value);
              this.GetAllHosterProperties();

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
        this.propertyStatus = 'Add';
        this.propertyControlService
          .UpdateCurrentProperty(
            this.SelectedPropertyId,
            this.AddNewPropertyForm.value
          )
          .subscribe({
            next: () => {
              console.log(this.AddNewPropertyForm.value);
              this.GetAllHosterProperties();

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
      }
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
  allCate: Categories[];

  getAllCategory() {
    this.propertyService.GetAllCategory().subscribe((result: Categories[]) => {
      this.allCate = result;
    });
  }

  //Hooks
  DeletePropertyByHoster(id) {
    this.propertyControlService
      .DeletePropertyByHoster(id)
      .subscribe((result) => {
        this.GetAllHosterProperties();

        alert('Deleted Successfuly');
      });
  }
  ngOnInit(): void {
    this.CreateNewProperty();
    this.getAllCeties();
    this.getAllCategory();
    this.GetAllHosterProperties();
    console.log(this.activeRouter.snapshot.url.toString());
  }
}
