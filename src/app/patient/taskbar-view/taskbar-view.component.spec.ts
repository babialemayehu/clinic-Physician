import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarViewComponent } from './taskbar-view.component';

describe('TaskbarViewComponent', () => {
  let component: TaskbarViewComponent;
  let fixture: ComponentFixture<TaskbarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskbarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskbarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
