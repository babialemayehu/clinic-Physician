import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRouteComponent } from './user-profile-route.component';

describe('UserProfileRouteComponent', () => {
  let component: UserProfileRouteComponent;
  let fixture: ComponentFixture<UserProfileRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
