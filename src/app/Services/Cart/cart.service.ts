import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}
  baseUrl: string = 'http://localhost:5118/api/Cart';
  headers = {
    Authorization: 'Bearer ' + this._AuthService.getUserToken(),
  };
  addToCart(productId: any) {
    return this.http.post(this.baseUrl, productId, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  getCart() {
    return this.http.get(this.baseUrl, {
      headers: this.headers,
    });
  }
  deleteCartItem(cartItemId: any) {
    return this.http.delete(`${this.baseUrl}/${cartItemId}`, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  increaseCartItem(cartItemId: any) {
    return this.http.put(`${this.baseUrl}/increase/${cartItemId}`, null, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  decreaseCartItem(cartItemId: any) {
    return this.http.put(`${this.baseUrl}/decrease/${cartItemId}`, null, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
