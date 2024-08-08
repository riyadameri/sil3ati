import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymmentComponent } from './paymment.component';

describe('PaymmentComponent', () => {
  let component: PaymmentComponent;
  let fixture: ComponentFixture<PaymmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
