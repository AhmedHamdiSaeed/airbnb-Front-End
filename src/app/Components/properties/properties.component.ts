import { Component, OnInit, ViewChild } from '@angular/core';
import { ProperiesService } from '../../Services/PropertyServices/properies.service';
import { Property, RootProperty } from '../../Models/PropertyModels';
import { Ceties } from '../../Models/CetiesModel';
import { Categories } from '../../Models/CategoryModel';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  ngOnInit(): void {
    this.GetAllPropertyForAllUsers(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      this.cateId
    );
    this.GetAllCeties();
    this.GetAllCategories();
  }
  /**
   *
   */
  constructor(private service: ProperiesService) {}
  pageNumber: number;
  pageSize: number = 2;
  cityId: number;
  cateId: number;
  Quantity: number;
  properties: Property[];

  numberOfPages: number;
  GetAllPropertyForAllUsers(pageNumber, pageSize, cityId, cateId) {
    this.service
      .GetAllPropertyForAllUsers(pageNumber, pageSize, cityId, cateId)
      .subscribe((result: RootProperty) => {
        this.properties = result.properties;
        this.Quantity = result.quantity;
        this.numberOfPages = Math.floor(this.Quantity / pageSize);
        console.log(this.numberOfPages);
        console.log(result);
      });
  }

  // Get All Cities
  allCeties: Ceties[];
  GetAllCeties() {
    this.service.GetAllCity().subscribe((result: Ceties[]) => {
      this.allCeties = result;
    });
  }
  selectCity(selectedId) {
    this.cityId = selectedId.target.value;

    this.GetAllPropertyForAllUsers(
      this.pageNumber,
      this.pageSize,
      selectedId.target.value,
      this.cateId
    );
  }
  // Get All Categories
  allCategories: Categories[];
  GetAllCategories() {
    this.service.GetAllCategory().subscribe((result: Categories[]) => {
      this.allCategories = result;
    });
  }
  selectCategory(selectedId) {
    this.cateId = selectedId.target.value;
    this.GetAllPropertyForAllUsers(
      this.pageNumber,
      this.pageSize,
      this.cityId,
      selectedId.target.value
    );
  }

  //clear Filter
  @ViewChild('search') searchInput;

  clearFilter() {
    this.cateId = null;
    this.cateId = null;
    this.searchInput.nativeElement.value = '';
    this.GetAllPropertyForAllUsers(
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

    this.GetAllPropertyForAllUsers(
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
      this.GetAllPropertyForAllUsers(
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
}
