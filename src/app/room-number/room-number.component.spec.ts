import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNumberComponent } from './room-number.component';

describe('RoomNumberComponent', () => {
  let component: RoomNumberComponent;
  let fixture: ComponentFixture<RoomNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
