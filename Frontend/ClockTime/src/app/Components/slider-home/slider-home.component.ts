import { Component, Input } from '@angular/core';
import { UtilsService } from '../../Services/utils.service';
import { TokenService } from '../../Services/TokenService/token.service';
import { AccountService } from '../../Services/AccountService/account.service';
import { NgIf } from '@angular/common';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-slider-home',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.scss'
})
export class SliderHomeComponent {
  @Input() userName : string = "";

  public user : any = null;
  public userToken : any = null;

  constructor(private utils : UtilsService, private tokenService : TokenService, private accountService : AccountService, private router:Router) { }

  ngOnInit(): void {
    this.userToken = this.tokenService.getUserFromToken();
    console.log("TOKEN MENU: ", this.userToken)
    this.user = this.getUserById(this.userToken.id);
    console.log("USER MENU: ", this.user)

  }

  logout() : void{
    this.utils.logout();
  }

  redirectAdmin(){
    this.router.navigate(['dashboard']);
  }

  getUserById(id : number) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.accountService.getUserById(id).subscribe(
        (response) => {
            console.log("Resposta da API: ", response);
            this.user = response;
            resolve(true);
        },
        (error) => {
            console.error("Erro ao buscar usuário:", error);
            reject(false);
        }
      )
    })
  }

}
