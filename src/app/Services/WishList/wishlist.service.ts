import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}
  baseUrl: string = 'http://localhost:5118/api/wishlist';
  headers = {
    Authorization: 'Bearer ' + this._AuthService.getUserToken(),
  };
  addToWishList(productId: any) {
    return this.http.post(this.baseUrl, productId, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  getWishList() {
    return this.http.get(this.baseUrl, {
      headers: this.headers,
    });
  }
  deleteWishListItems(wishListId: any) {
    return this.http.delete(`${this.baseUrl}/${wishListId}`, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
