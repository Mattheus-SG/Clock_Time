import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../Services/TokenService/token.service';
import { AccountService } from '../../../Services/AccountService/account.service';
import { UtilsService } from '../../../Services/utils.service';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {


  @Input() title: string = "";
  @Input() icon: string = "fa fa-user";
  @Input() subtitle: string = "Since 2023";
  @Input() enableButton: Boolean = false;

  constructor(private utils : UtilsService, private tokenService : TokenService, private accountService : AccountService) { }

  logout(){
    this.utils.logout();
  }

}
