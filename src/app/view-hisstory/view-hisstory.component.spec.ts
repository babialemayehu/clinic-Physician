import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHisstoryComponent } from './view-hisstory.component';

describe('ViewHisstoryComponent', () => {
  let component: ViewHisstoryComponent;
  let fixture: ComponentFixture<ViewHisstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHisstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHisstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
