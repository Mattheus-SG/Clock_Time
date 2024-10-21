import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../Services/AppointmentService/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { NgFor, NgIf } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalInfoAppointmentComponent } from '../Modals/modal-info-appointment/modal-info-appointment.component';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [
    MenuMobileBackComponent,
    NgIf,
    NgFor,
    ModalInfoAppointmentComponent
  ],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.scss'
})
export class ListAppointmentsComponent {

  public list_appointments: Appointment[] = [];
  fruits: Array<Appointment> = [];


  modalRef?: BsModalRef;

  constructor(private appointmentService : AppointmentService, private modalService : BsModalService) { }

  ngOnInit(){
    this.get_appointments();
  }

  get_appointments(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.appointmentService.get_all_apointments().subscribe(
        (response) => {
          console.log("RESPONSE SUCCESS: ", response);
          this.list_appointments = response;
          console.log("ARRAY_APPOINTMENT: ", this.list_appointments[0]);
          resolve(true);
        },
        (httpError: HttpErrorResponse) => {
          console.log("ERROR SET_ENTRY:", httpError.error);
          reject(false);
        }
      );
    });
  }

  open_info_modal(index : any){
    var data = this.list_appointments[index];

    this.openModalWithComponent(`Ponto Eletrônico`, `Ponto Eletrônico`, data);
    console.log(data);
  }

  openModalWithComponent(title: string, text: string, data : any) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        text: text,
        data: data
      }
    };
    this.modalRef = this.modalService.show(ModalInfoAppointmentComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }


}

export interface Appointment {
  id: number;
  outTime: any;
  entryTime: any;
  streetEntryTime: string;
  streetExitTime: string;
  date: any;
}
