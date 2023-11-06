import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/Cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any = [];

  isLoading: boolean = false;
  subtotal: number = 0;
  constructor(private _CartService: CartService) {}
  ///////////////////////////////
  handleDelete(id: any) {
    //////////////////////////////////////////////////////
    this._CartService.deleteCartItem(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.loadCart();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadCart();
      },
    });
  }

  loadCart() {
    this.cartItems = this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response;

        this.subtotal = this.cartItems.reduce((acc: any, curr: any) => {
          return acc + curr.product.price * curr.amount;
        }, 0);
        console.log('subtotal', this.subtotal);
        this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  increse(id: any) {
    this._CartService.increaseCartItem(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.loadCart();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadCart();
      },
    });
  }
  decrese(id: any) {
    this._CartService.decreaseCartItem(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.loadCart();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadCart();
      },
    });
  }
  //////////////////////
  ngOnInit(): void {
    this.loadCart();
  }
}
