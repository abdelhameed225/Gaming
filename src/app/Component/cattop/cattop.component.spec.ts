import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattopComponent } from './cattop.component';

describe('CattopComponent', () => {
  let component: CattopComponent;
  let fixture: ComponentFixture<CattopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CattopComponent]
    });
    fixture = TestBed.createComponent(CattopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
