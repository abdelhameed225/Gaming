import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { BrandService } from 'src/app/Services/Brand/brand.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(
    public productService: ProductsService,
    public categoryService: CategoryService,
    public brandsService: BrandService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {
    _AuthService.user.subscribe({
      next: () => {
        const user = _AuthService.user.getValue();
        console.log('user', user);
        if (user !== null) {
          this.isLogin = true;
          this.userData = user;
          this.isAdmin = user.roles.includes('Admin');
          console.log('isAdmin', this.isAdmin);
        } else {
          this.isLogin = false;
          this.isAdmin = false;
          this.userData = null;
        }
      },
    });
  }

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
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.isLoading = false;
  }, 800); 
    this.products = this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response;
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
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response;
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
  handleAddToCart(event: any, id: any) {
    event.preventDefault();
    if (this.isLogin) {
      console.log('test');
      this._CartService.addToCart(id).subscribe({
        next: (response) => {
          this.toastr.success('Item added to cart successfully');
          console.log('done', response);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    } else {
      this._Router.navigate(['/login']);
    }
  }
handelAddToWishList(productId: any) {
  this._WishlistService.addToWishList(productId).subscribe({
    next: (response) => {
      this.toastr.success('Item Added Successfully To Wish List', 'Success');
    },
    error: (errro) => {
      this.toastr.error('Fail To Add Item To Wish List', 'Error');
    },
  });
}
}
