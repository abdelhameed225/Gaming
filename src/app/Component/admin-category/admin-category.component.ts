import { Component } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  constructor(public categoryService: CategoryService){}
  categories:any;
  isLoading:boolean = true;
  ngOnInit(): void {
    this.categories=this.categoryService.getAllCategory().subscribe({
      next:(response)=>{
        
        this.categories=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
  }
}
