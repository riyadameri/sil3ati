import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureRegisterComponent } from './failure-register.component';

describe('FailureRegisterComponent', () => {
  let component: FailureRegisterComponent;
  let fixture: ComponentFixture<FailureRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailureRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
