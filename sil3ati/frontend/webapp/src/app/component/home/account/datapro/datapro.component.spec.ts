import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataproComponent } from './datapro.component';

describe('DataproComponent', () => {
  let component: DataproComponent;
  let fixture: ComponentFixture<DataproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataproComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
