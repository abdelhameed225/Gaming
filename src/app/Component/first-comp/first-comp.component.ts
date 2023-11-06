import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Iproduct } from 'src/app/Interfaces/Iproduct/iproduct';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { ProductsService } from 'src/app/Services/product/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-first-comp',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.css'],
})
export class FirstCompComponent implements OnInit {
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(
    public productService: ProductsService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private toastr: ToastrService
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

  products: any;
  Catid: number = 0;
  productsByCat: any;
  isLoading: boolean = true;

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
  isLaptop() {
    this.Catid = 1;
    this.fetchProductsByCategory();
  }

  isMonitor() {
    this.Catid = 2;
    this.fetchProductsByCategory();
  }

  isGamingchair() {
    this.Catid = 3;
    this.fetchProductsByCategory();
  }

  private fetchProductsByCategory() {
    setTimeout(() => {
      this.productService.getProductByCatId(this.Catid).subscribe({
        next: (response) => {
          this.productsByCat = response;
          this.isLoading = false;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    /////////////////////////////////////////
    this.productsByCat = this.productService
      .getProductByCatId(this.Catid)
      .subscribe({
        next: (response) => {
          this.productsByCat = response;
          this.isLoading = false;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  isButtonVisible = false;

  showBtn() {
    this.isButtonVisible = !this.isButtonVisible;
  }
  banner: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    // dots: true,
    dotsEach: 1,
    animateOut: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

  /////
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
}
