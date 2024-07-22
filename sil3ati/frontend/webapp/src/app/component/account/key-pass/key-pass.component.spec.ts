import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPassComponent } from './key-pass.component';

describe('KeyPassComponent', () => {
  let component: KeyPassComponent;
  let fixture: ComponentFixture<KeyPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
