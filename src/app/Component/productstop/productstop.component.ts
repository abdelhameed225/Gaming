import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-productstop',
  templateUrl: './productstop.component.html',
  styleUrls: ['./productstop.component.css']
})
export class ProductstopComponent implements OnInit {
  constructor(public productService: ProductsService){}
  products:any;
  isLoading:boolean = true;
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

  }
}
