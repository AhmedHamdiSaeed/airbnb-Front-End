import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { PropControlService } from '../prop-control.service';
import { propertyImageGet } from '../../../../Models/PropertyControlModels/AllPropertyControlModels';

@Component({
  selector: 'app-add-propimages',
  templateUrl: './add-propimages.component.html',
  styleUrl: './add-propimages.component.css',
})
export class AddPropimagesComponent implements OnInit, OnChanges {
  //------------------------ Data
  PropertyImage: FormGroup;
  //------------------------ Data

  /**
   *
   */
  constructor(
    private propertyService: ProperiesService,
    private fb: FormBuilder,
    private propertyControlService: PropControlService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPropertyImages();
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.CreateProperyImage();
    this.getAllPropertyImages();
  }

  CreateProperyImage() {
    this.PropertyImage = this.fb.group({
      propertyId: [
        `${localStorage.getItem('selectedPropertyId') || ''}`,
        [Validators.required],
      ],
      imageUrl: [''],
    });
  }

  // -------------------- File Uploud Handle
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.propertyControlService.uploadFile(file).subscribe({
        next: (response) => {
          this.PropertyImage.patchValue({
            imageUrl: response.fileUrl,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  // ------------------------- Get All Properties Images
  allPropImages: propertyImageGet[];
  getAllPropertyImages() {
    this.propertyControlService
      .getAllPropertyImage(localStorage.getItem('selectedPropertyId'))
      .subscribe((result: propertyImageGet[]) => {
        this.allPropImages = result;
        console.log(result);
      });
  }
  // ------------------------- DeletePropImage

  DeletePropImage(id) {
    this.propertyControlService.deletePropImage(id).subscribe((result) => {
      console.log(result);
      this.getAllPropertyImages();
    });
  }

  // ----------- Submit Function
  OnSubmit() {
    if (this.PropertyImage.valid) {
      this.propertyControlService
        .addNewPropImage(this.PropertyImage.value)
        .subscribe({
          next: () => {
            alert('Done');
            this.getAllPropertyImages();
          },
          error: (err) => {
            alert(err);
          },
        });
    } else {
      alert('Form is invalid');
    }
  }
}
