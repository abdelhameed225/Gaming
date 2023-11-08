import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatProductsComponent } from './cat-products.component';

describe('CatProductsComponent', () => {
  let component: CatProductsComponent;
  let fixture: ComponentFixture<CatProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatProductsComponent]
    });
    fixture = TestBed.createComponent(CatProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
