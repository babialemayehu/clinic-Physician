import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFormComponent } from './history-form.component';

describe('HistoryFormComponent', () => {
  let component: HistoryFormComponent;
  let fixture: ComponentFixture<HistoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
