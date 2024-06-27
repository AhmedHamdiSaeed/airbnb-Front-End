import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { countryModelGet } from '../../../Models/Amin/AdminModels';

@Component({
  selector: 'app-country-control',
  templateUrl: './country-control.component.html',
  styleUrl: './country-control.component.css',
})
export class CountryControlComponent implements OnInit {
  CountryDataForm: FormGroup;
  constructor(private adminService: AdminService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.GetAllCountry();
    this.CreateCountry();
  }

  // ----------------------------------- FORM
  CreateCountry() {
    this.CountryDataForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  // -------------------------- Country Control
  AllCities: countryModelGet[];
  GetAllCountry() {
    this.adminService.GetAllCountry().subscribe((result: countryModelGet[]) => {
      this.AllCities = result;
    });
  }

  DeleteCountry(id) {
    this.adminService.DeleteCountry(id).subscribe((result) => {
      alert('Dleted Successfuly');
      this.GetAllCountry();
    });
  }

  // --------------------- Select Amentity To Update
  CountryStatus = 'Add';
  selectedCountry: countryModelGet;
  selectToUpdate(item: countryModelGet) {
    this.selectedCountry = item;
    this.CountryStatus = 'Update';
    this.CountryDataForm.reset({
      name: item.name,
    });
  }
  // ----------- Submit Function

  OnSubmit() {
    if (this.CountryDataForm.valid) {
      if (this.CountryStatus === 'Add') {
        this.adminService.AddCountry(this.CountryDataForm.value).subscribe({
          next: () => {
            alert('Done');
            this.GetAllCountry();

            this.CountryDataForm.reset({
              name: '',
            });
          },
          error: (err) => {
            alert(err);
          },
        });
      } else {
        this.CountryStatus = 'Add';
        this.adminService
          .UpdateCountry(this.selectedCountry.id, this.CountryDataForm.value)
          .subscribe({
            next: () => {
              alert('Updated Done');
              this.GetAllCountry();
              this.CountryDataForm.reset({
                name: '',
              });
            },
          });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
