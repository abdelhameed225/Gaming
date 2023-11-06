import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewProductComponent } from './addnew-product.component';

describe('AddnewProductComponent', () => {
  let component: AddnewProductComponent;
  let fixture: ComponentFixture<AddnewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewProductComponent]
    });
    fixture = TestBed.createComponent(AddnewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
