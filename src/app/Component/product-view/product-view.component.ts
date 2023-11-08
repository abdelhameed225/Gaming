import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/product/products.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  product: any;
  productId: number = 0;
  isLoading: boolean = true;
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(
    public productService: ProductsService,
    public activated: ActivatedRoute,
    public _WishlistService: WishlistService,
    private toastr: ToastrService,
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _Router: Router
  ) {
    this.productId = this.activated.snapshot.params['id'];
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
  ngOnInit(): void {
    this.product = this.productService
      .getProductById(this.productId)
      .subscribe({
        next: (response) => {
          this.product = response;
          this.isLoading = false;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
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
