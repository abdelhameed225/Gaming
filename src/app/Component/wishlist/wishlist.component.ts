import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishListItems: any = [];
  isLoading: boolean = true;
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;

  constructor(private _wishListService: WishlistService,    public productService: ProductsService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService)
    {
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
  loadWishList() {
    this.wishListItems = this._wishListService.getWishList().subscribe({
      next: (response) => {
        this.wishListItems = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleDelete(id: any) {
    //////////////////////////////////////////////////////
    this._wishListService.deleteWishListItems(id).subscribe({
      next: (response) => {
        console.log(response);
        this.loadWishList();
        // this.toastr.success('Item Deleted Successfully');
      },
      error: (error) => {
        console.log(error);
        // this.toastr.success('Failed to delete item');
      },
      complete: () => {
        this.loadWishList();
      },
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
  }, 800); 
    this.loadWishList();
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
}
