import { Injectable } from '@angular/core';
import { Iproduct } from 'src/app/Interfaces/Iproduct/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  getProducts():Iproduct[]
  {
    return [];

  }
}
