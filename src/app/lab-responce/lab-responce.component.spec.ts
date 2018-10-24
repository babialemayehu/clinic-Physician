import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabResponceComponent } from './lab-responce.component';

describe('LabResponceComponent', () => {
  let component: LabResponceComponent;
  let fixture: ComponentFixture<LabResponceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabResponceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabResponceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
