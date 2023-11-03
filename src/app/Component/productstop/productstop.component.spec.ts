import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstopComponent } from './productstop.component';

describe('ProductstopComponent', () => {
  let component: ProductstopComponent;
  let fixture: ComponentFixture<ProductstopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductstopComponent]
    });
    fixture = TestBed.createComponent(ProductstopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
