import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoAppointmentComponent } from './modal-info-appointment.component';

describe('ModalInfoAppointmentComponent', () => {
  let component: ModalInfoAppointmentComponent;
  let fixture: ComponentFixture<ModalInfoAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
