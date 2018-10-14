import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVisitsComponent } from './recent-visits.component';

describe('RecentVisitsComponent', () => {
  let component: RecentVisitsComponent;
  let fixture: ComponentFixture<RecentVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
