import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
constructor(public productService: ProductsService, public categoryService:CategoryService){}
  products:any;
  isLoading:boolean = true;
  categories:any;
  ngOnInit(): void {


    this.products=this.productService.getAllProducts().subscribe({
      next:(response)=>{
        
        this.products=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
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
