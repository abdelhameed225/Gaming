import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCatComponent } from './add-new-cat.component';

describe('AddNewCatComponent', () => {
  let component: AddNewCatComponent;
  let fixture: ComponentFixture<AddNewCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCatComponent]
    });
    fixture = TestBed.createComponent(AddNewCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
