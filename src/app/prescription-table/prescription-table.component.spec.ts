import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionTableComponent } from './prescription-table.component';

describe('PrescriptionTableComponent', () => {
  let component: PrescriptionTableComponent;
  let fixture: ComponentFixture<PrescriptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
