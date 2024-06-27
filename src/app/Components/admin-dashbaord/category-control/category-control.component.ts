import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { categoryModelGet } from '../../../Models/Amin/AdminModels';

@Component({
  selector: 'app-category-control',
  templateUrl: './category-control.component.html',
  styleUrl: './category-control.component.css',
})
export class CategoryControlComponent implements OnInit {
  CategoryDataForm: FormGroup;
  constructor(private adminService: AdminService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.GetAllCategory();
    this.CreateCategory();
  }

  // ----------------------------------- FORM
  CreateCategory() {
    this.CategoryDataForm = this.fb.group({
      iconURL: [''],
      name: ['', [Validators.required]],
    });
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.adminService.uploadFile(file).subscribe({
        next: (response) => {
          this.CategoryDataForm.patchValue({
            iconURL: response.fileUrl,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
  // -------------------------- Category Control
  AllCategories: categoryModelGet[];
  GetAllCategory() {
    this.adminService
      .GetAllCategory()
      .subscribe((result: categoryModelGet[]) => {
        this.AllCategories = result;
      });
  }

  DeleteCategory(id) {
    this.adminService.DeleteCategory(id).subscribe((result) => {
      alert('Dleted Successfuly');
      this.GetAllCategory();
    });
  }

  // --------------------- Select Amentity To Update
  categoryStatus = 'Add';
  selectedCategory: categoryModelGet;
  selectToUpdate(item: categoryModelGet) {
    this.selectedCategory = item;
    this.categoryStatus = 'Update';
    this.CategoryDataForm.reset({
      iconURL: '',
      name: item.name,
    });
  }
  // ----------- Submit Function

  OnSubmit() {
    if (this.CategoryDataForm.valid) {
      if (this.categoryStatus === 'Add') {
        this.adminService.AddCategory(this.CategoryDataForm.value).subscribe({
          next: () => {
            alert('Done');
            this.GetAllCategory();

            this.CategoryDataForm.reset({
              name: '',
              iconURL: '',
            });
          },
          error: (err) => {
            alert(err);
          },
        });
      } else {
        this.categoryStatus = 'Add';
        this.adminService
          .UpdateCategory(this.selectedCategory.id, this.CategoryDataForm.value)
          .subscribe({
            next: () => {
              alert('Updated Done');
              this.GetAllCategory();
              this.CategoryDataForm.reset({
                name: '',
                iconURL: '',
              });
            },
          });
      }
    } else {
      alert('Form is invalid');
    }
  }
}
