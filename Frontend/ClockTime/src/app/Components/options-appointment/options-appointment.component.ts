import { Component, OnInit } from '@angular/core';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/TokenService/token.service';
import { AccountService } from '../../Services/AccountService/account.service';
import { NgIf } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterComponent } from '../Modals/modal-register/modal-register.component';

@Component({
  selector: 'app-options-appointment',
  standalone: true,
  imports: [
    ModalRegisterComponent,
    MenuMobileBackComponent,
    NgIf
  ],
  templateUrl: './options-appointment.component.html',
  styleUrl: './options-appointment.component.scss'
})
export class OptionsAppointmentComponent {

  public user : any = null;
  public userToken : any = null;
  public isLoading : boolean = false;
  public modalRef?: BsModalRef;
  public uploadedPhotos : boolean = false;

  constructor(private router : Router, private tokenService : TokenService, private accountService : AccountService, private modalService : BsModalService) { }

  ngOnInit(){
    this.userToken = this.tokenService.getUserFromToken();
    this.user = this.get_user_by_id(this.userToken.id);
    console.log(this.user);
  }

  get_user_by_id(id: number): void {
    this.isLoading = true;
    this.accountService.getUserById(id).subscribe(
        (response) => {
            console.log("Resposta da API: ", response);

            this.user = response;
            this.uploadedPhotos = this.user.uploadedPhotos;
            console.log("UPLOAD (boolean): ", this.uploadedPhotos);
            
            this.isLoading = false;
        },
        (error) => {
            console.error("Erro ao buscar usuário:", error);
            this.isLoading = false;
        }
    );
  }

  call_entry(){
    if(this.uploadedPhotos){
      this.router.navigate(['set-entry']);
      return;
    }
    else{
      this.openModalWithComponent("Fotos Necessárias", "Realize o upload de fotos obrigatórias em Perfil.");
    }
  }

  call_out_time(){
    if(this.uploadedPhotos){
      this.router.navigate(['set-outwork']);
      return;
    }
    else{
      this.openModalWithComponent("Fotos Necessárias", "Realize o upload de fotos obrigatórias em Perfil.");
    }
  }


  openModalWithComponent(title: string, text: string) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        text: text
      }
    };
    this.modalRef = this.modalService.show(ModalRegisterComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }


}
