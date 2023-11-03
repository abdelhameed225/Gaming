import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-cattop',
  templateUrl: './cattop.component.html',
  styleUrls: ['./cattop.component.css']
})
export class CattopComponent implements OnInit {
  products:any;
  Catid:number=0;
  constructor(public productService: ProductsService,public activated:ActivatedRoute){

    this.Catid=this.activated.snapshot.params['id']
  }

  isLoading:boolean = true;
  ngOnInit(): void {
    this.products=this.productService.getProductByCatId(this.Catid).subscribe({
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
