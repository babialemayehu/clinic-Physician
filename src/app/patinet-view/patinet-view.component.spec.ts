import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetViewComponent } from './patinet-view.component';

describe('PatinetViewComponent', () => {
  let component: PatinetViewComponent;
  let fixture: ComponentFixture<PatinetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatinetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatinetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
