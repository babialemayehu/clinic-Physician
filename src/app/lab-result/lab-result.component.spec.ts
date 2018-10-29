import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabResultComponent } from './lab-result.component';

describe('LabResultComponent', () => {
  let component: LabResultComponent;
  let fixture: ComponentFixture<LabResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
