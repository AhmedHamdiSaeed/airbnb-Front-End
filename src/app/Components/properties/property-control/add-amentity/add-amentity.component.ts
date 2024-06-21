import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { PropControlService } from '../prop-control.service';
import {
  AmentityAdd,
  AmentityGet,
} from '../../../../Models/PropertyControlModels/AllPropertyControlModels';

@Component({
  selector: 'app-add-amentity',
  templateUrl: './add-amentity.component.html',
  styleUrl: './add-amentity.component.css',
})
export class AddAmentityComponent implements OnInit, OnChanges {
  AmentityData: FormGroup;

  constructor(
    private propertyService: ProperiesService,
    private fb: FormBuilder,
    private propertyControlService: PropControlService,
    private activeRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllPropertyAmentity();
    this.CreateAmentity();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPropertyAmentity();
  }
  // ------------------------------
  CreateAmentity() {
    this.AmentityData = this.fb.group({
      propertyId: [
        `${localStorage.getItem('selectedPropertyId') || ''}`,
        [Validators.required],
      ],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  // ------------------------- Get All PropertyAmentity
  allAmentity: AmentityGet[];
  getAllPropertyAmentity() {
    this.propertyControlService
      .getAllAmentityForProperty(localStorage.getItem('selectedPropertyId'))
      .subscribe((result: AmentityGet[]) => {
        this.allAmentity = result;
        console.log(result);
      });
  }
  // ------------------------- Delete amentiry

  DeletePropAmentity(id) {
    this.propertyControlService.deleteAmentity(id).subscribe((result) => {
      console.log(result);
      this.getAllPropertyAmentity();
    });
  }

  // ----------- Submit Function
  OnSubmit() {
    if (this.AmentityData.valid) {
      this.propertyControlService
        .addNewAmentity(this.AmentityData.value)
        .subscribe({
          next: () => {
            alert('Done');
            this.getAllPropertyAmentity();
            const propertyId = this.AmentityData.get('propertyId').value;
            this.AmentityData.reset({
              propertyId: propertyId,
              name: '',
              description: '',
            });
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
