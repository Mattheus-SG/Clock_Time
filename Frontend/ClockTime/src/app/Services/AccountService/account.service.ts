import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'https://localhost:4001/api/account';
  public user = new User();

  constructor(private http : HttpClient) { }

  testing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/testing`);
  }

  callLogin(email : string, password :  string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email : email, password: password});
  }

  create_user(user : User) : Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, {userName : user.userName, email : user.email, password: user.password});
  }

  getUserById(id : number) : Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  update_user(id : number, user : User) : Observable<any>{
    return this.http.post(`${this.apiUrl}/update-user/${id}`, user);
  }

  getAllUsers() : Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }

}
