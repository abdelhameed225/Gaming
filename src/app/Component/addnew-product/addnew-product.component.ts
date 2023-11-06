import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/Services/Brand/brand.service';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-addnew-product',
  templateUrl: './addnew-product.component.html',
  styleUrls: ['./addnew-product.component.css']
})
export class AddnewProductComponent implements OnInit {
  link: string = 'assets/img/';

  img(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.link = event.target.result;
        console.log(this.link);
      };
    }
  }
  constructor(public categoryService: CategoryService, public brandService: BrandService){}
  categories:any;
  brands:any;
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
     ///////////////////////////////////
     this.brands=this.brandService.getAllBrands().subscribe({
      next:(response)=>{
        
        this.brands=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
  }
  ProductForm = new FormGroup({
    ProductTitle: new FormControl('', [Validators.required]),
    ProductDescription: new FormControl('', [Validators.required]),
    ProductPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    ProductSKU: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(15),
    ]),
    ProductQuantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    ProductRating: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    ProductImage: new FormControl('', [Validators.required]),
  });
  get getProductTitle() {
    return this.ProductForm.controls['ProductTitle'];
  }

  get getProductDescription() {
    return this.ProductForm.controls['ProductDescription'];
  }

  get getProductPrice() {
    return this.ProductForm.controls['ProductPrice'];
  }

  get getProductSKU() {
    return this.ProductForm.controls['ProductSKU'];
  }

  get getProductQuantity() {
    return this.ProductForm.controls['ProductQuantity'];
  }

  get getProductRating() {
    return this.ProductForm.controls['ProductRating'];
  }

  get getProductImage() {
    return this.ProductForm.controls['ProductImage'];
  }

  Add(e: Event) {
    e.preventDefault();
    // console.log(this.RegisterForm);
    if (this.ProductForm.status == 'VALID') {
      //conection with api
      console.log();
    }
  }
}

