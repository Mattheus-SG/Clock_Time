import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../../Services/AccountService/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../Classes/user';
import { NgClass, NgIf } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { ValidatorFields } from '../../helpers/classes/validator-fields';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterComponent } from '../Modals/modal-register/modal-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-access',
  standalone: true,
  imports: [NgIf, FormsModule, MenuMobileBackComponent, ReactiveFormsModule, NgClass, NgIf, ModalRegisterComponent],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss'
})
export class FirstAccessComponent {

  public user : User = {};
  public form! : FormGroup;
  public messageFieldRequired : string = "Field Required";
  public errorRegister : string = "";
  modalRef?: BsModalRef;

  
  constructor(private accountService : AccountService, private modalService : BsModalService, private formBuilder: FormBuilder, private router: Router) { }

  get f() : any{
    return this.form.controls;
  }

  ngOnInit() : void{
    this.validation();
    this.errorRegister = "";
    console.log(this.f);
    console.log(this.form);
  }

  onSubmit() : void{
    console.log(this.user);
    console.log(this.f);
    console.log(this.form);
    this.save_user();
  }

  save_user() : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.accountService.create_user(this.user).subscribe(
        (response) => {
          console.log(response);
          resolve(true);
          this.router.navigate(['/login']);
          this.openModalWithComponent('Cadastro realizado com sucesso', 'Realize o login e confira nossos serviços.');
        },
        (response : HttpErrorResponse) => {
          this.errorRegister = response.error.message;
          console.log(response.error.message);
          reject(false);
          this.router.navigate(['/login']);
          this.openModalWithComponent('Erro ao realizar Login', 'Ocorreu um erro no cadastro, tente mais tarde.');
        }
      );
    });
  }

  public validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'confirmPassword')
    }

    this.form = this.formBuilder.group({
      userName: ['', [ Validators.required ]],
      terms: [false, [Validators.requiredTrue]],
      email:['', [ Validators.required, Validators.email ]],
      password:['', [ Validators.required, Validators.minLength(6) ]],
      confirmPassword:['', [ Validators.required, Validators.minLength(6) ]]

    }, formOptions);

  }

  openModalWithComponent(title: string, text: string) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        text: text
      }
    };
    this.modalRef = this.modalService.show(ModalRegisterComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }

}
