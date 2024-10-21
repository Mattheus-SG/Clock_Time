import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../Services/TokenService/token.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { UtilsService } from '../../../Services/utils.service';

@Component({
  selector: 'app-menu-desktop',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './menu-desktop.component.html',
  styleUrl: './menu-desktop.component.scss'
})
export class MenuDesktopComponent {

  public userLogado : any = { };

  constructor(private tokenService : TokenService, private router : Router, private utils : UtilsService) { }

  ngOnInit(){
    this.userLogado = this.tokenService.getUserFromToken();
    console.log("USER_LOGADO: ", this.userLogado);
  }


  logout(){
    this.utils.logout();
  }



}
