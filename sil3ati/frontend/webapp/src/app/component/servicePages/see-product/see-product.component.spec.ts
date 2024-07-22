import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProductComponent } from './see-product.component';

describe('SeeProductComponent', () => {
  let component: SeeProductComponent;
  let fixture: ComponentFixture<SeeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
