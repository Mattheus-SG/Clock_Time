import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './TokenService/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private tokenService : TokenService, private router : Router) { 

    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.Handset // Define o breakpoint para dispositivos móveis
    ]).pipe(
      map(result => result.matches) // Atualiza o observable com o resultado do breakpoint
    );

  }

  logout(){
    this.tokenService.clearToken();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
