import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProperiesService } from '../../../../Services/PropertyServices/properies.service';
import { PropControlService } from '../prop-control.service';
import {
  AmentityGet,
  AppoinmentAvailableGet,
} from '../../../../Models/PropertyControlModels/AllPropertyControlModels';

@Component({
  selector: 'app-add-appoinmentavailable',
  templateUrl: './add-appoinmentavailable.component.html',
  styleUrl: './add-appoinmentavailable.component.css',
})
export class AddAppoinmentavailableComponent {
  AppoinmentAvailableData: FormGroup;

  constructor(
    private propertyService: ProperiesService,
    private fb: FormBuilder,
    private propertyControlService: PropControlService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllPropertyAppoinemtnAvaialbe();
    this.CreateAmentity();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPropertyAppoinemtnAvaialbe();
  }
  // ------------------------------
  CreateAmentity() {
    this.AppoinmentAvailableData = this.fb.group({
      propertyId: [
        `${localStorage.getItem('selectedPropertyId') || ''}`,
        [Validators.required],
      ],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      pricePerNight: ['', [Validators.required]],
      isAvailable: ['0', [Validators.required]],
    });
  }
  // ------------------------- Get All PropertyAmentity
  allAppoinmentAvailable: AppoinmentAvailableGet[];
  getAllPropertyAppoinemtnAvaialbe() {
    this.propertyControlService
      .getAllAppoinmentAvaiableForProperty(
        localStorage.getItem('selectedPropertyId')
      )
      .subscribe((result: AppoinmentAvailableGet[]) => {
        this.allAppoinmentAvailable = result;
        console.log(result);
      });
  }
  // ------------------------- Delete amentiry

  DeletePropAppoinemtnAvaialbe(id) {
    this.propertyControlService
      .deleteAppoinmentAvaiable(id)
      .subscribe((result) => {
        console.log(result);
        this.getAllPropertyAppoinemtnAvaialbe();
      });
  }
  // --------------------- Select AppoinmentAvaiable To Update
  AppoinmentStatus = 'Add';
  selectedAppoinment: AppoinmentAvailableGet;
  selectToUpdate(item: AppoinmentAvailableGet) {
    this.selectedAppoinment = item;
    this.AppoinmentStatus = 'Update';
    this.AppoinmentAvailableData.reset({
      propertyId: item.id,
      from: new Date(item.from).toISOString().substring(0, 10),
      to: new Date(item.to).toISOString().substring(0, 10),
      pricePerNight: item.pricePerNight,
      isAvailable: +item.isAvailable,
    });
    console.log(this.AppoinmentAvailableData.value);
  }
  // ----------- Submit Function
  OnSubmit() {
    if (this.AppoinmentAvailableData.valid) {
      if (this.AppoinmentStatus === 'Add') {
        // ----------------- Add
        this.propertyControlService
          .addAppoinmentAvaiable(this.AppoinmentAvailableData.value)
          .subscribe({
            next: () => {
              alert('Done');
              this.getAllPropertyAppoinemtnAvaialbe();
              const propertyId =
                this.AppoinmentAvailableData.get('propertyId').value;

              this.AppoinmentAvailableData.reset({
                propertyId: propertyId,
                from: '',
                to: '',
                pricePerNight: '',
                isAvailable: '',
              });
            },
            error: (err) => {
              console.log(this.AppoinmentAvailableData.value);
              alert(err);
            },
          });
      } else {
        // ----------------- Update
        this.AppoinmentStatus = 'Add';
        this.propertyControlService
          .updateAppoinmentAvaiable(
            this.selectedAppoinment.id,
            this.AppoinmentAvailableData.value
          )
          .subscribe({
            next: () => {
              alert('Update Done');
              this.getAllPropertyAppoinemtnAvaialbe();
              const propertyId =
                this.AppoinmentAvailableData.get('propertyId').value;

              this.AppoinmentAvailableData.reset({
                propertyId: propertyId,
                from: '',
                to: '',
                pricePerNight: '',
                isAvailable: '',
              });
            },
            error: (err) => {
              console.log(this.AppoinmentAvailableData.value);
              alert(err);
            },
          });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
