import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { cityModelGet, cityModel } from '../../../Models/Amin/AdminModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-control',
  templateUrl: './city-control.component.html',
  styleUrl: './city-control.component.css',
})
export class CityControlComponent implements OnInit {
  CityDataForm: FormGroup;
  constructor(private adminService: AdminService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.GetAllCity();
    this.CreateCity();
  }

  // ----------------------------------- FORM
  CreateCity() {
    this.CityDataForm = this.fb.group({
      countryId: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  // -------------------------- City Control
  AllCities: cityModelGet[];
  GetAllCity() {
    this.adminService.GetAllCity().subscribe((result: cityModelGet[]) => {
      this.AllCities = result;
    });
  }

  DeleteCity(id) {
    this.adminService.DeleteCity(id).subscribe((result) => {
      alert('Dleted Successfuly');
      this.GetAllCity();
    });
  }

  // --------------------- Select Amentity To Update
  cityStatus = 'Add';
  selectedCity: cityModelGet;
  selectToUpdate(item: cityModelGet) {
    this.selectedCity = item;
    this.cityStatus = 'Update';
    this.CityDataForm.reset({
      countryId: item.countryId,
      name: item.name,
    });
  }
  // ----------- Submit Function

  OnSubmit() {
    if (this.CityDataForm.valid) {
      if (this.cityStatus === 'Add') {
        this.adminService.AddCity(this.CityDataForm.value).subscribe({
          next: () => {
            alert('Done');
            this.GetAllCity();

            this.CityDataForm.reset({
              name: '',
              countryId: '',
            });
          },
          error: (err) => {
            alert(err);
          },
        });
      } else {
        this.cityStatus = 'Add';
        this.adminService
          .UpdateCity(this.selectedCity.id, this.CityDataForm.value)
          .subscribe({
            next: () => {
              alert('Updated Done');
              this.GetAllCity();
              this.CityDataForm.reset({
                name: '',
                countryId: '',
              });
            },
          });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
