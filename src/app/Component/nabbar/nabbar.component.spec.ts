import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabbarComponent } from './nabbar.component';

describe('NabbarComponent', () => {
  let component: NabbarComponent;
  let fixture: ComponentFixture<NabbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NabbarComponent]
    });
    fixture = TestBed.createComponent(NabbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
