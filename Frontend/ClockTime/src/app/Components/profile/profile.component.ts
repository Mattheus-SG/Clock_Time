import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorFields } from '../../helpers/classes/validator-fields';
import { NgClass, NgIf } from '@angular/common';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/TokenService/token.service';
import { AccountService } from '../../Services/AccountService/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../Classes/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MenuMobileBackComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  public form! : FormGroup;
  public messageFieldRequired = "Field Required";
  public userToken : any = null;
  public user : any = null;
  public uploadedPhotos : boolean = false;
  public isLoading: boolean = true;
  public user_password : string = "";

  constructor(private formBuilder: FormBuilder, private router : Router, private tokenService : TokenService, private accountService : AccountService) { }

  get f() : any{
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
    this.userToken = this.tokenService.getUserFromToken();
    this.user = this.getUserById(this.userToken.id);
  }

  getUserById(id: number): void {
    this.isLoading = true; // Define como carregando antes de iniciar a requisição
    this.accountService.getUserById(id).subscribe(
        (response) => {
            console.log("Resposta da API: ", response);

            this.user = response;
            this.uploadedPhotos = this.user.uploadedPhotos; // uploadedPhotos é boolean
            console.log("UPLOAD (boolean): ", this.uploadedPhotos);
            
            this.isLoading = false;  // Desativa o indicador de carregamento
        },
        (error) => {
            console.error("Erro ao buscar usuário:", error);
            this.isLoading = false;  // Mesmo em caso de erro, desativa o indicador de carregamento
        }
    );
  }

  update_user(): void {
    this.isLoading = true; // Define como carregando antes de iniciar a requisição
    this.user.password = this.user_password;
    console.log("UPDATE_USER: ", this.user);
    this.accountService.update_user(this.user.id, this.user).subscribe(
        (response) => {
            console.log("Resposta da API: ", response);
            this.isLoading = false;  // Desativa o indicador de carregamento
        },
        (error : HttpErrorResponse) => {
            console.error("Erro ao buscar usuário:", error);
            window.alert(error.error);
            this.isLoading = false;  // Mesmo em caso de erro, desativa o indicador de carregamento
        }
    );
  }


  cameraComponent() : void{
    this.router.navigate(['/save-photos'])
  }

  public validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'confirmPassword')
    }

    this.form = this.formBuilder.group({

      education: ['', [ Validators.required ]],
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      email:['', [ Validators.required, Validators.email ]],
      phone: ["", [ Validators.required, Validators.pattern('') ]],
      occupation:['', [ Validators.required ]],
      description:['', [ Validators.required, Validators.minLength(20)  ]],
      password:['', [ Validators.required, Validators.minLength(6) ]],
      confirmPassword:['', [ Validators.required, Validators.minLength(6) ]]

    }, formOptions);

  }



}
