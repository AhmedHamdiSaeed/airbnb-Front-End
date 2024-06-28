import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Property, RootProperty } from '../../../Models/PropertyModels';
import { AdminService } from '../admin.service';
import { cityModelGet } from '../../../Models/Amin/AdminModels';
import { CategoryFielsModel } from '../../../Models/Category';
import { Ceties } from '../../../Models/CetiesModel';
import { PropControlService } from '../../properties/property-control/prop-control.service';

@Component({
  selector: 'app-admin-proprtycontrol',
  templateUrl: './admin-proprtycontrol.component.html',
  styleUrl: './admin-proprtycontrol.component.css',
})
export class AdminProprtycontrolComponent implements OnInit {
  ngOnInit(): void {
    this.GetAllPropertyForAdmin(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      this.cateId
    );
    this.GetAllCeties();
    this.GetAllCategories();
  }

  constructor(
    private adminService: AdminService,
    private propertyControlService: PropControlService
  ) {}

  // -------------------------- Get All Property Fo Admin
  pageNumber: number;
  pageSize: number = 8;
  cityId: number;
  cateId: number;
  Quantity: number;
  properties: Property[];

  numberOfPages: number;
  GetAllPropertyForAdmin(pageNumber, pageSize, cityId, cateId) {
    this.adminService
      .GetAllPropertyForAdmin(pageNumber, pageSize, cityId, cateId)
      .subscribe((result: RootProperty) => {
        this.properties = result.properties;
        this.Quantity = result.quantity;
        this.numberOfPages = Math.ceil(this.Quantity / pageSize);
        if (this.numberOfPages == 0) this.numberOfPages = 1;
        console.log(this.numberOfPages);
        console.log(result);
      });
  }
  UpdateProperty(id) {
    this.adminService.UpdateProperty(id, { PropertStatus: 2 }).subscribe({
      next: () => {
        this.GetAllPropertyForAdmin(
          this.pageNumber,
          this.pageSize,
          this.cityId,
          this.cateId
        );
        alert('Updated Successfuly');
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  // Get All Cities
  allCeties: Ceties[];
  GetAllCeties() {
    this.adminService.GetAllCity().subscribe((result: Ceties[]) => {
      this.allCeties = result;
    });
  }
  selectCity(selectedId) {
    this.cityId = selectedId.target.value;

    this.GetAllPropertyForAdmin(
      this.pageNumber,
      this.pageSize,
      selectedId.target.value,
      this.cateId
    );
  }
  // Get All Categories
  allCategories: CategoryFielsModel[];
  GetAllCategories() {
    this.adminService
      .GetAllCategory()
      .subscribe((result: CategoryFielsModel[]) => {
        console.log(result);
        this.allCategories = result;
      });
  }
  selectCategory(selectedId) {
    this.cateId = selectedId;
    this.GetAllPropertyForAdmin(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      selectedId
    );
  }

  //clear Filter
  @ViewChild('search') searchInput;

  clearFilter() {
    this.cityId = null;
    this.cateId = null;
    this.searchInput.nativeElement.value = '';
    this.GetAllPropertyForAdmin(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      this.cateId
    );
  }

  //Select Page Number
  counter(i: number) {
    return new Array(i);
  }
  selectPageNumber(event) {
    this.pageNumber = parseInt(event.target.innerHTML);

    this.GetAllPropertyForAdmin(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      this.cateId
    );
  }
  //search Function
  SearchByName(value) {
    if (value.target.value) {
      this.properties = this.properties.filter((x) =>
        x.name.toLowerCase().startsWith(value.target.value)
      );
    } else {
      this.GetAllPropertyForAdmin(
        this.pageNumber,
        this.pageSize,
        this.cityId,
        this.cateId
      );
    }
  }

  // paggenation active add class
  activeIndex: number | null = 0;

  setActive(index: number): void {
    this.activeIndex = index;
  }
  // -------------------------------------------------------- Category
  @ViewChild('categoryNav', { read: ElementRef }) categoryNav: ElementRef<any>;
  scrollLeft(): void {
    this.categoryNav.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }
  ifEnd: boolean = false;
  scrollRight(): void {
    this.categoryNav.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  // ---------------------
  DeletePropertyByAdmin(id: number) {
    this.propertyControlService.DeletePropertyByHoster(id).subscribe({
      next: (response) => {
        alert('Property Canceld');
        this.GetAllPropertyForAdmin(
          this.pageNumber,
          this.pageSize,
          this.cityId,
          this.cateId
        );
      },
      error: (err) => {
        this.GetAllPropertyForAdmin(
          this.pageNumber,
          this.pageSize,
          this.cityId,
          this.cateId
        );
      },
    });
  }
}
