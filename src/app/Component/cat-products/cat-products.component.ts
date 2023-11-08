import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-cat-products',
  templateUrl: './cat-products.component.html',
  styleUrls: ['./cat-products.component.css']
})
export class CatProductsComponent implements OnInit {
  products:any;
  Catid:number=0;
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(public productService: ProductsService,public activated:ActivatedRoute,
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService)
    {

    this.Catid=this.activated.snapshot.params['id']
    ///////////////////////////////////////////
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
