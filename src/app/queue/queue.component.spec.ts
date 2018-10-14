
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueComponent } from './queue.component';

describe('QueueComponent', () => {
  let component: QueueComponent;
  let fixture: ComponentFixture<QueueComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
