import { Injectable } from '@angular/core';
import { TokenService } from '../TokenService/token.service';
import { User } from '../../Classes/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../../Components/list-appointments/list-appointments.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private apiUrl : string = 'https://localhost:4001/api/appointment';

  constructor(private tokenService : TokenService, private http : HttpClient) { }

  set_entry_time(latitude: number, longitude: number): Observable<any> {
    const user = this.tokenService.getUserFromToken();
    const userId = user?.id ? parseInt(user.id, 10) : null;
  
    if (userId === null) {
      console.error("ID do usuário não encontrado ou inválido.");
      return throwError(() => new Error("ID do usuário é inválido."));
    }
  
    const body = { id: userId, latitude, longitude };
    
    return this.http.post(`${this.apiUrl}/setEntryTime`, body);
  }
  


  set_outwork_time(latitude: number, longitude: number) : Observable<any>{
    const user = this.tokenService.getUserFromToken();
    const userId = user?.id ? parseInt(user.id, 10) : null;

    if (userId === null) {
      console.error("ID do usuário não encontrado ou inválido.");
      return throwError(() => new Error("ID do usuário é inválido."));
    }

    const body = { id: userId, latitude, longitude };
    console.log("APPOINT_SERVICE BODY: ", body);
    return this.http.post(`${this.apiUrl}/setOutTime`, body);
  }

  get_all_appointments_admin(id : number) : Observable<any>{
    return  this.http.get(`${this.apiUrl}/user_appointments/${id}`);
  }

  get_all_apointments() : Observable<any>{
    const user = this.tokenService.getUserFromToken();
    return  this.http.get(`${this.apiUrl}/user_appointments/${user?.id}`);
  }

  apointment_today(id_user : number){
    return this.http.get(`${this.apiUrl}/appointment_today/${id_user}`);
  }


}
