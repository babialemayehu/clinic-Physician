import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRouteComponent } from './change-password-route.component';

describe('ChangePasswordRouteComponent', () => {
  let component: ChangePasswordRouteComponent;
  let fixture: ComponentFixture<ChangePasswordRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
