import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../Services/utils.service';
import { TokenService } from '../../../Services/TokenService/token.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {

  public userLogado : any = { };

  constructor(private tokenService : TokenService, private utils : UtilsService) { }

  ngOnInit(){
    this.userLogado = this.tokenService.getUserFromToken();
    console.log("USER_LOGADO: ", this.userLogado);
  }

  logout(){
    this.utils.logout();
  }

}
