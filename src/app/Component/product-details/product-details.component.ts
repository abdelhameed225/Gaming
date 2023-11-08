import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/Services/Brand/brand.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    public productService: ProductsService,
    public categoryService: CategoryService,
    public brandsService: BrandService
  ) {}

  products: any = [];
  filteredProducts: any = [];
  searchValue: any = '';
  selectedCategories: any = [];
  brands: any = [];
  selectedBrands: any = [];
  isLoading: boolean = true;
  categories: any;

  /////////////////////////////////////////////////////

  ///////////////////////////////////////////
  filterProducts() {
    this.filteredProducts = this.products
      .filter((product: any) => {
        if (
          this.selectedBrands.length === 0 ||
          this.selectedBrands.includes('all') ||
          this.selectedBrands.includes(product.brandName.toLowerCase())
        ) {
          return true;
        } else {
          {
            return false;
          }
        }
      })
      .filter((product: any) => {
        if (
          this.selectedCategories.length === 0 ||
          this.selectedCategories.includes('all') ||
          this.selectedCategories.includes(product.categoryName.toLowerCase())
        ) {
          return true;
        } else {
          {
            return false;
          }
        }
      })
      .filter((product: any) => {
        if (
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
  }
  handleCheckCategory(event: any, categoryName: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryName.toLowerCase());
    } else {
      const index = this.selectedCategories.indexOf(categoryName.toLowerCase());
      if (index > -1) {
        // only splice array when item is found
        this.selectedCategories.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    console.log('this.selectedCategories', this.selectedCategories);
    this.filterProducts();
  }

  ////////////////////////////////////////

  ngOnInit(): void {
    this.products = this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    //////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleCheckBrand(event: any, brandName: any) {
    if (event.target.checked) {
      this.selectedBrands.push(brandName.toLowerCase());
    } else {
      const index = this.selectedBrands.indexOf(brandName.toLowerCase());
      if (index > -1) {
        // only splice array when item is found
        this.selectedBrands.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    console.log('this.selectedBrands', this.selectedBrands);
    this.filterProducts();
  }

  onSearchInput(event: any) {
    this.searchValue = event.target.value;
    this.filterProducts();
  }
}
