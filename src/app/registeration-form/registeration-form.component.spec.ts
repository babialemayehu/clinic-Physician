import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationFormComponent } from './registeration-form.component';

describe('RegisterationFormComponent', () => {
  let component: RegisterationFormComponent;
  let fixture: ComponentFixture<RegisterationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
