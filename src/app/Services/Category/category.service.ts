import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from 'src/app/Interfaces/Icategory/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
  baseUrl:string = 'http://localhost:5118/api/Categories'
  getAllCategory()
  {
    return this.http.get(this.baseUrl,);
  }
}
