import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessageFormComponent } from './control-message-form.component';

describe('ControlMessageFormComponent', () => {
  let component: ControlMessageFormComponent;
  let fixture: ComponentFixture<ControlMessageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlMessageFormComponent]
    });
    fixture = TestBed.createComponent(ControlMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
