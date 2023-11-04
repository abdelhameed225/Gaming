import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product:any;
  productId:number=0;
  isLoading:boolean = true;
  constructor(public productService: ProductsService ,public activated:ActivatedRoute)
  {
    this.productId=this.activated.snapshot.params['id']
  }
  ngOnInit(): void {
    this.product=this.productService.getProductById(this.productId).subscribe({
      next:(response)=>{
        
        this.product=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
  }
}
