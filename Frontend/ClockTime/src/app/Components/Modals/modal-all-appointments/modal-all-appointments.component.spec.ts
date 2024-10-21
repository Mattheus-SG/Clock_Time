import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAllAppointmentsComponent } from './modal-all-appointments.component';

describe('ModalAllAppointmentsComponent', () => {
  let component: ModalAllAppointmentsComponent;
  let fixture: ComponentFixture<ModalAllAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAllAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAllAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
