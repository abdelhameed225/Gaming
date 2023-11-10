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
    return this.http.get(this.baseUrl);
  }
  getCategoryByName(name:any){
    return this.http.get(`${this.baseUrl}/${name}`);
  }
  getCategoryById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  addCategory(category:any) {
    return this.http.post(this.baseUrl,category);
    
  }
  editCategory(catId:number,category:any) {
    return this.http.put(`${this.baseUrl}/${catId}`,category);
    
  }
  deleteCategory(categoryId:number) {
    return this.http.delete(`${this.baseUrl}/${categoryId}`);
  }
}
