import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeaccountComponent } from './homeaccount.component';

describe('HomeaccountComponent', () => {
  let component: HomeaccountComponent;
  let fixture: ComponentFixture<HomeaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
