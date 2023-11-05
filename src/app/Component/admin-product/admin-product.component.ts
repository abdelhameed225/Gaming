import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  constructor(public productService: ProductsService, public categoryService:CategoryService){}

  products: any;
    isLoading: boolean = true;
    categories: any;
    productsByCat: any;
    Cattid:number=0;
    arrays: any;
    filtered: any=[];
    prfiltered: any=[]; 
    finalfilter: any; 
    /////////////////////////////////////////////////////
    Oncheckked(event: any)
    {
      if(event.target.checked){
        this.Cattid=0;}
    }
    ///////////////////////////////////////////
      
  Onchecked(event: any, Catid:number)
  {
    if(event.target.checked){
      this.Cattid=Catid;
      this.arrays=this.products;
      this.prfiltered=this.arrays.filter((e:any)=>e.categoryName==event.target.value);
      this.finalfilter=[];
      this.filtered.push(this.prfiltered);
  
      for(let i=0;i<this.filtered.length;i++){
        let prArray=this.filtered[i];
        for(let i=0;i<prArray.length;i++){
          let obj=prArray[i];
          this.finalfilter.push(obj);
        }
      }
    }
    else{
      this.prfiltered=this.finalfilter.filter((e:any)=>e.categoryName!=event.target.value);
      this.filtered=[];
      this.finalfilter=[];
      this.filtered.push(this.prfiltered);
      for(let i=0;i<this.filtered.length;i++){
        let prArray=this.filtered[i];
        for(let i=0;i<prArray.length;i++){
          let obj=prArray[i];
          this.finalfilter.push(obj);
          if (this.finalfilter==null) {
            
          }
        }
      }
      
    }
  }
  
    ////////////////////////////////////////
  
    ngOnInit(): void {
  
  
      this.products=this.productService.getAllProducts().subscribe({
        next:(response)=>{
          
          this.products=response;
          this.isLoading = false;
          // console.log(response);
          
        },
        error:(error)=>{
          console.log(error);
          
        }
       });
  //////////////////////////////////////////////////////////////////
  
  this.productsByCat=this.productService.getProductByCatId(this.Cattid).subscribe({
    next:(response)=>{
      
      this.productsByCat=response;
      this.isLoading = false;
      // console.log(response);
      
    },
    error:(error)=>{
      console.log(error);
      
    }
   });
  
  
  /////////////////////////////////////////////////////////////////
       this.categories=this.categoryService.getAllCategory().subscribe({
        next:(response)=>{
          
          this.categories=response;
          this.isLoading = false;
          // console.log(response);
          
        },
        error:(error)=>{
          console.log(error);
          
        }
       });
  
    }
}
