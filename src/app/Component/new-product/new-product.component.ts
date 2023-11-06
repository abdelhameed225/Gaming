import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
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
