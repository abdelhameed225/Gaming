import { ProductsService } from 'src/app/Services/product/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/Brand/brand.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { Iproduct } from 'src/app/Interfaces/Iproduct/iproduct';

@Component({
  selector: 'app-addnew-product',
  templateUrl: './addnew-product.component.html',
  styleUrls: ['./addnew-product.component.css']
})
export class AddnewProductComponent implements OnInit {
  link: string = '';

  product:any;
  categories: any;
  productId:number = 0;
  brands: any;
  cat:any;
  isLoading: boolean = true;
  iscomp: boolean = false;
  iscommp: boolean = false;
  ///////////////////////////////////////
  
  title:any;
  description:any;
  sku:any;
  price:any;
stock:any;
rating:any;
category_Id:any=0;
brandId:any=0;
imgUrl:any;



  constructor(public categoryService: CategoryService, public brandService: BrandService, public activated:ActivatedRoute,public ProductsService: ProductsService,public route:Router) { 
    this.productId=this.activated.snapshot.params['id']
  }



  ngOnInit(): void {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.isLoading = false;
  }, 800); 
    this.categories = this.categoryService.getAllCategory().subscribe({
      next: (response) => {

        this.categories = response;
        console.log(response);
        console.log('hi i am a category');

      },
      error: (error) => {
        console.log(error);
        console.log('hi i am a category error');


      }
    });
    ///////////////////////////////////
    this.brands = this.brandService.getAllBrands().subscribe({
      next: (response) => {

        this.brands = response;
        console.log(response);
        console.log('hi i am a brand');


      },
      error: (error) => {
        console.log(error);
        console.log('hi i am a brand error');


      }
    });
        ///////////////////////////////////

        if(this.productId!=0){

          this.product = this.ProductsService.getProductById(this.productId).subscribe({
            next: (response) => {
      
              this.product = response;
              this.title=this.product.title
              this.description=this.product.description
              this.sku=this.product.sku
              this.price=this.product.price
              this.stock=this.product.stock
              this.rating=this.product.rating
              ////////////////////////////////////
              this.handleRefresh(this.product.categoryName.toLowerCase());

                /////////////////////////////////////



                ////////////////////////////////////
              this.imgUrl=this.link= this.product.imgUrl
              console.log(response);
      
            },
            error: (error) => {
              console.log(error);
      
            }
          });

        }

  }
  ProductForm = new FormGroup({
    ProductTitle: new FormControl('', [Validators.required]),
    ProductDescription: new FormControl('', [Validators.required]),
    ProductPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    CategoryName: new FormControl('', [Validators.required]),
    BrandName: new FormControl('', [Validators.required]),
    ProductSKU: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(15),
    ]),
    ProductQuantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    //////////////////////////////
    Categoty: new FormControl('', [
      Validators.required,

    ]),
        Brand: new FormControl('', [
      Validators.required,

    ]),
    /////////////////////////////
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
  get getCategoryname() {
    return this.ProductForm.controls['Categoty'];
  }  get getBrandname() {
    return this.ProductForm.controls['Brand'];
  }
  ///////////////////////////////////////


Editedproduct:any={
  title: '',
  price: 0,
  description: "string",
  imgUrl: "",
  rating: 5,
  stock: 0,
  sku: 0,
  category_Id: 0,
  brandId: 0
};
Newproduct:any={
  title: '',
  price: 0,
  description: "string",
  imgUrl: "p5Xw3CCzRVRf20XSnJ0U2o1ST47irW8SlM5VETGAMq_ZlF745rld7yBrgkmHlr8ruYVVUoM2L248LkSGxIw4.png",
  rating: 5,
  stock: 0,
  sku: 0,
  category_Id: 0,
  brandId: 0
};



////////////////////////////////////////

  Edit() {
    this.Editedproduct.title=this.title
    this.Editedproduct.price=this.price
    this.Editedproduct.description=this.description
    this.Editedproduct.imgUrl=this.link
    this.Editedproduct.stock=this.stock
    this.Editedproduct.sku=this.sku
    this.Editedproduct.category_Id=this.category_Id
    this.Editedproduct.brandId=this.brandId
    console.log(this.Editedproduct);
    

    this.ProductsService.editProduct(this.productId,this.Editedproduct).subscribe({
      next: (response) => {

        this.route.navigate(['/admin/product']);
        console.log(response);

      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  Add() {
    console.log(this.ProductForm.value)
    this.Newproduct.title=this.title
    this.Newproduct.price=this.price
    this.Newproduct.description=this.description
    this.Newproduct.imgUrl=this.link
    this.Newproduct.stock=this.stock
    this.Newproduct.sku=this.sku
    this.Newproduct.category_Id=this.category_Id
    this.Newproduct.brandId=this.brandId
    console.log(this.Newproduct);
    

    this.ProductsService.addProduct(this.Newproduct).subscribe({
      next: (response) => {

        this.route.navigate(['/admin/product']);
        console.log(response);

      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  img(event: any){
    if(event.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any) => {
        this.link= event.target.result;
        
      }
    }
  }
  handleRefresh(name:any){
    
        this.cat = this.categoryService.getCategoryByName(name).subscribe({
          next: (response) => {
    
            this.cat = response;
            console.log(this.cat);
            if(this.cat.name==this.product.categoryName)
            {
              this.category_Id=this.cat.id;
              for(let i=0; i<this.brands.length; i++) 
              {
                if(this.brands[i].name==this.product.brandName)
                {
                  this.brandId=this.brands[i].id;
                  this.iscommp = false;
                  }
                else{
                  console.log('not brand equal');
                  
                }
              }
            }
            else{
              console.log('not equal');
            }


    
          },
          error: (error) => {
            console.log(error);
    
          }
        });

      }
    }
