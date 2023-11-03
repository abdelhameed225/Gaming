import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from 'src/app/Interfaces/Iproduct/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:5118/api/Products'
  getAllProducts()
  {
    return this.http.get(this.baseUrl,);
  }
  getProductById(productId:number) {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }
  getProductByCatId(CatId:number) {
    return this.http.get(`${this.baseUrl}/category/${CatId}`);
  }
}
