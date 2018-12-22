import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryRequestComponent } from './laboratory-request.component';

describe('LaboratoryRequestComponent', () => {
  let component: LaboratoryRequestComponent;
  let fixture: ComponentFixture<LaboratoryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
