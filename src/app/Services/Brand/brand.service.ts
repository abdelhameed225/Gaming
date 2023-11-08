import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibrand } from 'src/app/Interfaces/Ibrand/ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:5118/api/Brands'
  getAllBrands()
  {
    return this.http.get(this.baseUrl,);
  }
}

