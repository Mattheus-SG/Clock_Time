import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/AccountService/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { AppointmentService } from '../../Services/AppointmentService/appointment.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalInfoAppointmentComponent } from '../Modals/modal-info-appointment/modal-info-appointment.component';
import { ModalAllAppointmentsComponent } from '../Modals/modal-all-appointments/modal-all-appointments.component';

@Component({
  selector: 'app-list-all-users',
  standalone: true,
  imports: [NgIf, NgFor, ModalInfoAppointmentComponent],
  templateUrl: './list-all-users.component.html',
  styleUrl: './list-all-users.component.scss'
})
export class ListAllUsersComponent {

  public all_users : any = null;
  public appointments_user : any = null;
  public modalRef?: BsModalRef;
  constructor(private accountService : AccountService, private appointmentService : AppointmentService, private modalService : BsModalService) { }

  ngOnInit(){
    this.get_all_user();
  }

  get_all_user() : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.accountService.getAllUsers().subscribe(
        (response) => {
          console.log("RESPONSE SUCCESS: ", response);
          this.all_users = response;
          console.log("USERS_LIST: ", response);
          resolve(true);
        },
        (httpResponse: HttpErrorResponse) => {
          console.log("ERROR SET_ENTRY:", httpResponse.error);
          reject(false);
        }
      );
    })
  }

  get_appointments_user(id : number)  : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.appointmentService.get_all_appointments_admin(id).subscribe(
        (response) => {
          console.log("RESPONSE SUCCESS: ", response);
          this.appointments_user = response;
          console.log("APPOINTMENT_USER: ", response);
          resolve(true);
          this.openModalWithComponent("Dados do Usuário", "", this.appointments_user);
        },
        (httpResponse: HttpErrorResponse) => {
          console.log("ERROR APPOINTMENT:", httpResponse.error);
          reject(false);
        }
      );
    })
  }

  openModalWithComponent(title: string, text: string, data : any) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        text: text,
        data: data
      }
    };
    this.modalRef = this.modalService.show(ModalAllAppointmentsComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }

}
