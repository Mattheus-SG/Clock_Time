import { Component, OnInit } from '@angular/core';
import { SliderHomeComponent } from '../slider-home/slider-home.component';
import { TokenService } from '../../Services/TokenService/token.service';
import { AccountService } from '../../Services/AccountService/account.service';
import { AppointmentService } from '../../Services/AppointmentService/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SliderHomeComponent,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public today : any = new Date();
  public currentDate : any = null; // "YYYY-MM-DD"
  public userToken : any = null;
  public user : any = null;
  public appointment_today : any = null;
  
  // Exemplo de uso:
  formattedDate = this.formatDate(this.today);

  constructor( 
    private tokenService: TokenService, 
    private accountService : AccountService, 
    private appointmentService : AppointmentService ) { }

  ngOnInit(){

    this.today.toISOString().split('T')[0];
    this.userToken = this.tokenService.getUserFromToken();
    this.user = this.getUserById(this.userToken.id);
    this.get_appointment();

  }

  formatDate(date: Date): string {
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
  
    const day = date.getDate(); // Obtém o dia
    const month = months[date.getMonth()]; // Obtém o nome do mês
    const year = date.getFullYear(); // Obtém o ano
  
    return `${day} de ${month} de ${year}`;
  }

  get_appointment() : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.appointmentService.apointment_today(this.userToken.id).subscribe(
        (response) => {
          console.log("APPOINTMENT_TODAY: ", response);
          resolve(true);
          this.appointment_today = response;
        },
        (response : HttpErrorResponse) => {
          console.log("ERRO:APPOINTMENT: ", response.error.message);
          reject(false);
        }
      );
    });
  }

  getUserById(id : number) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.accountService.getUserById(id).subscribe(
        (response) => {
            console.log("Resposta da API: ", response);
            this.user = response;
        },
        (error) => {
            console.error("Erro ao buscar usuário:", error);
        }
      )
    })
  }

}
