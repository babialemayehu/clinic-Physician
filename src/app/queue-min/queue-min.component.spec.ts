import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueMinComponent } from './queue-min.component';

describe('QueueMinComponent', () => {
  let component: QueueMinComponent;
  let fixture: ComponentFixture<QueueMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
