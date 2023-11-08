import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';
import { ProductsService } from 'src/app/Services/product/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(
    public productService: ProductsService,
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
  products:any;
  isLoading:boolean = true;
  ngOnInit(): void {
    this.products=this.productService.getAllProducts().subscribe({
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
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:3,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
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



