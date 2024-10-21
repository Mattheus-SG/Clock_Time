import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-register',
  standalone: true,
  imports: [],
  // templateUrl: './modal-register.component.html',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="close()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ text }}
    </div>
  `,
  styleUrl: './modal-register.component.scss'
})
export class ModalRegisterComponent {

  public title? : string;
  public text? : string;


  constructor(private bsModalRef: BsModalRef) {}

  close() {
    this.bsModalRef.hide();
  }
  
}
