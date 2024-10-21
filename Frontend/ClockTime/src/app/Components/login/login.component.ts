import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/AccountService/account.service';
import { TokenService } from '../../Services/TokenService/token.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../Classes/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public errorMessage: string | null = null;
  public user_email: string = '';
  public password: string = '';


  constructor(private accountService: AccountService, private tokenService : TokenService, private router: Router) { }

  ngOnInit() { }

  async onSubmit(): Promise<void> {
      await this.doLogin(this.user_email, this.password);
  }

  doLogin(user_email: string, userPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.accountService.callLogin(user_email, userPassword).subscribe(
        (response) => {
          console.log('Login realizado:', response);
          this.tokenService.setTokenLocal(response.token);
          //this.router.navigate(['/home']);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          resolve(true);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.errorMessage = error.error?.message || 'Erro ao fazer login';
          reject(false);
        }
      );
    });
  }

  
}
