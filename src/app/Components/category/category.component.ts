import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../Services/CategoryServices/category.service';
import { Category, CategoryFielsModel } from '../../Models/Category';
import { ProperiesService } from '../../Services/PropertyServices/properies.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  //categories: any[] = [];
  selectedCategory: Category | null = null;
  loading: boolean = false;
  // hideLeftButton: boolean = true;
  // hideRightButton: boolean = false;

  @ViewChild('categoryNav', { read: ElementRef }) categoryNav: ElementRef<any>;

  constructor(
    private categoryService: CategoryService,
    private propertyservice: ProperiesService
  ) {}

  ngOnInit(): void {
    //this.categories = this.categories.slice(0, 10); // Show the first 10 categories initially
    //this.loading = true;
    // this.categoryService.GetAllCategs().subscribe({
    //   next: (response :any ) => {
    //     this.categories = response.data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     console.error('Error fetching categories', err);
    //   },
    //   complete:() => {
    //     console.log('Loaded Categories from the API.')
    //   }
    // });
    this.GetAllCategories();
  }
  selectCategory(category: Category): void {
    this.selectedCategory = category;
    // this.propertyservice.GetAllPropertyForAllUsers;      //where the properties dipalyed under specific catgeory
  }

  scrollLeft(): void {
    this.categoryNav.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.categoryNav.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  // updateButtonVisibility(): void {
  //   const navElement = this.categoryNav.nativeElement;
  //   this.hideLeftButton = navElement.scrollLeft === 0;
  //   this.hideRightButton = navElement.scrollLeft + navElement.clientWidth >= navElement.scrollWidth;
  // }
  allCategories: CategoryFielsModel[];
  GetAllCategories() {
    this.categoryService
      .GetAllCategs()
      .subscribe((result: CategoryFielsModel[]) => {
        console.log(result);
        this.allCategories = result;
      });
  }
}
