import { OrderService } from './../../Services/Order/order.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CartService } from 'src/app/Services/Cart/cart.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
})
export class OrdersummaryComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private _CartService: CartService,
    private _OrderService: OrderService
  ) {}

  cartItems: any = [];
  isLoading: boolean = false;
  subtotal: number = 0;
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
  ngOnInit(): void {
    this.loadCart();
  }
  OrderForm = new FormGroup({
    City: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    Government: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    Street: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    BulidingNumber: new FormControl(null, [
      Validators.required,

      Validators.maxLength(15),
    ]),
    PostalCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
    ]),
    PhoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('[- +()0-9]{10,12}'),
    ]),
  });
  get getCity() {
    return this.OrderForm.controls['City'];
  }
  get getGovernment() {
    return this.OrderForm.controls['Government'];
  }
  get getStreet() {
    return this.OrderForm.controls['Street'];
  }
  get getPhoneNumber() {
    return this.OrderForm.controls['PhoneNumber'];
  }
  get getPostalCode() {
    return this.OrderForm.controls['PostalCode'];
  }
  get getBulidingNumber() {
    return this.OrderForm.controls['BulidingNumber'];
  }

  checkoutOrder(e: Event) {
    e.preventDefault();
    // console.log(this.OrderForm);

    if (this.OrderForm.status == 'VALID') {
      this._OrderService.createOrder(this.OrderForm.value).subscribe({
        next: (response) => {
          // console.log(response);

          this.isLoading = false;
          this.toastr.success('Order Created Sussccefully', 'Success');
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(JSON.parse(error.error), 'Failed to Make Order');
          console.log(error);
        },
      });
    }
  }
}
