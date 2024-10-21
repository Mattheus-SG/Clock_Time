import { Component , OnInit } from '@angular/core';
import { TokenService } from '../../Services/TokenService/token.service';
import { HeaderPageComponent } from '../shared/header-page/header-page.component';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { ListAllUsersComponent } from '../list-all-users/list-all-users.component';

@Component({
  selector: 'app-admin-area',
  standalone: true,
  imports: [ HeaderPageComponent, MenuMobileBackComponent, ListAllUsersComponent ],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.scss'
})
export class AdminAreaComponent {


  constructor(private tokenService : TokenService) {
  }
  ngOnInit(){

    var currentToken = this.tokenService.getTokenLocal();
    console.log(currentToken);

  }


}
