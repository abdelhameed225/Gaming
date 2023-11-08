import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}
  baseUrl: string = 'http://localhost:5118/api/order';
  headers = {
    Authorization: 'Bearer ' + this._AuthService.getUserToken(),
  };

  createOrder(order: any) {
    return this.http.post(this.baseUrl, order, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
