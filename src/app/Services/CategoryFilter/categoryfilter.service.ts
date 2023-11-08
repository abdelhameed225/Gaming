import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryfilterService {

  constructor() { }
  private catId: number = 0;

  setCategoryId(id: number) {
    this.catId = id;
  }

  getCategoryId() {
    return this.catId;
  }
}
