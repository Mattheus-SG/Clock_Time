import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsAppointmentComponent } from './options-appointment.component';

describe('OptionsAppointmentComponent', () => {
  let component: OptionsAppointmentComponent;
  let fixture: ComponentFixture<OptionsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
