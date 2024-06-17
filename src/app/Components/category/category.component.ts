import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../Services/CategoryServices/category.service';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories: Category[] = [];
  loading: boolean =false;
  @ViewChild('categoryNav', { read: ElementRef }) public categoryNav: ElementRef<any>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loading =true;
    this.categoryService.GetAllCategories().subscribe({
      next:(data: Category[])=>{
        this.categories =data;
        this.loading =false;
      },
      error(err) {
        this.loading =false;
        alert("there's an error occured while loading data!")
      },
     }
    );
  }


  scrollLeft(): void {
    this.categoryNav.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.categoryNav.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
