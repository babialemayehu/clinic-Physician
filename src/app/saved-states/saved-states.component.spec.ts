import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedStatesComponent } from './saved-states.component';

describe('SavedStatesComponent', () => {
  let component: SavedStatesComponent;
  let fixture: ComponentFixture<SavedStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
