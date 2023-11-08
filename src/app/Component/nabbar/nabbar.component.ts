import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-nabbar',
  templateUrl: './nabbar.component.html',
  styleUrls: ['./nabbar.component.css'],
})
export class NabbarComponent implements OnInit {
  cartItems: any = [];
  // get user details
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  subtotal: number = 0;
  categories: any;
  isLoading: boolean = true;
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private toastr: ToastrService,
    public categoryService: CategoryService
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
  ngOnInit(): void {
    this.cartItems = this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response;
        this.loadCart();

        this.subtotal = this.cartItems.reduce((acc: any, curr: any) => {
          return acc + curr.product.price * curr.amount;
        }, 0);
        console.log('subtotal', this.subtotal);
        // this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.categories = this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  navbarfixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 56) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  handleLogout() {
    this._AuthService.logout();
  }
  loadCart() {
    this.cartItems = this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response;

        this.subtotal = this.cartItems.reduce((acc: any, curr: any) => {
          return acc + curr.product.price * curr.amount;
        }, 0);
        console.log('subtotal', this.subtotal);
        // this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
